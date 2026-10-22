"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Product = { id: string; name: string; url: string; state: "online" | "sleeping" | "down"; ms: number | null };

const PAPER_URL = "https://ijetms.in/Vol-6-issue-4/Vol-6-Issue-4-47.pdf";

const tile =
  "group relative flex h-full flex-col rounded-xl border border-line bg-card p-4 text-left transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_18px_40px_-28px_var(--accent)] focus-visible:outline-2 focus-visible:outline-accent sm:p-5";
const big = "tabular font-serif text-2xl font-semibold text-foreground sm:text-3xl";
const small = "mt-1 text-xs leading-snug text-faint sm:text-sm";

function StatusDot({ state }: { state?: Product["state"] }) {
  const color =
    state === "online" ? "bg-emerald-500" : state === "sleeping" ? "bg-amber-400" : state === "down" ? "bg-red-500" : "bg-zinc-400";
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {state === "online" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

/**
 * Hero "at a glance" strip as live buttons: education and career tiles jump to the
 * timeline and reveal detail on hover, the live tile shows real uptime of each product,
 * and the publication tile opens the paper.
 */
export default function GlanceTiles() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/status")
        .then((r) => r.json())
        .then((j) => alive && setProducts(j.products))
        .catch(() => alive && setProducts([]));
    load();
    const id = window.setInterval(load, 5 * 60 * 1000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const online = products?.filter((p) => p.state === "online").length ?? 0;
  const liveLine =
    products === null
      ? "Checking status…"
      : products.length === 0
        ? "Deployed products you can try"
        : online === products.length
          ? `All ${online} online right now`
          : `${online} of ${products.length} online right now`;

  return (
    <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* Education */}
      <a href="#experience" className={tile}>
        <span className={big}>M.S. ECE</span>
        <span className={small}>Northeastern University · GPA 3.8</span>
        <span className="mt-auto grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
          <span className="overflow-hidden">
            <span className="block pt-3 text-[11px] leading-relaxed text-muted">
              Hardware and Software in Machine Intelligence
              <br />
              ML · LLMs · Reinforcement Learning
            </span>
          </span>
        </span>
      </a>

      {/* Career */}
      <a href="#experience" className={tile}>
        <span className={big}>3+ yrs</span>
        <span className={small}>Data engineering at Brown Brothers Harriman · incidents resolved 50% faster</span>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-accent">
          View timeline
          <ArrowUpRight className="h-3.5 w-3.5 rotate-90 transition-transform group-hover:translate-y-0.5" />
        </span>
      </a>

      {/* Live products */}
      <div className={`${tile} hover:translate-y-0`}>
        <span className={big}>3 live</span>
        <span className={small}>{liveLine}</span>
        <ul className="mt-3 space-y-1.5">
          {(products && products.length ? products : [{ id: "traceop", name: "TraceOp" }, { id: "leo", name: "LEO" }, { id: "ghilli", name: "BayState Ghilli" }]).map((p) => {
            const prod = p as Partial<Product> & { id: string; name: string };
            const note =
              prod.state === "online" ? `${prod.ms} ms` : prod.state === "sleeping" ? "asleep, wakes in ~1 min" : prod.state === "down" ? "unreachable" : "";
            return (
              <li key={prod.id}>
                <a
                  href={prod.url ?? "#projects"}
                  target={prod.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-1.5 py-1 text-xs text-foreground transition-colors hover:bg-accent-soft"
                >
                  <StatusDot state={prod.state} />
                  <span className="font-medium">{prod.name}</span>
                  <span className="ml-auto font-mono text-[10px] text-faint">{note}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Publication */}
      <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className={tile}>
        <span className={big}>1</span>
        <span className={small}>Peer-reviewed publication</span>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-accent">
          Read the paper
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
    </div>
  );
}
