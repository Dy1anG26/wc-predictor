export default function BgLayers() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        backgroundImage: "url('/bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        {/* dark gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(175deg, rgba(0,6,15,0.68) 0%, rgba(0,18,34,0.52) 50%, rgba(0,6,15,0.74) 100%)",
          }}
        />
        {/* radial glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(241,128,0,0.18) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(132,206,239,0.15) 0%, transparent 55%)",
          }}
        />
        {/* bottom fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,6,15,0.92) 0%, transparent 40%)",
          }}
        />
      </div>
    </div>
  );
}
