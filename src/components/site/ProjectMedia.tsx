"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ProjectMediaProps = {
  /** whether the parent card is hovered / focused / tapped */
  active: boolean;
  /** user prefers reduced motion: show the poster in color, never autoplay */
  reduceMotion: boolean;
  title: string;
  poster?: string;
  video?: string;
  alt?: string;
  /** code-drawn preview used instead of a recording */
  children?: ReactNode;
  onToggle: () => void;
};

/**
 * 16:9 preview panel: a desaturated poster that comes alive on hover,
 * a screen recording that loads only on first activation, and a thin
 * progress bar that tracks playback.
 */
export default function ProjectMedia({
  active,
  reduceMotion,
  title,
  poster,
  video,
  alt,
  children,
  onToggle,
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(video) && !reduceMotion;

  // Attach the video source lazily, on first activation only
  // (state adjusted during render, so no extra effect pass).
  if (active && canPlay && !armed) setArmed(true);
  const src = armed ? video : undefined;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    if (active) {
      v.play().catch(() => {});
      return;
    }
    v.pause();
    // Rewind after the fade-out so the next hover starts from the top.
    const t = window.setTimeout(() => {
      v.currentTime = 0;
      if (barRef.current) barRef.current.style.transform = "scaleX(0)";
    }, 450);
    return () => window.clearTimeout(t);
  }, [active, src]);

  // Drive the progress bar from the video clock while playing.
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration && barRef.current) {
        barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const live = active && (playing || !video);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={`${active ? "Pause" : "Play"} preview of ${title}`}
      className="relative block aspect-video w-full overflow-hidden rounded-xl border border-line bg-[#0b0b10] text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={alt ?? `${title} preview`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-[filter,opacity,transform] duration-700 ease-out ${
            active || reduceMotion
              ? "scale-[1.03] opacity-100 grayscale-0"
              : "opacity-75 grayscale"
          }`}
        />
      )}

      {children && (
        <div
          className={`absolute inset-0 transition-[filter,opacity] duration-700 ${
            active || reduceMotion ? "opacity-100 grayscale-0" : "opacity-80 grayscale"
          }`}
        >
          {children}
        </div>
      )}

      {src && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full scale-[1.03] object-cover transition-opacity duration-500 ${
            playing && active ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      <span className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-white/85 uppercase backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          {live && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
          )}
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              live ? "bg-red-500" : "bg-white/70"
            }`}
          />
        </span>
        {live ? (
          video ? "Live demo" : "Simulating"
        ) : (
          <>
            <span className="hidden pointer-fine:inline">Hover to preview</span>
            <span className="pointer-fine:hidden">Tap to preview</span>
          </>
        )}
      </span>

      {video && !reduceMotion && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      )}
    </button>
  );
}
