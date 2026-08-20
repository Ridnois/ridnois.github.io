
import { Badge } from "@/components/ui/badge";
import { ControlPanel } from "@/components/control-panel";
import { SceneCanvas } from "@/components/scene/scene-canvas";

export default function Home() {
  return (
    <div className="relative flex gap-8 justify-between min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-muted">
      <div className="border-2 p-4">
        Ridnois

        Here goes info about me important links
      </div>
      <div className="border-2 p-4 grow">
        <h2 className="m-2 text-4xl font-bold text-accent-foreground">Khaaa</h2>
        <div className="relative">
          <div className="absolute bg-cyan-100 border-2 w-full aspect-video rounded-4xl">
            <SceneCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}
