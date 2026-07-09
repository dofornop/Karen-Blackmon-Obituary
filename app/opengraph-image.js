import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Karen Sue Blackmon, August 15, 1945 – July 6, 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function toDataUri(relativePath, mime = "image/jpeg") {
  const filePath = path.join(process.cwd(), relativePath);
  const buffer = fs.readFileSync(filePath);
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export default async function Image() {
  const bgSrc = toDataUri("public/images/LakeErieLighthouse.jpg");
  const photoSrc = toDataUri("public/images/karen-hero.jpg");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(to top, rgba(15,23,32,0.88) 0%, rgba(15,23,32,0.2) 55%, rgba(15,23,32,0.4) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 64,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 28,
              overflow: "hidden",
              border: "7px solid #b8964f",
              display: "flex",
              flexShrink: 0,
              marginRight: 48,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              width={320}
              height={320}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 58, color: "#ffffff", lineHeight: 1.15 }}>
              Karen Sue Blackmon
            </div>
            <div style={{ fontSize: 28, color: "#e7e2d4", marginTop: 16 }}>
              August 15, 1945 – July 6, 2026
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
