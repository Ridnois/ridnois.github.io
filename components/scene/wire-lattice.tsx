"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useUniqueVertices(radius: number, detail: number) {
  return useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    const position = geometry.attributes.position;
    const seen = new Set<string>();
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < position.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(position, i);
      const key = vertex.toArray().map((n) => n.toFixed(3)).join(",");
      if (!seen.has(key)) {
        seen.add(key);
        points.push(vertex);
      }
    }

    geometry.dispose();
    return points;
  }, [radius, detail]);
}

export function WireLattice({
  radius = 1.2,
  detail = 1,
  color = "#52525b",
  nodeColor = "#a1a1aa",
}: {
  radius?: number;
  detail?: number;
  color?: string;
  nodeColor?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useUniqueVertices(radius, detail);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.04;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[radius, detail]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </mesh>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={nodeColor} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
