"use client";

import { motion } from "motion/react";

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

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex shrink-0 items-center gap-3 py-1.5"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            style={{ transform: tiltFor(i) }}
            className="inline-flex shrink-0 items-center rounded-xl border-2 border-foreground/70 bg-background/50 px-4 py-1.5 text-sm font-semibold tracking-tight text-foreground backdrop-blur-sm"
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
    <div className="flex flex-col gap-4">
      {categories.map((category, i) => (
        <div key={category.label} className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {category.label}
          </span>
          <BadgeMarqueeRow
            items={category.items}
            direction={i % 2 === 0 ? "left" : "right"}
            speed={22 + i * 4}
          />
        </div>
      ))}
    </div>
  );
}
