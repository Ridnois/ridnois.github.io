export function OpenToWorkBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm font-medium text-foreground">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-brand" />
      </span>
      Open to work
    </span>
  );
}
