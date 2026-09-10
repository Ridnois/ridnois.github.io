import { Badge } from "@/components/ui/badge";

export function OpenToWorkBadge() {
  return (
    <Badge variant="outline" className="h-6 w-fit gap-2 px-3 text-sm">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-gradient-to-br from-brand to-brand-2 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-gradient-to-br from-brand to-brand-2" />
      </span>
      Open to work
    </Badge>
  );
}
