import { Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <BlurFade>
        <div className="rounded-xl border border-line bg-card p-8 text-center">
          <h3 className="font-serif text-3xl font-semibold text-foreground">
            Let&apos;s build something reliable.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            Open to co-op and full-time roles where ML solves real problems.
            Whether you have an opening, a hard problem, or just want to chat over
            coffee, my inbox is always open.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 lift"
            >
              <Mail className="h-4 w-4" />
              Mail
            </a>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(
                "Coffee chat ☕",
              )}&body=${encodeURIComponent(
                "Hi Rahul,\n\nJust wanted to reach out. Would love to connect whenever you have a moment.\n\n",
              )}`}
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground lift"
            >
              Coffee chat ☕
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground lift"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground lift"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </BlurFade>
    </Section>
  );
}
