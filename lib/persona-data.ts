import type { PersonaScene } from "@/components/scene/persona-scene-canvas";

export interface PersonaContent {
  role: string;
  tagline: string;
  scene: PersonaScene;
  color: string;
  sections: { title: string; body: string; href?: string }[];
  closing: { title: string; body: string };
}

export const DEV_CONTENT: PersonaContent = {
  role: "Developer",
  scene: "dev",
  color: "#52525b",
  tagline:
    "I build products end-to-end — from infra decisions to pixel-perfect UI — with a bias toward shipping and a soft spot for clean architecture.",
  sections: [
    {
      title: "WEBAI3",
      body: "An AI inference layer settled on-chain — ERC-20 rails, a Gnosis Safe vault, an X402 facilitator, and services that bill in real time. Solidity meets Next.js.",
      // TODO: point this at the specific WEBAI3 repo(s) once they're public.
      href: "https://github.com/Ridnois",
    },
    {
      title: "Shipping for global brands",
      body: "Two to three Next.js apps a year for Disney, UNICEF, LATAM Airlines, and British Airways at Globant — the frontend team's architectural reference, from design system to CI/CD to the pre-release fire drill.",
    },
    {
      title: "Component systems at scale",
      body: "Design systems and shared UI libraries built to survive multiple teams and multiple client brands without splintering.",
    },
    {
      title: "Currently exploring",
      body: "Real-time 3D on the web — this site is the sandbox.",
    },
  ],
  closing: {
    title: "Let's ship something.",
    body: "Open to new roles and ambitious builds — reach out or grab the resume.",
  },
};

export const ARTIST_CONTENT: PersonaContent = {
  role: "3D Artist",
  scene: "artist",
  color: "#71717a",
  tagline:
    "3D modeling started as curiosity and became a second discipline — thinking in geometry, light, and material the same way I think in components and state.",
  sections: [
    {
      title: "Toolset",
      body: "Blender for modeling and sculpting, Three.js / React Three Fiber when the piece needs to live on the web and respond to a viewer.",
    },
    {
      title: "What draws me in",
      body: "Procedural geometry, low-poly compositions, and the moment a wireframe starts reading as a real object.",
    },
    {
      title: "This page",
      body: "The scene beside this text runs the same way the rest of this site does — no pre-rendered images, just geometry live in your browser.",
    },
    {
      title: "Where craft meets code",
      body: "The same instinct that makes a mesh read as an object is the one that makes a UI read as finished — proportion, weight, the small imperfection that sells it as real.",
    },
  ],
  closing: {
    title: "Let's make something.",
    body: "Open to collaborations, commissions, or just talking shop — reach out or grab the resume.",
  },
};

export const HUMAN_CONTENT: PersonaContent = {
  role: "Human",
  scene: "human",
  color: "#a1a1aa",
  tagline:
    "Outside the editor, I'm usually moving fast on eight wheels, sketching a garment, or watching a candlestick chart I probably shouldn't be watching.",
  sections: [
    {
      title: "Aggressive inline skating",
      body: "Grinds, gaps, and the occasional bad landing — the same iteration loop as debugging, just with more bruises.",
    },
    {
      title: "Clothing design & manufacturing",
      body: "Small-batch pieces, from sketch to pattern to sewn sample — a slower, more physical kind of shipping.",
    },
    {
      title: "Day trading",
      body: "Reading charts scratches the same itch as reading logs: find the pattern, manage the risk, don't get attached to being right.",
    },
    {
      title: "The throughline",
      body: "Skating, pattern-making, and reading charts are the same loop wearing different clothes: try, get punished by reality, adjust, try again.",
    },
  ],
  closing: {
    title: "Let's talk.",
    body: "On the clock or off it — reach out, or just grab the resume.",
  },
};
