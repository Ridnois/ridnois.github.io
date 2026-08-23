"use client";

import dynamic from "next/dynamic";
import type { MotionValue } from "motion/react";

const HomeExperience = dynamic(() => import("@/components/scene/home-experience"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center">
      <div className="size-16 animate-pulse rounded-full bg-foreground/10" />
    </div>
  ),
});

export function SceneCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return <HomeExperience scrollProgress={scrollProgress} />;
}
