"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dev", href: "/dev" },
  { label: "3D Artist", href: "/3d-artist" },
  { label: "Human", href: "/human" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground/70 bg-background/70 backdrop-blur-md">
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center px-6 lg:px-10">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Ridnois
        </Link>
        <nav className="font-body absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-lg font-semibold tracking-tight">
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-brand after:to-brand-2 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
                  active
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "font-body gap-1.5 font-semibold tracking-tight"
            )}
          >
            <Download />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
