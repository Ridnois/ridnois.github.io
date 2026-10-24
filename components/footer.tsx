import { PROFILE } from "@/lib/resume-data";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. {PROFILE.location}.
        </p>
        <p className="font-mono text-xs">Next.js · Tailwind · static export on GitHub Pages</p>
      </div>
    </footer>
  );
}
