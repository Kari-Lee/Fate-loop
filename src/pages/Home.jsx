import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";

// ═══ PREMIUM BLACK + DEEP RED + CHAMPAGNE GOLD ═══
const bg = "#0A0608";
const bgCard = "#150B0E";
const bgCardH = "#1C1014";
const red = "#A6182B";
const redBright = "#C8102E";
const redDeep = "#6B0F1C";
const gold = "#C9A961";
const goldLight = "#E5CC8C";
const text = "#F2E8D5";
const textSoft = "#B8A98E";
const textMute = "#7A6A55";
const textDim = "#4A3F32";
const line = "#2A1F22";
const lineGold = "#3D2E1F";

// ═══ COLOR MAP — with fallback to gold ═══
const COLOR = {
  master: goldLight,
  elements: "#D4754A",
  zodiac: "#E5B872",
  meihua: "#B8758A",
  tarot: "#9C4A5A",
  oracle: "#D85A4A",
  bazi: "#C49060",
  fortune: "#E89A4A",
};
const getColor = (id) => COLOR[id] || gold;

// ═══ ICON COMPONENTS — direct, not lookup-based ═══
function IconBox({ children, c, size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={c || gold} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function IconMaster({ c }) {
  return (
    <IconBox c={c} size={44}>
      <circle cx="20" cy="20" r="14" strokeWidth=".7"/>
      <circle cx="20" cy="20" r="8" strokeWidth=".4" opacity=".25"/>
      <circle cx="20" cy="14" r="1.5" fill={c || gold} stroke="none"/>
      <line x1="20" y1="17" x2="20" y2="26" strokeWidth=".7"/>
      <line x1="16" y1="20" x2="24" y2="20" strokeWidth=".4" opacity=".3"/>
    </IconBox>
  );
}

function IconElements({ c }) {
  return (
    <IconBox c={c}>
      <circle cx="20" cy="10" r="3" strokeWidth=".7"/>
      <circle cx="30" cy="18" r="3" strokeWidth=".7"/>
      <circle cx="26" cy="30" r="3" strokeWidth=".7"/>
      <circle cx="14" cy="30" r="3" strokeWidth=".7"/>
      <circle cx="10" cy="18" r="3" strokeWidth=".7"/>
    </IconBox>
  );
}

function IconZodiac({ c }) {
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <IconBox c={c}>
      <circle cx="20" cy="20" r="15" strokeWidth=".35" opacity=".15"/>
      <circle cx="20" cy="20" r="10" strokeWidth=".7"/>
      {angles.map((a, i) => (
        <circle
          key={i}
          cx={20 + 15 * Math.cos((a * Math.PI) / 180)}
          cy={20 + 15 * Math.sin((a * Math.PI) / 180)}
          r=".8"
          fill={c || gold}
          stroke="none"
          opacity=".35"
        />
      ))}
    </IconBox>
  );
}

function IconMeihua({ c }) {
  return (
    <IconBox c={c}>
      <line x1="13" y1="13" x2="27" y2="13"/>
      <line x1="13" y1="17" x2="18" y2="17"/>
      <line x1="22" y1="17" x2="27" y2="17"/>
      <line x1="13" y1="21" x2="27" y2="21"/>
      <line x1="13" y1="25" x2="18" y2="25"/>
      <line x1="22" y1="25" x2="27" y2="25"/>
      <line x1="13" y1="29" x2="27" y2="29"/>
    </IconBox>
  );
}

function IconTarot({ c }) {
  return (
    <IconBox c={c}>
      <rect x="13" y="9" width="14" height="22" rx="2" strokeWidth=".7"/>
      <circle cx="20" cy="18" r="3.5" strokeWidth=".5"/>
      <line x1="20" y1="13" x2="20" y2="14.5" strokeWidth=".5"/>
      <line x1="20" y1="21.5" x2="20" y2="23" strokeWidth=".5"/>
    </IconBox>
  );
}

function IconBazi({ c }) {
  return (
    <IconBox c={c}>
      <rect x="11" y="11" width="7" height="7" rx="1" strokeWidth=".6"/>
      <rect x="22" y="11" width="7" height="7" rx="1" strokeWidth=".6"/>
      <rect x="11" y="22" width="7" height="7" rx="1" strokeWidth=".6"/>
      <rect x="22" y="22" width="7" height="7" rx="1" strokeWidth=".6"/>
    </IconBox>
  );
}

function IconFortune({ c }) {
  return (
    <IconBox c={c}>
      <circle cx="20" cy="20" r="11" strokeWidth=".35" opacity=".2"/>
      <path d="M20 9L20 13"/>
      <path d="M20 27L20 31"/>
      <path d="M9 20L13 20"/>
      <path d="M27 20L31 20"/>
      <circle cx="20" cy="20" r="2" fill={c || gold} stroke="none" opacity=".4"/>
    </IconBox>
  );
}

// ═══ Direct icon renderer — no lookup, no crash possible ═══
function CardIcon({ id, color }) {
  const c = color || getColor(id);
  switch (id) {
    case "master": return <IconMaster c={c} />;
    case "elements": return <IconElements c={c} />;
    case "zodiac": return <IconZodiac c={c} />;
    case "meihua": return <IconMeihua c={c} />;
    case "tarot": return <IconTarot c={c} />;
    case "bazi": return <IconBazi c={c} />;
    case "fortune": return <IconFortune c={c} />;
    default: return <IconBox c={c}><circle cx="20" cy="20" r="10" strokeWidth=".7"/></IconBox>;
  }
}

function Star({ size = 20, color = gold, filled = true, opacity: op = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity: op }}>
      <path
        d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z"
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function OrnamentalCorner({ flip = false, size = 60, opacity: op = 0.25 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity: op, transform: flip ? "scaleX(-1)" : "none" }}>
      <path d="M5 55 L5 20 Q5 5 20 5 L55 5" stroke={gold} strokeWidth="1" fill="none"/>
      <path d="M10 55 L10 25 Q10 10 25 10 L55 10" stroke={gold} strokeWidth=".5" fill="none"/>
      <circle cx="5" cy="55" r="2" fill={gold}/>
      <circle cx="55" cy="5" r="2" fill={gold}/>
    </svg>
  );
}

