export default function TopBar() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'15px 20px',backdropFilter:'blur(20px) saturate(1.4)',WebkitBackdropFilter:'blur(20px) saturate(1.4)',background:'rgba(0,8,18,0.35)',borderBottom:'0.5px solid rgba(255,255,255,0.13)',position:'relative',zIndex:10}}>
      <span style={{fontSize:11,fontWeight:800,letterSpacing:'0.18em',textTransform:'uppercase'}}>
        Vicinity <span style={{color:'#F18000'}}>Media</span>
      </span>
      <span style={{background:'rgba(250,175,64,0.08)',border:'0.5px solid rgba(250,175,64,0.28)',color:'#FAAF40',fontSize:9,fontWeight:800,letterSpacing:'0.14em',padding:'4px 10px',borderRadius:20,textTransform:'uppercase'}}>FIFA WC 2026</span>
    </div>
  )
}
