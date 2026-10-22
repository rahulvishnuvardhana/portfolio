import { Mail, MessageCircle } from "lucide-react";
import OpenChatButton from "./OpenChatButton";
import { profile, recruiterFacts } from "@/data/portfolio";
import Section from "./Section";
import BlurFade from "./BlurFade";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <BlurFade>
        <div className="rounded-2xl border border-line bg-card p-8 text-center sm:p-12">
          <h3 className="font-serif text-3xl font-semibold text-foreground">
            Hiring for a Spring 2027 co-op? Let&apos;s talk.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            I&apos;m looking for an ML, AI / LLM, or software engineering co-op. Message me here or by
            email and I&apos;ll usually reply within a few hours.
          </p>
          <dl className="mx-auto mt-6 grid max-w-2xl gap-px overflow-hidden rounded-xl border border-line bg-line text-left sm:grid-cols-2">
            {recruiterFacts.map((f) => (
              <div key={f.label} className="bg-card px-4 py-3">
                <dt className="font-mono text-[10px] tracking-wider text-faint uppercase">{f.label}</dt>
                <dd className="mt-0.5 text-sm text-foreground">{f.value}</dd>
              </div>
            ))}
            <div className="bg-card px-4 py-3">
              <dt className="font-mono text-[10px] tracking-wider text-faint uppercase">Resume</dt>
              <dd className="mt-0.5 text-sm">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                  View or download (PDF)
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 lift"
            >
              <Mail className="h-4 w-4" />
              Mail
            </a>
            <OpenChatButton className="inline-flex items-center gap-2 rounded-md border border-accent/50 px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-accent lift">
              <MessageCircle className="h-4 w-4" />
              Chat with me
            </OpenChatButton>
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
