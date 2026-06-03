'use client'
import { useRouter } from 'next/navigation'
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import HeroMatchup from '@/components/HeroMatchup'

const KICKOFF = new Date('2026-06-14T19:00:00Z')
const glassCard: React.CSSProperties = {backdropFilter:'blur(22px) saturate(1.6)',WebkitBackdropFilter:'blur(22px) saturate(1.6)',background:'rgba(0,12,24,0.38)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:18,padding:20,position:'relative',overflow:'hidden'}
const shine: React.CSSProperties = {position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 55%)',borderRadius:18,pointerEvents:'none'}

export default function Home() {
  const router = useRouter()
  const closed = new Date() >= KICKOFF
  if (closed) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative'}}>
      <BgLayers/><TopBar/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px',position:'relative',zIndex:10}}>
        <div style={{...glassCard,textAlign:'center',maxWidth:320}}><div style={shine}/>
          <p style={{fontSize:32,marginBottom:16}}>⏱️</p>
          <h2 style={{fontSize:22,fontWeight:900,marginBottom:10}}>Entries closed</h2>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>The match has kicked off.<br/>Good luck to all who entered! ⚽</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative'}}>
      <BgLayers/>
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        <TopBar/>
        <HeroMatchup/>
        <div className="fade" style={{padding:'0 20px'}}>
          <div style={{...glassCard,textAlign:'center'}}><div style={shine}/>
            <h1 style={{fontSize:26,fontWeight:900,lineHeight:1.15,marginBottom:8,letterSpacing:'-0.02em',position:'relative'}}>
              Predict the score.<br/><em style={{fontStyle:'italic',color:'#F18000'}}>Enter the pool.</em>
            </h1>
            <p style={{fontSize:12,color:'rgba(255,255,255,0.48)',fontWeight:500,lineHeight:1.75,marginTop:8,position:'relative'}}>
              Pick the full-time scoreline for SA vs Mexico.<br/>Closest prediction wins. One prize — make it count.
            </p>
          </div>
        </div>
        <div style={{display:'flex',gap:8,margin:'14px 20px 0'}}>
          {[['1','Prize'],['Free','Entry'],['21:00','Closes']].map(([val,key],i)=>(
            <div key={key} className={`fade-d${i+2}`} style={{flex:1,backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:12,padding:'12px 8px',textAlign:'center'}}>
              <span style={{fontSize:15,fontWeight:800,display:'block',marginBottom:2}}>{val}</span>
              <span style={{fontSize:8,fontWeight:700,color:'rgba(255,255,255,0.48)',letterSpacing:'0.12em',textTransform:'uppercase'}}>{key}</span>
            </div>
          ))}
        </div>
        <div className="fade-d4" style={{margin:'14px 20px 0',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(132,206,239,0.06)',border:'0.5px solid rgba(132,206,239,0.16)',borderRadius:12,padding:'11px 14px',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:6,height:6,background:'#84CEEF',borderRadius:'50%',flexShrink:0,animation:'blink 2s infinite'}}/>
          <span style={{fontSize:11,fontWeight:600,color:'#84CEEF',letterSpacing:'0.04em'}}>Entries close at kickoff · 14 June 2026</span>
        </div>
        <div className="fade-d5" style={{padding:'20px 20px 8px'}}>
          <button onClick={()=>router.push('/predict')} style={{display:'block',width:'100%',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(241,128,0,0.18)',border:'0.5px solid rgba(241,128,0,0.42)',color:'white',borderRadius:12,padding:15,fontFamily:'Montserrat',fontSize:13,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(241,128,0,0.28)';e.currentTarget.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(241,128,0,0.18)';e.currentTarget.style.transform='translateY(0)'}}>
            Enter the Prediction Pool ⚽
          </button>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
