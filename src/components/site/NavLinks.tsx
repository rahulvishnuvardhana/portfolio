"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function NavLinks() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden items-center gap-6 text-sm text-muted sm:flex">
      {links.map((l) => {
        const isActive = active === l.href.slice(1);
        return (
          <a
            key={l.href}
            href={l.href}
            className={`group relative transition-colors hover:text-foreground ${
              isActive ? "text-accent" : ""
            }`}
          >
            {l.label}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}
