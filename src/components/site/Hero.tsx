import Image from "next/image";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import BlurFade from "./BlurFade";
import AnimatedName from "./AnimatedName";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex flex-col-reverse items-start gap-10 pt-28 pb-6 sm:flex-row sm:items-center sm:pt-32"
    >
      <div className="flex-1">
        <BlurFade delay={0.08}>
          <p className="shiny-text mb-3 font-mono text-base font-bold tracking-wide sm:text-lg">
            {profile.kicker}
          </p>
        </BlurFade>

        <AnimatedName
          name={profile.name}
          className="name-gradient font-serif text-4xl font-semibold sm:text-5xl"
        />

        <BlurFade delay={0.2}>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {profile.role}
          </p>
        </BlurFade>

        <BlurFade delay={0.24}>
          <div className="mt-3 text-sm text-faint">
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
            <p className="mt-0.5">{profile.location}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="mt-8 flex flex-nowrap items-center gap-2">
          <div className="lift inline-flex items-stretch overflow-hidden rounded-md bg-foreground text-background">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-opacity hover:opacity-90"
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
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground lift"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground lift"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground lift"
          >
            <Mail className="h-4 w-4" />
            Email
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={0.05}>
        <div className="relative h-56 w-44 shrink-0 overflow-hidden rounded-xl border border-line sm:ml-auto sm:h-72 sm:w-56">
          <Image
            src="/me.jpeg"
            alt={profile.name}
            fill
            sizes="224px"
            className="origin-top scale-110 object-cover object-top"
            priority
          />
        </div>
      </BlurFade>
    </section>
  );
}
