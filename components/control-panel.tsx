"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ACCENT_COLORS, SHAPES, useSceneStore } from "@/lib/scene-store";
import { cn } from "@/lib/utils";

export function ControlPanel() {
  const shape = useSceneStore((s) => s.shape);
  const setShape = useSceneStore((s) => s.setShape);
  const color = useSceneStore((s) => s.color);
  const setColor = useSceneStore((s) => s.setColor);
  const wireframe = useSceneStore((s) => s.wireframe);
  const setWireframe = useSceneStore((s) => s.setWireframe);
  const autoRotate = useSceneStore((s) => s.autoRotate);
  const setAutoRotate = useSceneStore((s) => s.setAutoRotate);
  const rotationSpeed = useSceneStore((s) => s.rotationSpeed);
  const setRotationSpeed = useSceneStore((s) => s.setRotationSpeed);

  return (
    <Card className="w-full max-w-sm border-border/60 bg-background/70 shadow-xl backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Scene Controls</CardTitle>
          <Badge variant="secondary">react-three-fiber</Badge>
        </div>
        <CardDescription>
          Drag to orbit. Every control below writes to one zustand store that
          the canvas reads from, so the DOM and the WebGL scene stay in sync.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label>Shape</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {SHAPES.map((s) => (
              <Button
                key={s.value}
                type="button"
                size="sm"
                variant={shape === s.value ? "default" : "outline"}
                onClick={() => setShape(s.value)}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Color</Label>
          <div className="flex gap-2">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Set color ${c}`}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={cn(
                  "size-6 rounded-full ring-2 ring-offset-2 ring-offset-background transition-transform hover:scale-110",
                  color === c ? "ring-foreground" : "ring-transparent"
                )}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="rotation-speed">Rotation speed</Label>
            <span className="text-xs text-muted-foreground">
              {rotationSpeed.toFixed(1)}x
            </span>
          </div>
          <Slider
            id="rotation-speed"
            value={[rotationSpeed]}
            min={0}
            max={2.5}
            step={0.1}
            onValueChange={(v) =>
              setRotationSpeed(Array.isArray(v) ? v[0] : v)
            }
            disabled={!autoRotate}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-rotate">Auto-rotate</Label>
          <Switch
            id="auto-rotate"
            checked={autoRotate}
            onCheckedChange={setAutoRotate}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="wireframe">Wireframe</Label>
          <Switch
            id="wireframe"
            checked={wireframe}
            onCheckedChange={setWireframe}
          />
        </div>
      </CardContent>
    </Card>
  );
}
