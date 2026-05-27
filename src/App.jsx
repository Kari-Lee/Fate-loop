import { useState, useEffect } from "react";

export default function FateLoopPreview() {
  const [phase, setPhase] = useState("intro");      // "intro" | "main"
  const [introStep, setIntroStep] = useState(0);    // 0=ring 1=logo 2=tagline 3=fade
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // ═══ INTRO TIMELINE ═══
  useEffect(() => {
    if (phase !== "intro") return;
    const t1 = setTimeout(() => setIntroStep(1), 800);    // logo appears
    const t2 = setTimeout(() => setIntroStep(2), 1700);   // tagline appears
    const t3 = setTimeout(() => setIntroStep(3), 3400);   // start fade out
    const t4 = setTimeout(() => { setPhase("main"); setTimeout(()=>setLoaded(true), 80); }, 4200);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [phase]);

  // ═══ PREMIUM BLACK + DEEP RED + CHAMPAGNE GOLD ═══
  const bg = "#0A0608";              // deep wine-black
  const bgSoft = "#120A0D";          // slightly lifted
  const bgCard = "#150B0E";          // card surface
  const bgCardH = "#1C1014";         // card hover
  const red = "#A6182B";             // deep crimson (Cartier-ish)
  const redBright = "#C8102E";       // accent red
  const redDeep = "#6B0F1C";         // burgundy shadow
  const gold = "#C9A961";            // champagne gold
  const goldLight = "#E5CC8C";       // brighter gold
  const goldDeep = "#8A7438";        // antique gold
  const text = "#F2E8D5";            // warm cream
  const textSoft = "#B8A98E";        // muted cream
  const textMute = "#7A6A55";        // shadow cream
  const textDim = "#4A3F32";         // deep shadow
  const line = "#2A1F22";            // hairline
  const lineGold = "#3D2E1F";        // gold-tinted hairline

  // ═══ ORNAMENTAL SVGs ═══
  const MandalaRing = ({ size = 400, opacity: op = .12, strokeBoost = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" style={{ opacity: op }}>
      <defs>
        <radialGradient id="mr_grad">
          <stop offset="0%" stopColor={goldLight} stopOpacity="1"/>
          <stop offset="100%" stopColor={gold} stopOpacity=".6"/>
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" stroke={gold} strokeWidth={.5*strokeBoost}/>
      <circle cx="200" cy="200" r="170" stroke={gold} strokeWidth={.3*strokeBoost}/>
      <circle cx="200" cy="200" r="140" stroke={gold} strokeWidth={.6*strokeBoost}/>
      <circle cx="200" cy="200" r="100" stroke={gold} strokeWidth={.3*strokeBoost}/>
      <circle cx="200" cy="200" r="60" stroke={gold} strokeWidth={.5*strokeBoost}/>
      {[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map((a,i)=>{
        const r1=140,r2=190,x1=200+r1*Math.cos(a*Math.PI/180),y1=200+r1*Math.sin(a*Math.PI/180),x2=200+r2*Math.cos(a*Math.PI/180),y2=200+r2*Math.sin(a*Math.PI/180);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth={.3*strokeBoost}/>;
      })}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
        const r=155,x=200+r*Math.cos(a*Math.PI/180),y=200+r*Math.sin(a*Math.PI/180);
        return <g key={i}><path d={`M${x} ${y-6} C${x+3} ${y-2} ${x+3} ${y+2} ${x} ${y+6} C${x-3} ${y+2} ${x-3} ${y-2} ${x} ${y-6}`} stroke={gold} strokeWidth={.6*strokeBoost} fill="none"/></g>;
      })}
      {[0,45,90,135,180,225,270,315].map((a,i)=>{
        const r=120,x=200+r*Math.cos(a*Math.PI/180),y=200+r*Math.sin(a*Math.PI/180);
        return <path key={i} d={`M${x} ${y-8} C${x+5} ${y} ${x} ${y+8} ${x-5} ${y} Z`} stroke={gold} strokeWidth={.45*strokeBoost} fill="none"/>;
      })}
      {/* Inner zodiac ticks for intro */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
        const r=80,x=200+r*Math.cos(a*Math.PI/180),y=200+r*Math.sin(a*Math.PI/180);
        return <circle key={`z${i}`} cx={x} cy={y} r="1.5" fill={gold} opacity=".7"/>;
      })}
    </svg>
  );

  const WavePattern = ({ width = 600, opacity: op = .08, color = gold }) => (
    <svg width={width} height="40" viewBox="0 0 600 40" fill="none" style={{ opacity: op }}>
      <path d="M0 20 Q25 5 50 20 Q75 35 100 20 Q125 5 150 20 Q175 35 200 20 Q225 5 250 20 Q275 35 300 20 Q325 5 350 20 Q375 35 400 20 Q425 5 450 20 Q475 35 500 20 Q525 5 550 20 Q575 35 600 20" stroke={color} strokeWidth=".7"/>
    </svg>
  );

  const OrnamentalCorner = ({ flip = false, size = 60, opacity: op = .25 }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity: op, transform: flip ? "scaleX(-1)" : "none" }}>
      <path d="M5 55 L5 20 Q5 5 20 5 L55 5" stroke={gold} strokeWidth="1" fill="none"/>
      <path d="M10 55 L10 25 Q10 10 25 10 L55 10" stroke={gold} strokeWidth=".5" fill="none"/>
      <circle cx="5" cy="55" r="2" fill={gold}/>
      <circle cx="55" cy="5" r="2" fill={gold}/>
      <path d="M20 20 L20 15 Q20 10 25 10 L30 10" stroke={gold} strokeWidth=".6" fill="none"/>
    </svg>
  );

  const Star = ({ size = 20, color = gold, filled = true, opacity: op = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity: op }}>
      <path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z"
        fill={filled ? color : "none"} stroke={filled ? "none" : color} strokeWidth="1.5"/>
    </svg>
  );

  // ═══ ICON SYSTEM ═══
  function I({ children, c, size = 40 }) {
    return <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
  }

  const ic = {
    master: goldLight,
    elements: "#D4754A",
    zodiac: "#E5B872",
    meihua: "#B8758A",
    tarot: "#9C4A5A",
    oracle: "#D85A4A",
    bazi: "#C49060",
    fortune: "#E89A4A",
  };

  const icons = {
    master: (c) => <I c={c} size={44}><circle cx="20" cy="20" r="14" strokeWidth=".7"/><circle cx="20" cy="20" r="8" strokeWidth=".4" opacity=".25"/><circle cx="20" cy="14" r="1.5" fill={c} stroke="none"/><line x1="20" y1="17" x2="20" y2="26" strokeWidth=".7"/><line x1="16" y1="20" x2="24" y2="20" strokeWidth=".4" opacity=".3"/></I>,
    elements: (c) => <I c={c}><circle cx="20" cy="10" r="3" strokeWidth=".7"/><circle cx="30" cy="18" r="3" strokeWidth=".7"/><circle cx="26" cy="30" r="3" strokeWidth=".7"/><circle cx="14" cy="30" r="3" strokeWidth=".7"/><circle cx="10" cy="18" r="3" strokeWidth=".7"/><line x1="22.5" y1="11.5" x2="27.5" y2="16.5" strokeWidth=".35" opacity=".2"/><line x1="30" y1="21" x2="27.5" y2="27.5" strokeWidth=".35" opacity=".2"/><line x1="23.5" y1="31" x2="16.5" y2="31" strokeWidth=".35" opacity=".2"/><line x1="12" y1="27.5" x2="10.5" y2="21" strokeWidth=".35" opacity=".2"/><line x1="12.5" y1="16" x2="17.5" y2="11.5" strokeWidth=".35" opacity=".2"/></I>,
    zodiac: (c) => <I c={c}><circle cx="20" cy="20" r="15" strokeWidth=".35" opacity=".15"/><circle cx="20" cy="20" r="10" strokeWidth=".7"/>{[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=><circle key={i} cx={20+15*Math.cos(a*Math.PI/180)} cy={20+15*Math.sin(a*Math.PI/180)} r=".8" fill={c} stroke="none" opacity=".35"/>)}</I>,
    meihua: (c) => <I c={c}><line x1="13" y1="13" x2="27" y2="13"/><line x1="13" y1="17" x2="18" y2="17"/><line x1="22" y1="17" x2="27" y2="17"/><line x1="13" y1="21" x2="27" y2="21"/><line x1="13" y1="25" x2="18" y2="25"/><line x1="22" y1="25" x2="27" y2="25"/><line x1="13" y1="29" x2="27" y2="29"/></I>,
    tarot: (c) => <I c={c}><rect x="13" y="9" width="14" height="22" rx="2" strokeWidth=".7"/><circle cx="20" cy="18" r="3.5" strokeWidth=".5"/><line x1="20" y1="13" x2="20" y2="14.5" strokeWidth=".5"/><line x1="20" y1="21.5" x2="20" y2="23" strokeWidth=".5"/><line x1="15" y1="18" x2="16.5" y2="18" strokeWidth=".5"/><line x1="23.5" y1="18" x2="25" y2="18" strokeWidth=".5"/></I>,
    oracle: (c) => <I c={c}><line x1="20" y1="9" x2="20" y2="27"/><line x1="17" y1="9" x2="17" y2="23" strokeWidth=".5" opacity=".35"/><line x1="23" y1="11" x2="23" y2="25" strokeWidth=".5" opacity=".35"/><ellipse cx="20" cy="31" rx="7" ry="2" strokeWidth=".7"/></I>,
    bazi: (c) => <I c={c}><rect x="11" y="11" width="7" height="7" rx="1" strokeWidth=".6"/><rect x="22" y="11" width="7" height="7" rx="1" strokeWidth=".6"/><rect x="11" y="22" width="7" height="7" rx="1" strokeWidth=".6"/><rect x="22" y="22" width="7" height="7" rx="1" strokeWidth=".6"/></I>,
    fortune: (c) => <I c={c}><circle cx="20" cy="20" r="11" strokeWidth=".35" opacity=".2"/><path d="M20 9L20 13"/><path d="M20 27L20 31"/><path d="M9 20L13 20"/><path d="M27 20L31 20"/><circle cx="20" cy="20" r="2" fill={c} stroke="none" opacity=".4"/></I>,
  };

  // ═══ CARD STYLE ═══
  const dg = (isH, accent) => ({
    background: isH
      ? `linear-gradient(135deg, ${bgCardH}, ${bgCard})`
      : bgCard,
    border: `1px solid ${isH ? gold + "55" : lineGold}`,
    borderRadius: 18,
    cursor: "pointer",
    transition: "all .5s cubic-bezier(.16,1,.3,1)",
    transform: isH ? "translateY(-6px)" : "none",
    boxShadow: isH
      ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${gold}25, 0 0 40px ${(accent || red)}22`
      : `0 2px 12px rgba(0,0,0,0.4)`,
  });

  const s = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `all .9s cubic-bezier(.16,1,.3,1) ${d}s`,
  });

  // ═══════════════════════════════════════════════
  // ════════════════ RENDER ═══════════════════════
  // ═══════════════════════════════════════════════
  return (
    <div style={{
      background: bg,
      minHeight: "100vh",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
      color: text,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@400;500;600;700&family=Noto+Serif+SC:wght@300;400;500&display=swap');
        @keyframes breathe { 0%,100%{opacity:var(--o)} 50%{opacity:calc(var(--o) * 2.5)} }
        @keyframes orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orbitFast { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinReverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes spinIntro { from{transform:rotate(0deg)} to{transform:rotate(720deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 4px 24px rgba(166,24,43,0.35), 0 0 1px ${gold}40} 50%{box-shadow:0 8px 50px rgba(200,16,46,0.55), 0 0 1px ${gold}60} }
        @keyframes goldShine { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes emberFloat { 0%{transform:translateY(0) translateX(0);opacity:0} 20%{opacity:.8} 80%{opacity:.4} 100%{transform:translateY(-200px) translateX(20px);opacity:0} }
        @keyframes introFade { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes introScale { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
        @keyframes letterSpace { from{letter-spacing:0px;opacity:0} to{letter-spacing:14px;opacity:1} }
        @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.05);opacity:.6} }
        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::selection { background: ${red}; color: ${text}; }
      `}</style>

      {/* ═════════════════════════════════════════ */}
      {/* ═══════════ INTRO PHASE ════════════════ */}
      {/* ═════════════════════════════════════════ */}
      {phase === "intro" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: `radial-gradient(ellipse at 50% 45%, ${bgSoft} 0%, ${bg} 70%, #000 100%)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          opacity: introStep >= 3 ? 0 : 1,
          transform: introStep >= 3 ? "scale(1.05)" : "scale(1)",
          transition: "opacity .8s ease, transform .8s ease",
          overflow: "hidden",
        }}>
          {/* Deep red glow behind */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 600, height: 600, marginLeft: -300, marginTop: -300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${red}28 0%, ${red}08 40%, transparent 70%)`,
            filter: "blur(40px)",
            animation: "pulseRing 4s ease-in-out infinite",
          }}/>

          {/* Ember particles */}
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              bottom: -20, left: `${10 + i * 7}%`,
              width: 2, height: 2, borderRadius: "50%",
              background: i % 3 === 0 ? red : gold,
              boxShadow: `0 0 6px ${i % 3 === 0 ? red : gold}`,
              animation: `emberFloat ${6 + (i % 4)}s ease-out ${i * 0.4}s infinite`,
            }}/>
          ))}

          {/* The Wheel - Triple ring */}
          <div style={{
            position: "relative", width: 380, height: 380,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "introFade 1s cubic-bezier(.16,1,.3,1)",
          }}>
            {/* Outer ring - slow forward */}
            <div style={{
              position: "absolute", inset: 0,
              animation: "spinIntro 6s cubic-bezier(.45,0,.55,1) forwards",
              filter: `drop-shadow(0 0 20px ${gold}40)`,
            }}>
              <MandalaRing size={380} opacity={.55} strokeBoost={1.5}/>
            </div>

            {/* Middle ring - reverse */}
            <div style={{
              position: "absolute", inset: 40,
              animation: "spinReverse 12s linear infinite",
            }}>
              <MandalaRing size={300} opacity={.35} strokeBoost={1.2}/>
            </div>

            {/* Inner ring - slow */}
            <div style={{
              position: "absolute", inset: 80,
              animation: "spinSlow 18s linear infinite",
            }}>
              <MandalaRing size={220} opacity={.4} strokeBoost={1.3}/>
            </div>

            {/* Center logo */}
            <div style={{
              position: "relative", zIndex: 10,
              textAlign: "center",
              opacity: introStep >= 1 ? 1 : 0,
              transform: introStep >= 1 ? "scale(1)" : "scale(0.7)",
              transition: "all 1s cubic-bezier(.16,1,.3,1)",
            }}>
              {/* Central glow */}
              <div style={{
                position: "absolute", inset: -30,
                background: `radial-gradient(circle, ${red}60 0%, transparent 70%)`,
                filter: "blur(20px)",
              }}/>
              <div style={{ position: "relative" }}>
                <Star size={16} color={gold} filled opacity={.9}/>
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 38, fontWeight: 400,
                color: text, letterSpacing: 2,
                marginTop: 10,
                background: `linear-gradient(120deg, ${gold} 0%, ${goldLight} 25%, ${gold} 50%, ${goldLight} 75%, ${gold} 100%)`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmerText 4s linear infinite",
                position: "relative",
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
                letterSpacing: 4, fontStyle: "italic",
                opacity: .8,
              }}>
                命 · 轮
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div style={{
            marginTop: 60, textAlign: "center",
            opacity: introStep >= 2 ? 1 : 0,
            transform: introStep >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s cubic-bezier(.16,1,.3,1)",
          }}>
            <div style={{
              fontSize: 9, color: gold, letterSpacing: 14,
              textTransform: "uppercase", opacity: .7, fontWeight: 500,
            }}>
              Reading Your Fate
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: gold,
                  opacity: .3,
                  animation: `breathe 1.4s ease-in-out ${i * 0.2}s infinite`,
                  "--o": 0.3,
                }}/>
              ))}
            </div>
          </div>

          {/* Skip hint */}
          <div onClick={() => setIntroStep(3)} style={{
            position: "absolute", bottom: 40, right: 40,
            fontSize: 10, color: textMute, letterSpacing: 3,
            cursor: "pointer", textTransform: "uppercase",
            opacity: introStep >= 1 ? .5 : 0,
            transition: "opacity .8s ease",
          }}>
            Skip ›
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════ */}
      {/* ═══════════ MAIN PHASE ═════════════════ */}
      {/* ═════════════════════════════════════════ */}
      {phase === "main" && (
        <>
          {/* ═══ BACKGROUND LAYERS ═══ */}
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
            <div style={{
              position: "absolute", top: "-5%", left: "50%", marginLeft: "-45%",
              width: "90%", height: "55%", borderRadius: "50%",
              background: `radial-gradient(circle, ${red}1a 0%, transparent 60%)`,
              filter: "blur(80px)",
            }}/>
            <div style={{
              position: "absolute", bottom: "-10%", right: "10%",
              width: "60%", height: "45%", borderRadius: "50%",
              background: `radial-gradient(circle, ${gold}10 0%, transparent 60%)`,
              filter: "blur(80px)",
            }}/>
            <div style={{
              position: "absolute", top: "45%", left: "-15%",
              width: "45%", height: "40%", borderRadius: "50%",
              background: `radial-gradient(circle, ${redDeep}30 0%, transparent 65%)`,
              filter: "blur(70px)",
            }}/>
          </div>

          {/* Rotating mandala behind hero */}
          <div style={{ position: "absolute", top: "-50px", left: "50%", marginLeft: "-200px", zIndex: 0, animation: "spinSlow 120s linear infinite" }}>
            <MandalaRing size={400} opacity={.07}/>
          </div>
          <div style={{ position: "absolute", top: "-30px", left: "50%", marginLeft: "-150px", zIndex: 0, animation: "spinReverse 90s linear infinite" }}>
            <MandalaRing size={300} opacity={.05}/>
          </div>

          {/* Vignette */}
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3,
            background: `radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, ${bg} 100%)`,
          }}/>

          {/* Grain */}
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2, opacity: .4, mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`,
          }}/>

          {/* Breathing stars */}
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
            {[
              { t: "10%", r: "8%", s: 22, f: true, o: .25, dur: "7s", delay: "0s", color: gold },
              { t: "18%", r: "18%", s: 8, f: false, o: .15, dur: "8s", delay: "2s", color: gold },
              { t: "52%", l: "4%", s: 14, f: true, o: .18, dur: "9s", delay: "1s", color: red },
              { b: "20%", r: "6%", s: 12, f: true, o: .14, dur: "8s", delay: "3s", color: gold },
              { t: "72%", l: "10%", s: 10, f: false, o: .12, dur: "10s", delay: "4s", color: red },
            ].map((st, i) => (
              <div key={i} style={{ position: "absolute", top: st.t, bottom: st.b, left: st.l, right: st.r, "--o": String(st.o), animation: `breathe ${st.dur} ease-in-out ${st.delay} infinite` }}>
                <Star size={st.s} color={st.color} filled={st.f} opacity={st.o}/>
              </div>
            ))}
          </div>

          {/* ═══ HEADER ═══ */}
          <header style={{
            position: "sticky", top: 0, zIndex: 50,
            background: `${bg}d9`,
            backdropFilter: "blur(32px) saturate(1.4)",
            borderBottom: `1px solid ${lineGold}`,
          }}>
            <div style={{ maxWidth: 640, margin: "0 auto", padding: "18px 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Star size={11} color={gold} filled={true} opacity={.85}/>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18, fontWeight: 500, color: text, letterSpacing: 2,
                }}>FateLoop</span>
              </div>
              <span style={{ fontSize: 10, color: textMute, letterSpacing: 3, cursor: "pointer" }}>EN</span>
            </div>
          </header>

          {/* ═══ CONTENT ═══ */}
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 36px", position: "relative", zIndex: 4 }}>

            {/* ─── HERO ─── */}
            <section style={{ padding: "90px 0 72px", textAlign: "center", position: "relative", ...s(0) }}>
              <div style={{ position: "absolute", top: 36, left: -8 }}><OrnamentalCorner size={50} opacity={.22}/></div>
              <div style={{ position: "absolute", top: 36, right: -8 }}><OrnamentalCorner size={50} opacity={.22} flip/></div>

              <div style={{ marginBottom: 36, display: "flex", justifyContent: "center" }}>
                <Star size={14} color={gold} filled={true} opacity={.6}/>
              </div>

              <div style={{ fontSize: 10, letterSpacing: 10, textTransform: "uppercase", color: gold, marginBottom: 40, fontWeight: 500, opacity: .85 }}>
                Ancient Wisdom · AI
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 54, fontWeight: 300, color: text,
                lineHeight: 1.1, marginBottom: 28, letterSpacing: -0.5,
              }}>
                Decode every word.
                <br/>
                <span style={{
                  fontStyle: "italic", fontWeight: 300,
                  background: `linear-gradient(135deg, ${redBright}, ${red})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  Reveal every fate.
                </span>
              </h1>

              <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                <WavePattern width={260} opacity={.18}/>
              </div>

              <p style={{
                fontSize: 13, color: textSoft, lineHeight: 2.2,
                maxWidth: 320, margin: "0 auto 52px", letterSpacing: .3,
              }}>
                Consult the Master. Cast hexagrams.<br/>Discover what the universe has written.
              </p>

              <button style={{
                background: `linear-gradient(135deg, ${red}, ${redBright})`,
                color: text, border: `1px solid ${gold}40`,
                padding: "17px 56px", borderRadius: 99,
                fontSize: 11, fontWeight: 600, cursor: "pointer",
                letterSpacing: 2.5, textTransform: "uppercase",
                animation: "glow 4s ease-in-out infinite",
                transition: "transform .4s cubic-bezier(.16,1,.3,1)",
                position: "relative",
              }}
                onMouseEnter={(e) => e.target.style.transform = "translateY(-3px) scale(1.03)"}
                onMouseLeave={(e) => e.target.style.transform = "none"}>
                Begin Reading
              </button>
            </section>

            {/* ─── MASTER CARD ─── */}
            <section style={{ marginBottom: 24, ...s(.1) }}>
              <div onMouseEnter={() => setHovered("master")} onMouseLeave={() => setHovered(null)}
                style={{ ...dg(hovered === "master"), borderRadius: 22, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 8, borderRadius: 16, border: `1px solid ${gold}15`, pointerEvents: "none" }}/>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${gold}80, transparent)`,
                  width: hovered === "master" ? "100%" : "0%",
                  transition: "width .7s cubic-bezier(.16,1,.3,1)",
                }}/>
                <div style={{ position: "absolute", top: 12, left: 12 }}><OrnamentalCorner size={32} opacity={.2}/></div>
                <div style={{ position: "absolute", top: 12, right: 12 }}><OrnamentalCorner size={32} opacity={.2} flip/></div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                      <Star size={8} color={gold} filled={true} opacity={.8}/>
                      <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: gold, fontWeight: 500, opacity: .9 }}>Live AI Session</span>
                    </div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 34, color: text, marginBottom: 10,
                      fontWeight: 400, letterSpacing: .5,
                    }}>The Master</div>
                    <div style={{ fontSize: 13, color: textSoft, lineHeight: 1.9, letterSpacing: .3 }}>
                      Birth chart · Love · Career · Wealth
                    </div>
                  </div>
                  <div style={{ marginLeft: 36, flexShrink: 0, position: "relative", width: 72, height: 72 }}>
                    <div style={{
                      position: "absolute", inset: -12, borderRadius: "50%",
                      border: `1px solid ${gold}30`,
                      animation: hovered === "master" ? "orbit 10s linear infinite" : "none",
                    }}>
                      <div style={{ position: "absolute", top: -2, left: "50%", marginLeft: -2 }}>
                        <Star size={4} color={gold} filled={true} opacity={.7}/>
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "100%", height: "100%",
                      transition: "transform .6s cubic-bezier(.16,1,.3,1)",
                      transform: hovered === "master" ? "scale(1.15)" : "scale(1)",
                    }}>
                      {icons.master(ic.master)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── Section Label ─── */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, paddingLeft: 4, ...s(.18) }}>
              <Star size={5} color={red} filled={true} opacity={.6}/>
              <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: textMute, fontWeight: 500 }}>Readings</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${lineGold}, transparent)`, marginLeft: 8 }}/>
            </div>

            {/* ─── Card Grids ─── */}
            {[
              [
                { id: "elements", title: "Five Elements", desc: "Wood · Fire · Earth · Metal · Water" },
                { id: "zodiac", title: "Zodiac Match", desc: "12 animals — cosmic pairing" },
              ],
              [
                { id: "meihua", title: "Plum Blossom", desc: "I Ching hexagram divination" },
                { id: "tarot", title: "Tarot", desc: "Three-card love spread" },
              ],
            ].map((row, ri) => (
              <section key={ri} style={{ marginBottom: 16, ...s(.22 + ri * .08) }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {row.map((item) => {
                    const isH = hovered === item.id;
                    return (
                      <div key={item.id}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                        style={{ ...dg(isH, ic[item.id]), padding: "34px 26px", position: "relative", overflow: "hidden" }}>
                        <div style={{
                          position: "absolute", top: 0, left: 0, height: 2,
                          background: `linear-gradient(90deg, transparent, ${ic[item.id]}80, transparent)`,
                          width: isH ? "100%" : "0%",
                          transition: "width .6s cubic-bezier(.16,1,.3,1)",
                        }}/>
                        <div style={{
                          position: "absolute", inset: 6, borderRadius: 14,
                          border: `1px solid ${ic[item.id]}${isH ? "20" : "00"}`,
                          transition: "border-color .5s ease", pointerEvents: "none",
                        }}/>
                        <div style={{
                          marginBottom: 18,
                          transition: "transform .5s cubic-bezier(.16,1,.3,1)",
                          transform: isH ? "scale(1.12)" : "scale(1)",
                          transformOrigin: "left bottom",
                        }}>
                          {icons[item.id](ic[item.id])}
                        </div>
                        <div style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 19, fontWeight: 500,
                          color: isH ? text : textSoft,
                          marginBottom: 6,
                          transition: "color .4s ease", letterSpacing: .5,
                        }}>{item.title}</div>
                        <div style={{
                          fontSize: 12,
                          color: isH ? textSoft : textMute,
                          lineHeight: 1.7, transition: "color .4s ease",
                        }}>{item.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* ─── Bottom 3 ─── */}
            <section style={{ marginBottom: 72, ...s(.38) }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  { id: "oracle", title: "Oracle Sticks", k: "oracle" },
                  { id: "bazi", title: "Bazi Match", k: "bazi" },
                  { id: "fortune", title: "Daily Energy", k: "fortune" },
                ].map((item) => {
                  const isH = hovered === item.id;
                  return (
                    <div key={item.id}
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ ...dg(isH, ic[item.k]), padding: "30px 16px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                      <div style={{
                        position: "absolute", top: 0, left: 0, height: 2,
                        background: `linear-gradient(90deg, transparent, ${ic[item.k]}70, transparent)`,
                        width: isH ? "100%" : "0%",
                        transition: "width .5s cubic-bezier(.16,1,.3,1)",
                      }}/>
                      <div style={{
                        marginBottom: 12, display: "flex", justifyContent: "center",
                        transition: "transform .45s cubic-bezier(.16,1,.3,1)",
                        transform: isH ? "scale(1.18)" : "scale(1)",
                      }}>
                        {icons[item.k](ic[item.k])}
                      </div>
                      <div style={{
                        fontSize: 12, fontWeight: 500,
                        color: isH ? text : textMute,
                        transition: "color .4s ease", letterSpacing: .8,
                      }}>{item.title}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ─── Ornamental Divider ─── */}
            <section style={{ textAlign: "center", marginBottom: 48, ...s(.44) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${gold}50)` }}/>
                <Star size={8} color={gold} filled={true} opacity={.6}/>
                <div style={{ width: 80, height: 1, background: `linear-gradient(270deg, transparent, ${gold}50)` }}/>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                <WavePattern width={120} opacity={.15}/>
              </div>
            </section>

            {/* ─── Quote ─── */}
            <section style={{ paddingBottom: 72, ...s(.48) }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 21, color: textSoft, lineHeight: 2.3,
                fontStyle: "italic", textAlign: "center",
                maxWidth: 380, margin: "0 auto", fontWeight: 300, letterSpacing: .3,
              }}>
                {`"Three thousand years of Chinese wisdom and you still texted them back."`}
              </div>
              <div style={{
                fontSize: 8, letterSpacing: 8, textTransform: "uppercase",
                color: textDim, textAlign: "center", marginTop: 24,
              }}>Daily Wisdom</div>
            </section>
          </div>

          {/* ═══ FOOTER ═══ */}
          <footer style={{
            borderTop: `1px solid ${lineGold}`,
            background: `${bgSoft}88`,
            backdropFilter: "blur(12px)",
            position: "relative", zIndex: 4,
          }}>
            <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Star size={6} color={gold} filled={true} opacity={.5}/>
                <span style={{ fontSize: 10, color: textMute, letterSpacing: 1 }}>© 2026 FateLoop</span>
              </div>
              <span style={{ fontSize: 10, color: textMute, letterSpacing: 1, cursor: "pointer" }}>Privacy</span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
