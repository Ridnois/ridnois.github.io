"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import type { Group, Material, Mesh } from "three";

interface StageGroupProps {
  stageIndex: number | number[];
  floatIndex: MotionValue<number>;
  activeOpacity?: number;
  idleOpacity?: number;
  activeScale?: number;
  idleScale?: number;
  children: ReactNode;
}

const HERO_FALLOFF = 0.7;

export function StageGroup({
  stageIndex,
  floatIndex,
  activeOpacity = 1,
  idleOpacity = 0.15,
  activeScale = 1,
  idleScale = 0.88,
  children,
}: StageGroupProps) {
  const groupRef = useRef<Group>(null);
  const indices = Array.isArray(stageIndex) ? stageIndex : [stageIndex];

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const value = floatIndex.get();
    const distance = Math.min(...indices.map((i) => Math.abs(i - value)));
    const distanceT = THREE.MathUtils.clamp(1 - distance, 0, 1);
    const heroT = THREE.MathUtils.clamp(1 - value / HERO_FALLOFF, 0, 1);
    const t = Math.max(distanceT, heroT);

    const opacity = idleOpacity + (activeOpacity - idleOpacity) * t;
    const scale = idleScale + (activeScale - idleScale) * t;
    group.scale.setScalar(scale);

    group.traverse((child) => {
      const material = (child as Mesh).material as Material | Material[] | undefined;
      if (!material) return;
      const materials = Array.isArray(material) ? material : [material];
      for (const mat of materials) {
        const m = mat as Material & { opacity: number };
        m.transparent = true;
        m.opacity = opacity;
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}
