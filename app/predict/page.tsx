'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import HeroMatchup from '@/components/HeroMatchup'
import Spinner from '@/components/Spinner'

type Tab = 'details' | 'score' | 'confirm'
const TAB_ORDER: Tab[] = ['details', 'score', 'confirm']
const TAB_LABELS: Record<Tab, string> = { details: 'Details', score: 'Score', confirm: 'Confirm' }

const glassCard: React.CSSProperties = {
  backdropFilter: 'blur(22px) saturate(1.6)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
  background: 'rgba(0,12,24,0.38)',
  border: '0.5px solid rgba(255,255,255,0.13)',
  borderRadius: 18,
  padding: 20,
  position: 'relative',
  overflow: 'hidden',
}

const shine: React.CSSProperties = {
  position: 'absolute', inset: 0,
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)',
  borderRadius: 18, pointerEvents: 'none',
}

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%',
  background: 'rgba(0,8,18,0.40)',
  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
  border: '0.5px solid rgba(255,255,255,0.13)',
  borderRadius: 10, padding: '13px 14px',
  fontFamily: 'Montserrat', fontSize: 14, fontWeight: 500,
  color: 'white', outline: 'none', marginBottom: 10,
}

const btnOrange: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 12,
  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
  background: 'rgba(241,128,0,0.18)', border: '0.5px solid rgba(241,128,0,0.42)',
  color: 'white', borderRadius: 12, padding: 15,
  fontFamily: 'Montserrat', fontSize: 13, fontWeight: 800,
  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
  transition: 'all 0.2s',
}

const btnWhite: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 10,
  backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
  background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.18)',
  color: 'rgba(255,255,255,0.65)', borderRadius: 12, padding: 14,
  fontFamily: 'Montserrat', fontSize: 12, fontWeight: 700,
  letterSpacing: '0.09em', textTransform: 'uppercase', cursor: 'pointer',
  transition: 'all 0.2s',
}

export default function PredictPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('details')
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [company, setCompany] = useState('')
  const [sa, setSa] = useState(1)
  const [mex, setMex] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const tabIdx = (t: Tab) => TAB_ORDER.indexOf(t)
  const activeIdx = tabIdx(tab)
  const isReachable = (t: Tab) => tabIdx(t) <= activeIdx

  const handleNextDetails = () => {
    if (!firstName.trim() || !surname.trim() || !company.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setTab('score')
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          firstName, surname, company, sa, mex,
          prediction: `${sa}-${mex}`,
        }),
      })
    } catch { /* no-cors — assume success */ }
    router.push(`/thanks?name=${encodeURIComponent(firstName)}&sa=${sa}&mex=${mex}`)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <BgLayers />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <HeroMatchup />

        {/* Tab bar */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(0,10,22,0.32)', border: '0.5px solid rgba(255,255,255,0.13)',
            borderRadius: 14, padding: 5, display: 'flex', gap: 5,
          }}>
            {TAB_ORDER.map(t => {
              const active = tab === t
              const reachable = isReachable(t)
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => reachable && setTab(t)}
                  style={{
                    flex: 1,
                    background: active ? 'rgba(241,128,0,0.16)' : 'transparent',
                    border: active ? '0.5px solid rgba(241,128,0,0.38)' : '0.5px solid transparent',
                    borderRadius: 10, padding: '10px 4px',
                    fontFamily: 'Montserrat', fontSize: 10, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.09em',
                    color: active ? 'white' : 'rgba(255,255,255,0.48)',
                    opacity: !reachable ? 0.4 : 1,
                    pointerEvents: !reachable ? 'none' : 'auto',
                    cursor: reachable ? 'pointer' : 'default',
                    animation: active ? 'tabPop 0.25s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  }}
                >
                  {TAB_LABELS[t]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '0 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* ── Details ── */}
          {tab === 'details' && (
            <div className="fade" style={glassCard}>
              <div style={shine} />
              <p style={{ fontSize: 9, fontWeight: 700, color: '#F18000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                Your Details
              </p>
              <input
                style={inputStyle}
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                style={inputStyle}
                placeholder="Surname"
                value={surname}
                onChange={e => setSurname(e.target.value)}
              />
              <input
                style={inputStyle}
                placeholder="Company"
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
              {error && <p style={{ fontSize: 11, color: '#F18000', marginBottom: 10 }}>{error}</p>}
              <button
                type="button"
                onClick={handleNextDetails}
                style={btnOrange}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(241,128,0,0.28)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(241,128,0,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Next — Pick Your Score →
              </button>
            </div>
          )}

          {/* ── Score ── */}
          {tab === 'score' && (
            <div className="fade" style={glassCard}>
              <div style={shine} />
              <p style={{ fontSize: 9, fontWeight: 700, color: '#F18000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Predict the full-time score
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 6, lineHeight: 1 }}>🇿🇦</span>
                  <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>South Africa</p>
                  <Spinner value={sa} onChange={setSa} />
                </div>
                <span style={{ fontSize: 24, fontWeight: 900, color: '#F18000', flexShrink: 0 }}>—</span>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 6, lineHeight: 1 }}>🇲🇽</span>
                  <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Mexico</p>
                  <Spinner value={mex} onChange={setMex} />
                </div>
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
                Closest to the final scoreline wins. Exact match takes the prize outright.
              </p>
              {/* Pool strip */}
              <div style={{
                margin: '14px 0', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                background: 'rgba(132,206,239,0.06)', border: '0.5px solid rgba(132,206,239,0.16)',
                borderRadius: 12, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{ width: 6, height: 6, background: '#84CEEF', borderRadius: '50%', flexShrink: 0, animation: 'blink 2s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#84CEEF', letterSpacing: '0.04em' }}>Entries close at kickoff · 14 June 2026</span>
              </div>
              <button
                type="button"
                onClick={() => setTab('confirm')}
                style={btnOrange}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(241,128,0,0.28)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(241,128,0,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Review My Prediction →
              </button>
              <button
                type="button"
                onClick={() => setTab('details')}
                style={btnWhite}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
              >
                ← Back to Details
              </button>
            </div>
          )}

          {/* ── Confirm ── */}
          {tab === 'confirm' && (
            <div className="fade" style={glassCard}>
              <div style={shine} />
              <p style={{ fontSize: 9, fontWeight: 700, color: '#F18000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                Review Your Entry
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '0.5px solid rgba(255,255,255,0.13)' }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Name</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{firstName} {surname}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '0.5px solid rgba(255,255,255,0.13)' }}>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Company</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{company}</span>
              </div>
              <div style={{ padding: '16px 0', borderBottom: '0.5px solid rgba(255,255,255,0.13)', textAlign: 'center' }}>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 10 }}>Your Prediction</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>🇿🇦</span>
                  <span style={{ fontSize: 28, fontWeight: 900, color: '#F18000' }}>{sa} — {mex}</span>
                  <span style={{ fontSize: 24 }}>🇲🇽</span>
                </div>
              </div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', margin: '14px 0 16px', lineHeight: 1.6 }}>
                Once submitted your prediction is final. Entries close at kickoff — 21:00 SAST.
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  display: 'block', width: '100%',
                  background: loading ? 'rgba(241,128,0,0.5)' : '#F18000',
                  border: 'none', color: 'white', borderRadius: 12, padding: 15,
                  fontFamily: 'Montserrat', fontSize: 13, fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                }}
              >
                {loading ? 'Locking in...' : 'Lock In My Prediction 🔒'}
              </button>
              <button
                type="button"
                onClick={() => setTab('score')}
                style={btnWhite}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
              >
                ← Change Score
              </button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  )
}
