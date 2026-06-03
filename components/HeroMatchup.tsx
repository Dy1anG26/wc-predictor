export default function HeroMatchup() {
  return (
    <div
      style={{
        padding: "28px 20px 20px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        flexShrink: 0,
      }}
    >
      <p
        style={{
          color: "#84CEEF",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: "18px",
        }}
      >
        FIFA World Cup 2026 · Group Stage
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {/* South Africa */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              fontSize: "40px",
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.45))",
              animation: "float 3s ease-in-out infinite",
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            🇿🇦
          </div>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "6px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            South Africa
          </p>
        </div>

        {/* VS block */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 900,
              color: "#F18000",
              letterSpacing: "0.2em",
              animation: "vsPulse 2s ease-in-out infinite",
            }}
          >
            VS
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.35)",
              marginTop: "4px",
            }}
          >
            14 Jun · 21:00 SAST
          </div>
        </div>

        {/* Mexico */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              fontSize: "40px",
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.45))",
              animation: "float 3s ease-in-out 1.5s infinite",
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            🇲🇽
          </div>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "6px",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Mexico
          </p>
        </div>
      </div>
    </div>
  );
}
