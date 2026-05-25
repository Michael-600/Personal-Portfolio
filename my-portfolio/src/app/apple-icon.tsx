import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          boxShadow: "inset 0 0 0 2px rgba(34,211,238,0.25)",
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
            color: "#0a0a0c",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            borderRadius: 24,
            lineHeight: 1,
          }}
        >
          M
        </div>
      </div>
    ),
    size
  );
}
