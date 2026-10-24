import { GithubIcon } from "@/components/icons/social";
import { Reveal, SectionHeader, Tag } from "@/components/section-primitives";
import { EXPERIENCE } from "@/lib/resume-data";

export function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
      <Reveal>
        <SectionHeader
          index="01"
          label="Work"
          title="Three roles, three ways of owning a problem."
          intro="From a component owner on a busy marketplace, to the technical reference for a team shipping for global brands, to running every layer of a company alone."
        />
      </Reveal>

      <ol className="mt-12 flex flex-col">
        {EXPERIENCE.map((job, i) => (
          <li key={job.company}>
            <Reveal className="grid gap-6 border-t border-border py-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs tracking-widest text-brand uppercase">
                  {String(i + 1).padStart(2, "0")} · {job.period}
                </span>
                <h3 className="font-heading text-3xl font-medium tracking-tight">{job.company}</h3>
                <p className="text-base font-medium text-foreground">{job.role}</p>
                <p className="text-sm text-muted-foreground">{job.location}</p>
              </div>

              <div className="flex max-w-3xl flex-col gap-5">
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  Mode: {job.mode}
                </p>
                <p className="font-heading text-2xl leading-snug text-balance text-foreground">
                  {job.mission}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base text-pretty text-foreground/80">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-brand" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {job.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                {"repos" in job && job.repos && (
                  <ul aria-label="Source code" className="flex flex-wrap gap-x-5 gap-y-1">
                    {job.repos.map((repo) => (
                      <li key={repo.href}>
                        <a
                          href={repo.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        >
                          <GithubIcon className="size-4" />
                          {repo.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
