"use client";

import { useRouter } from "next/navigation";
import BgLayers from "@/components/BgLayers";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import HeroMatchup from "@/components/HeroMatchup";

const KICKOFF = new Date("2026-06-14T19:00:00Z");

function PoolStrip() {
  return (
    <div
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(132,206,239,0.06)",
        border: "0.5px solid rgba(132,206,239,0.16)",
        borderRadius: "12px",
        padding: "11px 14px",
        margin: "14px 20px 0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#84CEEF",
          animation: "blink 2s infinite",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#84CEEF",
          letterSpacing: "0.04em",
        }}
      >
        Entries close at kickoff · 14 June 2026
      </span>
    </div>
  );
}

function ClosedScreen() {
  return (
    <>
      <BgLayers />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopBar />
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            className="glass-card"
            style={{ padding: "40px 32px", textAlign: "center", maxWidth: "360px" }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "12px" }}>
              Entries closed
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              The match has kicked off. Good luck to all who entered! ⚽
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  const router = useRouter();

  if (new Date() >= KICKOFF) {
    return <ClosedScreen />;
  }

  return (
    <>
      <BgLayers />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopBar />
        <HeroMatchup />

        {/* hero card */}
        <div style={{ padding: "0 20px" }}>
          <div
            className="glass-card fade"
            style={{ padding: "24px 20px", textAlign: "center" }}
          >
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 900,
                lineHeight: 1.25,
                marginBottom: "12px",
              }}
            >
              Predict the score.
              <br />
              <em style={{ color: "#F18000", fontStyle: "italic" }}>
                Enter the pool.
              </em>
            </h1>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              Pick the full-time scoreline for SA vs Mexico. Closest prediction
              wins. One prize — make it count.
            </p>
          </div>
        </div>

        {/* stats row */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            margin: "14px 20px 0",
          }}
        >
          {[
            { value: "1", key: "Prize" },
            { value: "Free", key: "Entry" },
            { value: "21:00", key: "Closes" },
          ].map((stat, i) => (
            <div
              key={stat.key}
              className="fade"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.13)",
                borderRadius: "12px",
                padding: "12px 8px",
                textAlign: "center",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                style={{ fontSize: "15px", fontWeight: 800, marginBottom: "4px" }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "8px",
                  color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.key}
              </div>
            </div>
          ))}
        </div>

        <PoolStrip />

        {/* CTA */}
        <div style={{ padding: "14px 20px 0" }}>
          <button className="btn-next" onClick={() => router.push("/predict")}>
            Enter the Prediction Pool ⚽
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
}
