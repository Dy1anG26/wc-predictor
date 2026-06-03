export default function HeroMatchup() {
  return (
    <div style={{ padding: '28px 20px 20px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#84CEEF', marginBottom: 18, opacity: 0.9 }}>
        FIFA World Cup 2026 · Group Stage
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span className="flag-left" style={{ fontSize: 40, lineHeight: 1, display: 'block', marginBottom: 6, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.45))' }}>🇿🇦</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase', opacity: 0.85 }}>South Africa</span>
        </div>
        <div style={{ flexShrink: 0, padding: '0 10px', textAlign: 'center' }}>
          <span className="vs-pulse" style={{ fontSize: 11, fontWeight: 900, color: '#F18000', letterSpacing: '0.2em', display: 'block', marginBottom: 3 }}>VS</span>
          <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.48)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>14 Jun · 21:00 SAST</span>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span className="flag-right" style={{ fontSize: 40, lineHeight: 1, display: 'block', marginBottom: 6, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.45))' }}>🇲🇽</span>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase', opacity: 0.85 }}>Mexico</span>
        </div>
      </div>
    </div>
  )
}
