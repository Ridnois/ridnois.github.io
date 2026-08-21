"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dev", href: "/dev" },
  { label: "3D Artist", href: "/3d-artist" },
  { label: "Human", href: "/human" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-sm font-bold tracking-tight">
          Ridnois
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors",
                  active
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
