"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import BgLayers from "@/components/BgLayers";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";

interface Winner {
  name: string;
  company: string;
  prediction: string;
}

function DrawContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [finalSA, setFinalSA] = useState(1);
  const [finalMex, setFinalMex] = useState(1);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [drawStarted, setDrawStarted] = useState(false);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [currentName, setCurrentName] = useState("");

  const validKey =
    process.env.NEXT_PUBLIC_DRAW_KEY &&
    key === process.env.NEXT_PUBLIC_DRAW_KEY;

  if (!validKey) {
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
            <h2
              style={{ fontSize: "22px", fontWeight: 900, marginBottom: "12px" }}
            >
              Access denied
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
              Invalid or missing access key.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const loadWinners = async () => {
    setLoading(true);
    setLoaded(false);
    setWinners([]);
    setWinner(null);
    setDrawStarted(false);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APPS_SCRIPT_URL}?action=getWinners&finalSA=${finalSA}&finalMex=${finalMex}`
      );
      const data = await res.json();
      if (data.success) {
        setWinners(data.winners);
        setLoaded(true);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const runSlotMachine = () => {
    setSpinning(true);
    setWinner(null);
    setDrawStarted(true);
    let interval = 60;
    let elapsed = 0;
    const totalDuration = 4000;
    const chosenWinner = winners[Math.floor(Math.random() * winners.length)];

    const tick = () => {
      setCurrentName(winners[Math.floor(Math.random() * winners.length)].name);
      elapsed += interval;
      if (elapsed < totalDuration) {
        interval = Math.min(interval * 1.08, 400);
        setTimeout(tick, interval);
      } else {
        setCurrentName(chosenWinner.name);
        setWinner(chosenWinner);
        setSpinning(false);
        confetti({
          particleCount: 120,
          spread: 80,
          colors: ["#F18000", "#FAAF40", "#84CEEF"],
          origin: { y: 0.6 },
        });
      }
    };
    setTimeout(tick, interval);
  };

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
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Enter final score */}
        <div className="glass-card" style={{ padding: "20px" }}>
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
            Enter Final Score
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{ fontSize: "20px", marginBottom: "6px", lineHeight: 1 }}
              >
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
              <Spinner value={finalSA} onChange={setFinalSA} />
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

            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{ fontSize: "20px", marginBottom: "6px", lineHeight: 1 }}
              >
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
              <Spinner value={finalMex} onChange={setFinalMex} />
            </div>
          </div>
          <button
            className="btn-next"
            onClick={loadWinners}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load Eligible Entries"}
          </button>
        </div>

        {/* Winners */}
        {loaded && (
          <div className="glass-card fade" style={{ padding: "20px" }}>
            {winners.length > 0 ? (
              <>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "14px",
                    textAlign: "center",
                  }}
                >
                  🎯 {winners.length}{" "}
                  {winners.length === 1 ? "person" : "people"} predicted{" "}
                  {finalSA}–{finalMex} correctly
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {winners.map((w, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "0.5px solid rgba(255,255,255,0.15)",
                        borderRadius: "20px",
                        padding: "6px 14px",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      {w.name}
                    </div>
                  ))}
                </div>
                <button className="btn-next" onClick={runSlotMachine}>
                  Start the Draw 🎰
                </button>
              </>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                No exact matches found for that scoreline.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Slot machine overlay */}
      {drawStarted && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            background: "rgba(0,8,18,0.85)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 900,
              color: spinning ? "white" : "#FAAF40",
              transition: "color 0.5s",
            }}
          >
            {spinning ? "🎰 Drawing..." : "🎉 We have a winner!"}
          </h2>

          <div
            className="glass-card"
            style={{
              width: "280px",
              padding: "28px 20px",
              textAlign: "center",
              border: !spinning
                ? "0.5px solid rgba(250,175,64,0.4)"
                : undefined,
              boxShadow: !spinning
                ? "0 0 40px rgba(250,175,64,0.2)"
                : undefined,
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: 800,
                minHeight: "36px",
                lineHeight: 1.3,
              }}
            >
              {currentName || "…"}
            </p>
            {!spinning && winner && (
              <>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.5)",
                    marginTop: "6px",
                  }}
                >
                  {winner.company}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#F18000",
                    marginTop: "4px",
                    fontWeight: 700,
                  }}
                >
                  {winner.prediction}
                </p>
              </>
            )}
          </div>

          {!spinning && (
            <button
              className="btn-glass"
              style={{ maxWidth: "280px", marginTop: "0" }}
              onClick={() => {
                setWinner(null);
                setSpinning(false);
                setDrawStarted(false);
                setCurrentName("");
              }}
            >
              Run Again
            </button>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function DrawPage() {
  return (
    <>
      <BgLayers />
      <Suspense fallback={null}>
        <DrawContent />
      </Suspense>
    </>
  );
}
