'use client'
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
const gc: React.CSSProperties = {backdropFilter:'blur(22px) saturate(1.6)',WebkitBackdropFilter:'blur(22px) saturate(1.6)',background:'rgba(0,12,24,0.38)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:18,padding:24,position:'relative',overflow:'hidden',textAlign:'center',width:'100%',maxWidth:320}
const sh: React.CSSProperties = {position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 55%)',borderRadius:18,pointerEvents:'none'}
function ThanksContent() {
  const p = useSearchParams()
  const name=p.get('name')||'', sa=p.get('sa')||'0', mex=p.get('mex')||'0'
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'36px 20px',textAlign:'center',position:'relative',zIndex:10}}>
      <h1 className="fade" style={{fontSize:26,fontWeight:900,marginBottom:6,letterSpacing:'-0.02em'}}>You&apos;re <span style={{color:'#F18000'}}>in!</span></h1>
      <p className="fade-d1" style={{fontSize:13,color:'rgba(255,255,255,0.48)',marginBottom:24,fontWeight:500}}>Good luck, {name} 👊</p>
      <div className="fade-d2" style={{display:'flex',justifyContent:'center',width:'100%'}}>
        <div style={gc}><div style={sh}/>
          <p style={{fontSize:9,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'#F18000',marginBottom:14,position:'relative'}}>Your Prediction</p>
          <div className="score-pop" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:10}}>
            <span style={{fontSize:26}}>🇿🇦</span>
            <span style={{fontSize:44,fontWeight:900,letterSpacing:'-0.03em',lineHeight:1}}>
              <span style={{color:'#F18000'}}>{sa}</span><span style={{color:'rgba(255,255,255,0.4)',fontSize:28,margin:'0 8px'}}>—</span><span style={{color:'#F18000'}}>{mex}</span>
            </span>
            <span style={{fontSize:26}}>🇲🇽</span>
          </div>
          <p style={{fontSize:11,color:'rgba(255,255,255,0.48)',fontWeight:600,marginBottom:14,position:'relative'}}>South Africa vs Mexico · 14 Jun 2026</p>
          <p style={{fontSize:12,color:'rgba(255,255,255,0.48)',lineHeight:1.8,position:'relative'}}>Closest prediction to the final score wins.<br/>Results after the final whistle ⚽</p>
        </div>
      </div>
    </div>
  )
}
export default function ThanksPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative'}}>
      <BgLayers/>
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        <TopBar/>
        <Suspense fallback={<div style={{flex:1}}/>}><ThanksContent/></Suspense>
        <Footer/>
      </div>
    </div>
  )
}
