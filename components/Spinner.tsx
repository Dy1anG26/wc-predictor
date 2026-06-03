"use client";

interface SpinnerProps {
  value: number;
  onChange: (v: number) => void;
}

export default function Spinner({ value, onChange }: SpinnerProps) {
  const btnStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    color: "#F18000",
    fontSize: "21px",
    fontWeight: 700,
    width: "42px",
    height: "54px",
    cursor: "pointer",
    transition: "background 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        background: "rgba(0,8,18,0.42)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "0.5px solid rgba(255,255,255,0.13)",
        borderRadius: "12px",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        style={btnStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(241,128,0,0.14)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
        onMouseDown={(e) =>
          (e.currentTarget.style.transform = "scale(0.85)")
        }
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        −
      </button>

      <span
        style={{
          fontSize: "30px",
          fontWeight: 900,
          color: "white",
          flex: 1,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "48px",
        }}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        style={btnStyle}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(241,128,0,0.14)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
        onMouseDown={(e) =>
          (e.currentTarget.style.transform = "scale(0.85)")
        }
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        +
      </button>
    </div>
  );
}
