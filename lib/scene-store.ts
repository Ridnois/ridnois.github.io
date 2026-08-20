import { create } from "zustand";

export type ShapeKind = "knot" | "icosahedron" | "box" | "torus";

export const SHAPES: { value: ShapeKind; label: string }[] = [
  { value: "knot", label: "Torus Knot" },
  { value: "icosahedron", label: "Icosahedron" },
  { value: "box", label: "Box" },
  { value: "torus", label: "Torus" },
];

export const ACCENT_COLORS = [
  "#f97316",
  "#06b6d4",
  "#8b5cf6",
  "#f43f5e",
  "#22c55e",
] as const;

interface SceneState {
  shape: ShapeKind;
  color: string;
  wireframe: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
  setShape: (shape: ShapeKind) => void;
  setColor: (color: string) => void;
  setWireframe: (wireframe: boolean) => void;
  setAutoRotate: (autoRotate: boolean) => void;
  setRotationSpeed: (speed: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  shape: "knot",
  color: ACCENT_COLORS[0],
  wireframe: false,
  autoRotate: true,
  rotationSpeed: 1,
  setShape: (shape) => set({ shape }),
  setColor: (color) => set({ color }),
  setWireframe: (wireframe) => set({ wireframe }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
}));
