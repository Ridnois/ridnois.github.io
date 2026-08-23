"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Reveal({
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

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </span>
  );
}

export function ScrollCue({ targetId }: { targetId: string }) {
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
