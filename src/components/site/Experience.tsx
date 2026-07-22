import { journey } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";

export default function Experience() {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="space-y-8">
        {journey.map((m, i) => (
          <BlurFade key={m.title + m.when} delay={i * 0.05}>
            <div className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <p className="pt-0.5 font-mono text-xs uppercase tracking-wide text-faint">
                {m.when}
              </p>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {m.title}
                </h3>
                <p className="mt-0.5 text-sm text-accent">{m.org}</p>
                {m.bullets && m.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-1.5">
                    {m.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-px shrink-0 select-none text-accent">
                          ▹
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  m.body && (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {m.body}
                    </p>
                  )
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
      </div>
    </Section>
  );
}
