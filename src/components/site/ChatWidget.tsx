"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { OPEN_CHAT_EVENT } from "./OpenChatButton";

type Msg = { id: string; from: "visitor" | "owner"; text: string; at: number };
type Stored = { token?: string; name?: string; email?: string; company?: string; messages: Msg[]; seen?: number };

const KEY = "portfolio-chat-v1";
const OPEN_POLL_MS = 5000;
const CLOSED_POLL_MS = 45000;

function load(): Stored {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "") as Stored;
  } catch {
    return { messages: [] };
  }
}
function save(s: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode: chat still works for this tab */
  }
}

/** Opening messages shown to every visitor (not sent to Slack). */
const GREETING = [
  "Hi, I'm Rahul, an M.S. student in Electrical and Computer Engineering at Northeastern University, specializing in machine learning.",
  "I'm open to co-op and full-time roles. Feel free to ask about my work, a project, or an opportunity. I usually reply within a few hours.",
];

/** One-tap openers: they fill the message box so the visitor can edit before sending. */
const SUGGESTIONS = [
  { label: "Discuss a role", text: "Hi Rahul, I'd like to discuss a role on my team. " },
  { label: "Ask about a project", text: "Hi Rahul, I have a question about one of your projects. " },
  { label: "Connect", text: "Hi Rahul, I came across your portfolio and would like to connect. " },
];

/** Merge server messages with local ones by id, keeping chronological order. */
function merge(local: Msg[], server: Msg[]): Msg[] {
  const byId = new Map(local.map((m) => [m.id, m]));
  for (const m of server) byId.set(m.id, m);
  return [...byId.values()].sort((a, b) => a.at - b.at);
}

/** Where the visitor came from (external referrer host only, e.g. linkedin.com). */
function referrerHost(): string {
  try {
    const r = document.referrer ? new URL(document.referrer).host : "";
    return r && r !== window.location.host ? r.replace(/^www\./, "") : "";
  } catch {
    return "";
  }
}

const validName = (n?: string) => (n ?? "").trim().length >= 2;

