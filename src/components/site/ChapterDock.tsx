"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "publications", label: "Research" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/**
 * Kendor-style floating chapter dock: appears after the hero, highlights the section in
 * view, and shows how far through the page the reader is.
 */
export default function ChapterDock() {
  const [active, setActive] = useState("");
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShown(window.scrollY > window.innerHeight * 0.6);
      // the chapter whose top most recently passed 40% of the viewport
      let current = "";
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (el && el.offsetParent !== null && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const index = CHAPTERS.findIndex((c) => c.id === active);

  return (
    <nav
      aria-label="Chapters"
      className={`fixed bottom-5 left-1/2 z-[55] hidden -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-card/90 p-1 text-xs shadow-lg backdrop-blur transition-all duration-500 md:flex ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="px-3 font-mono text-[10px] tracking-wider text-faint uppercase tabular">
        {String(Math.max(index + 1, 0)).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")} ·{" "}
        {Math.round(progress * 100)}%
      </span>
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
            active === c.id ? "bg-foreground text-background" : "text-muted hover:text-foreground"
          }`}
        >
          {c.label}
        </a>
      ))}
    </nav>
  );
}
