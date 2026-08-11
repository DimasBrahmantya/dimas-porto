import { ImageResponse } from "next/og";

export const runtime = "edge";


export const alt = "Dimas Brahmantya Aryasena | Front-End Developer & UI/UX Designer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#fafafa",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          border: "12px solid #000000",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              padding: "8px 24px",
              fontSize: "24px",
              fontWeight: "900",
              letterSpacing: "2px",
              border: "4px solid #000000",
              boxShadow: "6px 6px 0px #000000",
            }}
          >
            DIMASBAS
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "8px 20px",
              fontSize: "20px",
              fontWeight: "700",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            PORTFOLIO 2026
          </div>
        </div>

        {/* Main Title Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "#000000",
              lineHeight: 1.1,
              textTransform: "uppercase",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span>Dimas</span>
            <span
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "4px 16px",
                border: "4px solid #000000",
              }}
            >
              Brahmantya
            </span>
            <span>Aryasena</span>
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#333333",
              fontWeight: "600",
              maxWidth: "900px",
            }}
          >
            Front-End Web Developer & UI/UX Designer | Teknik Informatika UMM (IPK 3.80)
          </div>
        </div>

        {/* Bottom Tech Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {["Next.js 16", "React", "TypeScript", "Tailwind CSS", "Laravel", "Figma"].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                fontSize: "18px",
                fontWeight: "800",
                padding: "8px 16px",
                border: "3px solid #000000",
                boxShadow: "4px 4px 0px #000000",
              }}
            >
              #{tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
