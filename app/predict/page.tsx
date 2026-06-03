"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BgLayers from "@/components/BgLayers";
import TopBar from "@/components/TopBar";
import HeroMatchup from "@/components/HeroMatchup";
import Spinner from "@/components/Spinner";

const KICKOFF = new Date("2026-06-14T19:00:00Z");

type Tab = "details" | "score" | "confirm";
const TAB_ORDER: Tab[] = ["details", "score", "confirm"];
const TAB_LABELS: Record<Tab, string> = {
  details: "Details",
  score: "Score",
  confirm: "Confirm",
};

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
        margin: "14px 0 16px",
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

export default function PredictPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [company, setCompany] = useState("");
  const [sa, setSa] = useState(1);
  const [mex, setMex] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (new Date() >= KICKOFF) {
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
              style={{
                padding: "40px 32px",
                textAlign: "center",
                maxWidth: "360px",
              }}
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
        </div>
      </>
    );
  }

  const handleNextDetails = () => {
    if (!firstName.trim() || !surname.trim() || !company.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setActiveTab("score");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          firstName,
          surname,
          company,
          sa,
          mex,
          prediction: `${sa}-${mex}`,
        }),
      });
    } catch {
      // no-cors — assume success
    }
    router.push(
      `/thanks?name=${encodeURIComponent(firstName)}&sa=${sa}&mex=${mex}`
    );
  };

  const tabIndex = (t: Tab) => TAB_ORDER.indexOf(t);
  const activeIdx = tabIndex(activeTab);
  const isReached = (t: Tab) => tabIndex(t) <= activeIdx;
  const isCompleted = (t: Tab) => tabIndex(t) < activeIdx;

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

        {/* tab bar */}
        <div style={{ padding: "16px 20px 0" }}>
          <div
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              background: "rgba(0,10,22,0.32)",
              border: "0.5px solid rgba(255,255,255,0.13)",
              borderRadius: "14px",
              padding: "5px",
              display: "flex",
              gap: "5px",
            }}
          >
            {TAB_ORDER.map((tab) => {
              const active = activeTab === tab;
              const reached = isReached(tab);
              const done = isCompleted(tab);
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => reached && setActiveTab(tab)}
                  style={{
                    flex: 1,
                    background: active ? "rgba(241,128,0,0.16)" : "transparent",
                    border: active
                      ? "0.5px solid rgba(241,128,0,0.38)"
                      : "0.5px solid transparent",
                    borderRadius: "10px",
                    padding: "10px 4px",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    color: active ? "white" : "rgba(255,255,255,0.48)",
                    opacity: !reached ? 0.4 : 1,
                    pointerEvents: !reached ? "none" : "auto",
                    cursor: reached ? "pointer" : "default",
                    position: "relative",
                    animation: active
                      ? "tabPop 0.25s cubic-bezier(0.34,1.56,0.64,1)"
                      : "none",
                    transition: "background 0.2s, border-color 0.2s, color 0.2s",
                  }}
                >
                  {TAB_LABELS[tab]}
                  {done && (
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        right: "4px",
                        fontSize: "8px",
                        color: "#F18000",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* tab content */}
        <div
          style={{
            padding: "16px 20px 24px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ── Details ── */}
          {activeTab === "details" && (
            <div className="glass-card fade" style={{ padding: "20px" }}>
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#F18000",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                Your Details
              </p>
              <input
                className="glass-input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="glass-input"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <input
                className="glass-input"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              {error && (
                <p
                  style={{
                    fontSize: "11px",
                    color: "#F18000",
                    marginBottom: "10px",
                  }}
                >
                  {error}
                </p>
              )}
              <button className="btn-next" onClick={handleNextDetails}>
                Next — Pick Your Score →
              </button>
            </div>
          )}

          {/* ── Score ── */}
          {activeTab === "score" && (
            <div className="glass-card fade" style={{ padding: "20px" }}>
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
                Predict the full-time score
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* SA */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px", lineHeight: 1 }}>
                    🇿🇦
                  </div>
                  <p
                    style={{
                      fontSize: "8px",
                      color: "rgba(255,255,255,0.55)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    South Africa
                  </p>
                  <Spinner value={sa} onChange={setSa} />
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "#F18000",
                    flexShrink: 0,
                  }}
                >
                  —
                </div>

                {/* Mexico */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px", lineHeight: 1 }}>
                    🇲🇽
                  </div>
                  <p
                    style={{
                      fontSize: "8px",
                      color: "rgba(255,255,255,0.55)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "8px",
                    }}
                  >
                    Mexico
                  </p>
                  <Spinner value={mex} onChange={setMex} />
                </div>
              </div>

              <p
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.4)",
                  textAlign: "center",
                  marginTop: "12px",
                  lineHeight: 1.6,
                }}
              >
                Closest to the final scoreline wins. Exact match takes the prize
                outright.
              </p>

              <PoolStrip />

              <button
                className="btn-next"
                onClick={() => setActiveTab("confirm")}
              >
                Review My Prediction →
              </button>
              <button
                className="btn-glass"
                onClick={() => setActiveTab("details")}
              >
                ← Back to Details
              </button>
            </div>
          )}

          {/* ── Confirm ── */}
          {activeTab === "confirm" && (
            <div className="glass-card fade" style={{ padding: "20px" }}>
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
                Review Your Entry
              </p>

              {/* name row */}
              <div
                className="fade"
                style={{
                  padding: "12px 0",
                  borderBottom: "0.5px solid rgba(255,255,255,0.13)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  animationDelay: "0s",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                  }}
                >
                  Name
                </span>
                <span style={{ fontSize: "12px", fontWeight: 600 }}>
                  {firstName} {surname}
                </span>
              </div>

              {/* company row */}
              <div
                className="fade"
                style={{
                  padding: "12px 0",
                  borderBottom: "0.5px solid rgba(255,255,255,0.13)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  animationDelay: "0.08s",
                }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                  }}
                >
                  Company
                </span>
                <span style={{ fontSize: "12px", fontWeight: 600 }}>
                  {company}
                </span>
              </div>

              {/* prediction row */}
              <div
                className="fade"
                style={{
                  padding: "16px 0",
                  borderBottom: "0.5px solid rgba(255,255,255,0.13)",
                  animationDelay: "0.16s",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Your Prediction
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>🇿🇦</span>
                  <span
                    style={{
                      fontSize: "28px",
                      fontWeight: 900,
                      color: "#F18000",
                    }}
                  >
                    {sa} — {mex}
                  </span>
                  <span style={{ fontSize: "24px" }}>🇲🇽</span>
                </div>
              </div>

              <p
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.4)",
                  textAlign: "center",
                  margin: "14px 0 16px",
                  lineHeight: 1.6,
                }}
              >
                Once submitted your prediction is final. Entries close at
                kickoff — 21:00 SAST.
              </p>

              <button
                className="btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Locking in..." : "Lock In My Prediction 🔒"}
              </button>
              <button
                className="btn-glass"
                onClick={() => setActiveTab("score")}
              >
                ← Change Score
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
