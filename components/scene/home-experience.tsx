"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

import { useStageCamera, type CameraStage } from "@/components/scene/use-stage-camera";
import { useScrollStage } from "@/components/scene/use-scroll-stage";
import { ViewportGrid } from "@/components/scene/viewport-grid";
import { StageGroup } from "@/components/scene/stage-group";
import { BuildGroup } from "@/components/scene/build-group";
import { PointerParallax } from "@/components/scene/pointer-parallax";
import { AmbientField } from "@/components/scene/ambient-field";
import { WireLattice } from "@/components/scene/wire-lattice";
import { SweepLight } from "@/components/scene/sweep-light";
import { ARTIST_CONTENT, DEV_CONTENT, HUMAN_CONTENT } from "@/lib/persona-data";

const PLANETS = [
  { orbitRadius: 1.5, speed: 0.32, size: 0.14, tilt: -0.18, color: DEV_CONTENT.color },
  { orbitRadius: 2.1, speed: 0.22, size: 0.17, tilt: 0.1, color: ARTIST_CONTENT.color },
  { orbitRadius: 2.7, speed: 0.15, size: 0.13, tilt: 0.22, color: HUMAN_CONTENT.color },
];

function Planet({
  orbitRadius,
  speed,
  size,
  color,
  phase,
}: {
  orbitRadius: number;
  speed: number;
  size: number;
  color: string;
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(phase);

  useFrame((_, delta) => {
    angleRef.current += delta * speed;
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.position.set(
      Math.cos(angleRef.current) * orbitRadius,
      Math.sin(angleRef.current * 2) * 0.12,
      Math.sin(angleRef.current) * orbitRadius * 0.9
    );
    mesh.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.85} />
    </mesh>
  );
}

function SolarSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={groupRef}>
      <WireLattice radius={0.4} detail={1} color="#52525b" nodeColor="#a1a1aa" />
      {PLANETS.map((planet, i) => (
        <group key={i} rotation={[planet.tilt, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[planet.orbitRadius, 0.006, 8, 64]} />
            <meshBasicMaterial color="#a1a1aa" transparent opacity={0.25} />
          </mesh>
          <Planet {...planet} phase={i * 2.1} />
        </group>
      ))}
    </group>
  );
}

function Desk() {
  const legs: [number, number][] = [
    [-0.75, -0.35],
    [0.75, -0.35],
    [-0.75, 0.35],
    [0.75, 0.35],
  ];

  return (
    <group>
      <mesh>
        <boxGeometry args={[1.6, 0.05, 0.8]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.8} />
      </mesh>
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.42, z]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Monitor() {
  const glowRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!glowRef.current) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
    glowRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={[0, 0.35, -0.2]}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.3, 8]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.8} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.55, 0.35, 0.03]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.8} />
      </mesh>
      <group ref={glowRef} position={[0, 0, 0.02]}>
        <mesh>
          <planeGeometry args={[0.48, 0.28]} />
          <meshBasicMaterial color="#d4d4d8" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Chair({ position }: { position: [number, number, number] }) {
  const legs: [number, number][] = [
    [-0.18, -0.18],
    [0.18, -0.18],
    [-0.18, 0.18],
    [0.18, 0.18],
  ];

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.45, 0.05, 0.45]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.75} />
      </mesh>
      <mesh position={[0, 0.35, -0.2]}>
        <boxGeometry args={[0.45, 0.6, 0.05]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.75} />
      </mesh>
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.25, z]}>
          <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
          <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

function Skateboard({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const wheels: [number, number][] = [
    [-0.06, -0.3],
    [0.06, -0.3],
    [-0.06, 0.3],
    [0.06, 0.3],
  ];

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.15, 0.02, 0.8]} />
        <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.85} />
      </mesh>
      {wheels.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.04, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.03, 0.012, 8, 16]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Room() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Desk />
      <Monitor />
      <Chair position={[0, -0.3, 0.7]} />
      <Skateboard position={[0.85, -0.55, 0.3]} rotation={[0, 0.25, 0.35]} />
    </group>
  );
}

function Shelf({ position }: { position: [number, number, number] }) {
  const colors = [DEV_CONTENT.color, ARTIST_CONTENT.color, HUMAN_CONTENT.color];

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.6, 0.03, 0.18]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.7} />
      </mesh>
      {colors.map((color, i) => (
        <mesh key={i} position={[(i - 1) * 0.2, 0.08, 0]}>
          <icosahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

const ROOM_OFFSET: [number, number, number] = [0.3, -0.6, -1.8];

const STAGES: CameraStage[] = [
  { position: [4, 2.2, 5], lookAt: [0, 0.3, 0] }, // 0 hero: wide solar system
  { position: [2.2, 1.2, 2.8], lookAt: [0, 0.3, 0] }, // 1 experience: pull toward the sun
  { position: [1.2, 0.6, 1.2], lookAt: [0.3, -0.3, -0.9] }, // 2 tools: transition into the room
  { position: [1.6, 0.4, 0.6], lookAt: [0.3, -0.2, -1.6] }, // 3 why: room framed
  { position: [1.8, 0.9, 0.4], lookAt: [0.3, -0.3, -1.8] }, // 4 more: shelf + skateboard corner
  { position: [0.5, -0.1, -1.3], lookAt: [0.3, -0.25, -2] }, // 5 contact: close on the monitor glow
];

function HomeScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const floatIndex = useScrollStage(scrollProgress, STAGES.length);
  useStageCamera(STAGES, floatIndex);

  return (
    <PointerParallax>
      <ViewportGrid color="#52525b" position={[ROOM_OFFSET[0], -1.4, ROOM_OFFSET[2] / 2]} />
      <AmbientField color="#52525b" />
      <SweepLight radius={3.2} height={1.2} speed={0.18} />
      <StageGroup stageIndex={[0, 1]} floatIndex={floatIndex}>
        <group position={[0, 0.3, 0]}>
          <SolarSystem />
        </group>
      </StageGroup>
      <BuildGroup atStage={3} floatIndex={floatIndex} activeOpacity={1} idleOpacity={0}>
        <group position={ROOM_OFFSET}>
          <Room />
        </group>
      </BuildGroup>
      <BuildGroup atStage={4} floatIndex={floatIndex} activeOpacity={1} idleOpacity={0}>
        <Shelf position={[ROOM_OFFSET[0] - 0.9, ROOM_OFFSET[1] + 0.3, ROOM_OFFSET[2] - 0.3]} />
      </BuildGroup>
    </PointerParallax>
  );
}

export default function HomeExperience({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [4, 2.2, 5], fov: 45 }}>
      <HomeScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
