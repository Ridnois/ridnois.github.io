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
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

function SkateVignette({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const ramp = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 1.1, 1.1, Math.PI, Math.PI * 1.5, false, 0);
    const points = curve.getPoints(16).map((p) => new THREE.Vector3(p.x + 1.1, p.y + 1.1, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#71717a", transparent: true, opacity: 0.7 }));
  }, []);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={ramp} />
      <group position={[0.55, 0.95, 0]} rotation={[0, 0, -0.4]}>
        <mesh>
          <boxGeometry args={[0.22, 0.4, 0.16]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <icosahedronGeometry args={[0.14, 0]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.16]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function MannequinVignette({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.16;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.36, 0.3, 0.85, 12, 4, true]} />
        <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.75} />
      </mesh>
      {[0.32, 0.14, -0.05, -0.22, -0.38].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[y > 0 ? 0.34 : 0.32, 0.012, 8, 24]} />
          <meshBasicMaterial color="#d4d4d8" wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function CandlestickChart({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const candles = useMemo(() => {
    const seedRandom = (seed: number) => {
      const x = Math.sin(seed * 999) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 14 }, (_, i) => {
      const height = 0.2 + seedRandom(i) * 0.9;
      const up = seedRandom(i + 50) > 0.45;
      return { x: (i - 6.5) * 0.24, height, up };
    });
  }, []);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef} position={position}>
      {candles.map((candle, i) => (
        <mesh key={i} position={[candle.x, candle.height / 2, 0]}>
          <boxGeometry args={[0.14, candle.height, 0.14]} />
          <meshBasicMaterial color={candle.up ? "#3f3f46" : "#a1a1aa"} wireframe transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function ThroughlineRing({
  position,
  spokeTargets,
}: {
  position: [number, number, number];
  spokeTargets: [number, number, number][];
}) {
  const torusRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const spokes = useMemo(() => {
    const group = new THREE.Group();
    const material = new THREE.LineBasicMaterial({ color: "#a1a1aa", transparent: true, opacity: 0.4 });
    for (const target of spokeTargets) {
      const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(...target)]);
      group.add(new THREE.Line(geometry, material));
    }
    return group;
  }, [spokeTargets]);

  useFrame((_, delta) => {
    if (prefersReducedMotion || !torusRef.current) return;
    torusRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group position={position}>
      <mesh ref={torusRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.1, 0.02, 8, 64]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.6} />
      </mesh>
      <primitive object={spokes} />
    </group>
  );
}

const STAGES: CameraStage[] = [
  { position: [3, 1.4, 3.6], lookAt: [0, 0.2, 0] },
  { position: [3.4, 1.6, 2.4], lookAt: [2.4, 0.6, -0.6] },
  { position: [-3.2, 0.9, 1.6], lookAt: [-2.4, 0.2, -0.6] },
  { position: [0.2, 0.8, 3.4], lookAt: [0, 0.4, -1.8] },
  { position: [0, 2.6, 5.8], lookAt: [0, -0.4, -0.8] },
];

function HumanScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const floatIndex = useScrollStage(scrollProgress, STAGES.length);
  useStageCamera(STAGES, floatIndex);

  return (
    <PointerParallax>
      <ViewportGrid color="#3f3f46" position={[0, -1, 0]} />
      <AmbientField color="#71717a" />
      <SweepLight radius={3.2} height={1} speed={0.17} />
      <StageGroup stageIndex={1} floatIndex={floatIndex}>
        <SkateVignette position={[2.4, -1, -0.6]} />
      </StageGroup>
      <StageGroup stageIndex={2} floatIndex={floatIndex}>
        <MannequinVignette position={[-2.4, -0.55, -0.6]} />
      </StageGroup>
      <StageGroup stageIndex={3} floatIndex={floatIndex}>
        <CandlestickChart position={[0, -1, -1.8]} />
      </StageGroup>
      <StageGroup stageIndex={4} floatIndex={floatIndex}>
        <ThroughlineRing
          position={[0, -0.4, -0.8]}
          spokeTargets={[
            [2.4, -0.6, 0.2],
            [-2.4, -0.15, 0.2],
            [0, -0.6, -1],
          ]}
        />
      </StageGroup>
    </PointerParallax>
  );
}

export default function HumanExperience({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3, 1.4, 3.6], fov: 45 }}>
      <HumanScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
