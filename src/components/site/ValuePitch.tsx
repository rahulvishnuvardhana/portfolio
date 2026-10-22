import { pitch } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";

/** Pitch-deck "why hire" slide: three things a team gets, each tied to proof on the page. */
export default function ValuePitch() {
  return (
    <Section id="value" title="What your team gets" subtitle="Three things I bring to an ML or AI team, each backed by *work* on this page.">
      <div className="grid gap-4 md:grid-cols-3">
        {pitch.map((v, i) => (
          <BlurFade key={v.title} delay={i * 0.06} className="h-full">
            <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-accent/50">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
              <p className="mt-auto flex flex-wrap items-center gap-1.5 pt-5 text-xs text-faint">
                See it in
                {v.proof.map((pr) => (
                  <a
                    key={pr.label}
                    href={pr.href}
                    className="rounded-md border border-line px-2 py-0.5 text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {pr.label}
                  </a>
                ))}
              </p>
            </article>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
