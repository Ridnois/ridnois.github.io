// Career start date pinned to the first EXPERIENCE entry (Yapo.cl, Feb 2019).
// Kept as a source-of-truth constant so "years of experience" never goes stale.
const CAREER_START_DATE = new Date(2019, 1, 1);

export function getYearsOfExperience(referenceDate: Date = new Date()): number {
  let years = referenceDate.getFullYear() - CAREER_START_DATE.getFullYear();
  const anniversaryReached =
    referenceDate.getMonth() > CAREER_START_DATE.getMonth() ||
    (referenceDate.getMonth() === CAREER_START_DATE.getMonth() &&
      referenceDate.getDate() >= CAREER_START_DATE.getDate());
  if (!anniversaryReached) years -= 1;
  return Math.max(0, years);
}

const YEARS_EXPERIENCE = getYearsOfExperience();

export const PROFILE = {
  brand: "Ridnois",
  name: "Sebastian Altamirano",
  role: "Software Developer",
  location: "Santiago, Chile",
  siteUrl: "https://ridnois.github.io",
  github: "https://github.com/Ridnois",
  linkedin: "https://www.linkedin.com/in/sebastian-altamirano-5aa45a132/",
  email: "s.altamiranorid@gmail.com",
  tagline:
    "I build polished frontend products and web3 systems end-to-end — from pixel-perfect UI to audit-ready smart contracts. When I'm not at the keyboard, I'm probably on inline skates.",
  summary:
    `With over ${YEARS_EXPERIENCE} years of experience, I started my career at Yapo.cl building components and flows for a ~1M daily-user marketplace, laying strong foundations in TypeScript, design systems, and testing. At Globant I became the go-to frontend technical reference across high-profile projects for Disney, UNICEF, LATAM Airlines and British Airways — shipping Next.js applications to production, unblocking critical pre-release issues under pressure, and serving as the architectural decision point within my team. Most recently, as founder of WEBAI3, I independently designed and deployed ERC-20 contracts, a multisig vault architecture using Gnosis Safe, and an AI inference layer on top of X402 and Ethereum — extending my expertise from frontend into full-stack decentralized development.`,
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
    // TODO: point this at the specific WEBAI3 repo(s) once they're public.
    href: "https://github.com/Ridnois",
    highlight:
      "Designed and deployed ERC-20 contracts, a Gnosis Safe multisig vault, and an AI inference layer on X402 + Ethereum.",
    tech: ["Solidity", "Ethereum", "Hardhat", "Foundry", "Gnosis Safe", "Systems Architecture"],
    bullets: [
      "Designed and deployed ERC-20 token contracts with a full test suite (Hardhat + Foundry).",
      "Implemented a multisig vault architecture with Gnosis Safe: signer policies, timelock and recovery logic.",
      "Built an X402 facilitator to validate and settle on-chain payments for the inference layer.",
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
      "Owned core components and user flows across the platform's main marketplace experience.",
      "Implemented design systems and analytics integrations using TypeScript, Custom Elements and SCSS.",
    ],
  },
];

// Reversed so frontend tags (the deepest area of experience, from the
// earliest roles) lead, instead of the most recent (web3) role's tags.
export const SKILLS = Array.from(
  new Set([...EXPERIENCE].reverse().flatMap((job) => job.tech))
);

export const STATS = [
  { value: `${YEARS_EXPERIENCE}+`, label: "years experience" },
  { value: `${EXPERIENCE.length}`, label: "companies" },
  { value: "~1M", label: "daily users at Yapo.cl" },
  { value: "4", label: "global brands shipped" },
];

export const WHY_HIRE_ME = {
  title: "Why hire me",
  intro:
    "I don't think I have all the answers — but I've been around long enough to help a team find them.",
  pillars: [
    {
      label: "Design and build, together",
      body: "I don't hand a design off to be built later — I design and implement in the same pass, so decisions get pressure-tested against real constraints immediately.",
    },
    {
      label: "Full range, one owner",
      body: "Pixel-perfect UI one day, an audit-ready smart contract the next — I own a problem end-to-end instead of handing off the hard parts.",
    },
    {
      label: "The team's technical reference",
      body: "At Globant I was the engineer teammates defaulted to for the hardest task, and the one who unblocked everyone else's.",
    },
  ],
};

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
