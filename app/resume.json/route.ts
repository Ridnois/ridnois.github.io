import { buildJsonResume } from "@/lib/machine-readable";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildJsonResume());
}
