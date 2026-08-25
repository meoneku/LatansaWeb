"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#020617",
          color: "#e2e8f0",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
          Terjadi kesalahan serius
        </h1>
        <p style={{ marginTop: 12, color: "#94a3b8" }}>
          {error.digest ? `Kode: ${error.digest}` : "Silakan coba lagi."}
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 24,
            padding: "12px 28px",
            borderRadius: 9999,
            background: "#059669",
            color: "#ffffff",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          Coba Lagi
        </button>
      </body>
    </html>
  );
}
