'use client'
import { useState } from 'react'
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Spinner from '@/components/Spinner'
const gc: React.CSSProperties = {backdropFilter:'blur(22px) saturate(1.6)',WebkitBackdropFilter:'blur(22px) saturate(1.6)',background:'rgba(0,12,24,0.38)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:18,padding:20,position:'relative',overflow:'hidden'}
const sh: React.CSSProperties = {position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 55%)',borderRadius:18,pointerEvents:'none'}
const bn: React.CSSProperties = {display:'block',width:'100%',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(241,128,0,0.18)',border:'0.5px solid rgba(241,128,0,0.42)',color:'white',borderRadius:12,padding:15,fontFamily:'Montserrat',fontSize:13,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.2s'}
const bg: React.CSSProperties = {display:'block',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(255,255,255,0.18)',color:'rgba(255,255,255,0.65)',borderRadius:12,padding:'12px 24px',fontFamily:'Montserrat',fontSize:12,fontWeight:700,letterSpacing:'0.09em',textTransform:'uppercase',cursor:'pointer',marginTop:20,transition:'all 0.2s'}
interface Winner{name:string;company:string;prediction:string}
function DrawContent() {
  const p = useSearchParams()
  const key = p.get('key')
  const [fsa,setFsa]=useState(0),[fmex,setFmex]=useState(0)
  const [winners,setWinners]=useState<Winner[]>([])
  const [loaded,setLoaded]=useState(false),[fetching,setFetching]=useState(false)
  const [spinning,setSpinning]=useState(false),[curName,setCurName]=useState(''),[winner,setWinner]=useState<Winner|null>(null)
  if(key!==process.env.NEXT_PUBLIC_DRAW_KEY) return (
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:40,position:'relative',zIndex:10}}>
      <div style={{...gc,textAlign:'center',maxWidth:300}}><div style={sh}/><h2 style={{fontSize:20,fontWeight:900,marginBottom:8}}>Access denied</h2><p style={{fontSize:13,color:'rgba(255,255,255,0.5)'}}>Invalid or missing access key.</p></div>
    </div>
  )
  const load=async()=>{
    setFetching(true);setLoaded(false);setWinner(null)
    try{const r=await fetch(`${process.env.NEXT_PUBLIC_APPS_SCRIPT_URL}?action=getWinners&finalSA=${fsa}&finalMex=${fmex}`);const d=await r.json();setWinners(d.winners||[])}catch{setWinners([])}
    setLoaded(true);setFetching(false)
  }
  const runDraw=()=>{
    if(!winners.length)return
    setSpinning(true);setWinner(null)
    const chosen=winners[Math.floor(Math.random()*winners.length)]
    let iv=60,el=0;const tot=4000
    const tick=()=>{
      setCurName(winners[Math.floor(Math.random()*winners.length)].name);el+=iv
      if(el<tot){iv=Math.min(iv*1.08,400);setTimeout(tick,iv)}
      else{setCurName(chosen.name);setWinner(chosen);setSpinning(false);try{import('canvas-confetti').then((m:any)=>m.default({particleCount:120,spread:80,colors:['#F18000','#FAAF40','#84CEEF'],origin:{y:0.6}}))}catch{}}
    }
    setTimeout(tick,iv)
  }
  return (
    <div style={{flex:1,padding:'20px 20px 0',position:'relative',zIndex:10}}>
      <div style={gc}><div style={sh}/>
        <p style={{fontSize:9,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'#F18000',marginBottom:14,position:'relative'}}>Enter Final Score</p>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,position:'relative'}}>
          <div style={{flex:1,textAlign:'center'}}><span style={{fontSize:20,display:'block',marginBottom:4}}>🇿🇦</span><p style={{fontSize:8,fontWeight:800,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:8}}>South Africa</p><Spinner value={fsa} onChange={setFsa}/></div>
          <span style={{fontSize:20,fontWeight:900,color:'#F18000',flexShrink:0}}>—</span>
          <div style={{flex:1,textAlign:'center'}}><span style={{fontSize:20,display:'block',marginBottom:4}}>🇲🇽</span><p style={{fontSize:8,fontWeight:800,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:8}}>Mexico</p><Spinner value={fmex} onChange={setFmex}/></div>
        </div>
        <button style={{...bn,opacity:fetching?0.5:1}} disabled={fetching} onClick={load} onMouseEnter={e=>(e.currentTarget.style.background='rgba(241,128,0,0.28)')} onMouseLeave={e=>(e.currentTarget.style.background='rgba(241,128,0,0.18)')}>
          {fetching?'Loading...':'Load Eligible Entries'}
        </button>
      </div>
      {loaded&&<div style={{marginTop:14}}>
        {winners.length===0
          ?<div style={{...gc,textAlign:'center'}}><div style={sh}/><p style={{fontSize:13,color:'rgba(255,255,255,0.5)',position:'relative'}}>No exact matches found for {fsa}–{fmex}</p></div>
          :<div style={gc}><div style={sh}/>
            <p style={{fontSize:13,fontWeight:700,marginBottom:12,position:'relative'}}>🎯 <span style={{color:'#F18000'}}>{winners.length}</span> {winners.length===1?'person':'people'} predicted <strong>{fsa}–{fmex}</strong> correctly</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16,position:'relative'}}>
              {winners.map((w,i)=><div key={i} style={{backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:20,padding:'6px 14px',fontSize:12,fontWeight:600}}>{w.name}</div>)}
            </div>
            <button style={bn} onClick={runDraw} onMouseEnter={e=>(e.currentTarget.style.background='rgba(241,128,0,0.28)')} onMouseLeave={e=>(e.currentTarget.style.background='rgba(241,128,0,0.18)')}>Start the Draw 🎰</button>
          </div>
        }
      </div>}
      {(spinning||winner)&&<div style={{position:'fixed',inset:0,backdropFilter:'blur(30px)',WebkitBackdropFilter:'blur(30px)',background:'rgba(0,8,18,0.88)',zIndex:50,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:20}}>
        <h2 style={{fontSize:20,fontWeight:900,marginBottom:24,color:spinning?'white':'#FAAF40'}}>{spinning?'🎰 Drawing...':'🎉 We have a winner!'}</h2>
        <div style={{backdropFilter:'blur(22px)',WebkitBackdropFilter:'blur(22px)',background:'rgba(0,12,24,0.55)',border:winner?'0.5px solid rgba(250,175,64,0.4)':'0.5px solid rgba(255,255,255,0.13)',borderRadius:18,padding:'28px 40px',textAlign:'center',minWidth:260,boxShadow:winner?'0 0 40px rgba(250,175,64,0.2)':'none',transition:'all 0.3s'}}>
          <p style={{fontSize:24,fontWeight:800,marginBottom:4}}>{curName}</p>
          {winner&&<p style={{fontSize:13,color:'rgba(255,255,255,0.5)',marginBottom:6}}>{winner.company}</p>}
          {winner&&<p style={{fontSize:13,color:'#F18000',fontWeight:700}}>Predicted: {winner.prediction}</p>}
        </div>
        {winner&&<button style={bg} onClick={()=>{setWinner(null);setCurName('');setSpinning(false)}} onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.10)';e.currentTarget.style.color='white'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.65)'}}>Run Again</button>}
      </div>}
    </div>
  )
}
export default function DrawPage() {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative'}}>
      <BgLayers/>
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        <TopBar/>
        <Suspense fallback={<div style={{flex:1}}/>}><DrawContent/></Suspense>
        <Footer/>
      </div>
    </div>
  )
}
