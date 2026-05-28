import { useState, useEffect } from "react";

export default function SplashScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const r = () => setW(window.innerWidth);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2400);
    const t4 = setTimeout(() => onDone(), 3000);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  const skip = () => {
    setStep(3);
    setTimeout(() => onDone(), 600);
  };

  const isMobile = w < 640;
  const orbSize = isMobile ? Math.min(w * 0.75, 300) : 360;

  const bgStyle = "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(120, 90, 180, 0.35) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(180, 120, 90, 0.25) 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 50% 90%, rgba(60, 80, 140, 0.4) 0%, transparent 60%), linear-gradient(180deg, #0A0612 0%, #050A18 50%, #07050F 100%)";

  const dotAnim = (i) => "splash_dot 1.4s ease-in-out " + (i * 0.2) + "s infinite";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: bgStyle,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: step >= 3 ? 0 : 1,
      transition: "opacity .6s ease",
      overflow: "hidden",
      pointerEvents: step >= 3 ? "none" : "auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes splash_spin { from{transform:rotate(0deg)} to{transform:rotate(720deg)} }
        @keyframes splash_spinReverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes splash_spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes splash_pulse { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.08);opacity:.7} }
        @keyframes splash_shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes splash_dot { 0%,80%,100%{opacity:.2;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }
      `}</style>

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: orbSize * 1.8, height: orbSize * 1.8,
        marginLeft: -(orbSize * 0.9), marginTop: -(orbSize * 0.9),
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,176,122,0.18) 0%, rgba(120,90,180,0.1) 40%, transparent 70%)",
        filter: "blur(30px)",
        animation: "splash_pulse 3s ease-in-out infinite",
      }}/>

      <div style={{
        position: "relative", width: orbSize, height: orbSize,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          animation: "splash_spin 3s cubic-bezier(.45,0,.55,1) forwards",
        }}>
          <svg viewBox="0 0 280 280" width={orbSize} height={orbSize} fill="none">
            <defs>
              <radialGradient id="orbGradS">
                <stop offset="0%" stopColor="rgba(212,176,122,0.25)"/>
                <stop offset="60%" stopColor="rgba(120,90,180,0.15)"/>
                <stop offset="100%" stopColor="rgba(60,80,140,0.05)"/>
              </radialGradient>
            </defs>
            <circle cx="140" cy="140" r="100" fill="url(#orbGradS)" opacity="0.6"/>
            <circle cx="140" cy="140" r="120" stroke="rgba(212,176,122,0.55)" strokeWidth="0.6" fill="none"/>
            <circle cx="140" cy="140" r="105" stroke="rgba(245,241,232,0.25)" strokeWidth="0.4" fill="none"/>
            <circle cx="140" cy="140" r="80" stroke="rgba(212,176,122,0.45)" strokeWidth="0.6" fill="none" strokeDasharray="2 4"/>
            <g stroke="rgba(212,176,122,0.7)" strokeWidth="0.6">
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
                const rad = (a-90) * Math.PI/180;
                return <line key={i} x1={140 + 115 * Math.cos(rad)} y1={140 + 115 * Math.sin(rad)} x2={140 + 125 * Math.cos(rad)} y2={140 + 125 * Math.sin(rad)}/>;
              })}
            </g>
          </svg>
        </div>

        <div style={{
          position: "absolute", inset: orbSize * 0.12,
          animation: "splash_spinReverse 8s linear infinite",
        }}>
          <svg viewBox="0 0 280 280" width={orbSize * 0.76} height={orbSize * 0.76} fill="none">
            <circle cx="140" cy="140" r="100" stroke="rgba(245,241,232,0.2)" strokeWidth="0.3" fill="none"/>
            <circle cx="140" cy="140" r="80" stroke="rgba(212,176,122,0.3)" strokeWidth="0.4" fill="none"/>
            {[0,45,90,135,180,225,270,315].map((a,i) => {
              const rad = (a-90) * Math.PI/180;
              return <circle key={i} cx={140 + 90 * Math.cos(rad)} cy={140 + 90 * Math.sin(rad)} r="2" fill="rgba(212,176,122,0.8)"/>;
            })}
          </svg>
        </div>

        <div style={{
          position: "absolute", inset: orbSize * 0.25,
          animation: "splash_spinSlow 12s linear infinite",
        }}>
          <svg viewBox="0 0 280 280" width={orbSize * 0.5} height={orbSize * 0.5} fill="none">
            <circle cx="140" cy="140" r="60" stroke="rgba(212,176,122,0.4)" strokeWidth="0.5" fill="none"/>
            {[0,60,120,180,240,300].map((a,i) => {
              const rad = (a-90) * Math.PI/180;
              return <circle key={i} cx={140 + 60 * Math.cos(rad)} cy={140 + 60 * Math.sin(rad)} r="1.5" fill="rgba(245,241,232,0.7)"/>;
            })}
          </svg>
        </div>

        <div style={{
          position: "relative", zIndex: 10, textAlign: "center",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "scale(1)" : "scale(0.6)",
          transition: "all .8s cubic-bezier(.16,1,.3,1)",
        }}>
          <div style={{
            position: "absolute", inset: -20,
            background: "radial-gradient(circle, rgba(212,176,122,0.4) 0%, transparent 70%)",
            filter: "blur(15px)",
          }}/>
          <div style={{ position: "relative" }}>
            <svg width="12" height="12" viewBox="0 0 100 100" style={{ display: "block", margin: "0 auto" }}>
              <path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z" fill="rgba(245,241,232,0.95)"/>
            </svg>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 28 : 34, fontWeight: 400, letterSpacing: 2.5, marginTop: 8,
              background: "linear-gradient(120deg, #E8C99A 0%, #F5E5C0 25%, #D4B07A 50%, #F5E5C0 75%, #E8C99A 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "splash_shimmer 3s linear infinite",
            }}>
              FateLoop
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 48, textAlign: "center",
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
        transition: "all .8s cubic-bezier(.16,1,.3,1)",
        padding: "0 24px",
      }}>
        <div style={{
          fontSize: 9, color: "rgba(212,176,122,0.7)",
          letterSpacing: isMobile ? 6 : 10,
          textTransform: "uppercase", fontWeight: 500,
        }}>
          Reading Your Fate
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 3, height: 3, borderRadius: "50%",
              background: "#D4B07A",
              animation: dotAnim(i),
            }}/>
          ))}
        </div>
      </div>

      <div onClick={skip} style={{
        position: "absolute",
        bottom: isMobile ? 24 : 32,
        right: isMobile ? 24 : 32,
        fontSize: 10, color: "rgba(245,241,232,0.4)", letterSpacing: 3,
        cursor: "pointer", textTransform: "uppercase",
        opacity: step >= 1 ? 1 : 0,
        transition: "opacity .6s ease",
      }}>
        Skip
      </div>
    </div>
  );
}