function WavePattern({ width = 600, opacity: op = 0.08 }) {
  return (
    <svg width={width} height="40" viewBox="0 0 600 40" fill="none" style={{ opacity: op }}>
      <path d="M0 20 Q25 5 50 20 Q75 35 100 20 Q125 5 150 20 Q175 35 200 20 Q225 5 250 20 Q275 35 300 20 Q325 5 350 20 Q375 35 400 20 Q425 5 450 20 Q475 35 500 20 Q525 5 550 20 Q575 35 600 20" stroke={gold} strokeWidth=".7"/>
    </svg>
  );
}

function MandalaRing({ size = 400, opacity: op = 0.12, strokeBoost = 1 }) {
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

// ═══ Card style helper ═══
function cardStyle(isH, accent) {
  return {
    background: isH ? `linear-gradient(135deg, ${bgCardH}, ${bgCard})` : bgCard,
    border: `1px solid ${isH ? gold + "55" : lineGold}`,
    borderRadius: 18,
    cursor: "pointer",
    transition: "all .5s cubic-bezier(.16,1,.3,1)",
    transform: isH ? "translateY(-6px)" : "none",
    boxShadow: isH
      ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${gold}25, 0 0 40px ${(accent || red)}22`
      : `0 2px 12px rgba(0,0,0,0.4)`,
  };
}

// ═══════════════════════════════════════════════
// ═════════════════ HOME PAGE ═══════════════════
// ═══════════════════════════════════════════════
export default function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Safe daily quote with fallback
  let daily = "Fate loops. That's why you keep meeting the same soul in different bodies.";
  try {
    const q = getDailyQuote();
    if (q && typeof q === "string") daily = q;
  } catch (e) {
    // silent fallback
  }

  // Intro animation — show only once per browser session
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("fl_intro_seen") === "1";
    } catch (e) {
      // sessionStorage blocked (private mode), just skip intro
      seen = true;
    }

    if (seen) {
      setLoaded(true);
      return;
    }

    setShowIntro(true);
    const t1 = setTimeout(() => setIntroStep(1), 800);
    const t2 = setTimeout(() => setIntroStep(2), 1700);
    const t3 = setTimeout(() => setIntroStep(3), 3400);
    const t4 = setTimeout(() => {
      try { sessionStorage.setItem("fl_intro_seen", "1"); } catch (e) {}
      setShowIntro(false);
      setTimeout(() => setLoaded(true), 80);
    }, 4200);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  const skipIntro = () => {
    try { sessionStorage.setItem("fl_intro_seen", "1"); } catch (e) {}
    setIntroStep(3);
    setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setLoaded(true), 80);
    }, 800);
  };

  const fadeUp = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `all .9s cubic-bezier(.16,1,.3,1) ${delay}s`,
  });

  // Card data — explicit, no dynamic lookups
  const trendingCards = [
    { id: "zodiac", title: "Zodiac Match", desc: "Toxic or soulmate? Find out.", tag: "Most shared", route: "/zodiac" },
    { id: "tarot", title: "Tarot Reading", desc: "Three-card love spread", tag: "Popular", route: "/tarot" },
  ];

  const destinyCards = [
    { id: "elements", title: "Five Elements", desc: "Love compatibility", route: "/elements" },
    { id: "bazi", title: "Bazi Match", desc: "Destiny pairing", route: "/bazi" },
    { id: "meihua", title: "Plum Blossom", desc: "I Ching oracle", route: "/meihua" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        @keyframes fl_breathe { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        @keyframes fl_orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fl_spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fl_spinReverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes fl_spinIntro { from{transform:rotate(0deg)} to{transform:rotate(720deg)} }
        @keyframes fl_glow { 0%,100%{box-shadow:0 4px 24px rgba(166,24,43,0.35)} 50%{box-shadow:0 8px 50px rgba(200,16,46,0.55)} }
        @keyframes fl_introFade { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes fl_pulseRing { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.05);opacity:.6} }
        @keyframes fl_shimmerText { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fl_dotPulse { 0%,80%,100%{opacity:.2;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }
      `}</style>

      {/* INTRO OVERLAY */}
      {showIntro && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: `radial-gradient(ellipse at 50% 45%, ${bg} 0%, #000 100%)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          opacity: introStep >= 3 ? 0 : 1,
          transform: introStep >= 3 ? "scale(1.05)" : "scale(1)",
          transition: "opacity .8s ease, transform .8s ease",
          overflow: "hidden",
          pointerEvents: introStep >= 3 ? "none" : "auto",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 600, height: 600, marginLeft: -300, marginTop: -300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${red}28 0%, ${red}08 40%, transparent 70%)`,
            filter: "blur(40px)",
            animation: "fl_pulseRing 4s ease-in-out infinite",
          }}/>

          <div style={{
            position: "relative", width: 380, height: 380,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fl_introFade 1s cubic-bezier(.16,1,.3,1)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              animation: "fl_spinIntro 6s cubic-bezier(.45,0,.55,1) forwards",
              filter: `drop-shadow(0 0 20px ${gold}40)`,
            }}>
              <MandalaRing size={380} opacity={0.55} strokeBoost={1.5}/>
            </div>
            <div style={{
              position: "absolute", inset: 40,
              animation: "fl_spinReverse 12s linear infinite",
            }}>
              <MandalaRing size={300} opacity={0.35} strokeBoost={1.2}/>
            </div>
            <div style={{
              position: "absolute", inset: 80,
              animation: "fl_spinSlow 18s linear infinite",
            }}>
              <MandalaRing size={220} opacity={0.4} strokeBoost={1.3}/>
            </div>

            <div style={{
              position: "relative", zIndex: 10, textAlign: "center",
              opacity: introStep >= 1 ? 1 : 0,
              transform: introStep >= 1 ? "scale(1)" : "scale(0.7)",
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
                fontSize: 38, fontWeight: 400, letterSpacing: 2, marginTop: 10,
                background: `linear-gradient(120deg, ${gold} 0%, ${goldLight} 25%, ${gold} 50%, ${goldLight} 75%, ${gold} 100%)`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fl_shimmerText 4s linear infinite",
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

          <div style={{
            marginTop: 60, textAlign: "center",
            opacity: introStep >= 2 ? 1 : 0,
            transform: introStep >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s cubic-bezier(.16,1,.3,1)",
          }}>
            <div style={{
              fontSize: 9, color: gold, letterSpacing: 14,
              textTransform: "uppercase", opacity: 0.7, fontWeight: 500,
            }}>
              Reading Your Fate
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: gold,
                  animation: `fl_dotPulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }}/>
              ))}
            </div>
          </div>

          <div onClick={skipIntro} style={{
            position: "absolute", bottom: 40, right: 40,
            fontSize: 10, color: textMute, letterSpacing: 3,
            cursor: "pointer", textTransform: "uppercase",
            opacity: introStep >= 1 ? 0.5 : 0,
            transition: "opacity .8s ease",
          }}>
            Skip ›
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}

      {/* Background ambient — fixed */}
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
      </div>

      <div style={{ position: "absolute", top: 60, left: "50%", marginLeft: -200, zIndex: 0, animation: "fl_spinSlow 120s linear infinite", pointerEvents: "none" }}>
        <MandalaRing size={400} opacity={0.06}/>
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* HERO */}
        <section style={{ padding: "70px 0 64px", textAlign: "center", position: "relative", ...fadeUp(0) }}>
          <div style={{ position: "absolute", top: 24, left: -8 }}><OrnamentalCorner size={50} opacity={0.22}/></div>
          <div style={{ position: "absolute", top: 24, right: -8 }}><OrnamentalCorner size={50} opacity={0.22} flip/></div>

          <div style={{ marginBottom: 28, display: "flex", justifyContent: "center" }}>
            <Star size={14} color={gold} filled opacity={0.6}/>
          </div>

          <div style={{ fontSize: 10, letterSpacing: 10, textTransform: "uppercase", color: gold, marginBottom: 32, fontWeight: 500, opacity: 0.85 }}>
            Ancient Wisdom · AI
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 50, fontWeight: 300, color: text,
            lineHeight: 1.1, marginBottom: 24, letterSpacing: -0.5,
          }}>
            Decode every word.<br/>
            <span style={{
              fontStyle: "italic", fontWeight: 300,
              background: `linear-gradient(135deg, ${redBright}, ${red})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Reveal every fate.
            </span>
          </h1>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <WavePattern width={240} opacity={0.18}/>
          </div>

          <p style={{ fontSize: 13, color: textSoft, lineHeight: 2.2, maxWidth: 320, margin: "0 auto 44px", letterSpacing: 0.3 }}>
            Consult the Master. Cast hexagrams.<br/>Discover what the universe has written.
          </p>

          <button onClick={() => navigate("/master")} style={{
            background: `linear-gradient(135deg, ${red}, ${redBright})`,
            color: text, border: `1px solid ${gold}40`,
            padding: "16px 52px", borderRadius: 99,
            fontSize: 11, fontWeight: 600, cursor: "pointer",
            letterSpacing: 2.5, textTransform: "uppercase",
            animation: "fl_glow 4s ease-in-out infinite",
            transition: "transform .4s cubic-bezier(.16,1,.3,1)",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
            Consult the Master
          </button>
        </section>

        {/* TODAY */}
        <section style={{ marginBottom: 32, ...fadeUp(0.1) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingLeft: 4 }}>
            <Star size={5} color={gold} filled opacity={0.5}/>
            <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: textMute, fontWeight: 500 }}>Today</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${lineGold}, transparent)`, marginLeft: 8 }}/>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Daily Fortune card */}
            <div onMouseEnter={() => setHovered("fortune")} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/fortune")}
              style={{ ...cardStyle(hovered === "fortune", getColor("fortune")), padding: "30px 22px", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${getColor("fortune")}80, transparent)`,
                width: hovered === "fortune" ? "100%" : "0%",
                transition: "width .6s cubic-bezier(.16,1,.3,1)",
              }}/>
              <div style={{
                marginBottom: 16,
                transition: "transform .5s cubic-bezier(.16,1,.3,1)",
                transform: hovered === "fortune" ? "scale(1.12)" : "scale(1)",
                transformOrigin: "left bottom",
              }}>
                <CardIcon id="fortune"/>
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18, fontWeight: 500,
                color: hovered === "fortune" ? text : textSoft,
                transition: "color .4s", marginBottom: 5, letterSpacing: 0.5,
              }}>Daily Fortune</div>
              <div style={{
                fontSize: 12, color: hovered === "fortune" ? textSoft : textMute,
                transition: "color .4s", lineHeight: 1.7,
              }}>Your love energy today</div>
            </div>

            {/* Daily Wisdom quote */}
            <div style={{
              background: bgCard, border: `1px solid ${lineGold}`,
              borderRadius: 18, padding: "24px 22px",
              display: "flex", flexDirection: "column", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 8, right: 8 }}>
                <Star size={6} color={gold} filled opacity={0.3}/>
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14, color: textSoft, lineHeight: 2,
                fontStyle: "italic", marginBottom: 12, letterSpacing: 0.3,
              }}>
                "{daily}"
              </div>
              <div style={{ fontSize: 8, letterSpacing: 6, textTransform: "uppercase", color: textDim }}>
                Daily Wisdom
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING */}
        <section style={{ marginBottom: 32, ...fadeUp(0.18) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingLeft: 4 }}>
            <Star size={5} color={red} filled opacity={0.6}/>
            <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: textMute, fontWeight: 500 }}>Trending</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${lineGold}, transparent)`, marginLeft: 8 }}/>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {trendingCards.map((item) => {
              const isH = hovered === item.id;
              const c = getColor(item.id);
              return (
                <div key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate(item.route)}
                  style={{ ...cardStyle(isH, c), padding: "30px 22px", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${c}80, transparent)`,
                    width: isH ? "100%" : "0%",
                    transition: "width .6s cubic-bezier(.16,1,.3,1)",
                  }}/>
                  {item.tag && (
                    <div style={{
                      fontSize: 8, letterSpacing: 3, textTransform: "uppercase",
                      color: red, marginBottom: 12, fontWeight: 600, opacity: 0.85,
                    }}>{item.tag}</div>
                  )}
                  <div style={{
                    marginBottom: 16,
                    transition: "transform .5s cubic-bezier(.16,1,.3,1)",
                    transform: isH ? "scale(1.12)" : "scale(1)",
                    transformOrigin: "left bottom",
                  }}>
                    <CardIcon id={item.id}/>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18, fontWeight: 500,
                    color: isH ? text : textSoft,
                    transition: "color .4s", marginBottom: 5, letterSpacing: 0.5,
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: 12, color: isH ? textSoft : textMute,
                    transition: "color .4s", lineHeight: 1.7,
                  }}>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DESTINY */}
        <section style={{ marginBottom: 32, ...fadeUp(0.26) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingLeft: 4 }}>
            <Star size={5} color={gold} filled opacity={0.5}/>
            <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: textMute, fontWeight: 500 }}>Destiny</span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${lineGold}, transparent)`, marginLeft: 8 }}/>
          </div>

          {/* The Master — hero card */}
          <div onMouseEnter={() => setHovered("master")} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/master")}
            style={{ ...cardStyle(hovered === "master"), borderRadius: 22, padding: "40px 32px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 8, borderRadius: 16, border: `1px solid ${gold}15`, pointerEvents: "none" }}/>
            <div style={{
              position: "absolute", top: 0, left: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${gold}80, transparent)`,
              width: hovered === "master" ? "100%" : "0%",
              transition: "width .7s cubic-bezier(.16,1,.3,1)",
            }}/>
            <div style={{ position: "absolute", top: 12, left: 12 }}><OrnamentalCorner size={28} opacity={0.2}/></div>
            <div style={{ position: "absolute", top: 12, right: 12 }}><OrnamentalCorner size={28} opacity={0.2} flip/></div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <Star size={8} color={gold} filled opacity={0.8}/>
                  <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: gold, fontWeight: 500, opacity: 0.9 }}>Live AI Session</span>
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 30, color: text, marginBottom: 8,
                  fontWeight: 400, letterSpacing: 0.5,
                }}>The Master</div>
                <div style={{ fontSize: 13, color: textSoft, lineHeight: 1.9, letterSpacing: 0.3 }}>
                  Full birth chart · Life path · Predictions
                </div>
              </div>
              <div style={{ marginLeft: 28, flexShrink: 0, position: "relative", width: 68, height: 68 }}>
                <div style={{
                  position: "absolute", inset: -12, borderRadius: "50%",
                  border: `1px solid ${gold}30`,
                  animation: hovered === "master" ? "fl_orbit 10s linear infinite" : "none",
                }}/>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", height: "100%",
                  transition: "transform .6s cubic-bezier(.16,1,.3,1)",
                  transform: hovered === "master" ? "scale(1.15)" : "scale(1)",
                }}>
                  <CardIcon id="master"/>
                </div>
              </div>
            </div>
          </div>

          {/* Elements + Bazi + Meihua */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {destinyCards.map((item) => {
              const isH = hovered === item.id;
              const c = getColor(item.id);
              return (
                <div key={item.id}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => navigate(item.route)}
                  style={{ ...cardStyle(isH, c), padding: "26px 14px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${c}70, transparent)`,
                    width: isH ? "100%" : "0%",
                    transition: "width .5s cubic-bezier(.16,1,.3,1)",
                  }}/>
                  <div style={{
                    marginBottom: 12, display: "flex", justifyContent: "center",
                    transition: "transform .45s cubic-bezier(.16,1,.3,1)",
                    transform: isH ? "scale(1.18)" : "scale(1)",
                  }}>
                    <CardIcon id={item.id}/>
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 600,
                    color: isH ? text : textSoft,
                    transition: "color .4s", letterSpacing: 0.8, marginBottom: 4,
                  }}>{item.title}</div>
                  <div style={{
                    fontSize: 10, color: isH ? textSoft : textMute,
                    transition: "color .4s",
                  }}>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Oracle Sticks */}
        <section style={{ marginBottom: 48, ...fadeUp(0.34) }}>
          <div onMouseEnter={() => setHovered("qian")} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/qian")}
            style={{ ...cardStyle(hovered === "qian", getColor("oracle")), padding: "26px 28px", display: "flex", alignItems: "center", gap: 20, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${getColor("oracle")}70, transparent)`,
              width: hovered === "qian" ? "100%" : "0%",
              transition: "width .5s cubic-bezier(.16,1,.3,1)",
            }}/>
            <div style={{
              fontSize: 28,
              transition: "transform .4s cubic-bezier(.16,1,.3,1)",
              transform: hovered === "qian" ? "scale(1.15) rotate(-5deg)" : "scale(1)",
              filter: "drop-shadow(0 2px 8px rgba(216,90,74,0.4))",
            }}>🏮</div>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, fontWeight: 500,
                color: hovered === "qian" ? text : textSoft,
                transition: "color .4s", letterSpacing: 0.5,
              }}>Oracle Sticks</div>
              <div style={{
                fontSize: 11, color: hovered === "qian" ? textSoft : textMute,
                transition: "color .4s", marginTop: 2,
              }}>Ancient temple fortune — shake and reveal</div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div style={{ textAlign: "center", marginBottom: 24, ...fadeUp(0.42) }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${gold}40)` }}/>
            <Star size={6} color={gold} filled opacity={0.5}/>
            <div style={{ width: 60, height: 1, background: `linear-gradient(270deg, transparent, ${gold}40)` }}/>
          </div>
        </div>

        {/* Compliance */}
        <div style={{ textAlign: "center", padding: "0 0 24px", ...fadeUp(0.46) }}>
          <div style={{ fontSize: 9, color: textDim, letterSpacing: 1, lineHeight: 1.8 }}>
            For entertainment only. Not medical, financial, or professional advice.
          </div>
        </div>
      </div>
    </>
  );
}
