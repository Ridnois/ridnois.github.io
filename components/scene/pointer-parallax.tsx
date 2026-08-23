"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Group } from "three";

export function PointerParallax({
  children,
  strength = 0.12,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const groupRef = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, pointer.current.x * strength, 4, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, -pointer.current.y * strength, 4, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}
