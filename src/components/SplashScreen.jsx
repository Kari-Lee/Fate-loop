import { useState, useEffect } from "react";

const bg = "#0A0608";
const red = "#A6182B";
const gold = "#C9A961";
const goldLight = "#E5CC8C";
const textMute = "#7A6A55";

function MandalaRing({ size = 400, opacity: op = 0.55, strokeBoost = 1.5 }) {
  const lineAngles = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345];
  const petalAngles = [0,30,60,90,120,150,180,210,240,270,300,330];
  const diamondAngles = [0,45,90,135,180,225,270,315];

  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" style={{ opacity: op }}>
      <circle cx="200" cy="200" r="190" stroke={gold} strokeWidth={0.5 * strokeBoost}/>
      <circle cx="200" cy="200" r="170" stroke={gold} strokeWidth={0.3 * strokeBoost}/>
      <circle cx="200" cy="200" r="140" stroke={gold} strokeWidth={0.6 * strokeBoost}/>
      <circle cx="200" cy="200" r="100" stroke={gold} strokeWidth={0.3 * strokeBoost}/>
      <circle cx="200" cy="200" r="60" stroke={gold} strokeWidth={0.5 * strokeBoost}/>
      {lineAngles.map((a, i) => {
        const r1 = 140, r2 = 190;
        const rad = (a * Math.PI) / 180;
        return (
          <line key={`l${i}`}
            x1={200 + r1 * Math.cos(rad)} y1={200 + r1 * Math.sin(rad)}
            x2={200 + r2 * Math.cos(rad)} y2={200 + r2 * Math.sin(rad)}
            stroke={gold} strokeWidth={0.3 * strokeBoost}/>
        );
      })}
      {petalAngles.map((a, i) => {
        const r = 155;
        const rad = (a * Math.PI) / 180;
        const x = 200 + r * Math.cos(rad);
        const y = 200 + r * Math.sin(rad);
        return (
          <path key={`p${i}`}
            d={`M${x} ${y-6} C${x+3} ${y-2} ${x+3} ${y+2} ${x} ${y+6} C${x-3} ${y+2} ${x-3} ${y-2} ${x} ${y-6}`}
            stroke={gold} strokeWidth={0.6 * strokeBoost} fill="none"/>
        );
      })}
      {diamondAngles.map((a, i) => {
        const r = 120;
        const rad = (a * Math.PI) / 180;
        const x = 200 + r * Math.cos(rad);
        const y = 200 + r * Math.sin(rad);
        return (
          <path key={`d${i}`}
            d={`M${x} ${y-8} C${x+5} ${y} ${x} ${y+8} ${x-5} ${y} Z`}
            stroke={gold} strokeWidth={0.45 * strokeBoost} fill="none"/>
        );
      })}
    </svg>
  );
}

function Star({ size = 16, color = gold, filled = true, opacity: op = 0.9 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity: op }}>
      <path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z"
        fill={filled ? color : "none"} stroke={filled ? "none" : color} strokeWidth="1.5"/>
    </svg>
  );
}

