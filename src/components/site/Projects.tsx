import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";
import { GithubIcon } from "./icons";

function LinkPill({ label, href }: { label: string; href: string }) {
  const isRepo = /github/i.test(label);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {isRepo ? (
        <GithubIcon className="h-3.5 w-3.5" />
      ) : (
        <ArrowUpRight className="h-3.5 w-3.5" />
      )}
      {label}
    </a>
  );
}

function ProjectCard({
  project,
  flagship = false,
}: {
  project: Project;
  flagship?: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-foreground/20 ${
        flagship ? "border-beam" : ""
      }`}
    >
      <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
        {project.tag}
      </p>
      <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
        {project.title}
        {project.accent && (
          <span className="block text-sm font-normal text-muted">
            {project.accent}
          </span>
        )}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {flagship && project.highlights && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="tabular rounded-md border border-accent/40 px-2 py-1 font-mono text-xs text-accent"
            >
              {h}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li
            key={s}
            className="rounded border border-line px-2 py-0.5 text-[11px] text-faint"
          >
            {s}
          </li>
        ))}
      </ul>

      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 pt-1">
          {project.links.map((l) => (
            <LinkPill key={l.href} label={l.label} href={l.href} />
          ))}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const work = projects.filter((p) => !/publication/i.test(p.tag));
  const [flagship, ...rest] = work;

  return (
    <Section id="projects" title="Projects">
      <div className="space-y-4">
        {flagship && (
          <BlurFade>
            <ProjectCard project={flagship} flagship />
          </BlurFade>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((p, i) => (
            <BlurFade key={p.title} delay={i * 0.06}>
              <ProjectCard project={p} />
            </BlurFade>
          ))}
        </div>
      </div>
    </Section>
  );
}
