"use client";

import { useEffect, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/social";
import { SceneCanvas } from "@/components/scene/scene-canvas";
import { useSceneStore, type ShapeKind } from "@/lib/scene-store";
import {
  EDUCATION,
  EXPERIENCE,
  INTERESTS,
  LANGUAGES,
  PROFILE,
  SKILLS,
} from "@/lib/resume-data";

const SECTION_THEME: Record<string, { shape: ShapeKind; color: string }> = {
  hero: { shape: "knot", color: "#f97316" },
  experience: { shape: "icosahedron", color: "#8b5cf6" },
  skills: { shape: "torus", color: "#06b6d4" },
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
    <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </span>
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
          <Badge variant="outline" className="w-fit">
            {PROFILE.role}
          </Badge>
          <h1 className="text-6xl leading-[0.95] font-bold tracking-tight text-foreground sm:text-8xl">
            {PROFILE.name}
          </h1>
          <p className="max-w-md text-balance text-lg text-muted-foreground">
            {PROFILE.tagline}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Icon />
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Download />
              Resume
            </a>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-16 flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="size-4" />
        </motion.div>
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
                  <span className="text-sm text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {job.role}
                </p>
                <p className="max-w-2xl text-balance text-lg text-foreground/80">
                  {job.highlight}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="skills"
        className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-8 px-6 py-24 lg:px-10"
      >
        <Reveal>
          <Eyebrow>Skills</Eyebrow>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-4 py-1.5 text-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
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

      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center lg:px-10"
      >
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="mt-4 max-w-2xl text-5xl font-bold tracking-tight text-balance text-foreground sm:text-6xl">
            Let&apos;s build something.
          </h2>
        </Reveal>
        <Reveal>
          <div className="mt-8 flex items-center gap-3">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className={buttonVariants({ variant: "outline", size: "icon-lg" })}
              >
                <Icon className="size-5" />
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              <Download />
              Download Resume
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
