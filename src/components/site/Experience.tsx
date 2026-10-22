import { journey } from "@/data/portfolio";
import Section from "@/components/site/Section";
import BlurFade from "@/components/site/BlurFade";

/** Monogram tile per organization (brand-neutral, so no logo licensing questions). */
function monogram(org: string) {
  if (/Northeastern/i.test(org)) return "N";
  if (/Hexaware/i.test(org)) return "H";
  if (/Sairam/i.test(org)) return "S";
  return org.trim().charAt(0).toUpperCase();
}

/** Experience as a vertical timeline with an organization tile beside each role. */
export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience & Education"
      subtitle="3+ years keeping a global bank's data pipelines *running*, now an M.S. in machine intelligence."
    >
      <ol className="relative max-w-4xl">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line" />
        {journey.map((m, i) => (
          <BlurFade key={m.title + m.when} delay={i * 0.05} as="li">
            <div className="group relative grid grid-cols-[2.75rem_1fr] gap-4 pb-10 sm:gap-6">
              <div className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border border-line bg-card font-serif text-lg font-semibold text-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                {monogram(m.org)}
              </div>
              <div className="rounded-xl border border-transparent p-1 transition-colors sm:-mt-1 sm:p-3 group-hover:border-line group-hover:bg-card">
                <p className="font-mono text-[11px] tracking-wide text-faint uppercase">{m.when}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">{m.title}</h3>
                <p className="mt-0.5 text-sm text-accent">{m.org}</p>
                {m.roles && (
                  <ol className="mt-3 flex flex-wrap gap-2">
                    {m.roles.map((r, ri) => (
                      <li
                        key={r.title}
                        className={`rounded-md border px-2.5 py-1 text-xs ${
                          ri === 0 ? "border-accent/50 text-foreground" : "border-line text-muted"
                        }`}
                      >
                        <span className="font-medium">{r.title}</span>
                        <span className="ml-2 font-mono text-[10px] text-faint">{r.when}</span>
                      </li>
                    ))}
                  </ol>
                )}
                {m.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <span className="mt-px shrink-0 text-accent select-none">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {m.courses && m.courses.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-faint">
                    {m.courses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </BlurFade>
        ))}
      </ol>
    </Section>
  );
}
