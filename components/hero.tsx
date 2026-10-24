import { ArrowDown, Download, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { Reveal } from "@/components/section-primitives";
import { OpenToWorkBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { CAPABILITIES, CONTACT_MAILTO, PROFILE, STATS } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const ctaSize = "h-11 gap-2 px-5 text-base";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden className="page-backdrop absolute inset-0 -z-10" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-16 pb-20 sm:pt-24 lg:px-10 lg:pt-28">
        <Reveal className="flex flex-col gap-6">
          <OpenToWorkBadge />
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-6xl leading-[0.95] font-medium tracking-tight sm:text-7xl lg:text-8xl">
              {PROFILE.brand}
            </h1>
            <p className="text-lg font-medium text-muted-foreground sm:text-xl">
              {PROFILE.name} · {PROFILE.role}
            </p>
          </div>
          <p className="font-heading max-w-3xl text-2xl leading-snug font-normal text-balance text-foreground sm:text-3xl lg:text-4xl">
            {PROFILE.headline}
          </p>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{PROFILE.pitch}</p>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap items-center gap-3">
          <a href={CONTACT_MAILTO} className={cn(buttonVariants({ size: "lg" }), ctaSize)}>
            <Mail />
            Email me
          </a>
          <a
            href="/resume.pdf"
            download
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), ctaSize)}
          >
            <Download />
            Resume
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "size-11 [&_svg]:size-5")}
          >
            <GithubIcon />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "size-11 [&_svg]:size-5")}
          >
            <LinkedinIcon />
          </a>
        </Reveal>

        <Reveal
          delay={0.2}
          className="flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <ul aria-label="Capabilities" className="flex max-w-2xl flex-wrap gap-2">
            {CAPABILITIES.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-sm font-medium text-foreground"
              >
                {capability}
              </li>
            ))}
          </ul>
          <dl className="flex gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="font-heading text-4xl font-medium tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <a
          href="#work"
          className="flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowDown className="size-4 motion-safe:animate-bounce" />
          See the work
        </a>
      </div>
    </section>
  );
}
