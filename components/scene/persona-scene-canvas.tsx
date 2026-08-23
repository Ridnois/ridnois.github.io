"use client";

import dynamic from "next/dynamic";
import type { MotionValue } from "motion/react";

function LoadingDot() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="size-16 animate-pulse rounded-full bg-foreground/10" />
    </div>
  );
}

const SCENES = {
  dev: dynamic(() => import("@/components/scene/dev-experience"), {
    ssr: false,
    loading: LoadingDot,
  }),
  artist: dynamic(() => import("@/components/scene/artist-experience"), {
    ssr: false,
    loading: LoadingDot,
  }),
  human: dynamic(() => import("@/components/scene/human-experience"), {
    ssr: false,
    loading: LoadingDot,
  }),
} as const;

export type PersonaScene = keyof typeof SCENES;

export function PersonaSceneCanvas({
  scene,
  scrollProgress,
}: {
  scene: PersonaScene;
  scrollProgress: MotionValue<number>;
}) {
  const Scene = SCENES[scene];
  return <Scene scrollProgress={scrollProgress} />;
}
