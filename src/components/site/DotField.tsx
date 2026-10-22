"use client";

import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "@/components/site/usePrefersReducedMotion";

const GAP = 26; // px between dots
const RADIUS = 160; // cursor influence radius

/**
 * Kendor-style background: a faint fixed dot grid; dots near the cursor swell and take
 * the accent color. Redraws only while the influence is changing, so it idles at 0 CPU.
 */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999, s: 0 }; // s = strength 0..1
    let target = 0;

    const css = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    function draw() {
      const base = css("--faint", "#71717a");
      const accent = css("--accent", "#6d28d9");
      ctx!.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const d = Math.hypot(x - eased.x, y - eased.y);
          const k = eased.s * Math.max(0, 1 - d / RADIUS);
          ctx!.globalAlpha = 0.22 + 0.6 * k;
          ctx!.fillStyle = k > 0.05 ? accent : base;
          ctx!.beginPath();
          ctx!.arc(x, y, 0.9 + 2.4 * k * k, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    const tick = () => {
      eased.x += (mouse.x - eased.x) * 0.2;
      eased.y += (mouse.y - eased.y) * 0.2;
      eased.s += (target - eased.s) * 0.12;
      draw();
      const moving = Math.abs(mouse.x - eased.x) + Math.abs(mouse.y - eased.y) > 0.5 || Math.abs(target - eased.s) > 0.01;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduceMotion) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (eased.s < 0.01) {
        eased.x = mouse.x;
        eased.y = mouse.y;
      }
      target = 1;
      kick();
    };
    const onLeave = () => {
      target = 0;
      kick();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    const mo = new MutationObserver(draw); // theme toggle changes the dot colors
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      mo.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
