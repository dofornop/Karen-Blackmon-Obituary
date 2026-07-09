import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Karen Sue Blackmon, August 15, 1945 – July 6, 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoPath = path.join(process.cwd(), "public/images/karen-hero.jpg");
  const photoBuffer = fs.readFileSync(photoPath);
  const photoSrc = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2c3e50",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: 28,
            overflow: "hidden",
            border: "6px solid #b8964f",
            display: "flex",
            flexShrink: 0,
            marginRight: 64,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={340}
            height={340}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, color: "#ffffff", lineHeight: 1.15 }}>
            Karen Sue Blackmon
          </div>
          <div style={{ fontSize: 30, color: "#d9dee6", marginTop: 20 }}>
            August 15, 1945 – July 6, 2026
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
