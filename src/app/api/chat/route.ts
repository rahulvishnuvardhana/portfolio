import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Portfolio chat relayed through Slack.
 *
 * POST /api/chat   a visitor message. The first one opens a thread in SLACK_CHANNEL_ID
 *                  (name required), later ones go into that thread.
 * GET  /api/chat   the visitor's own thread as chat messages. The thread token travels in
 *                  the `x-chat-token` header (never the URL, so it stays out of logs).
 *
 * Isolation: each visitor holds an HMAC-signed token naming exactly one thread, so they can
 * read and write only their own conversation. Only the owner's replies (SLACK_OWNER_ID) are
 * relayed back; anything else in the thread, and owner replies starting with "!note", stay
 * private in Slack.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL_ID;
const SECRET = process.env.CHAT_SECRET;
const OWNER = process.env.SLACK_OWNER_ID;
// A local Slack stand-in is allowed for testing, never on Vercel.
const API = (!process.env.VERCEL && process.env.SLACK_API_BASE) || "https://slack.com/api";
const configured = Boolean(TOKEN && CHANNEL && SECRET);

const MAX_BODY_BYTES = 8 * 1024;
const MAX_TEXT = 1000;
const EVENT_TYPE = "portfolio_chat";
const NOTE_PREFIX = "!note";
const TOKEN_VERSION = "v1";

type ChatMessage = { id: string; from: "visitor" | "owner"; text: string; at: number };

/* ----------------------------- rate limiting ----------------------------- */
// Best-effort, per serverless instance (instances do not share memory). On Vercel the
// x-forwarded-for header is set by the platform and cannot be spoofed by the client.
const buckets = new Map<string, number[]>();
function limited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) buckets.clear(); // memory guard
  return recent.length > max;
}
const MIN = 60 * 1000;
const LIMITS = {
  newThreadPerIp: [3, 60 * MIN],
  messagePerIp: [20, 10 * MIN],
  messagePerThread: [15, 10 * MIN],
  newThreadGlobal: [40, 60 * MIN],
  pollPerThread: [40, MIN],
} as const;

/* ------------------------------ thread tokens ----------------------------- */
function sign(ts: string) {
  const mac = createHmac("sha256", SECRET!).update(`${TOKEN_VERSION}:${ts}`).digest("base64url");
  return `${TOKEN_VERSION}.${Buffer.from(ts).toString("base64url")}.${mac}`;
}

function verify(token: string | null): string | null {
  if (!token || token.length > 200) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return null;
  const ts = Buffer.from(parts[1], "base64url").toString();
  if (!/^\d{9,11}\.\d{6}$/.test(ts)) return null;
  const expected = createHmac("sha256", SECRET!).update(`${TOKEN_VERSION}:${ts}`).digest("base64url");
  const a = Buffer.from(parts[2]);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b) ? ts : null;
}

/* ------------------------------ text handling ----------------------------- */
// Strip control characters (keep newlines and tabs) and collapse runs of blank lines.
const clean = (s: unknown, max: number) =>
  String(s ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁦-⁩]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);

// Escaping for the notification fallback text (Slack control characters).
const escapeSlack = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Owner replies arrive as Slack mrkdwn; turn links, mentions and entities into plain text.
const fromSlack = (s: string) =>
  s
    .replace(/<@([A-Z0-9_]+)(\|[^>]+)?>/g, (_m, id) => (id === OWNER ? "Rahul" : "@someone"))
    .replace(/<#[A-Z0-9_]+\|([^>]+)>/g, "#$1")
    .replace(/<!(here|channel|everyone)[^>]*>/g, "@$1")
    .replace(/<mailto:([^|>]+)(\|[^>]+)?>/g, "$1")
    .replace(/<([^|>]+)\|([^>]+)>/g, "$2 ($1)")
    .replace(/<(https?:[^>]+)>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const plain = (text: string) => ({ type: "plain_text", text: text || " ", emoji: false });

/* --------------------------------- Slack --------------------------------- */
class SlackError extends Error {
  constructor(
    public code: string,
    public retryAfter?: number,
  ) {
    super(`slack: ${code}`);
  }
}

async function slackPost(method: string, body: Record<string, unknown>) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 429) throw new SlackError("ratelimited", Number(res.headers.get("retry-after")) || 5);
  const json = await res.json();
  if (!json.ok) throw new SlackError(json.error ?? "unknown");
  return json;
}

