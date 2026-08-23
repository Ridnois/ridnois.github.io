"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import type { Group, Material, Mesh } from "three";

interface BuildGroupProps {
  atStage: number;
  floatIndex: MotionValue<number>;
  rampWidth?: number;
  activeOpacity?: number;
  idleOpacity?: number;
  children: ReactNode;
}

export function BuildGroup({
  atStage,
  floatIndex,
  rampWidth = 0.6,
  activeOpacity = 1,
  idleOpacity = 0,
  children,
}: BuildGroupProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const value = floatIndex.get();
    const t = THREE.MathUtils.clamp((value - (atStage - rampWidth)) / rampWidth, 0, 1);
    const opacity = idleOpacity + (activeOpacity - idleOpacity) * t;
    group.scale.setScalar(0.85 + 0.15 * t);

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
