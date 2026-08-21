"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { Download, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/social";
import { SceneCanvas } from "@/components/scene/scene-canvas";
import { useSceneStore, type ShapeKind } from "@/lib/scene-store";
import { cn } from "@/lib/utils";
import {
  EDUCATION,
  EXPERIENCE,
  INTERESTS,
  LANGUAGES,
  PROFILE,
} from "@/lib/resume-data";

const SECTION_THEME: Record<string, { shape: ShapeKind; color: string }> = {
  hero: { shape: "knot", color: "#f97316" },
  experience: { shape: "icosahedron", color: "#8b5cf6" },
  contact: { shape: "box", color: "#22c55e" },
};

function useScrollTheme() {
  const setShape = useSceneStore((s) => s.setShape);
  const setColor = useSceneStore((s) => s.setColor);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const theme = SECTION_THEME[entry.target.id];
          if (theme) {
            setShape(theme.shape);
            setColor(theme.color);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    for (const id of Object.keys(SECTION_THEME)) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [setShape, setColor]);
}

function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </span>
  );
}

function ScrollCue({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth" })
      }
      aria-label="Scroll to next section"
      className="mx-auto mt-16 flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="text-xs font-semibold tracking-[0.3em] uppercase">
        Scroll
      </span>
      <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-current p-1.5">
        <motion.span
          className="size-1.5 rounded-full bg-current"
          animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </button>
  );
}

const contactLinks = [
  { label: "GitHub", href: PROFILE.github, icon: GithubIcon },
  { label: "Email", href: `mailto:${PROFILE.email}`, icon: Mail },
];

export function Resume() {
  useScrollTheme();

  return (
    <div className="relative">
      <div className="fixed inset-y-0 right-0 left-0 -z-20 lg:left-[55%]">
        <SceneCanvas interactive={false} />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/55 via-background/10 to-background/65" />

      <section
        id="hero"
        className="flex min-h-screen flex-col justify-center px-6 lg:px-10"
      >
        <div className="flex w-full max-w-2xl flex-col gap-6">
          <Badge variant="outline" className="h-6 w-fit px-3 text-sm">
            {PROFILE.role}
          </Badge>
          <div className="flex flex-col gap-2">
            <h1 className="text-7xl leading-[0.9] font-bold tracking-tight text-foreground sm:text-9xl">
              {PROFILE.brand}
            </h1>
            <p className="text-xl font-medium text-foreground/70 sm:text-2xl">
              {PROFILE.name} — Software Developer
            </p>
          </div>
          <p className="max-w-md text-lg text-balance text-muted-foreground sm:text-xl">
            {PROFILE.tagline}
          </p>
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
        </div>

        <ScrollCue targetId="experience" />
      </section>

      <section
        id="experience"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-16 px-6 py-24 lg:px-10"
      >
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
        </Reveal>

        <div className="flex flex-col gap-20">
          {EXPERIENCE.map((job) => (
            <Reveal key={job.company}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {job.company}
                  </h3>
                  <span className="text-base text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <Badge variant="outline" className="h-6 w-fit px-3 text-sm">
                  {job.role}
                </Badge>
                <p className="max-w-2xl text-lg text-balance text-foreground/80 sm:text-xl">
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
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-0 px-6 lg:px-10"
      >
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-balance text-foreground sm:text-6xl">
            Let&apos;s build something.
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-4 max-w-md text-lg text-balance text-muted-foreground sm:text-xl">
            Open to new roles, collaborations, and ambitious ideas — reach
            out.
          </p>
        </Reveal>
        <Reveal>
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
        </Reveal>
        <Reveal>
          <div className="mt-14 flex flex-col gap-2 text-base text-muted-foreground">
            <span>
              {EDUCATION.degree} · {EDUCATION.school} ({EDUCATION.period})
            </span>
            <span>
              {LANGUAGES.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </span>
            <span>{INTERESTS.join(" · ")}</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
