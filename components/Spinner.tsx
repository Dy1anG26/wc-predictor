'use client'
interface Props { value: number; onChange: (v: number) => void }
export default function Spinner({ value, onChange }: Props) {
  const btnStyle: React.CSSProperties = { background:'transparent',border:'none',color:'#F18000',fontSize:21,fontWeight:700,width:42,height:54,cursor:'pointer',fontFamily:'Montserrat',transition:'background 0.15s',flexShrink:0 }
  return (
    <div style={{ display:'flex',alignItems:'center',background:'rgba(0,8,18,0.42)',backdropFilter:'blur(14px)',WebkitBackdropFilter:'blur(14px)',border:'0.5px solid rgba(255,255,255,0.13)',borderRadius:12,overflow:'hidden' }}>
      <button style={btnStyle} onClick={() => onChange(Math.max(0,value-1))}
        onMouseEnter={e=>(e.currentTarget.style.background='rgba(241,128,0,0.14)')}
        onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
        onMouseDown={e=>(e.currentTarget.style.transform='scale(0.85)')}
        onMouseUp={e=>(e.currentTarget.style.transform='scale(1)')}>−</button>
      <span style={{ fontSize:30,fontWeight:900,color:'white',flex:1,textAlign:'center',letterSpacing:'-0.03em',minWidth:38 }}>{value}</span>
      <button style={btnStyle} onClick={() => onChange(value+1)}
        onMouseEnter={e=>(e.currentTarget.style.background='rgba(241,128,0,0.14)')}
        onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
        onMouseDown={e=>(e.currentTarget.style.transform='scale(0.85)')}
        onMouseUp={e=>(e.currentTarget.style.transform='scale(1)')}>+</button>
    </div>
  )
}
