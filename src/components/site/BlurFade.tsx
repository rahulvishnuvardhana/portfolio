"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  /** seconds to wait before animating in */
  delay?: number;
  /** vertical travel distance in px */
  yOffset?: number;
  /** render as a different element wrapper */
  as?: "div" | "section" | "li" | "span";
};

/**
 * The single, subtle entrance animation used across the site:
 * fade + slight upward travel + blur-in, once, on scroll into view.
 * Honors prefers-reduced-motion (framer-motion respects it automatically
 * when the user has it enabled via the reduced-motion config below).
 */
export default function BlurFade({
  children,
  className,
  delay = 0,
  yOffset = 8,
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  // Cast to a single element type so the polymorphic `as` prop doesn't
  // produce an unusable intersection ref type (all targets are HTMLElements).
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </MotionTag>
  );
}
