"use client";

import { useTransform, type MotionValue } from "motion/react";

export function useScrollStage(scrollProgress: MotionValue<number>, stageCount: number) {
  return useTransform(scrollProgress, [0, 1], [0, stageCount - 1]);
}