export default function SplashScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [dim, setDim] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const onResize = () => setDim({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Animation timeline
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);   // logo
    const t2 = setTimeout(() => setStep(2), 1700);  // tagline
    const t3 = setTimeout(() => setStep(3), 3400);  // fade
    const t4 = setTimeout(() => onDone(), 4200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  const handleSkip = () => {
    setStep(3);
    setTimeout(() => onDone(), 800);
  };

  // Responsive mandala size — smaller on mobile
  const isMobile = dim.w < 640;
  const mandalaSize = isMobile ? Math.min(dim.w * 0.85, 340) : 420;
  const logoFontSize = isMobile ? 32 : 42;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: `radial-gradient(ellipse at 50% 45%, ${bg} 0%, #000 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: step >= 3 ? 0 : 1,
      transform: step >= 3 ? "scale(1.05)" : "scale(1)",
      transition: "opacity .8s ease, transform .8s ease",
      overflow: "hidden",
      pointerEvents: step >= 3 ? "none" : "auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        @keyframes splash_spinIntro { from{transform:rotate(0deg)} to{transform:rotate(720deg)} }
        @keyframes splash_spinReverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes splash_spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes splash_pulseRing { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.05);opacity:.6} }
        @keyframes splash_emberFloat {
          0%{transform:translateY(0) translateX(0);opacity:0}
          20%{opacity:.8}
          80%{opacity:.4}
          100%{transform:translateY(-200px) translateX(20px);opacity:0}
        }
        @keyframes splash_introFade { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes splash_shimmerText { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes splash_dot { 0%,80%,100%{opacity:.25;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Red ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 600, height: 600, marginLeft: -300, marginTop: -300,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${red}28 0%, ${red}08 40%, transparent 70%)`,
        filter: "blur(40px)",
        animation: "splash_pulseRing 4s ease-in-out infinite",
      }}/>

      {/* Ember particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: -20, left: `${10 + i * 7}%`,
          width: 2, height: 2, borderRadius: "50%",
          background: i % 3 === 0 ? red : gold,
          boxShadow: `0 0 6px ${i % 3 === 0 ? red : gold}`,
          animation: `splash_emberFloat ${6 + (i % 4)}s ease-out ${i * 0.4}s infinite`,
        }}/>
      ))}

      {/* Triple mandala */}
      <div style={{
        position: "relative", width: mandalaSize, height: mandalaSize,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "splash_introFade 1s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          animation: "splash_spinIntro 6s cubic-bezier(.45,0,.55,1) forwards",
          filter: `drop-shadow(0 0 20px ${gold}40)`,
        }}>
          <MandalaRing size={mandalaSize} opacity={0.55} strokeBoost={1.5}/>
        </div>
        <div style={{
          position: "absolute", inset: mandalaSize * 0.1,
          animation: "splash_spinReverse 12s linear infinite",
        }}>
          <MandalaRing size={mandalaSize * 0.8} opacity={0.35} strokeBoost={1.2}/>
        </div>
        <div style={{
          position: "absolute", inset: mandalaSize * 0.2,
          animation: "splash_spinSlow 18s linear infinite",
        }}>
          <MandalaRing size={mandalaSize * 0.58} opacity={0.4} strokeBoost={1.3}/>
        </div>

        {/* Center logo */}
        <div style={{
          position: "relative", zIndex: 10, textAlign: "center",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "scale(1)" : "scale(0.7)",
          transition: "all 1s cubic-bezier(.16,1,.3,1)",
        }}>
          <div style={{
            position: "absolute", inset: -30,
            background: `radial-gradient(circle, ${red}60 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}/>
          <div style={{ position: "relative" }}>
            <Star size={16} color={gold} filled opacity={0.9}/>
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: logoFontSize, fontWeight: 400, letterSpacing: 2, marginTop: 10,
            background: `linear-gradient(120deg, ${gold} 0%, ${goldLight} 25%, ${gold} 50%, ${goldLight} 75%, ${gold} 100%)`,
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "splash_shimmerText 4s linear infinite",
          }}>
            FateLoop
          </div>
          <div style={{
            width: 40, height: 1,
            background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
            margin: "8px auto",
          }}/>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11, color: gold,
            letterSpacing: 4, fontStyle: "italic", opacity: 0.8,
          }}>
            命 · 轮
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        marginTop: 60, textAlign: "center",
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s cubic-bezier(.16,1,.3,1)",
        padding: "0 24px",
      }}>
        <div style={{
          fontSize: 9, color: gold,
          letterSpacing: isMobile ? 8 : 14,
          textTransform: "uppercase", opacity: 0.7, fontWeight: 500,
        }}>
          Reading Your Fate
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 4, height: 4, borderRadius: "50%",
              background: gold,
              animation: `splash_dot 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}/>
          ))}
        </div>
      </div>

      {/* Skip */}
      <div onClick={handleSkip} style={{
        position: "absolute",
        bottom: isMobile ? 24 : 40,
        right: isMobile ? 24 : 40,
        fontSize: 10, color: textMute, letterSpacing: 3,
        cursor: "pointer", textTransform: "uppercase",
        opacity: step >= 1 ? 0.5 : 0,
        transition: "opacity .8s ease",
      }}>
        Skip ›
      </div>
    </div>
  );
}