const MESSAGE_DEFAULTS = { unfurl_links: false, unfurl_media: false, link_names: false, parse: "none" };

// @mention the owner on every chat post so Slack always sends a push, including follow-ups
// that land in a thread the owner has not replied to yet. Only the fixed member ID is used.
const PING = OWNER && /^[UW][A-Z0-9_]+$/.test(OWNER) ? `<@${OWNER}> ` : "";

function newThreadBlocks(p: { name: string; email: string; company: string; text: string; from: string; place: string }) {
  const fields = [plain(`Name: ${p.name}`)];
  if (p.email) fields.push(plain(`Email: ${p.email}`));
  if (p.company) fields.push(plain(`Company / role: ${p.company}`));
  if (p.place) fields.push(plain(`Location (approx.): ${p.place}`));
  if (p.from) fields.push(plain(`Came from: ${p.from}`));
  return [
    { type: "header", text: plain(`New portfolio chat: ${p.name}`) },
    { type: "section", fields },
    { type: "section", text: plain(p.text) },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `${PING}Name, email and company are self-reported. Reply *in this thread* to answer them; start a reply with \`!note\` to keep it private.`,
        },
      ],
    },
  ];
}

/* ------------------------------ poll caching ------------------------------ */
const pollCache = new Map<string, { at: number; messages: ChatMessage[] }>();
const POLL_CACHE_MS = 4000;

