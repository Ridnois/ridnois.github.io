export const PROFILE = {
  brand: "Ridnois",
  name: "Sebastian Altamirano",
  role: "Software Engineer",
  location: "Santiago, Chile",
  github: "https://github.com/Ridnois",
  email: "s.altamiranorid@gmail.com",
  tagline:
    "Endlessly curious — I love learning, building, and getting lost in digital art. When I'm not at the keyboard, I'm probably on inline skates.",
  summary:
    "With over 8 years of experience, I started my career at Yapo.cl building components and flows for a ~1M daily-user marketplace, laying strong foundations in TypeScript, design systems, and testing. At Globant I became the go-to frontend technical reference across high-profile projects for Disney, UNICEF, LATAM Airlines and British Airways — shipping Next.js applications to production, unblocking critical pre-release issues under pressure, and serving as the architectural decision point within my team. Most recently, as founder of WEBAI3, I independently designed and deployed ERC-20 contracts, a multisig vault architecture using Gnosis Safe, and an AI inference layer on top of X402 and Ethereum — extending my expertise from frontend into full-stack decentralized development.",
};

export const LANGUAGES = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Professional" },
];

export const EXPERIENCE = [
  {
    role: "Founder & Engineer",
    company: "WEBAI3",
    location: "Santiago, Chile",
    period: "Dec 2025 – Present",
    highlight:
      "Designed and deployed ERC-20 contracts, a Gnosis Safe multisig vault, and an AI inference layer on X402 + Ethereum.",
    tech: ["Solidity", "Ethereum", "Hardhat", "Foundry", "Gnosis Safe", "Systems Architecture"],
    bullets: [
      "Designed and deployed ERC-20 token contracts with a full test suite (Hardhat + Foundry).",
      "Implemented a multisig vault architecture with Gnosis Safe: signer policies, timelock and recovery logic.",
      "Designed the AI inference layer on X402 + Ethereum: multiple microservices, on-chain billing and endpoint security.",
      "Full ownership of technical and product roadmap, operating autonomously end-to-end.",
    ],
  },
  {
    role: "Web UI Developer (Sr.)",
    company: "Globant",
    location: "Santiago, Chile",
    period: "Feb 2022 – Jun 2025",
    highlight:
      "Shipped Next.js apps to production for Disney, UNICEF, LATAM Airlines and British Airways — the team's architectural decision point.",
    tech: ["Next.js", "TypeScript", "React", "Unit & E2E Testing", "CI/CD"],
    bullets: [
      "Shipped Next.js apps to production for Disney, UNICEF, LATAM Airlines and British Airways — 1 to 2 projects per year.",
      "Go-to technical reference for the frontend team (4 engineers): owned the most complex tasks, supported teammates on theirs, and was the architectural decision point.",
      "Resolved critical pre-release blockers under tight deadlines across multiple client accounts.",
      "Managed end-to-end pipelines: design systems, CI/CD, performance audits and technical debt.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Yapo.cl SpA",
    location: "Santiago, Chile",
    period: "Feb 2019 – Jun 2021",
    highlight:
      "Built and maintained components and user flows for a marketplace with ~1M daily users.",
    tech: ["TypeScript", "SCSS", "Custom Elements"],
    bullets: [
      "Built and maintained components and user flows for a marketplace with ~1M daily users.",
      "Implemented design systems and analytics integrations using TypeScript, Custom Elements and SCSS.",
    ],
  },
];

export const EDUCATION = {
  degree: "Programmer Analyst",
  school: "IP Santo Tomás",
  location: "Santiago",
  period: "2018 – 2022",
  note: "Self-taught before formal studies; participated in innovation fairs and hackathons.",
};

export const INTERESTS = [
  "Aggressive inline skating",
  "3D modeling",
  "Clothing design & manufacturing",
  "Day trading",
];
