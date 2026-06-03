"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BgLayers from "@/components/BgLayers";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

function ThanksContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "there";
  const sa = searchParams.get("sa") ?? "0";
  const mex = searchParams.get("mex") ?? "0";

  return (
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "36px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "26px", fontWeight: 900, marginBottom: "8px" }}
        >
          You&apos;re{" "}
          <span style={{ color: "#F18000" }}>in!</span>
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "24px",
          }}
        >
          Good luck, {name} 👊
        </p>

        <div
          className="glass-card"
          style={{
            padding: "24px 20px",
            maxWidth: "320px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              color: "#F18000",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Your Prediction
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              animation:
                "scorePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s both",
            }}
          >
            <span style={{ fontSize: "26px" }}>🇿🇦</span>
            <span
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#F18000",
                lineHeight: 1,
              }}
            >
              {sa}
            </span>
            <span
              style={{
                fontSize: "28px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              —
            </span>
            <span
              style={{
                fontSize: "44px",
                fontWeight: 900,
                color: "#F18000",
                lineHeight: 1,
              }}
            >
              {mex}
            </span>
            <span style={{ fontSize: "26px" }}>🇲🇽</span>
          </div>

          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.45)",
              marginTop: "10px",
            }}
          >
            South Africa vs Mexico · 14 Jun 2026
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "8px",
              lineHeight: 1.8,
            }}
          >
            Closest prediction to the final score wins. Results after the
            final whistle ⚽
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ThanksPage() {
  return (
    <>
      <BgLayers />
      <Suspense fallback={null}>
        <ThanksContent />
      </Suspense>
    </>
  );
}
