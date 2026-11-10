import { ImageResponse } from "next/og";

export const alt = "GreenPune — Native Tree Plantation & Urban Greening Movement";
export const size = {
  width: 1200,
  height: 630
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
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0d2610 0%, #173819 50%, #0d2610 100%)",
          fontFamily: "sans-serif",
          color: "white",
          position: "relative"
        }}
      >
        {/* Decorative corner glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(102, 184, 46, 0.35) 0%, transparent 70%)"
          }}
        />

        {/* Brand header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontSize: "44px",
              background: "rgba(102, 184, 46, 0.2)",
              padding: "8px 16px",
              borderRadius: "16px",
              border: "1px solid rgba(102, 184, 46, 0.4)"
            }}
          >
            ☘️
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.02em" }}>
              GREEN<span style={{ color: "#66b82e" }}>PUNE</span>
            </span>
            <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Citizen Urban Greening Movement
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "920px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#ffffff"
            }}
          >
            Pune Needs Trees. <span style={{ color: "#66b82e" }}>We Are Planting Them.</span>
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.4,
              margin: 0
            }}
          >
            1 Million native trees in Pune with 3-year survival care. Community plantation drives across Anandvan, Mahadevwadi, and Pune Tekdis.
          </p>
        </div>

        {/* Bottom stats / pill row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px"
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#66b82e" }}>110+</span>
              <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)" }}>Trees Planted</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#66b82e" }}>100%</span>
              <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)" }}>Native Species</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#66b82e" }}>3 Years</span>
              <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)" }}>Stewardship Care</span>
            </div>
          </div>

          <div
            style={{
              background: "#66b82e",
              color: "#0d2610",
              fontWeight: 800,
              fontSize: "16px",
              padding: "12px 28px",
              borderRadius: "99px"
            }}
          >
            greenpune.in
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
