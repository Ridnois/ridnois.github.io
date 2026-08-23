"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { SceneCanvas } from "@/components/scene/scene-canvas";
import { OpenToWorkBadge } from "@/components/status-badge";
import { Eyebrow, ScrollCue } from "@/components/section-primitives";
import { ScrollScrub } from "@/components/scroll-scrub";
import { ToolsMarquee } from "@/components/badge-marquee";
import { cn } from "@/lib/utils";
import {
  EDUCATION,
  EXPERIENCE,
  INTERESTS,
  LANGUAGES,
  PROFILE,
  SKILLS,
  STATS,
  WHY_HIRE_ME,
} from "@/lib/resume-data";
import { ARTIST_CONTENT, DEV_CONTENT, HUMAN_CONTENT } from "@/lib/persona-data";
import { TOOL_CATEGORIES } from "@/lib/tools-data";

const PERSONAS = [
  { href: "/dev", ...DEV_CONTENT },
  { href: "/3d-artist", ...ARTIST_CONTENT },
  { href: "/human", ...HUMAN_CONTENT },
];

const SECTION_IDS = ["hero", "experience", "tools", "why", "more", "contact"];

const contactLinks = [
  { label: "GitHub", href: PROFILE.github, icon: GithubIcon },
  { label: "LinkedIn", href: PROFILE.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${PROFILE.email}`, icon: Mail },
];

export function Resume() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroExitRange = 1 / SECTION_IDS.length;
  const heroOpacity = useTransform(scrollYProgress, [0, heroExitRange], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, heroExitRange], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, heroExitRange], [1, 0.94]);

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed inset-0 -z-20">
        <SceneCanvas scrollProgress={scrollYProgress} />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/45 to-background/90 sm:from-background/55 sm:via-background/10 sm:to-background/65" />

      <section
        id="hero"
        className="flex min-h-screen flex-col justify-center px-6 lg:px-10"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="flex w-full max-w-2xl flex-col gap-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="h-6 w-fit px-3 text-sm">
              {PROFILE.role}
            </Badge>
            <OpenToWorkBadge />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-7xl leading-[0.9] font-semibold tracking-tight text-foreground sm:text-9xl">
              {PROFILE.brand}
            </h1>
            <p className="font-body text-xl font-semibold tracking-tight text-foreground/70 sm:text-2xl">
              {PROFILE.name} — {PROFILE.role}
            </p>
          </div>
          <p className="font-body max-w-md text-xl font-semibold tracking-tight text-balance text-muted-foreground sm:text-2xl">
            {PROFILE.tagline}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="font-body max-w-md text-base font-semibold tracking-tight text-balance text-muted-foreground/80">
            Shipped production Next.js apps for Disney, UNICEF, LATAM
            Airlines &amp; British Airways as a frontend engineer at
            Globant.
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <Badge key={skill} variant="secondary" className="h-6 px-3 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-lg",
                })}
              >
                <Icon className="size-5" />
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 px-5 text-base"
              )}
            >
              <Download className="size-5" />
              Resume
            </a>
          </div>
        </motion.div>

        <ScrollCue targetId="experience" />
      </section>

      <section
        id="experience"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-16 px-6 py-24 lg:px-10"
      >
        <ScrollScrub>
          <Eyebrow>Experience</Eyebrow>
        </ScrollScrub>

        <div className="flex flex-col gap-20">
          {EXPERIENCE.map((job) => (
            <ScrollScrub key={job.company}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {job.company}
                  </h2>
                  <span className="text-base text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <Badge variant="outline" className="h-6 w-fit px-3 text-sm">
                  {job.role}
                </Badge>
                <p className="font-body max-w-2xl text-xl font-semibold tracking-tight text-balance text-foreground/80 sm:text-2xl">
                  {job.highlight}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="h-6 px-3 text-sm"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollScrub>
          ))}
        </div>
      </section>

      <section
        id="tools"
        className="flex min-h-[45vh] w-full flex-col justify-center gap-8 px-6 py-16 lg:px-10"
      >
        <div className="mx-auto w-full max-w-2xl">
          <ScrollScrub>
            <Eyebrow>Toolset</Eyebrow>
          </ScrollScrub>
        </div>
        <ScrollScrub className="w-full">
          <ToolsMarquee categories={TOOL_CATEGORIES} />
        </ScrollScrub>
      </section>

      <section
        id="why"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-0 px-6 py-24 lg:px-10"
      >
        <ScrollScrub>
          <Eyebrow>Why</Eyebrow>
        </ScrollScrub>
        <ScrollScrub>
          <h2 className="font-heading mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            {WHY_HIRE_ME.title}
          </h2>
        </ScrollScrub>
        <ScrollScrub>
          <p className="font-body mt-4 max-w-2xl text-xl font-semibold tracking-tight text-balance text-foreground/80 sm:text-2xl">
            {WHY_HIRE_ME.body}
          </p>
        </ScrollScrub>
      </section>

      <section
        id="more"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-10 px-6 py-24 lg:px-10"
      >
        <ScrollScrub>
          <Eyebrow>More</Eyebrow>
        </ScrollScrub>

        <div className="flex flex-col gap-4">
          {PERSONAS.map((persona) => (
            <ScrollScrub key={persona.href}>
              <Link
                href={persona.href}
                style={{ "--persona-color": persona.color } as CSSProperties}
                className="group/persona flex flex-col gap-2 rounded-2xl border-2 border-foreground/80 bg-background/50 p-6 shadow-[4px_4px_0_0_var(--persona-color)] backdrop-blur-md transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-muted/40 hover:shadow-[2px_2px_0_0_var(--persona-color)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                    {persona.role}
                  </h2>
                  <span className="text-muted-foreground transition-transform group-hover/persona:translate-x-1">
                    →
                  </span>
                </div>
                <p className="font-body line-clamp-2 max-w-xl text-lg font-semibold tracking-tight text-balance text-muted-foreground">
                  {persona.tagline}
                </p>
                <p className="font-body mt-1 text-sm font-semibold tracking-tight text-muted-foreground/70">
                  {persona.sections.map((section) => section.title).join(" · ")}
                </p>
              </Link>
            </ScrollScrub>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-0 px-6 lg:px-10"
      >
        <ScrollScrub>
          <Eyebrow>Contact</Eyebrow>
        </ScrollScrub>
        <ScrollScrub>
          <h2 className="font-heading mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            Contact me.
          </h2>
        </ScrollScrub>
        <ScrollScrub>
          <p className="font-body mt-4 max-w-md text-xl font-semibold tracking-tight text-balance text-muted-foreground sm:text-2xl">
            I&apos;m currently open to work — new roles, collaborations, and
            ambitious ideas. Reach out.
          </p>
        </ScrollScrub>
        <ScrollScrub>
          <div className="mt-10 flex items-center gap-4">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-lg" }),
                  "size-14 [&_svg]:size-6!"
                )}
              >
                <Icon />
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-14 gap-2 px-8 text-lg [&_svg]:size-5!"
              )}
            >
              <Download />
              Download Resume
            </a>
          </div>
        </ScrollScrub>
        <ScrollScrub>
          <div className="font-body mt-14 flex flex-col gap-2 text-lg font-semibold tracking-tight text-muted-foreground">
            <span>
              {EDUCATION.degree} · {EDUCATION.school} ({EDUCATION.period})
            </span>
            <span>
              {LANGUAGES.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </span>
            <span>{INTERESTS.join(" · ")}</span>
            <Link href="/resume" className="underline underline-offset-4 hover:text-foreground">
              Plain-text resume
            </Link>
          </div>
        </ScrollScrub>
      </section>
    </div>
  );
}
