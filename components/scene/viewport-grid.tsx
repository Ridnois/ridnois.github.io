"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function ViewportGrid({
  size = 12,
  divisions = 24,
  color = "#71717a",
  position = [0, -1.4, 0] as [number, number, number],
}: {
  size?: number;
  divisions?: number;
  color?: string;
  position?: [number, number, number];
}) {
  const grid = useMemo(() => {
    const helper = new THREE.GridHelper(size, divisions, color, color);
    const material = helper.material as THREE.Material & { opacity: number };
    material.transparent = true;
    material.opacity = 0.18;
    return helper;
  }, [size, divisions, color]);

  return <primitive object={grid} position={position} />;
}
