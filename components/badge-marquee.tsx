"use client";

import { Boxes, Braces, Code2 } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const CATEGORY_ICONS = [Code2, Braces, Boxes];

function tiltFor(i: number) {
  const rotateX = 8 - (i % 3) * 4;
  const rotateY = ((i % 2) * 2 - 1) * 6;
  return `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

export function BadgeMarqueeRow({
  items,
  direction = "left",
  speed = 26,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const loop = [...items, ...items];
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex shrink-0 items-center gap-2 py-1"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={prefersReducedMotion ? undefined : { duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            style={{ transform: tiltFor(i) }}
            className="inline-flex shrink-0 items-center rounded-lg border border-foreground/70 bg-background/50 px-2.5 py-1 text-xs font-semibold tracking-tight text-foreground backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ToolsMarquee({
  categories,
}: {
  categories: { label: string; items: string[] }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {categories.map((category, i) => {
        const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
        return (
          <div
            key={category.label}
            className={cn(
              "flex flex-col gap-1.5 pt-2",
              i > 0 && "border-t border-border/60"
            )}
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              <Icon className="size-3.5" />
              {category.label}
            </span>
            <BadgeMarqueeRow
              items={category.items}
              direction={i % 2 === 0 ? "left" : "right"}
              speed={22 + i * 4}
            />
          </div>
        );
      })}
    </div>
  );
}
