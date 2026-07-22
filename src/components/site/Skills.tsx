import { skills } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((col, i) => (
          <BlurFade key={col.title} delay={i * 0.05}>
            <div>
              <h3 className="mb-3 text-sm font-bold text-foreground">
                {col.title}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {col.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-md border border-line bg-card px-2.5 py-1 text-xs text-muted"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
