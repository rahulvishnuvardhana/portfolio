"use client";

import { useEffect, useState } from "react";

const R1 = () => (
  <>
    R<span className="text-sm align-top">1</span>
  </>
);

/**
 * "R1" brand mark that doubles as the light/dark theme switch.
 * Keeps the recolored Solo-Leveling glitch (stacked spans, dedup-proof).
 */
export default function GlitchLogo() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore storage errors (private mode) */
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle theme"
      className="glitch-logo-wrap cursor-pointer font-mono text-2xl font-bold leading-none tracking-tight text-accent"
    >
      <span className="relative z-10">
        <R1 />
      </span>
      <span aria-hidden className="glitch-layer glitch-layer-a">
        <R1 />
      </span>
      <span aria-hidden className="glitch-layer glitch-layer-b">
        <R1 />
      </span>
    </button>
  );
}
