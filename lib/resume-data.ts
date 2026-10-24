// Single source of truth for the site, the plain-text resume, /llms.txt,
// /resume.json (JSON Resume) and the JSON-LD block. Edit here only.

type YearMonth = `${number}-${string}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatPeriod(start: YearMonth, end?: YearMonth): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

// Career start is derived from the earliest role so "years of experience"
// never goes stale or disagrees with the timeline.
function careerStart(): Date {
  const earliest = EXPERIENCE.map((job) => job.start).sort()[0];
  const [year, month] = earliest.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

export function getYearsOfExperience(referenceDate: Date = new Date()): number {
  const start = careerStart();
  let years = referenceDate.getFullYear() - start.getFullYear();
  const anniversaryReached =
    referenceDate.getMonth() > start.getMonth() ||
    (referenceDate.getMonth() === start.getMonth() &&
      referenceDate.getDate() >= start.getDate());
  if (!anniversaryReached) years -= 1;
  return Math.max(0, years);
}

export const CAPABILITIES = [
  "Front-end engineering",
  "Design systems",
  "API building",
  "System design",
  "Smart contracts",
  "Testing & CI/CD",
];

export const LANGUAGES = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Professional" },
];

export const EXPERIENCE = [
  {
    company: "WEBAI3",
    role: "Founder & Engineer",
    location: "Santiago, Chile",
    start: "2025-12" as YearMonth,
    end: undefined as YearMonth | undefined,
    mode: "Owner — product, architecture and delivery",
    mission:
      "Pay-per-call AI inference settled on-chain: a token, a multisig treasury and the services that bill every request.",
    bullets: [
      "Designed and deployed ERC-20 contracts with a full Hardhat + Foundry test suite.",
      "Built the Gnosis Safe multisig vault: signer policies, timelock and recovery logic.",
      "Wrote an X402 facilitator that validates and settles on-chain payments for the inference layer.",
      "Architected the inference layer as microservices with on-chain billing and endpoint security.",
    ],
    tech: ["Solidity", "Ethereum", "Hardhat", "Foundry", "Gnosis Safe", "X402", "Next.js"],
    repos: [
      { label: "Contracts", href: "https://github.com/Ridnois/webai3_token" },
      { label: "x402 facilitator", href: "https://github.com/Ridnois/webai3-facilitator" },
      { label: "Web app", href: "https://github.com/Ridnois/webai3_web" },
      { label: "Docs", href: "https://github.com/Ridnois/webai3_docs" },
    ],
  },
  {
    company: "Globant",
    role: "Web UI Developer (Sr.)",
    location: "Santiago, Chile",
    start: "2022-02" as YearMonth,
    end: "2025-06" as YearMonth,
    mode: "Technical reference for a 4-engineer front-end team",
    mission:
      "Production Next.js applications for Disney, UNICEF, LATAM Airlines and British Airways, one to two a year.",
    bullets: [
      "Owned the hardest tickets and was the architectural decision point; teammates came to me to get unblocked.",
      "Resolved critical pre-release blockers under tight deadlines across several client accounts.",
      "Ran the delivery pipeline end to end: design systems, CI/CD, performance audits and technical debt.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Unit & E2E testing", "CI/CD"],
  },
  {
    company: "Yapo.cl",
    role: "Frontend Engineer",
    location: "Santiago, Chile",
    start: "2019-02" as YearMonth,
    end: "2021-06" as YearMonth,
    mode: "Component owner on a high-traffic marketplace",
    mission:
      "Where the foundations were laid: TypeScript discipline, design systems and analytics on a production marketplace.",
    bullets: [
      "Owned core components and user flows in the main marketplace experience.",
      "Implemented a design system and analytics integrations with TypeScript, Custom Elements and SCSS.",
    ],
    tech: ["TypeScript", "Custom Elements", "SCSS"],
  },
].map((job) => ({ ...job, period: formatPeriod(job.start, job.end) }));

export const PROFILE = {
  brand: "Ridnois",
  name: "Sebastian Altamirano",
  role: "Software Engineer",
  location: "Santiago, Chile",
  siteUrl: "https://ridnois.github.io",
  github: "https://github.com/Ridnois",
  linkedin: "https://www.linkedin.com/in/sebastian-altamirano-5aa45a132/",
  email: "s.altamiranorid@gmail.com",
  headline: "I design and ship the front end, the APIs behind it, and the systems around both.",
  pitch: `${getYearsOfExperience()} years turning ambiguous product problems into production software: Next.js apps for global brands, component systems that survive multiple teams, and on-chain payment infrastructure I architected and operated alone.`,
};

export interface Project {
  name: string;
  kind: string;
  featured?: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
  href: string;
  repos?: { label: string; href: string }[];
}

export const PROJECTS: Project[] = [
  {
    name: "WEBAI3",
    kind: "Company · Web3 infrastructure",
    featured: true,
    summary:
      "Pay-per-call AI inference settled on-chain. I designed and built every layer: the token contracts, the multisig treasury, the payment facilitator and the web app that sits on top.",
    highlights: [
      "ERC-20 contracts with Hardhat and Foundry test suites, plus deployment scripts for Sepolia and mainnet.",
      "x402 payment facilitator settling USDC on Ethereum mainnet through EIP-3009 transfer authorizations, with a documented hot-wallet security model.",
      "Developer docs written alongside the code: architecture, environment, deployment and threat notes.",
    ],
    tech: ["Solidity", "Foundry", "Hardhat", "TypeScript", "Next.js", "x402", "EIP-3009"],
    href: "https://github.com/Ridnois/webai3_token",
    repos: [
      { label: "Contracts", href: "https://github.com/Ridnois/webai3_token" },
      { label: "x402 facilitator", href: "https://github.com/Ridnois/webai3-facilitator" },
      { label: "Web app", href: "https://github.com/Ridnois/webai3_web" },
      { label: "Docs", href: "https://github.com/Ridnois/webai3_docs" },
      { label: "Dev docs", href: "https://github.com/Ridnois/webai3-dev-docs" },
    ],
  },
  {
    name: "Redtail Shorts",
    kind: "Side project · AI content pipeline",
    summary:
      "A YouTube Shorts factory run by an AI agent. An Obsidian vault is the single source of truth; a Python pipeline turns an approved idea into a scripted, voiced, rendered, mastered and published video.",
    highlights: [
      "Stage gates and a vault linter (check_vault.py) fail the run when rules are broken, so quality is enforced by code, not memory.",
      "Single-take TTS, Blender (EEVEE) 3D plates, ffmpeg assembly and audio mastered to −14 LUFS.",
      "YouTube upload and analytics scripts close the loop: metrics feed the next idea.",
    ],
    tech: ["Python", "Blender", "ffmpeg", "Claude Code", "YouTube API", "Obsidian"],
    href: "https://github.com/Ridnois/ai_shorts",
  },
  {
    name: "Orientador Legal",
    kind: "Side project · Product & architecture",
    summary:
      "A legal-orientation platform for Chile: sourced, plain-language answers with a hand-off to a real lawyer. Built to be demoable alone and to split into services later without a rewrite.",
    highlights: [
      "Next.js as a backend-for-frontend: thin route handlers proxy to ingestion, agent, documents and lawyers services.",
      "Every service boundary is justified by a different lifecycle and failure profile, and documented in ARCHITECTURE.md.",
      "Confidence and sources are first-class UI, and the architecture rejects unmatched citations before they reach the screen.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "React Query", "Zod"],
    href: "https://github.com/Ridnois/ai_orientator",
  },
];

// Skills grouped by what I can do, not by tool. `tools` is supporting detail.
export const SKILL_AREAS = [
  {
    area: "Front-end engineering",
    skills: [
      "Production Next.js / React architecture",
      "Rendering strategy, performance audits and Core Web Vitals",
      "Accessibility and responsive design",
      "Animation and interaction (GSAP, Motion, Three.js)",
    ],
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Zustand", "Redux"],
  },
  {
    area: "Design systems",
    skills: [
      "Shared component libraries across teams and client brands",
      "Design tokens and theming",
      "Design-to-code in one pass",
    ],
    tools: ["Figma", "shadcn/ui", "SCSS", "Custom Elements"],
  },
  {
    area: "API building",
    skills: [
      "Backend-for-frontend and service-facing contracts",
      "Payment and settlement endpoints (X402, EIP-3009)",
      "Schema validation and typed boundaries",
    ],
    tools: ["Node.js", "REST", "Zod", "Postman"],
  },
  {
    area: "System design",
    skills: [
      "Service boundaries based on lifecycle and failure profile",
      "On-chain billing and endpoint security",
      "Build-vs-buy and 'not yet' decisions, written down",
    ],
    tools: ["Microservices", "MQTT", "Docker", "IPFS"],
  },
  {
    area: "Smart contracts & Web3",
    skills: [
      "ERC-20 token design and deployment",
      "Multisig treasuries: signer policy, timelock, recovery",
      "Contract test suites in two frameworks",
    ],
    tools: ["Solidity", "Hardhat", "Foundry", "Gnosis Safe", "Ethereum"],
  },
  {
    area: "Quality & delivery",
    skills: [
      "Unit, integration and E2E testing",
      "CI/CD pipelines and static deployments",
      "Technical-debt triage under release pressure",
    ],
    tools: ["Vitest", "GitHub Actions", "Vercel", "ESLint", "pnpm"],
  },
  {
    area: "AI-assisted engineering",
    skills: [
      "Agent workflows with explicit rules, gates and feedback loops",
      "Automating media and content pipelines",
      "Prompting for code with the repo as the source of truth",
    ],
    tools: ["Claude Code", "Python", "Rust", "Go", "Lua", "Blender"],
  },
];

export const SKILLS = Array.from(
  new Set(SKILL_AREAS.flatMap((area) => [area.area, ...area.tools]))
);

export const STATS = [
  { value: `${getYearsOfExperience()}+`, label: "years experience" },
  { value: "4", label: "global brands shipped" },
  { value: `${EXPERIENCE.length}`, label: "companies" },
];

export const WHY_HIRE_ME = {
  title: "What you get",
  intro: "An engineer who owns the problem, not just the ticket.",
  pillars: [
    {
      label: "Design and build in one pass",
      body: "Decisions get pressure-tested against real constraints immediately instead of surviving a hand-off.",
    },
    {
      label: "Front end to settlement layer",
      body: "I can take a feature from the interface down to the API and the contract that backs it, and explain each trade-off.",
    },
    {
      label: "The person teammates default to",
      body: "At Globant I owned the hardest task and unblocked everyone else's. I leave systems documented for the next person.",
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

export const CONTACT = {
  subject: "Opportunity: Software Engineer",
  body: "Hi Sebastian,\n\nI'm reaching out about:\n- Role / project:\n- Stack and team:\n- Timeline:\n\nThanks,",
};

export const CONTACT_MAILTO = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
  CONTACT.subject
)}&body=${encodeURIComponent(CONTACT.body)}`;

export const MACHINE_ENDPOINTS = [
  { path: "/llms.txt", label: "llms.txt", note: "Summary for LLMs and agents" },
  { path: "/resume.json", label: "resume.json", note: "JSON Resume schema" },
  { path: "/resume", label: "/resume", note: "Plain HTML, no JS needed" },
  { path: "/resume.pdf", label: "resume.pdf", note: "Printable PDF" },
];

export const AGENT_PROMPT = `Evaluate Sebastian Altamirano (Ridnois) for the role I'm hiring for. Read ${PROFILE.siteUrl}/llms.txt first, then ${PROFILE.siteUrl}/resume.json for structured detail. Cite specific evidence for each requirement, state clearly where the evidence is missing, then draft the first email to ${PROFILE.email}.`;
