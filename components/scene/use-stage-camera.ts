"use client";

import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

export interface CameraStage {
  position: readonly [number, number, number];
  lookAt: readonly [number, number, number];
}

const DAMP_LAMBDA = 18;

export function useStageCamera(stages: CameraStage[], floatIndex: MotionValue<number>) {
  useFrame((state, delta) => {
    const value = THREE.MathUtils.clamp(floatIndex.get(), 0, stages.length - 1);
    const i0 = Math.floor(value);
    const i1 = Math.min(i0 + 1, stages.length - 1);
    const t = value - i0;

    const a = stages[i0];
    const b = stages[i1];

    const camera = state.camera;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      THREE.MathUtils.lerp(a.position[0], b.position[0], t),
      DAMP_LAMBDA,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      THREE.MathUtils.lerp(a.position[1], b.position[1], t),
      DAMP_LAMBDA,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      THREE.MathUtils.lerp(a.position[2], b.position[2], t),
      DAMP_LAMBDA,
      delta
    );

    camera.lookAt(
      THREE.MathUtils.lerp(a.lookAt[0], b.lookAt[0], t),
      THREE.MathUtils.lerp(a.lookAt[1], b.lookAt[1], t),
      THREE.MathUtils.lerp(a.lookAt[2], b.lookAt[2], t)
    );
  });
}
