"use client";

import TextLoop from "@/components/text-loop";

export function HireLoop() {
  return (
    <div className="relative left-1/2 my-0 w-screen -translate-x-1/2 overflow-hidden">
      <TextLoop
        className="text-loop--banner"
        shape="wave"
        text="Available for hire!"
        direction="forward"
        separator="✦"
        curviness={30}
        fontSize={24}
        fontWeight={800}
        letterSpacing={2}
        uppercase
        color="#ffffff"
        ribbon
        ribbonColor="#e52323"
        ribbonWidth={56}
      />
    </div>
  );
}
