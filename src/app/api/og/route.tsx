import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Rohan P. Suresh";
  const subtitle =
    searchParams.get("subtitle") || "Full Stack Developer";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a12 0%, #13132a 50%, #0a0a12 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <span style={{ color: "#6366f1", fontSize: "28px", fontWeight: 700 }}>
            R
          </span>
          <span style={{ color: "#f0f0f5", fontSize: "28px", fontWeight: 700 }}>
            ohan
          </span>
          <span style={{ color: "#6366f1", fontSize: "28px", fontWeight: 700 }}>
            .
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: "#f0f0f5",
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "800px",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#8888a0",
            fontSize: "24px",
            marginTop: "20px",
            maxWidth: "600px",
          }}
        >
          {subtitle}
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "#8888a0",
            fontSize: "18px",
          }}
        >
          <span>rohansuresh.dev</span>
          <span style={{ color: "#1e1e3a" }}>|</span>
          <span>Full Stack Developer</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
