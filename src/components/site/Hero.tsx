import Image from "next/image";
import { FileText, Mail, MessageCircle } from "lucide-react";
import { profile, projectSlug, roleFit } from "@/data/portfolio";
import BlurFade from "./BlurFade";
import AnimatedName from "./AnimatedName";
import OpenChatButton from "./OpenChatButton";
import GlanceTiles from "./GlanceTiles";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";

const base = "lift inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors";
const ghost = `${base} border-line text-muted hover:border-foreground/30 hover:text-foreground`;
const accent = `${base} border-accent/50 text-accent hover:border-accent`;

export default function Hero() {
  return (
    <section id="top" className="relative isolate pt-28 pb-10 sm:pt-36 sm:pb-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <div>
          <BlurFade delay={0.04}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {profile.availability} · {profile.location}
              <span className="text-accent">· Recruiter info</span>
            </a>
          </BlurFade>

          <BlurFade delay={0.08}>
            <p className="shiny-text mt-6 font-mono text-base font-bold tracking-wide sm:text-lg">
              {profile.kicker}
            </p>
          </BlurFade>

          <AnimatedName
            name={profile.name}
            className="name-gradient font-serif text-4xl font-semibold sm:text-6xl"
          />

          <BlurFade delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.role}
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <div className="lift inline-flex items-stretch overflow-hidden rounded-md bg-foreground text-background">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
                <a
                  href="/resume.pdf"
                  download
                  aria-label="Download resume"
                  title="Download resume"
                  className="inline-flex items-center border-l border-background/25 px-2.5 transition-opacity hover:opacity-90"
                >
                  <DownloadIcon className="h-4 w-4" />
                </a>
              </div>
              <OpenChatButton className={accent}>
                <MessageCircle className="h-4 w-4" />
                Chat with me
              </OpenChatButton>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className={ghost}>
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={ghost}>
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.email}`}
                className={`${ghost} px-2.5`}
                aria-label={`Email ${profile.email}`}
                title={profile.email}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </BlurFade>

          <BlurFade delay={0.34}>
            <p className="mt-7 font-mono text-[11px] tracking-wider text-faint uppercase">Where I fit on your team</p>
            <dl className="mt-2 space-y-2 text-sm">
              {roleFit.map((r) => (
                <div key={r.role} className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  <dt className="w-36 shrink-0 font-medium text-foreground">{r.role}</dt>
                  <dd className="flex flex-wrap items-center gap-1.5 text-faint">
                    <span className="mr-0.5 text-xs">proof:</span>
                    {r.proof.map((t) => (
                      <a
                        key={t}
                        href={`#${projectSlug(t)}`}
                        className="rounded-md border border-line px-2 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                      >
                        {t}
                      </a>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </BlurFade>
        </div>

        <BlurFade delay={0.05}>
          <div className="relative mx-auto h-80 w-64 overflow-hidden rounded-2xl border border-line sm:h-[26rem] sm:w-80 lg:mr-0">
            <Image
              src="/me.jpeg"
              alt={profile.name}
              fill
              sizes="(min-width: 640px) 320px, 256px"
              className="origin-top scale-110 object-cover object-top"
              priority
            />
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.35}>
        <GlanceTiles />
      </BlurFade>
    </section>
  );
}
