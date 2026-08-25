import { ImageResponse } from "next/og";

export const alt = "Latansa - Solusi Software untuk Bisnis & Pendidikan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* blobs dekoratif */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(14,165,233,0.28), transparent 70%)",
          }}
        />

        {/* logo mark */}
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: 30,
            background: "linear-gradient(135deg,#b8f2d4,#93e7bd)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          <span style={{ color: "#065f46", fontSize: 64, fontWeight: 800 }}>
            L
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          Latansa
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            fontSize: 34,
            color: "#94a3b8",
          }}
        >
          Solusi Software untuk Bisnis dan Pendidikan
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            padding: "12px 28px",
            borderRadius: 9999,
            border: "1px solid rgba(52,211,153,0.45)",
            color: "#6ee7b7",
            fontSize: 24,
          }}
        >
          latansa.biz.id
        </div>
      </div>
    ),
    size,
  );
}
