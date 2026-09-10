"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function PointerParallax({
  children,
  strength = 0.12,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const groupRef = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [prefersReducedMotion]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const targetX = prefersReducedMotion ? 0 : pointer.current.x * strength;
    const targetY = prefersReducedMotion ? 0 : -pointer.current.y * strength;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetX, 4, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetY, 4, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}
