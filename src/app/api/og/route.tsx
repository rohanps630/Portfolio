import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Rohan P. Suresh";
  const subtitle = searchParams.get("subtitle") || "Full Stack Developer";
  const type = searchParams.get("type") || "default";
  const extra = searchParams.get("extra") || ""; // e.g. series name

  let Content;

  if (type === "system") {
    Content = (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ width: "40px", height: "4px", backgroundColor: "#6366f1" }} />
          <span style={{ color: "#6366f1", fontSize: "24px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Case Study
          </span>
        </div>
        <h1 style={{ color: "#f0f0f5", fontSize: "64px", fontWeight: 800, lineHeight: 1.1, margin: 0, maxWidth: "900px" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "#8888a0", fontSize: "32px", marginTop: "10px", maxWidth: "800px", lineHeight: 1.4 }}>
            {subtitle}
          </p>
        )}
      </div>
    );
  } else if (type === "note") {
    Content = (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ color: "#8b5cf6", fontSize: "24px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {extra ? `Series: ${extra}` : "Engineering Note"}
          </span>
        </div>
        <h1 style={{ color: "#f0f0f5", fontSize: "64px", fontWeight: 800, lineHeight: 1.1, margin: 0, maxWidth: "900px" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "#8888a0", fontSize: "32px", marginTop: "10px", maxWidth: "800px", lineHeight: 1.4 }}>
            {subtitle}
          </p>
        )}
      </div>
    );
  } else if (type === "explorer") {
    Content = (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", textAlign: "center", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ padding: "12px 24px", border: "2px solid rgba(99, 102, 241, 0.3)", borderRadius: "100px", color: "#6366f1", fontSize: "24px", fontWeight: 600 }}>
            Architecture Explorer
          </div>
        </div>
        <h1 style={{ color: "#f0f0f5", fontSize: "72px", fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
          {title}
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "40px" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ width: "60px", height: "60px", borderRadius: "12px", border: "2px solid rgba(99, 102, 241, 0.5)", background: "rgba(99, 102, 241, 0.1)" }} />
          <div style={{ width: "60px", height: "60px", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }} />
        </div>
      </div>
    );
  } else {
    Content = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          <span style={{ color: "#6366f1", fontSize: "36px", fontWeight: 700 }}>R</span>
          <span style={{ color: "#f0f0f5", fontSize: "36px", fontWeight: 700 }}>ohan</span>
          <span style={{ color: "#6366f1", fontSize: "36px", fontWeight: 700 }}>.</span>
        </div>
        <h1 style={{ color: "#f0f0f5", fontSize: "72px", fontWeight: 800, lineHeight: 1.1, margin: 0, maxWidth: "900px" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "#8888a0", fontSize: "32px", marginTop: "20px", maxWidth: "800px" }}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

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
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          }}
        />

        {Content}

        {/* Bottom bar */}
        {type !== "explorer" && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "80px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              color: "#8888a0",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            <span style={{ color: "#f0f0f5" }}>rohansuresh.dev</span>
            <span style={{ color: "#1e1e3a" }}>|</span>
            <span>Full Stack Developer</span>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
