'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BgLayers from '@/components/BgLayers'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import HeroMatchup from '@/components/HeroMatchup'
import Spinner from '@/components/Spinner'

const KICKOFF = new Date('2026-06-14T19:00:00Z')
type Tab = 'details' | 'score' | 'confirm'
const gc: React.CSSProperties = {backdropFilter:'blur(22px) saturate(1.6)',WebkitBackdropFilter:'blur(22px) saturate(1.6)',background:'rgba(0,12,24,0.38)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:18,padding:20,position:'relative',overflow:'hidden'}
const sh: React.CSSProperties = {position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 55%)',borderRadius:18,pointerEvents:'none'}
const inp: React.CSSProperties = {width:'100%',background:'rgba(0,8,18,0.40)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:10,padding:'13px 14px',fontFamily:'Montserrat',fontSize:14,fontWeight:500,color:'white',outline:'none',marginBottom:10,transition:'border-color 0.2s'}
const bn: React.CSSProperties = {display:'block',width:'100%',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(241,128,0,0.18)',border:'0.5px solid rgba(241,128,0,0.42)',color:'white',borderRadius:12,padding:15,fontFamily:'Montserrat',fontSize:13,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.2s'}
const bg: React.CSSProperties = {display:'block',width:'100%',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(255,255,255,0.18)',color:'rgba(255,255,255,0.65)',borderRadius:12,padding:14,fontFamily:'Montserrat',fontSize:12,fontWeight:700,letterSpacing:'0.09em',textTransform:'uppercase',cursor:'pointer',marginTop:10,transition:'all 0.2s'}
const bs: React.CSSProperties = {display:'block',width:'100%',background:'#F18000',border:'none',color:'white',borderRadius:12,padding:15,fontFamily:'Montserrat',fontSize:13,fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.2s'}
const sl: React.CSSProperties = {fontSize:9,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'#F18000',marginBottom:14,position:'relative'}

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
  const detailsDone = firstName.trim() && surname.trim() && company.trim()
  if (new Date() >= KICKOFF) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative'}}>
      <BgLayers/><TopBar/>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:40,position:'relative',zIndex:10}}>
        <div style={{...gc,textAlign:'center',maxWidth:320}}><div style={sh}/>
          <h2 style={{fontSize:22,fontWeight:900,marginBottom:10}}>Entries closed</h2>
          <p style={{fontSize:13,color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>The match has kicked off. Good luck! ⚽</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
  const handleSubmit = async () => {
    setLoading(true)
    try { await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, {method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({timestamp:new Date().toISOString(),firstName,surname,company,sa,mex,prediction:`${sa}-${mex}`})}) } catch {}
    router.push(`/thanks?name=${encodeURIComponent(firstName)}&sa=${sa}&mex=${mex}`)
  }
  const tabBtn = (t: Tab, label: string) => {
    const isActive = tab===t
    const isDone = (t==='details'&&(tab==='score'||tab==='confirm'))||(t==='score'&&tab==='confirm')
    const reach = t==='details'||(t==='score'&&!!detailsDone)||(t==='confirm'&&!!detailsDone)
    return <button key={t} onClick={()=>reach&&setTab(t)} style={{flex:1,background:isActive?'rgba(241,128,0,0.16)':'transparent',border:isActive?'0.5px solid rgba(241,128,0,0.38)':'0.5px solid transparent',borderRadius:10,padding:'10px 4px',fontFamily:'Montserrat',fontSize:10,fontWeight:700,letterSpacing:'0.09em',textTransform:'uppercase',color:isActive?'white':'rgba(255,255,255,0.48)',cursor:reach?'pointer':'default',opacity:reach?1:0.4,position:'relative',animation:isActive?'tabPop 0.25s cubic-bezier(0.34,1.56,0.64,1)':'none'}}>
      {label}{isDone&&<span style={{position:'absolute',top:3,right:6,fontSize:8,color:'#F18000'}}>✓</span>}
    </button>
  }
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',position:'relative'}}>
      <BgLayers/>
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        <TopBar/><HeroMatchup/>
        <div style={{padding:'0 20px 16px'}}>
          <div style={{display:'flex',gap:5,backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',background:'rgba(0,10,22,0.32)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:14,padding:5}}>
            {tabBtn('details','Details')}{tabBtn('score','Score')}{tabBtn('confirm','Confirm')}
          </div>
        </div>
        {tab==='details'&&<div className="fade"><div style={{padding:'0 20px'}}><div style={gc}><div style={sh}/>
          <p style={sl}>Your Details</p>
          <label style={{display:'block',fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:5}}>First Name</label>
          <input style={inp} placeholder="e.g. Dylan" value={firstName} onChange={e=>setFirstName(e.target.value)} onFocus={e=>(e.target.style.borderColor='rgba(241,128,0,0.55)')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.13)')}/>
          <label style={{display:'block',fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:5}}>Surname</label>
          <input style={inp} placeholder="e.g. Smith" value={surname} onChange={e=>setSurname(e.target.value)} onFocus={e=>(e.target.style.borderColor='rgba(241,128,0,0.55)')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.13)')}/>
          <label style={{display:'block',fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:5}}>Company</label>
          <input style={{...inp,marginBottom:0}} placeholder="e.g. Acme Co" value={company} onChange={e=>setCompany(e.target.value)} onFocus={e=>(e.target.style.borderColor='rgba(241,128,0,0.55)')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.13)')}/>
        </div></div>
        <div style={{padding:'16px 20px 28px'}}>
          {error&&<div style={{background:'rgba(220,55,55,0.10)',border:'0.5px solid rgba(220,55,55,0.25)',borderRadius:8,color:'#ff7070',fontSize:11,fontWeight:600,padding:'10px 14px',marginBottom:12,textAlign:'center'}}>{error}</div>}
          <button style={bn} onClick={()=>{if(!detailsDone){setError('Please fill in all fields.');return}setError('');setTab('score')}}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(241,128,0,0.28)';e.currentTarget.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(241,128,0,0.18)';e.currentTarget.style.transform='translateY(0)'}}>Next — Pick Your Score →</button>
        </div></div>}
        {tab==='score'&&<div className="fade"><div style={{padding:'0 20px'}}><div style={gc}><div style={sh}/>
          <p style={sl}>Predict the full-time score</p>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{flex:1,textAlign:'center'}}><span style={{fontSize:24,display:'block',marginBottom:4}}>🇿🇦</span><p style={{fontSize:8,fontWeight:800,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:10}}>South Africa</p><Spinner value={sa} onChange={setSa}/></div>
            <span style={{fontSize:24,fontWeight:900,color:'#F18000',flexShrink:0}}>—</span>
            <div style={{flex:1,textAlign:'center'}}><span style={{fontSize:24,display:'block',marginBottom:4}}>🇲🇽</span><p style={{fontSize:8,fontWeight:800,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',marginBottom:10}}>Mexico</p><Spinner value={mex} onChange={setMex}/></div>
          </div>
          <p style={{fontSize:10,color:'rgba(255,255,255,0.48)',textAlign:'center',marginTop:12,lineHeight:1.65,fontWeight:500,position:'relative'}}>Closest to the final scoreline wins.<br/>Exact match takes the prize outright.</p>
        </div></div>
        <div style={{margin:'14px 20px 0',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',background:'rgba(132,206,239,0.06)',border:'0.5px solid rgba(132,206,239,0.16)',borderRadius:12,padding:'11px 14px',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:6,height:6,background:'#84CEEF',borderRadius:'50%',flexShrink:0,animation:'blink 2s infinite'}}/><span style={{fontSize:11,fontWeight:600,color:'#84CEEF',letterSpacing:'0.04em'}}>Your score goes into the pool — nearest wins</span>
        </div>
        <div style={{padding:'16px 20px 28px'}}>
          <button style={bn} onClick={()=>setTab('confirm')} onMouseEnter={e=>{e.currentTarget.style.background='rgba(241,128,0,0.28)';e.currentTarget.style.transform='translateY(-1px)'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(241,128,0,0.18)';e.currentTarget.style.transform='translateY(0)'}}>Review My Prediction →</button>
          <button style={bg} onClick={()=>setTab('details')} onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.10)';e.currentTarget.style.color='white'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.65)'}}>← Back to Details</button>
        </div></div>}
        {tab==='confirm'&&<div className="fade"><div style={{padding:'0 20px'}}><div style={gc}><div style={sh}/>
          <p style={sl}>Review Your Entry</p>
          {[['NAME',`${firstName} ${surname}`],['COMPANY',company]].map(([k,v],i)=>(
            <div key={k} className={`fade-d${i+1}`} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'0.5px solid rgba(255,255,255,0.13)',position:'relative'}}>
              <span style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,0.48)',letterSpacing:'0.06em',textTransform:'uppercase'}}>{k}</span>
              <span style={{fontSize:13,fontWeight:700}}>{v}</span>
            </div>
          ))}
          <div className="fade-d3" style={{padding:'14px 0 0',textAlign:'center',position:'relative'}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.48)',display:'block',marginBottom:10}}>YOUR PREDICTION</span>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12}}>
              <span style={{fontSize:22}}>🇿🇦</span><span style={{fontSize:28,fontWeight:900,color:'#F18000',letterSpacing:'-0.02em'}}>{sa} — {mex}</span><span style={{fontSize:22}}>🇲🇽</span>
            </div>
          </div>
        </div></div>
        <div style={{padding:'16px 20px 28px'}}>
          <p style={{fontSize:10,color:'rgba(255,255,255,0.48)',textAlign:'center',marginBottom:12,lineHeight:1.7,fontWeight:500}}>Once submitted your prediction is final.<br/>Entries close at kickoff — 21:00 SAST.</p>
          <button style={{...bs,opacity:loading?0.5:1}} disabled={loading} onClick={handleSubmit} onMouseEnter={e=>{if(!loading){e.currentTarget.style.background='#d97000';e.currentTarget.style.transform='translateY(-1px)'}}} onMouseLeave={e=>{e.currentTarget.style.background='#F18000';e.currentTarget.style.transform='translateY(0)'}}>
            {loading?'Locking in...':'Lock In My Prediction 🔒'}
          </button>
          <button style={bg} onClick={()=>setTab('score')} onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.10)';e.currentTarget.style.color='white'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.65)'}}>← Change Score</button>
        </div></div>}
        <Footer/>
      </div>
    </div>
  )
}
