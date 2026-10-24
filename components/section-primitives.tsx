"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

// Fades content in once as it enters the viewport. Content is always in the
// server-rendered HTML, so crawlers and no-JS readers see everything.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="flex max-w-2xl flex-col gap-3">
      <p className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
        <span className="text-brand">{index}</span> / {label}
      </p>
      <h2 className="font-heading text-3xl font-medium tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="text-lg text-pretty text-muted-foreground">{intro}</p>}
    </header>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-xs text-secondary-foreground">
      {children}
    </span>
  );
}
