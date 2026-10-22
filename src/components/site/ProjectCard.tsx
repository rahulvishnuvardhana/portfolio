"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { projectSlug, type Project } from "@/data/portfolio";
import { GithubIcon } from "./icons";
import ProjectMedia from "./ProjectMedia";
import TrajectoryPreview from "./TrajectoryPreview";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

const MAX_TILT = 3; // degrees, applied to the demo panel only

function LinkPill({ label, href }: { label: string; href: string }) {
  const isRepo = /github/i.test(label);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {isRepo ? <GithubIcon className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
      {label}
    </a>
  );
}

/**
 * Case-study row: live demo on one side, a scannable pitch on the other.
 * Mouse hover (anywhere on the row) plays the demo; tap or keyboard toggles it.
 */
export default function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  // Mouse previews follow hover; click/tap toggles only for touch and keyboard.
  const lastInput = useRef<string>("keyboard");
  const hasPreview = Boolean(project.media || project.preview);
  const reverse = index % 2 === 1;

  // Pause anything left playing (e.g. a tapped row) once it scrolls away.
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const io = new IntersectionObserver(
      ([entry]) => !entry.isIntersecting && setActive(false),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const setVars = (vars: Record<string, string>) => {
    const el = ref.current;
    if (!el) return;
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setVars({ "--mx": `${px * 100}%`, "--my": `${py * 100}%` });
    if (!reduceMotion) {
      setVars({
        "--rx": `${(0.5 - py) * MAX_TILT * 2}deg`,
        "--ry": `${(px - 0.5) * MAX_TILT * 2}deg`,
      });
    }
  };

  const onPointerLeave = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    setActive(false);
    setVars({ "--rx": "0deg", "--ry": "0deg" });
  };

  return (
    <article
      ref={ref}
      id={projectSlug(project.title)}
      data-active={active}
      onPointerDown={(e) => (lastInput.current = e.pointerType)}
      onKeyDown={() => (lastInput.current = "keyboard")}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`project-card relative grid items-center gap-6 overflow-hidden rounded-2xl border border-line bg-card p-4 sm:p-6 lg:gap-10 ${
        hasPreview ? "lg:grid-cols-[1.2fr_1fr]" : ""
      } ${
        featured ? "border-beam" : ""
      }`}
    >
      <div aria-hidden="true" className="project-spotlight" />

      {hasPreview && (
        <div className={`project-tilt relative ${reverse ? "lg:order-2" : ""}`}>
          <ProjectMedia
            active={active}
            reduceMotion={reduceMotion}
            title={project.title}
            poster={project.media?.poster}
            video={project.media?.video}
            alt={project.media?.alt}
            onToggle={() => {
              if (lastInput.current !== "mouse") setActive((a) => !a);
            }}
          >
            {project.preview === "trajectory" ? (
              <TrajectoryPreview active={active && !reduceMotion} />
            ) : undefined}
          </ProjectMedia>
        </div>
      )}

      <div className="relative">
        <p className="font-mono text-[11px] tracking-wide text-accent uppercase">{project.tag}</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
          {project.title}
        </h3>
        {project.accent && <p className="mt-1 text-sm text-muted">{project.accent}</p>}

        {project.summary && (
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{project.summary}</p>
        )}

        {project.outcomes && (
          <ul className="mt-4 space-y-2">
            {project.outcomes.map((o) => (
              <li key={o} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded border border-line px-2 py-0.5 text-[11px] text-faint">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.links?.map((l) => <LinkPill key={l.href} label={l.label} href={l.href} />)}
          <details className="group/details relative z-10 basis-full">
            <summary className="mt-1 inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-accent hover:underline">
              <span className="group-open/details:hidden">More details</span>
              <span className="hidden group-open/details:inline">Less</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
          </details>
        </div>
      </div>
    </article>
  );
}
