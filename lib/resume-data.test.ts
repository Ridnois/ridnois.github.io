import { describe, expect, it } from "vitest";

import {
  CONTACT_MAILTO,
  EXPERIENCE,
  PROFILE,
  SKILLS,
  STATS,
  formatPeriod,
  getYearsOfExperience,
} from "@/lib/resume-data";

describe("formatPeriod", () => {
  it("formats a closed range", () => {
    expect(formatPeriod("2022-02", "2025-06")).toBe("Feb 2022 – Jun 2025");
  });

  it("marks an open range as Present", () => {
    expect(formatPeriod("2025-12")).toBe("Dec 2025 – Present");
  });
});

describe("getYearsOfExperience", () => {
  it("clamps to 0 for a date before the career start", () => {
    expect(getYearsOfExperience(new Date(2018, 0, 1))).toBe(0);
  });

  it("counts whole years from the earliest role's start month", () => {
    expect(getYearsOfExperience(new Date(2019, 1, 1))).toBe(0);
    expect(getYearsOfExperience(new Date(2020, 0, 31))).toBe(0);
    expect(getYearsOfExperience(new Date(2020, 1, 1))).toBe(1);
    expect(getYearsOfExperience(new Date(2026, 8, 1))).toBe(7);
  });
});

describe("derived content", () => {
  it("keeps the years stat and the pitch in sync with getYearsOfExperience", () => {
    const years = getYearsOfExperience();
    expect(STATS.find((s) => s.label === "years experience")?.value).toBe(`${years}+`);
    expect(PROFILE.pitch.startsWith(`${years} years`)).toBe(true);
  });

  it("keeps the companies stat in sync with EXPERIENCE length", () => {
    expect(STATS.find((s) => s.label === "companies")?.value).toBe(`${EXPERIENCE.length}`);
  });

  it("derives each period from its start and end", () => {
    for (const job of EXPERIENCE) {
      expect(job.period).toBe(formatPeriod(job.start, job.end));
    }
  });

  it("dedupes SKILLS", () => {
    expect(SKILLS.length).toBe(new Set(SKILLS).size);
  });

  it("pre-fills the mailto subject and body", () => {
    expect(CONTACT_MAILTO.startsWith(`mailto:${PROFILE.email}?subject=`)).toBe(true);
    expect(CONTACT_MAILTO).toContain("&body=");
  });
});