async function readThread(ts: string): Promise<ChatMessage[]> {
  const hit = pollCache.get(ts);
  if (hit && Date.now() - hit.at < POLL_CACHE_MS) return hit.messages;

  const qs = new URLSearchParams({ channel: CHANNEL!, ts, limit: "200", include_all_metadata: "true" });
  const res = await fetch(`${API}/conversations.replies?${qs}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 429) throw new SlackError("ratelimited", Number(res.headers.get("retry-after")) || 5);
  const json = await res.json();
  if (!json.ok) throw new SlackError(json.error ?? "unknown");

  const messages: ChatMessage[] = [];
  for (const m of json.messages ?? []) {
    const at = Math.round(parseFloat(m.ts) * 1000);
    if (m.metadata?.event_type === EVENT_TYPE && m.bot_id) {
      messages.push({ id: m.ts, from: "visitor", text: String(m.metadata.event_payload?.text ?? ""), at });
      continue;
    }
    const isOwner = OWNER ? m.user === OWNER : !m.bot_id;
    const text = typeof m.text === "string" ? m.text.trim() : "";
    if (!isOwner || m.subtype || !text || text.toLowerCase().startsWith(NOTE_PREFIX)) continue;
    messages.push({ id: m.ts, from: "owner", text: fromSlack(text), at });
  }
  pollCache.set(ts, { at: Date.now(), messages });
  if (pollCache.size > 2000) pollCache.clear();
  return messages;
}

/* ------------------------------- handlers -------------------------------- */
function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; still rate limited
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

const clientIp = (req: NextRequest) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

export async function GET(req: NextRequest) {
  if (!configured) return NextResponse.json({ configured: false });
  const token = req.headers.get("x-chat-token");
  if (!token) return NextResponse.json({ configured: true });
  const ts = verify(token);
  if (!ts) return NextResponse.json({ error: "invalid token" }, { status: 401 });
  if (limited(`poll:${ts}`, ...LIMITS.pollPerThread)) {
    return NextResponse.json({ error: "slow down" }, { status: 429, headers: { "Retry-After": "15" } });
  }
  try {
    const messages = await readThread(ts);
    return NextResponse.json({ configured: true, messages }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    if (e instanceof SlackError && e.code === "ratelimited") {
      return NextResponse.json({ error: "busy" }, { status: 429, headers: { "Retry-After": String(e.retryAfter) } });
    }
    if (e instanceof SlackError && e.code === "thread_not_found") {
      return NextResponse.json({ configured: true, messages: [], expired: true });
    }
    console.error(e);
    return NextResponse.json({ error: "chat unavailable" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  if (!configured) return NextResponse.json({ configured: false }, { status: 503 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return NextResponse.json({ error: "Message is too long." }, { status: 413 });

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: "Message is too long." }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: silently drop bots

  const ip = clientIp(req);
  if (limited(`msg:${ip}`, ...LIMITS.messagePerIp)) {
    return NextResponse.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 });
  }

  const text = clean(body.text, MAX_TEXT);
  const name = clean(body.name, 60).replace(/\s+/g, " ");
  const email = clean(body.email, 120);
  const company = clean(body.company, 80).replace(/\s+/g, " ");
  const from = clean(body.from, 80);
  if (!text) return NextResponse.json({ error: "Message is empty." }, { status: 400 });
  if (email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const tokenIn = typeof body.token === "string" ? body.token : null;
  let threadTs = tokenIn ? verify(tokenIn) : null;
  if (tokenIn && !threadTs) return NextResponse.json({ error: "invalid token" }, { status: 401 });

  const metadata = { event_type: EVENT_TYPE, event_payload: { text } };

  const openThread = async () => {
    if (name.length < 2 || /https?:|www\.|[<>@]/i.test(name)) {
      throw new NextResponseError("Please add your name so I can reply to you properly.", 400);
    }
    if (limited(`thread:${ip}`, ...LIMITS.newThreadPerIp) || limited("thread:all", ...LIMITS.newThreadGlobal)) {
      throw new NextResponseError("Too many new conversations right now. Please email me instead.", 429);
    }
    const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "");
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const country = req.headers.get("x-vercel-ip-country") || "";
    const place = [city, region, country].filter(Boolean).join(", ");
    const posted = await slackPost("chat.postMessage", {
      channel: CHANNEL,
      text: `${PING}New portfolio chat from ${escapeSlack(name)}: ${escapeSlack(text.slice(0, 150))}`,
      blocks: newThreadBlocks({ name, email, company, text, from, place }),
      metadata,
      ...MESSAGE_DEFAULTS,
    });
    return posted;
  };

  try {
    let posted;
    let renewed = false;
    if (!threadTs) {
      posted = await openThread();
      threadTs = posted.ts as string;
    } else {
      if (limited(`thread-msg:${threadTs}`, ...LIMITS.messagePerThread)) {
        return NextResponse.json({ error: "You're sending a lot of messages. Give me a moment to reply." }, { status: 429 });
      }
      try {
        posted = await slackPost("chat.postMessage", {
          channel: CHANNEL,
          thread_ts: threadTs,
          text: `${PING}${escapeSlack(name || "Visitor")}: ${escapeSlack(text.slice(0, 150))}`,
          blocks: [
            { type: "section", text: plain(`${name || "Visitor"}: ${text}`) },
            ...(PING ? [{ type: "context", elements: [{ type: "mrkdwn", text: `${PING}new message in this chat` }] }] : []),
          ],
          metadata,
          ...MESSAGE_DEFAULTS,
        });
      } catch (e) {
        // The old thread is gone (e.g. past the free plan's history window): start a new one.
        if (e instanceof SlackError && ["thread_not_found", "message_not_found"].includes(e.code)) {
          posted = await openThread();
          threadTs = posted.ts as string;
          renewed = true;
        } else throw e;
      }
    }
    pollCache.delete(threadTs!);
    const message: ChatMessage = { id: posted.ts, from: "visitor", text, at: Math.round(parseFloat(posted.ts) * 1000) };
    return NextResponse.json({ token: sign(threadTs!), message, renewed });
  } catch (e) {
    if (e instanceof NextResponseError) return NextResponse.json({ error: e.message }, { status: e.status });
    if (e instanceof SlackError && e.code === "ratelimited") {
      return NextResponse.json({ error: "I'm getting a lot of messages. Try again in a minute." }, { status: 429 });
    }
    console.error(e);
    return NextResponse.json({ error: "Couldn't send right now. Please email me instead." }, { status: 502 });
  }
}

class NextResponseError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
