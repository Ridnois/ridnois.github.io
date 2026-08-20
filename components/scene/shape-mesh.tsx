"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

import { useSceneStore, type ShapeKind } from "@/lib/scene-store";

const GEOMETRIES: Record<ShapeKind, React.JSX.Element> = {
  knot: <torusKnotGeometry args={[0.9, 0.28, 200, 32]} />,
  icosahedron: <icosahedronGeometry args={[1.25, 1]} />,
  box: <boxGeometry args={[1.6, 1.6, 1.6]} />,
  torus: <torusGeometry args={[1, 0.36, 32, 100]} />,
};

export function ShapeMesh() {
  const meshRef = useRef<Mesh>(null);
  const shape = useSceneStore((s) => s.shape);
  const color = useSceneStore((s) => s.color);
  const wireframe = useSceneStore((s) => s.wireframe);
  const autoRotate = useSceneStore((s) => s.autoRotate);
  const rotationSpeed = useSceneStore((s) => s.rotationSpeed);

  useFrame((_, delta) => {
    if (!autoRotate || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.25 * rotationSpeed;
    meshRef.current.rotation.y += delta * 0.4 * rotationSpeed;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {GEOMETRIES[shape]}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        roughness={0.25}
        metalness={0.55}
      />
    </mesh>
  );
}
