'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import confetti from 'canvas-confetti'
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Spinner from '@/components/Spinner'

interface Winner {
  name: string
  company: string
  prediction: string
}

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

function DrawContent() {
  const params = useSearchParams()
  const key = params.get('key')

  const [finalSA, setFinalSA] = useState(1)
  const [finalMex, setFinalMex] = useState(1)
  const [winners, setWinners] = useState<Winner[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [drawActive, setDrawActive] = useState(false)
  const [currentName, setCurrentName] = useState('')

  const validKey = process.env.NEXT_PUBLIC_DRAW_KEY && key === process.env.NEXT_PUBLIC_DRAW_KEY

  if (!validKey) {
    return (
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ ...glassCard, padding: 32, textAlign: 'center', maxWidth: 320 }}>
            <div style={shine} />
            <p style={{ fontSize: 28, marginBottom: 14 }}>🔒</p>
            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>Access denied</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Invalid or missing access key.</p>
          </div>
        </div>
      </div>
    )
  }

  const loadWinners = async () => {
    setLoading(true)
    setLoaded(false)
    setWinners([])
    setWinner(null)
    setDrawActive(false)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APPS_SCRIPT_URL}?action=getWinners&finalSA=${finalSA}&finalMex=${finalMex}`
      )
      const data = await res.json()
      if (data.success) { setWinners(data.winners); setLoaded(true) }
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const runSlotMachine = () => {
    setSpinning(true)
    setWinner(null)
    setDrawActive(true)
    let interval = 60
    let elapsed = 0
    const totalDuration = 4000
    const chosenWinner = winners[Math.floor(Math.random() * winners.length)]

    const tick = () => {
      setCurrentName(winners[Math.floor(Math.random() * winners.length)].name)
      elapsed += interval
      if (elapsed < totalDuration) {
        interval = Math.min(interval * 1.08, 400)
        setTimeout(tick, interval)
      } else {
        setCurrentName(chosenWinner.name)
        setWinner(chosenWinner)
        setSpinning(false)
        confetti({ particleCount: 120, spread: 80, colors: ['#F18000', '#FAAF40', '#84CEEF'], origin: { y: 0.6 } })
      }
    }
    setTimeout(tick, interval)
  }

  return (
    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Final score entry */}
        <div style={glassCard}>
          <div style={shine} />
          <p style={{ fontSize: 9, fontWeight: 700, color: '#F18000', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Enter Final Score
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: 24, display: 'block', marginBottom: 6, lineHeight: 1 }}>🇿🇦</span>
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>South Africa</p>
              <Spinner value={finalSA} onChange={setFinalSA} />
            </div>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#F18000', flexShrink: 0 }}>—</span>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: 24, display: 'block', marginBottom: 6, lineHeight: 1 }}>🇲🇽</span>
              <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Mexico</p>
              <Spinner value={finalMex} onChange={setFinalMex} />
            </div>
          </div>
          <button
            type="button"
            onClick={loadWinners}
            disabled={loading}
            style={{
              display: 'block', width: '100%',
              backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              background: loading ? 'rgba(241,128,0,0.10)' : 'rgba(241,128,0,0.18)',
              border: '0.5px solid rgba(241,128,0,0.42)',
              color: 'white', borderRadius: 12, padding: 15,
              fontFamily: 'Montserrat', fontSize: 13, fontWeight: 800,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(241,128,0,0.28)' }}
            onMouseLeave={e => { e.currentTarget.style.background = loading ? 'rgba(241,128,0,0.10)' : 'rgba(241,128,0,0.18)' }}
          >
            {loading ? 'Loading...' : 'Load Eligible Entries'}
          </button>
        </div>

        {/* Winners list */}
        {loaded && (
          <div className="fade" style={glassCard}>
            <div style={shine} />
            {winners.length > 0 ? (
              <>
                <p style={{ fontSize: 13, fontWeight: 700, textAlign: 'center', marginBottom: 14 }}>
                  🎯 {winners.length} {winners.length === 1 ? 'person' : 'people'} predicted {finalSA}–{finalMex} correctly
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {winners.map((w, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.15)',
                      borderRadius: 20, padding: '6px 14px', fontSize: 11, fontWeight: 600,
                    }}>{w.name}</div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={runSlotMachine}
                  style={{
                    display: 'block', width: '100%',
                    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                    background: 'rgba(241,128,0,0.18)', border: '0.5px solid rgba(241,128,0,0.42)',
                    color: 'white', borderRadius: 12, padding: 15,
                    fontFamily: 'Montserrat', fontSize: 13, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(241,128,0,0.28)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(241,128,0,0.18)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Start the Draw 🎰
                </button>
              </>
            ) : (
              <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', padding: '8px 0' }}>
                No exact matches found for that scoreline.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Slot machine overlay */}
      {drawActive && (
        <div style={{
          position: 'fixed', inset: 0,
          backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
          background: 'rgba(0,8,18,0.85)', zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 24, padding: 20,
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: spinning ? 'white' : '#FAAF40', transition: 'color 0.5s', textAlign: 'center' }}>
            {spinning ? '🎰 Drawing...' : '🎉 We have a winner!'}
          </h2>
          <div style={{
            backdropFilter: 'blur(22px) saturate(1.6)', WebkitBackdropFilter: 'blur(22px) saturate(1.6)',
            background: 'rgba(0,12,24,0.38)',
            border: !spinning ? '0.5px solid rgba(250,175,64,0.4)' : '0.5px solid rgba(255,255,255,0.13)',
            borderRadius: 18, padding: 28, width: 280, textAlign: 'center',
            boxShadow: !spinning ? '0 0 40px rgba(250,175,64,0.2)' : 'none',
            transition: 'border-color 0.5s, box-shadow 0.5s',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={shine} />
            <p style={{ fontSize: 24, fontWeight: 800, minHeight: 36, lineHeight: 1.3 }}>
              {currentName || '…'}
            </p>
            {!spinning && winner && (
              <>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{winner.company}</p>
                <p style={{ fontSize: 13, color: '#F18000', marginTop: 4, fontWeight: 700 }}>{winner.prediction}</p>
              </>
            )}
          </div>
          {!spinning && (
            <button
              type="button"
              onClick={() => { setWinner(null); setSpinning(false); setDrawActive(false); setCurrentName('') }}
              style={{
                width: 280,
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.65)', borderRadius: 12, padding: 14,
                fontFamily: 'Montserrat', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.09em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            >
              Run Again
            </button>
          )}
        </div>
      )}

      <Footer />
    </div>
  )
}

export default function DrawPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <BgLayers />
      <Suspense fallback={null}>
        <DrawContent />
      </Suspense>
    </div>
  )
}
