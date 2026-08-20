"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls } from "@react-three/drei";

import { ShapeMesh } from "@/components/scene/shape-mesh";

export default function Experience() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4, 2.2, 5], fov: 42 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 6, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0} floatIntensity={0.6}>
          <ShapeMesh />
        </Float>
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.45}
          scale={10}
          blur={2.4}
          far={4}
        />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        makeDefault
      />
    </Canvas>
  );
}
