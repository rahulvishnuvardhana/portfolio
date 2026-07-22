import type { ReactNode } from "react";
import BlurFade from "./BlurFade";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** Consistent section shell: anchor id, generous vertical rhythm, quiet heading. */
export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-7 sm:py-8">
      <BlurFade>
        <h2 className="mb-6 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-accent">
          <span className="h-px flex-1 bg-accent/50" />
          <span>{title}</span>
          <span className="h-px flex-1 bg-accent/50" />
        </h2>
      </BlurFade>
      {children}
    </section>
  );
}
