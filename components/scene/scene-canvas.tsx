"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/scene/experience"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center">
      <div className="size-16 animate-pulse rounded-full bg-foreground/10" />
    </div>
  ),
});

interface SceneCanvasProps {
  interactive?: boolean;
}

export function SceneCanvas({ interactive = true }: SceneCanvasProps) {
  return <Experience interactive={interactive} />;
}
