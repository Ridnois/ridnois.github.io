"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
}

export function AmbientField({
  color,
  count = 46,
  radius = 6.5,
}: {
  color: string;
  count?: number;
  radius?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i * 12.9898;
        const theta = seededRandom(seed) * Math.PI * 2;
        const r = radius * (0.35 + seededRandom(seed + 1) * 0.65);
        const y = (seededRandom(seed + 2) - 0.5) * 4.5;
        return {
          position: [Math.cos(theta) * r, y, Math.sin(theta) * r] as [number, number, number],
          scale: 0.02 + seededRandom(seed + 3) * 0.035,
          spin: 0.04 + seededRandom(seed + 4) * 0.08,
        };
      }),
    [count, radius]
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.015;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position} scale={node.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}
