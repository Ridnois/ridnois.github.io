"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

import { useStageCamera, type CameraStage } from "@/components/scene/use-stage-camera";
import { useScrollStage } from "@/components/scene/use-scroll-stage";
import { ViewportGrid } from "@/components/scene/viewport-grid";
import { BuildGroup } from "@/components/scene/build-group";
import { PointerParallax } from "@/components/scene/pointer-parallax";
import { AmbientField } from "@/components/scene/ambient-field";
import { WireLattice } from "@/components/scene/wire-lattice";
import { ARTIST_CONTENT, DEV_CONTENT, HUMAN_CONTENT } from "@/lib/persona-data";

const TIERS = [
  { radius: 0.75, y: 0.5 },
  { radius: 0.55, y: 0.85 },
  { radius: 0.4, y: 1.15 },
];

function CareerTiers() {
  const groupRef = useRef<THREE.Group>(null);

  const struts = useMemo(() => {
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: "#a1a1aa", transparent: true, opacity: 0.4 });
    const angles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
    for (const angle of angles) {
      const points = TIERS.map(
        (tier) => new THREE.Vector3(Math.cos(angle) * tier.radius, tier.y, Math.sin(angle) * tier.radius)
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(geometry, material));
    }
    return group;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      <primitive object={struts} />
      {TIERS.map((tier, i) => (
        <mesh key={i} position={[0, tier.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[tier.radius, 0.02, 8, 40]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

const BRANCHES = [
  { angle: -0.7, color: DEV_CONTENT.color },
  { angle: 0, color: ARTIST_CONTENT.color },
  { angle: 0.7, color: HUMAN_CONTENT.color },
];

function PersonaBranches() {
  const groupRef = useRef<THREE.Group>(null);
  const top = TIERS[TIERS.length - 1];

  const lines = useMemo(() => {
    const group = new THREE.Group();
    for (const branch of BRANCHES) {
      const start = new THREE.Vector3(Math.cos(branch.angle) * top.radius, top.y, Math.sin(branch.angle) * top.radius);
      const end = new THREE.Vector3(Math.sin(branch.angle) * 1.1, top.y + 0.55, Math.cos(branch.angle) * 0.3);
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const material = new THREE.LineBasicMaterial({ color: branch.color, transparent: true, opacity: 0.6 });
      group.add(new THREE.Line(geometry, material));
    }
    return group;
  }, [top.radius, top.y]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      <primitive object={lines} />
      {BRANCHES.map((branch, i) => {
        const end: [number, number, number] = [
          Math.sin(branch.angle) * 1.1,
          top.y + 0.55,
          Math.cos(branch.angle) * 0.3,
        ];
        return (
          <mesh key={i} position={end}>
            <icosahedronGeometry args={[0.14, 0]} />
            <meshBasicMaterial color={branch.color} wireframe transparent opacity={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

function Beacon() {
  const groupRef = useRef<THREE.Group>(null);
  const rings = [0.25, 0.35, 0.45];
  const top = TIERS[TIERS.length - 1];

  useFrame((state) => {
    if (!groupRef.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.06;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef} position={[0, top.y + 0.55, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
      {rings.map((r, i) => (
        <mesh key={i}>
          <torusGeometry args={[r, 0.012, 8, 40]} />
          <meshBasicMaterial color="#18181b" wireframe transparent opacity={0.6 - i * 0.1} />
        </mesh>
      ))}
    </group>
  );
}

const STAGES: CameraStage[] = [
  { position: [3, 0.8, 3.2], lookAt: [0, -0.2, 0] }, // 0 hero: close on the core
  { position: [3.4, 1.2, 3.6], lookAt: [0, 0.5, 0] }, // 1 experience: tiers rising
  { position: [3.6, 1.8, 4], lookAt: [0, 1.1, 0] }, // 2 more: branches visible
  { position: [3.2, 2.4, 4.4], lookAt: [0, 1.7, 0] }, // 3 contact: beacon framed
];

function HomeScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const floatIndex = useScrollStage(scrollProgress, STAGES.length);
  useStageCamera(STAGES, floatIndex);

  return (
    <PointerParallax>
      <ViewportGrid color="#52525b" />
      <AmbientField color="#52525b" />
      <group position={[0, -0.7, 0]}>
        <BuildGroup atStage={0} floatIndex={floatIndex} rampWidth={0.5}>
          <WireLattice radius={0.55} detail={1} color="#52525b" nodeColor="#a1a1aa" />
        </BuildGroup>
        <BuildGroup atStage={1} floatIndex={floatIndex}>
          <CareerTiers />
        </BuildGroup>
        <BuildGroup atStage={2} floatIndex={floatIndex}>
          <PersonaBranches />
        </BuildGroup>
        <BuildGroup atStage={3} floatIndex={floatIndex}>
          <Beacon />
        </BuildGroup>
      </group>
    </PointerParallax>
  );
}

export default function HomeExperience({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3, 0.8, 3.2], fov: 45 }}>
      <HomeScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