const time = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/**
 * "Chat with me" widget. Messages go to the owner's Slack; replies typed in the
 * Slack thread are polled back and shown here. Falls back to email when the
 * relay is not configured.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<Stored>({ messages: [] });
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [online, setOnline] = useState<boolean | null>(null);
  const [draft, setDraft] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const update = useCallback((fn: (s: Stored) => Stored) => {
    setState((prev) => {
      const next = fn(prev);
      save(next);
      return next;
    });
  }, []);

  // Restore the conversation and learn whether the relay is live.
  useEffect(() => {
    const stored = load();
    const t = window.setTimeout(() => setState({ ...stored, messages: stored.messages ?? [] }), 0);
    fetch("/api/chat")
      .then((r) => r.json())
      .then((j) => setConfigured(j.configured !== false))
      .catch(() => setConfigured(false));
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const check = () =>
      fetch("/api/chat/presence")
        .then((r) => r.json())
        .then((j) => setOnline(typeof j.online === "boolean" ? j.online : null))
        .catch(() => setOnline(null));
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const backoffUntil = useRef(0);
  const poll = useCallback(async () => {
    const token = load().token;
    if (!token || Date.now() < backoffUntil.current) return;
    try {
      const r = await fetch("/api/chat", { cache: "no-store", headers: { "x-chat-token": token } });
      if (r.status === 429) {
        backoffUntil.current = Date.now() + (Number(r.headers.get("retry-after")) || 15) * 1000;
        return;
      }
      if (!r.ok) return;
      const j = await r.json();
      if (Array.isArray(j.messages) && j.messages.length) {
        update((s) => ({ ...s, messages: merge(s.messages, j.messages) }));
      }
    } catch {
      /* offline: keep what we have */
    }
  }, [update]);

  useEffect(() => {
    if (!state.token || configured === false) return;
    const id = window.setInterval(poll, open ? OPEN_POLL_MS : CLOSED_POLL_MS);
    return () => window.clearInterval(id);
  }, [open, state.token, configured, poll]);

  // Opening the panel: refresh, mark replies read, focus the input.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      poll();
      inputRef.current?.focus();
    }, 0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, poll]);

  const ownerCount = state.messages.filter((m) => m.from === "owner").length;
  const unread = open ? 0 : Math.max(0, ownerCount - (state.seen ?? 0));

  useEffect(() => {
    if (open && ownerCount !== (state.seen ?? 0)) {
      const t = window.setTimeout(() => update((s) => ({ ...s, seen: ownerCount })), 0);
      return () => window.clearTimeout(t);
    }
  }, [open, ownerCount, state.seen, update]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [state.messages.length, open]);

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    if (!state.token && !validName(state.name)) {
      setError("Please add your name so I can reply to you properly.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          name: state.name,
          email: state.email,
          company: state.company,
          from: referrerHost(),
          token: state.token,
          website: honeypot,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Couldn't send.");
      if (j.message) {
        update((s) => ({ ...s, token: j.token, messages: merge(s.messages, [j.message]) }));
      }
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send.");
    } finally {
      setSending(false);
    }
  }

  const firstMessage = !state.token;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : online ? "Chat with Rahul (online now)" : "Chat with Rahul"}
        aria-expanded={open}
        className="fixed right-4 bottom-4 z-[60] flex items-center gap-2 rounded-full border border-line bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Chat with me"}</span>
        {online && unread === 0 && !open && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500"
          />
        )}
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Rahul"
          className="fixed inset-x-3 bottom-20 z-[60] flex max-h-[min(34rem,calc(100vh-7rem))] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[23rem]"
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/me.jpeg" alt="" className="h-9 w-9 rounded-full object-cover object-top" />
              {online !== null && (
                <span
                  aria-label={online ? "Online" : "Away"}
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-card ${
                    online ? "bg-emerald-500" : "bg-zinc-400"
                  }`}
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{profile.firstName}</p>
              <p className="text-xs text-faint">
                {configured === false
                  ? "Chat is offline · email works"
                  : online
                    ? "Online now"
                    : "Usually replies within a few hours"}
              </p>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4" aria-live="polite">
            {GREETING.map((g) => (
              <div
                key={g}
                className="max-w-[85%] rounded-2xl rounded-tl-sm bg-accent-soft px-3 py-2 text-sm leading-relaxed text-foreground"
              >
                {g}
              </div>
            ))}
            {firstMessage && configured !== false && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.label}
                    type="button"
                    onClick={() => {
                      setDraft(sug.text);
                      inputRef.current?.focus();
                    }}
                    className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent transition-colors hover:border-accent"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}
            {state.messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.from === "visitor" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.from === "visitor"
                      ? "rounded-tr-sm bg-foreground text-background"
                      : "rounded-tl-sm bg-accent-soft text-foreground"
                  }`}
                >
                  {m.text}
                </div>
                <span className="mt-0.5 text-[10px] text-faint">
                  {m.from === "owner" ? `${profile.firstName} · ` : ""}
                  {time(m.at)}
                </span>
              </div>
            ))}
            {state.messages.length > 0 && !state.messages.some((m) => m.from === "owner") && (
              <p className="text-center text-[11px] text-faint">Sent. I&apos;ll reply here soon.</p>
            )}
          </div>

          {configured === false ? (
            <div className="border-t border-line p-4 text-sm text-muted">
              Live chat isn&apos;t available right now.{" "}
              <a href={`mailto:${profile.email}`} className="font-medium text-accent hover:underline">
                Email me at {profile.email}
              </a>
            </div>
          ) : (
            <form onSubmit={send} className="space-y-2 border-t border-line p-3">
              {firstMessage && (
                <div className="space-y-2">
                  <input
                    value={state.name ?? ""}
                    onChange={(e) => update((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Your name *"
                    aria-label="Your name (required)"
                    aria-required="true"
                    autoComplete="name"
                    maxLength={60}
                    className="w-full rounded-md border border-line bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      value={state.email ?? ""}
                      onChange={(e) => update((s) => ({ ...s, email: e.target.value }))}
                      placeholder="Email (optional)"
                      aria-label="Email (optional)"
                      autoComplete="email"
                      maxLength={120}
                      className="rounded-md border border-line bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    />
                    <input
                      value={state.company ?? ""}
                      onChange={(e) => update((s) => ({ ...s, company: e.target.value }))}
                      placeholder="Company / role (optional)"
                      aria-label="Company or role (optional)"
                      autoComplete="organization"
                      maxLength={80}
                      className="rounded-md border border-line bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                name="website"
              />
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      e.currentTarget.form?.requestSubmit();
                    }
                  }}
                  rows={2}
                  maxLength={1000}
                  placeholder={firstMessage ? "Hi Rahul, I'm hiring for..." : "Write a message"}
                  aria-label="Message"
                  className="min-h-[2.5rem] flex-1 resize-none rounded-md border border-line bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={!draft.trim() || sending || (firstMessage && !validName(state.name))}
                  aria-label="Send"
                  className="grid h-10 w-10 place-items-center rounded-md bg-foreground text-background transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {error ? (
                <p className="text-xs text-red-500">{error}</p>
              ) : (
                <p className="text-[10px] leading-snug text-faint">
                  {firstMessage
                    ? "Your name, message and any details you add go to my private Slack. The chat is saved on this device."
                    : "The chat is saved on this device."}
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </>
  );
}
