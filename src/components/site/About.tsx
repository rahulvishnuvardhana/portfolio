import { about } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";
import CountUp from "./CountUp";

export default function About() {
  const paragraphs = about.paragraphs;

  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-[15px] leading-relaxed text-muted">
        {paragraphs.map((p, i) => (
          <BlurFade key={i} delay={i * 0.05}>
            <p>{p}</p>
          </BlurFade>
        ))}
      </div>

      <BlurFade delay={0.1}>
        <dl className="mt-8 grid grid-cols-3 gap-4">
          {about.stats.map((s) => (
            <div
              key={s.lbl}
              className="rounded-lg border border-line p-4 text-center"
            >
              <dt className="tabular font-mono text-2xl font-bold text-foreground">
                <CountUp value={s.big} />
              </dt>
              <dd className="mt-1 text-xs text-faint">{s.lbl}</dd>
            </div>
          ))}
        </dl>
      </BlurFade>
    </Section>
  );
}
