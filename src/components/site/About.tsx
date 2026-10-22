import { about } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted">
        {about.paragraphs.map((p, i) => (
          <BlurFade key={i} delay={i * 0.05}>
            <p>{p}</p>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
