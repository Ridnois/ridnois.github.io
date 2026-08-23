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

function useDisplacedGeometry(radius: number, detail: number, amount: number, seed: number) {
  return useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    const position = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i < position.count; i++) {
      vertex.fromBufferAttribute(position, i);
      const noise =
        Math.sin(vertex.x * 3.1 + seed) * Math.cos(vertex.y * 2.7 + seed) * Math.sin(vertex.z * 3.4 + seed);
      vertex.addScaledVector(vertex.clone().normalize(), noise * amount);
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, [radius, detail, amount, seed]);
}

function SculptedGem() {
  const groupRef = useRef<THREE.Group>(null);
  const geometry = useDisplacedGeometry(1.1, 2, 0.22, 4.2);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

function ShardOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 1.7 + (i % 2) * 0.3;
        return {
          position: [Math.cos(angle) * radius, Math.sin(angle * 1.3) * 0.6, Math.sin(angle) * radius] as [
            number,
            number,
            number,
          ],
          scale: 0.12 + (i % 3) * 0.05,
        };
      }),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y -= delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <mesh key={i} position={shard.position} scale={shard.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

function AxisGizmo({ position }: { position: [number, number, number] }) {
  const axes = useMemo(() => {
    const group = new THREE.Group();
    const specs: [THREE.Vector3, string][] = [
      [new THREE.Vector3(0.7, 0, 0), "#3f3f46"],
      [new THREE.Vector3(0, 0.7, 0), "#71717a"],
      [new THREE.Vector3(0, 0, 0.7), "#a1a1aa"],
    ];
    for (const [dir, color] of specs) {
      const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), dir]);
      group.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 })));
    }
    return group;
  }, []);

  return <primitive object={axes} position={position} />;
}

function LowPolyTerrain({ position }: { position: [number, number, number] }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.4, 1.8, 16, 12);
    const posAttr = geo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const height = Math.sin(x * 1.6) * Math.cos(y * 1.8) * 0.28;
      posAttr.setZ(i, height);
    }
    geo.computeVertexNormals();
    geo.rotateX(-Math.PI / 2.4);
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={position}>
      <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function ScreenPortal({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const miniGeometry = useDisplacedGeometry(0.32, 1, 0.14, 7.7);

  const bezel = useMemo(() => {
    const w = 1.3;
    const h = 0.85;
    const points = [
      new THREE.Vector3(-w / 2, -h / 2, 0),
      new THREE.Vector3(w / 2, -h / 2, 0),
      new THREE.Vector3(w / 2, h / 2, 0),
      new THREE.Vector3(-w / 2, h / 2, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints([...points, points[0]]);
    return new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color: "#71717a", transparent: true, opacity: 0.7 }));
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={bezel} />
      <mesh geometry={miniGeometry}>
        <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

const STAGES: CameraStage[] = [
  { position: [3.2, 1.6, 3.6], lookAt: [0, 0, 0] },
  { position: [3.4, 0.4, 1.4], lookAt: [2.2, -0.7, 0] },
  { position: [-2.6, 0.8, 2.2], lookAt: [-2.4, -0.3, -0.8] },
  { position: [1.6, 0.8, 2], lookAt: [0, 0, 0] },
  { position: [0.8, 0.5, 1.2], lookAt: [0, 0.3, -2.2] },
];

function ArtistScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const floatIndex = useScrollStage(scrollProgress, STAGES.length);
  useStageCamera(STAGES, floatIndex);

  return (
    <PointerParallax>
      <ViewportGrid color="#3f3f46" position={[0, -1.1, 0]} />
      <AmbientField color="#71717a" />
      <SweepLight radius={2.4} height={1} speed={0.22} />
      <StageGroup stageIndex={[0, 3]} floatIndex={floatIndex}>
        <SculptedGem />
        <ShardOrbit />
      </StageGroup>
      <StageGroup stageIndex={1} floatIndex={floatIndex}>
        <AxisGizmo position={[2.2, -0.9, 0]} />
      </StageGroup>
      <StageGroup stageIndex={2} floatIndex={floatIndex}>
        <LowPolyTerrain position={[-2.4, -0.6, -0.8]} />
      </StageGroup>
      <StageGroup stageIndex={4} floatIndex={floatIndex}>
        <ScreenPortal position={[0, 0.3, -2.2]} />
      </StageGroup>
    </PointerParallax>
  );
}

export default function ArtistExperience({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3.2, 1.6, 3.6], fov: 45 }}>
      <ArtistScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}
