'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

function ThanksContent() {
  const params = useSearchParams()
  const name = params.get('name') || 'there'
  const sa = params.get('sa') ?? '0'
  const mex = params.get('mex') ?? '0'

  return (
    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>
          You&apos;re <span style={{ color: '#F18000' }}>in!</span>
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 28 }}>
          Good luck, {name} 👊
        </p>
        <div style={{
          backdropFilter: 'blur(22px) saturate(1.6)', WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
          background: 'rgba(0,12,24,0.38)', border: '0.5px solid rgba(255,255,255,0.13)',
          borderRadius: 18, padding: 24, maxWidth: 320, width: '100%',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)', borderRadius: 18, pointerEvents: 'none' }} />
          <p style={{ fontSize: 9, fontWeight: 700, color: '#F18000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
            Your Prediction
          </p>
          <div className="score-pop" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontSize: 26, lineHeight: 1 }}>🇿🇦</span>
            <span style={{ fontSize: 44, fontWeight: 900, color: '#F18000', lineHeight: 1 }}>{sa}</span>
            <span style={{ fontSize: 28, color: 'rgba(255,255,255,0.35)', fontWeight: 400, lineHeight: 1 }}>—</span>
            <span style={{ fontSize: 44, fontWeight: 900, color: '#F18000', lineHeight: 1 }}>{mex}</span>
            <span style={{ fontSize: 26, lineHeight: 1 }}>🇲🇽</span>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 12 }}>
            South Africa vs Mexico · 14 Jun 2026
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 10, lineHeight: 1.75 }}>
            Closest prediction to the final score wins.<br />Results after the final whistle ⚽
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function ThanksPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <BgLayers />
      <Suspense fallback={null}>
        <ThanksContent />
      </Suspense>
    </div>
  )
}
