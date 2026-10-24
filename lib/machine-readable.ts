import {
  CONTACT_MAILTO,
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  MACHINE_ENDPOINTS,
  PROFILE,
  PROJECTS,
  SKILL_AREAS,
} from "@/lib/resume-data";

// Both documents are generated from resume-data so they can't drift from the site.

export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${PROFILE.name} (${PROFILE.brand})`,
    "",
    `> ${PROFILE.role}. ${PROFILE.headline} Open to work.`,
    "",
    `Location: ${PROFILE.location}`,
    `Email: ${PROFILE.email}`,
    `GitHub: ${PROFILE.github}`,
    `LinkedIn: ${PROFILE.linkedin}`,
    "",
    "## Summary",
    "",
    PROFILE.pitch,
    "",
    "## Experience",
    "",
  ];
  for (const job of EXPERIENCE) {
    lines.push(`### ${job.role}, ${job.company} (${job.period})`, "", job.mission, "");
    lines.push(...job.bullets.map((b) => `- ${b}`), "", `Tech: ${job.tech.join(", ")}`, "");
  }
  lines.push("## Projects", "");
  for (const project of PROJECTS) {
    lines.push(`### ${project.name} (${project.href})`, "", project.summary, "");
    lines.push(...project.highlights.map((h) => `- ${h}`), "");
    if (project.repos) lines.push(...project.repos.map((r) => `- ${r.label}: ${r.href}`), "");
  }
  lines.push("## Skills", "");
  for (const area of SKILL_AREAS) {
    lines.push(`- ${area.area}: ${area.skills.join("; ")} (${area.tools.join(", ")})`);
  }
  lines.push(
    "",
    "## Education",
    "",
    `${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.location} (${EDUCATION.period})`,
    "",
    "## Machine-readable",
    "",
    ...MACHINE_ENDPOINTS.map((e) => `- ${PROFILE.siteUrl}${e.path}: ${e.note}`),
    "",
    "## Contact",
    "",
    `Email ${PROFILE.email}. Pre-filled message: ${CONTACT_MAILTO}`,
    ""
  );
  return lines.join("\n");
}

// https://jsonresume.org/schema
export function buildJsonResume() {
  const [eduStart, eduEnd] = EDUCATION.period.split(" – ");
  return {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: PROFILE.name,
      label: PROFILE.role,
      email: PROFILE.email,
      url: PROFILE.siteUrl,
      summary: `${PROFILE.headline} ${PROFILE.pitch}`,
      location: { city: "Santiago", countryCode: "CL" },
      profiles: [
        { network: "GitHub", username: "Ridnois", url: PROFILE.github },
        { network: "LinkedIn", url: PROFILE.linkedin },
      ],
    },
    work: EXPERIENCE.map((job) => ({
      name: job.company,
      position: job.role,
      location: job.location,
      startDate: job.start,
      ...(job.end ? { endDate: job.end } : {}),
      summary: job.mission,
      highlights: job.bullets,
    })),
    projects: PROJECTS.map((p) => ({
      name: p.name,
      description: p.summary,
      highlights: p.highlights,
      keywords: p.tech,
      url: p.href,
    })),
    education: [
      { institution: EDUCATION.school, area: EDUCATION.degree, startDate: eduStart, endDate: eduEnd },
    ],
    skills: SKILL_AREAS.map((a) => ({ name: a.area, keywords: [...a.skills, ...a.tools] })),
    languages: LANGUAGES.map((l) => ({ language: l.name, fluency: l.level })),
  };
}
