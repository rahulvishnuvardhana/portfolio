import { projects } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const work = projects.filter((p) => !/publication/i.test(p.tag));

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Proof, not *promises*: live products you can open. Hover any demo to watch it run."
    >
      <div className="space-y-6 sm:space-y-8">
        {work.map((p, i) => (
          <BlurFade key={p.title} delay={0.04}>
            <ProjectCard project={p} index={i} featured={i === 0} />
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
