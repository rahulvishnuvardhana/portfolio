import { NextResponse } from "next/server";

/**
 * Live status of the deployed projects for the hero's "3 live" tile.
 * Each site is checked at most once per TTL; Render's free tier sleeps when idle, so a
 * timeout there is reported as "sleeping" (and the request itself wakes it up).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TARGETS = [
  { id: "traceop", name: "TraceOp", url: "https://v0-traceop.vercel.app", sleeps: false },
  { id: "leo", name: "LEO", url: "https://leo-api-intelligence.onrender.com", sleeps: true },
  { id: "ghilli", name: "BayState Ghilli", url: "https://baystateghilli.vercel.app", sleeps: false },
];
const TTL_MS = 5 * 60 * 1000;
const TIMEOUT_MS = 6000;

export type ProductStatus = {
  id: string;
  name: string;
  url: string;
  state: "online" | "sleeping" | "down";
  ms: number | null;
};

let cache: { at: number; data: ProductStatus[] } | null = null;

async function check(t: (typeof TARGETS)[number]): Promise<ProductStatus> {
  const started = Date.now();
  try {
    const res = await fetch(t.url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "User-Agent": "portfolio-status-check" },
    });
    const ms = Date.now() - started;
    return { id: t.id, name: t.name, url: t.url, state: res.ok ? "online" : "down", ms: res.ok ? ms : null };
  } catch {
    return { id: t.id, name: t.name, url: t.url, state: t.sleeps ? "sleeping" : "down", ms: null };
  }
}

export async function GET() {
  if (!cache || Date.now() - cache.at > TTL_MS) {
    cache = { at: Date.now(), data: await Promise.all(TARGETS.map(check)) };
  }
  return NextResponse.json(
    { checkedAt: cache.at, products: cache.data },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}
