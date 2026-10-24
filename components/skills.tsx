import { Reveal, SectionHeader } from "@/components/section-primitives";
import { SKILL_AREAS } from "@/lib/resume-data";

export function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
      <Reveal>
        <SectionHeader
          index="03"
          label="Skills"
          title="What I can do, before what I use."
          intro="Capabilities first. Tools are the supporting cast, and they change."
        />
      </Reveal>

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_AREAS.map((area) => (
          <Reveal key={area.area}>
            <section aria-labelledby={`skill-${area.area}`} className="flex h-full flex-col gap-4 border-t-2 border-foreground pt-4">
              <h3 id={`skill-${area.area}`} className="font-heading text-xl font-medium tracking-tight">
                {area.area}
              </h3>
              <ul className="flex flex-col gap-2">
                {area.skills.map((skill) => (
                  <li key={skill} className="text-sm text-pretty text-foreground/80">
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="mt-auto font-mono text-xs leading-relaxed text-muted-foreground">
                {area.tools.join(" · ")}
              </p>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
