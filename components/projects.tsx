import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons/social";
import { Reveal, SectionHeader, Tag } from "@/components/section-primitives";
import { PROJECTS } from "@/lib/resume-data";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="border-t border-border bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionHeader
            index="02"
            label="Projects"
            title="What I build when nobody is asking."
            intro="Public repositories where the decisions are written down. Read the code, then read why."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <Reveal key={project.name} className={cn("h-full", project.featured && "lg:col-span-2")}>
              <article className="group relative flex h-full flex-col gap-5 rounded-2xl border border-border bg-background p-7 transition-colors hover:border-foreground/40">
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    {project.kind}
                  </p>
                  <h3 className="font-heading flex items-start justify-between gap-4 text-3xl font-medium tracking-tight">
                    {project.repos ? (
                      project.name
                    ) : (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {project.name}
                      </a>
                    )}
                    {!project.repos && (
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1.5 size-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                      />
                    )}
                  </h3>
                </div>
                <p className="text-base text-pretty text-foreground/80">{project.summary}</p>
                <ul className="flex flex-col gap-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-pretty text-muted-foreground">
                      <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-brand" />
                      {h}
                    </li>
                  ))}
                </ul>
                {project.repos && (
                  <ul aria-label={`${project.name} repositories`} className="flex flex-wrap gap-2">
                    {project.repos.map((repo) => (
                      <li key={repo.href}>
                        <a
                          href={repo.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-muted"
                        >
                          <GithubIcon className="size-4" />
                          {repo.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
