"use client";

import { useMemo, useRef } from "react";
import { Download, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { OpenToWorkBadge } from "@/components/status-badge";
import { Eyebrow, Reveal, ScrollCue } from "@/components/section-primitives";
import { ScrollScrubSection } from "@/components/scroll-scrub";
import { PersonaSceneCanvas } from "@/components/scene/persona-scene-canvas";
import type { PersonaContent } from "@/lib/persona-data";
import { PROFILE } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "GitHub", href: PROFILE.github, icon: GithubIcon },
  { label: "LinkedIn", href: PROFILE.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${PROFILE.email}`, icon: Mail },
];

export function PersonaPage({ role, tagline, scene, color, sections, closing }: PersonaContent) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionIds = useMemo(
    () => ["hero", ...sections.map((_, i) => `section-${i + 1}`)],
    [sections]
  );
  const stageCount = sectionIds.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroExitRange = 1 / stageCount;
  const heroOpacity = useTransform(scrollYProgress, [0, heroExitRange], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, heroExitRange], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, heroExitRange], [1, 0.94]);

  return (
    <div ref={containerRef} className="relative">
      <div className="fixed inset-0 -z-20">
        <PersonaSceneCanvas scene={scene} scrollProgress={scrollYProgress} />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/15 to-background/70" />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 50% at 15% 20%, ${color}22, transparent)`,
        }}
      />

      <section
        id="hero"
        className="flex min-h-screen flex-col justify-center px-6 lg:px-10"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="flex w-full max-w-lg flex-col gap-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="h-6 w-fit px-3 text-sm">
              {role}
            </Badge>
            <OpenToWorkBadge />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
              Ridnois
            </h1>
            <p className="font-body max-w-md text-xl font-semibold tracking-tight text-balance text-muted-foreground sm:text-2xl">
              {tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {LINKS.map(({ label, href, icon: Icon }) => (
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
          </div>
        </motion.div>

        <ScrollCue targetId={sectionIds[1] ?? "hero"} />
      </section>

      {sections.map((section, i) => (
        <ScrollScrubSection
          key={section.title}
          id={sectionIds[i + 1]}
          eyebrow={`0${i + 1}`}
          title={section.title}
          body={section.body}
        />
      ))}

      <section className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-0 px-6 py-24 lg:px-10">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="font-heading mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            {closing.title}
          </h2>
        </Reveal>
        <Reveal>
          <p className="font-body mt-4 max-w-md text-xl font-semibold tracking-tight text-balance text-muted-foreground sm:text-2xl">
            {closing.body}
          </p>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex items-center gap-3">
            {LINKS.map(({ label, href, icon: Icon }) => (
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
                buttonVariants({ variant: "default", size: "lg" }),
                "gap-2 px-5 text-base"
              )}
            >
              <Download className="size-5" />
              Resume
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
