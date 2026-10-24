import { Reveal } from "@/components/section-primitives";
import { WHY_HIRE_ME } from "@/lib/resume-data";

export function Why() {
  return (
    <section id="why" className="border-y border-border bg-foreground text-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-10">
        <Reveal className="flex max-w-3xl flex-col gap-3">
          <p className="font-mono text-xs font-medium tracking-widest uppercase opacity-70">
            <span className="text-brand-2">04</span> / {WHY_HIRE_ME.title}
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {WHY_HIRE_ME.intro}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {WHY_HIRE_ME.pillars.map((pillar) => (
            <Reveal key={pillar.label} className="flex flex-col gap-2 border-t border-background/30 pt-4">
              <h3 className="font-heading text-xl font-medium">{pillar.label}</h3>
              <p className="text-base text-pretty opacity-75">{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
