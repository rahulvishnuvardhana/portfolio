import { projects } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";

export default function Publications() {
  const pubs = projects.filter((p) => /publication/i.test(p.tag));
  if (pubs.length === 0) return null;

  return (
    <Section id="publications" title="Publications">
      <div className="space-y-6">
        {pubs.map((p, i) => (
          <BlurFade key={p.title} delay={i * 0.05}>
            <article className="grid gap-3 sm:grid-cols-[6rem_1fr] sm:gap-6">
              <div className="pt-1">
                <span className="inline-block rounded-md border border-accent/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-accent">
                  Peer&#8209;Reviewed
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm italic text-muted">
                  International Journal of Engineering Technology and Management
                  Sciences · Vol. 6 · July 2022
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded border border-line px-2 py-0.5 text-[11px] text-faint"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
