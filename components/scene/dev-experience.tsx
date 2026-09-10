"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

import { useStageCamera, type CameraStage } from "@/components/scene/use-stage-camera";
import { useScrollStage } from "@/components/scene/use-scroll-stage";
import { ViewportGrid } from "@/components/scene/viewport-grid";
import { StageGroup } from "@/components/scene/stage-group";
import { PointerParallax } from "@/components/scene/pointer-parallax";
import { AmbientField } from "@/components/scene/ambient-field";
import { SweepLight } from "@/components/scene/sweep-light";
import { WireLattice } from "@/components/scene/wire-lattice";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

function ChainRing({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const nodeCount = 12;
  const radius = 0.9;

  const nodePositions = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, Math.sin(angle) * radius);
      }),
    []
  );

  const loop = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([...nodePositions, nodePositions[0]]);
    const material = new THREE.LineBasicMaterial({ color: "#52525b", transparent: true, opacity: 0.5 });
    return new THREE.LineLoop(geometry, material);
  }, [nodePositions]);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={loop} />
      {nodePositions.map((p, i) => (
        <mesh key={i} position={p}>
          <octahedronGeometry args={[0.16, 0]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function ComponentStack({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const rows = [
    { y: 0.7, boxes: [{ x: 0, scale: 1.1 }] },
    { y: 0.1, boxes: [{ x: -0.55, scale: 0.7 }, { x: 0.55, scale: 0.7 }] },
    { y: -0.5, boxes: [{ x: -0.85, scale: 0.42 }, { x: -0.15, scale: 0.42 }, { x: 0.55, scale: 0.5 }] },
    {
      y: -1.05,
      boxes: [
        { x: -0.95, scale: 0.26 },
        { x: -0.6, scale: 0.26 },
        { x: -0.05, scale: 0.24 },
        { x: 0.4, scale: 0.28 },
        { x: 0.75, scale: 0.24 },
      ],
    },
  ];

  const connectors = useMemo(() => {
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: "#a1a1aa", transparent: true, opacity: 0.45 });
    const pairs: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(-0.55, 0.1, 0)],
      [new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0.55, 0.1, 0)],
      [new THREE.Vector3(-0.55, 0.1, 0), new THREE.Vector3(-0.85, -0.5, 0)],
      [new THREE.Vector3(-0.55, 0.1, 0), new THREE.Vector3(-0.15, -0.5, 0)],
      [new THREE.Vector3(0.55, 0.1, 0), new THREE.Vector3(0.55, -0.5, 0)],
      [new THREE.Vector3(-0.85, -0.5, 0), new THREE.Vector3(-0.95, -1.05, 0)],
      [new THREE.Vector3(-0.85, -0.5, 0), new THREE.Vector3(-0.6, -1.05, 0)],
      [new THREE.Vector3(-0.15, -0.5, 0), new THREE.Vector3(-0.05, -1.05, 0)],
      [new THREE.Vector3(0.55, -0.5, 0), new THREE.Vector3(0.4, -1.05, 0)],
      [new THREE.Vector3(0.55, -0.5, 0), new THREE.Vector3(0.75, -1.05, 0)],
    ];
    for (const [a, b] of pairs) {
      const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
      group.add(new THREE.Line(geometry, material));
    }
    return group;
  }, []);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={connectors} />
      {rows.flatMap((row, rowIndex) =>
        row.boxes.map((box, i) => (
          <mesh key={`${rowIndex}-${i}`} position={[box.x, row.y, 0]} scale={box.scale}>
            <boxGeometry args={[0.5, 0.32, 0.5]} />
            <meshBasicMaterial color="#52525b" wireframe transparent opacity={0.7} />
          </mesh>
        ))
      )}
    </group>
  );
}

function ScreenFan({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const count = 6;

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i - (count - 1) / 2) * 0.26;
        const x = Math.sin(angle) * 0.9;
        const z = -Math.cos(angle) * 0.2;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <planeGeometry args={[0.55, 0.85]} />
            <meshBasicMaterial color="#52525b" wireframe transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

const STAGES: CameraStage[] = [
  { position: [3, 1.4, 3.4], lookAt: [0, 0.6, 0] }, // 0 hero
  { position: [4.6, 1.2, 1.6], lookAt: [2.6, 0, -1] }, // 1 WEBAI3 (ChainRing)
  { position: [0.6, 1.6, -0.6], lookAt: [0, 0.9, -2.6] }, // 2 Shipping for global brands (ScreenFan)
  { position: [-4.6, 1.2, 1.6], lookAt: [-2.6, 0, -1] }, // 3 Component systems (ComponentStack)
  { position: [1.8, 1, 2.2], lookAt: [0, 0.6, 0] }, // 4 Currently exploring (lattice close)
];

function DevScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const floatIndex = useScrollStage(scrollProgress, STAGES.length);
  useStageCamera(STAGES, floatIndex);

  return (
    <PointerParallax>
      <ViewportGrid color="#3f3f46" />
      <AmbientField color="#52525b" />
      <SweepLight radius={3} height={1.1} speed={0.2} />
      <StageGroup stageIndex={[0, 4]} floatIndex={floatIndex}>
        <group position={[0, 0.6, 0]}>
          <WireLattice radius={1.2} detail={1} color="#52525b" nodeColor="#a1a1aa" />
        </group>
      </StageGroup>
      <StageGroup stageIndex={1} floatIndex={floatIndex}>
        <ChainRing position={[2.6, 0, -1]} />
      </StageGroup>
      <StageGroup stageIndex={2} floatIndex={floatIndex}>
        <ScreenFan position={[0, 0.9, -2.6]} />
      </StageGroup>
      <StageGroup stageIndex={3} floatIndex={floatIndex}>
        <ComponentStack position={[-2.6, 0, -1]} />
      </StageGroup>
    </PointerParallax>
  );
}

export default function DevExperience({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3, 1.4, 3.4], fov: 45 }}>
      <DevScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
