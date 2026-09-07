"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Eyebrow } from "@/components/section-primitives";

export function ScrollScrub({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.94, 1, 1, 0.96]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScrollScrubSection({
  id,
  eyebrow,
  title,
  body,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const eyebrowY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -30]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  const titleY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [80, 0, 0, -50]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.9, 1, 1, 0.94]);

  const bodyY = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [60, 0, 0, -40]);
  const bodyOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex min-h-screen w-full max-w-2xl flex-col justify-center gap-4 px-6 py-24 lg:px-10"
    >
      <motion.div style={{ y: eyebrowY, opacity: eyebrowOpacity }}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p
        style={{ y: bodyY, opacity: bodyOpacity }}
        className="font-body max-w-2xl text-lg font-semibold tracking-tight text-balance text-foreground/80 sm:text-xl lg:text-2xl"
      >
        {body}
      </motion.p>
    </section>
  );
}
