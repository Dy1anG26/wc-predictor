export default function BgLayers() {
  return (
    <>
      <div style={{position:'fixed',inset:0,zIndex:0,backgroundImage:"url('/bg.webp')",backgroundSize:'cover',backgroundPosition:'center 25%'}} />
      <div style={{position:'fixed',inset:0,zIndex:1,background:'linear-gradient(175deg,rgba(0,6,15,0.68) 0%,rgba(0,18,34,0.52) 40%,rgba(0,6,15,0.74) 100%)'}} />
      <div style={{position:'fixed',inset:0,zIndex:2,background:'radial-gradient(ellipse at 50% -5%,rgba(241,128,0,0.14) 0%,transparent 52%),radial-gradient(ellipse at 85% 105%,rgba(132,206,239,0.09) 0%,transparent 48%),linear-gradient(to bottom,transparent 45%,rgba(0,4,12,0.60) 100%)'}} />
    </>
  )
}
