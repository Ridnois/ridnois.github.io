import { ImageResponse } from "next/og";

import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og-image";
import { PROFILE } from "@/lib/resume-data";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const dynamic = "force-static";

export default async function Image() {
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
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#ffffff",
            }}
          />
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>Open to work</div>
        </div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 700, lineHeight: 1 }}>
          {PROFILE.brand}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#e4e4e7", marginTop: 20 }}>
          {PROFILE.name} — {PROFILE.role}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#71717a", marginTop: 16, maxWidth: 900 }}>
          TypeScript · React · Next.js · Web3
        </div>
      </div>
    ),
    { ...size }
  );
}
