import type { Metadata } from "next";
import Link from "next/link";

import {
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PROFILE,
  PROJECTS,
  SKILL_AREAS,
} from "@/lib/resume-data";

export const metadata: Metadata = {
  title: `Resume — ${PROFILE.name}`,
  description: PROFILE.pitch,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16 lg:px-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Open to work
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {PROFILE.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {PROFILE.role} · {PROFILE.location}
        </p>
        <p className="max-w-2xl text-foreground/80">{PROFILE.headline} {PROFILE.pitch}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <li>
            <a href={`mailto:${PROFILE.email}`} className="underline underline-offset-4">
              {PROFILE.email}
            </a>
          </li>
          <li>
            <a href={PROFILE.github} className="underline underline-offset-4">
              GitHub
            </a>
          </li>
          <li>
            <a href={PROFILE.linkedin} className="underline underline-offset-4">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="/resume.pdf" className="underline underline-offset-4">
              Download PDF
            </a>
          </li>
          <li>
            <Link href="/" className="underline underline-offset-4">
              View interactive site
            </Link>
          </li>
        </ul>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Skills</h2>
        <ul className="list-disc pl-5 text-foreground/80">
          {SKILL_AREAS.map((a) => (
            <li key={a.area}>
              <strong>{a.area}:</strong> {a.skills.join("; ")} ({a.tools.join(", ")})
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Experience</h2>
        {EXPERIENCE.map((job) => (
          <article key={job.company} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-foreground">
              {job.role} — {job.company}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job.location} · {job.period}
            </p>
            <ul className="list-disc pl-5 text-foreground/80">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">{job.tech.join(", ")}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Projects</h2>
        {PROJECTS.map((p) => (
          <article key={p.name} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-foreground">
              <a href={p.href} className="underline underline-offset-4">{p.name}</a>
            </h3>
            <p className="text-foreground/80">{p.summary}</p>
            <ul className="list-disc pl-5 text-foreground/80">
              {p.highlights.map((h) => (<li key={h}>{h}</li>))}
            </ul>
            <p className="text-sm text-muted-foreground">{p.tech.join(", ")}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Education</h2>
        <p className="text-foreground/80">
          {EDUCATION.degree} — {EDUCATION.school}, {EDUCATION.location} (
          {EDUCATION.period})
        </p>
        <p className="text-sm text-muted-foreground">{EDUCATION.note}</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Languages</h2>
        <p className="text-foreground/80">
          {LANGUAGES.map((l) => `${l.name} (${l.level})`).join(", ")}
        </p>
      </section>

    </main>
  );
}
