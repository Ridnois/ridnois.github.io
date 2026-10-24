import { Download, Mail } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { Reveal } from "@/components/section-primitives";
import { buttonVariants } from "@/components/ui/button";
import { AGENT_PROMPT, CONTACT_MAILTO, MACHINE_ENDPOINTS, PROFILE } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const CURL = `curl -s ${PROFILE.siteUrl}/resume.json | jq '.work[] | {name, position}'`;

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
      <Reveal className="flex max-w-3xl flex-col gap-3">
        <p className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
          <span className="text-brand">05</span> / Contact
        </p>
        <h2 className="font-heading text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Have something hard to build?
        </h2>
        <p className="text-lg text-pretty text-muted-foreground">
          I&apos;m open to new roles and ambitious projects. Two ways in, depending on who (or what) is reading.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full min-w-0">
          <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-background p-5 sm:p-7">
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-2xl font-medium">For humans</h3>
              <p className="text-base text-muted-foreground">
                One click opens an email with the questions I need answered: role, stack, team and timeline.
              </p>
            </div>
            <a
              href={CONTACT_MAILTO}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-auto min-h-14 w-full gap-2 px-4 py-3 text-base break-all whitespace-normal sm:text-lg"
              )}
            >
              <Mail className="size-5 shrink-0" />
              <span>Email {PROFILE.email}</span>
            </a>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={PROFILE.email} label="Copy email" />
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-9 gap-2 px-3 text-sm")}
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-9 gap-2 px-3 text-sm")}
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
              <a
                href="/resume.pdf"
                download
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-9 gap-2 px-3 text-sm")}
              >
                <Download className="size-4" />
                Resume PDF
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="h-full min-w-0">
          <div className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-foreground p-5 text-background sm:p-7">
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-2xl font-medium">For machines &amp; agents</h3>
              <p className="text-base opacity-70">
                Screening with a script, an ATS or an LLM? Everything here is structured and generated from the same data as this page.
              </p>
            </div>
            <ul className="flex flex-col font-mono text-sm">
              {MACHINE_ENDPOINTS.map((e) => (
                <li key={e.path} className="border-b border-background/15 last:border-0">
                  <a
                    href={e.path}
                    className="flex flex-col gap-0.5 py-2 hover:text-brand-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span>{e.path}</span>
                    <span className="text-xs opacity-60">{e.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <pre className="overflow-x-auto rounded-lg bg-background/10 p-3 font-mono text-xs leading-relaxed">
              <code>{CURL}</code>
            </pre>
            <div className="flex flex-wrap gap-2 text-foreground">
              <CopyButton text={CURL} label="Copy curl" />
              <CopyButton text={AGENT_PROMPT} label="Copy prompt for your AI screener" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
