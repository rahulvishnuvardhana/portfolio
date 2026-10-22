import type { ReactNode } from "react";
import BlurFade from "./BlurFade";

/** Split "Built and *shipped*." into words; *word* marks an accent word. */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const accent = /^\*.*\*[.,!?]?$/.test(w);
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} className={`reveal-word${accent ? " accent-word" : ""}`} style={{ ["--i" as string]: i }}>
            {clean}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

type SectionProps = {
  id: string;
  title: string;
  /** one line under the heading that tells a skimming reader what this section proves */
  subtitle?: string;
  children: ReactNode;
};

/** Consistent section shell: anchor id, generous vertical rhythm, left-aligned heading. */
export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-12 sm:py-16">
      <BlurFade>
        <div className="mb-8 sm:mb-10">
          <h2 className="flex items-center gap-4 font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase">
            <span>{title}</span>
            <span className="h-px flex-1 bg-line" />
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl font-serif text-2xl leading-snug text-foreground sm:text-3xl">
              <Words text={subtitle} />
            </p>
          )}
        </div>
      </BlurFade>
      {children}
    </section>
  );
}
