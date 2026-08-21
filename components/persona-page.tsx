"use client";

import { useEffect } from "react";
import { Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social";
import { SceneCanvas } from "@/components/scene/scene-canvas";
import { useSceneStore, type ShapeKind } from "@/lib/scene-store";

const LINKS = [
  { label: "GitHub", href: "https://github.com/ridnois", icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ridnois",
    icon: LinkedinIcon,
  },
  { label: "Email", href: "mailto:s.altamiranorid@gmail.com", icon: Mail },
];

interface PersonaPageProps {
  role: string;
  bio: string;
  shape: ShapeKind;
  color: string;
}

export function PersonaPage({ role, bio, shape, color }: PersonaPageProps) {
  const setShape = useSceneStore((s) => s.setShape);
  const setColor = useSceneStore((s) => s.setColor);

  useEffect(() => {
    setShape(shape);
    setColor(color);
  }, [shape, color, setShape, setColor]);

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      <div className="pointer-events-none absolute -top-1/3 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-7xl flex-col gap-12 px-6 py-14 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <div className="flex flex-col gap-6 lg:w-[22rem] lg:shrink-0">
          <Badge variant="outline" className="w-fit">
            {role}
          </Badge>

          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              Ridnois
            </h1>
            <p className="max-w-sm text-balance text-muted-foreground">
              {bio}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-0 rounded-4xl bg-primary/10 blur-2xl" />
          <div className="relative aspect-video w-full overflow-hidden rounded-4xl border border-border/60 bg-card/40 shadow-2xl ring-1 ring-inset ring-foreground/10 backdrop-blur-sm">
            <SceneCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}
