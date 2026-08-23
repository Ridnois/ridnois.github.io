import { ImageResponse } from "next/og";

import { PROFILE } from "@/lib/resume-data";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

export function renderPersonaOgImage({
  role,
  tagline,
  accent,
}: {
  role: string;
  tagline: string;
  accent: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0f",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: accent }} />
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>{role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 700, lineHeight: 1 }}>
          {PROFILE.brand}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#e4e4e7",
            marginTop: 24,
            maxWidth: 940,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
