"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

export function SweepLight({
  radius = 3,
  height = 1.5,
  speed = 0.25,
  color = "#f4f4f5",
}: {
  radius?: number;
  height?: number;
  speed?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const t = prefersReducedMotion ? 0 : state.clock.elapsedTime * speed;
    group.position.set(
      Math.cos(t) * radius,
      height + Math.sin(t * 0.6) * height * 0.3,
      Math.sin(t) * radius
    );
  });

  return (
    <group ref={groupRef}>
      <pointLight color={color} intensity={2} distance={5} decay={2} />
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.45, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} />
      </mesh>
    </group>
  );
}
