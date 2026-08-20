import { Badge } from "@/components/ui/badge";
import { ControlPanel } from "@/components/control-panel";
import { SceneCanvas } from "@/components/scene/scene-canvas";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      <div className="absolute inset-0">
        <SceneCanvas />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16 sm:px-10 sm:py-20">
        <header className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit">
            react-three-fiber &middot; drei &middot; shadcn/ui
          </Badge>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Ridnois
          </h1>
          <p className="max-w-md text-muted-foreground">
            Drag the scene to orbit — the canvas sits behind the
            page, and only the panel below captures clicks.
          </p>
        </header>

        <div className="pointer-events-auto mt-auto flex justify-center sm:justify-end">
          <ControlPanel />
        </div>
      </div>
    </div>
  );
}
