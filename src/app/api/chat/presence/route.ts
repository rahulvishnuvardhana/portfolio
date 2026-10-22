import { NextResponse } from "next/server";

/**
 * Owner's Slack presence for the chat widget's green dot.
 * Needs the bot scope users:read and SLACK_OWNER_ID (your Slack member ID).
 * Returns { online: null } when not configured, so the widget simply hides the dot.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN = process.env.SLACK_BOT_TOKEN;
const OWNER = process.env.SLACK_OWNER_ID;
const API = process.env.SLACK_API_BASE || "https://slack.com/api";
const TTL_MS = 60_000;

let cache: { at: number; online: boolean | null } | null = null;

export async function GET() {
  if (!TOKEN || !OWNER) return NextResponse.json({ online: null });
  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json({ online: cache.online }, { headers: { "Cache-Control": "public, s-maxage=60" } });
  }
  try {
    const res = await fetch(`${API}/users.getPresence?user=${encodeURIComponent(OWNER)}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: "no-store",
    });
    const json = await res.json();
    const online = json.ok ? json.presence === "active" : null;
    if (!json.ok) console.error("slack users.getPresence:", json.error);
    cache = { at: Date.now(), online };
    return NextResponse.json({ online }, { headers: { "Cache-Control": "public, s-maxage=60" } });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ online: null });
  }
}
