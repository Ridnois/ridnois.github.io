import { describe, expect, it } from "vitest";

import { EXPERIENCE, SKILLS, STATS, getYearsOfExperience } from "@/lib/resume-data";

describe("getYearsOfExperience", () => {
  it("clamps to 0 for a date before the career start", () => {
    expect(getYearsOfExperience(new Date(2018, 0, 1))).toBe(0);
  });

  it("computes whole years elapsed since Feb 2019, counting from the anniversary", () => {
    expect(getYearsOfExperience(new Date(2019, 1, 1))).toBe(0);
    expect(getYearsOfExperience(new Date(2020, 0, 31))).toBe(0);
    expect(getYearsOfExperience(new Date(2020, 1, 1))).toBe(1);
    expect(getYearsOfExperience(new Date(2026, 8, 1))).toBe(7);
  });

  it("never regresses as time moves forward", () => {
    const early = getYearsOfExperience(new Date(2024, 0, 1));
    const later = getYearsOfExperience(new Date(2025, 0, 1));
    expect(later).toBeGreaterThanOrEqual(early);
  });
});

describe("STATS", () => {
  it("keeps the years-of-experience stat in sync with getYearsOfExperience", () => {
    const yearsStat = STATS.find((stat) => stat.label === "years experience");
    expect(yearsStat?.value).toBe(`${getYearsOfExperience()}+`);
  });

  it("keeps the companies stat in sync with EXPERIENCE length", () => {
    const companiesStat = STATS.find((stat) => stat.label === "companies");
    expect(companiesStat?.value).toBe(`${EXPERIENCE.length}`);
  });
});

describe("SKILLS", () => {
  it("dedupes tech tags across all experience entries", () => {
    expect(SKILLS.length).toBe(new Set(SKILLS).size);
  });

  it("includes every tag from every job", () => {
    for (const job of EXPERIENCE) {
      for (const tag of job.tech) {
        expect(SKILLS).toContain(tag);
      }
    }
  });
});
