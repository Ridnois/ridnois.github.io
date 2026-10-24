import { describe, expect, it } from "vitest";

import { buildJsonResume, buildLlmsTxt } from "@/lib/machine-readable";
import { EXPERIENCE, PROFILE, PROJECTS } from "@/lib/resume-data";

describe("buildLlmsTxt", () => {
  const text = buildLlmsTxt();

  it("follows the llms.txt shape: H1 title then a blockquote summary", () => {
    expect(text.startsWith(`# ${PROFILE.name}`)).toBe(true);
    expect(text).toMatch(/\n> /);
  });

  it("mentions every employer and project", () => {
    for (const job of EXPERIENCE) expect(text).toContain(job.company);
    for (const project of PROJECTS) expect(text).toContain(project.name);
  });

  it("does not reference removed persona pages", () => {
    expect(text).not.toMatch(/3d-artist|\/human|\/dev/);
  });
});

describe("buildJsonResume", () => {
  const resume = buildJsonResume();

  it("has one work entry per job, with ISO start dates and no endDate while current", () => {
    expect(resume.work).toHaveLength(EXPERIENCE.length);
    for (const w of resume.work) expect(w.startDate).toMatch(/^\d{4}-\d{2}$/);
    expect(resume.work.find((w) => w.name === "WEBAI3")).not.toHaveProperty("endDate");
  });

  it("is serialisable", () => {
    expect(() => JSON.stringify(resume)).not.toThrow();
  });
});
