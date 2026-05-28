import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";
import { track } from "../lib/analytics";

// ═══ V4 PALETTE — moonlit gold + ivory ═══
const gold = "#D4B07A";
const goldLight = "#E8C99A";
const goldBright = "#F5E5C0";
const ivory = "#F5F1E8";
const ivorySoft = "rgba(245,241,232,0.7)";
const ivoryMute = "rgba(245,241,232,0.5)";
const ivoryDim = "rgba(245,241,232,0.3)";

// ═══ Icons — direct render, no lookup ═══
const Ic = ({ children, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
    stroke="rgba(212,176,122,0.85)" strokeWidth="0.7"
    strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

function CardIcon({ id }) {
  switch (id) {
    case "master":
      return <Ic><circle cx="20" cy="20" r="14"/><circle cx="20" cy="14" r="1.5" fill={gold} stroke="none"/><line x1="20" y1="17" x2="20" y2="26"/></Ic>;
    case "tarot":
      return <Ic><rect x="13" y="9" width="14" height="22" rx="2"/><circle cx="20" cy="20" r="3"/></Ic>;
    case "iching":
    case "meihua":
      return <Ic><line x1="13" y1="14" x2="27" y2="14"/><line x1="13" y1="18" x2="18" y2="18"/><line x1="22" y1="18" x2="27" y2="18"/><line x1="13" y1="22" x2="27" y2="22"/><line x1="13" y1="26" x2="27" y2="26"/></Ic>;
    case "bazi":
      return <Ic><rect x="11" y="11" width="7" height="7"/><rect x="22" y="11" width="7" height="7"/><rect x="11" y="22" width="7" height="7"/><rect x="22" y="22" width="7" height="7"/></Ic>;
    case "zodiac":
      return <Ic><circle cx="20" cy="20" r="14" opacity=".2"/><circle cx="20" cy="20" r="10"/>{[0,60,120,180,240,300].map((a,i)=>{const r=(a*Math.PI)/180;return <circle key={i} cx={20+14*Math.cos(r)} cy={20+14*Math.sin(r)} r="1" fill={gold} stroke="none"/>;})}</Ic>;
    case "elements":
      return <Ic><circle cx="20" cy="10" r="3"/><circle cx="30" cy="18" r="3"/><circle cx="26" cy="30" r="3"/><circle cx="14" cy="30" r="3"/><circle cx="10" cy="18" r="3"/></Ic>;
    case "oracle":
    case "qian":
      return <Ic><line x1="20" y1="9" x2="20" y2="27"/><line x1="17" y1="11" x2="17" y2="25" opacity=".4"/><line x1="23" y1="11" x2="23" y2="25" opacity=".4"/><ellipse cx="20" cy="31" rx="7" ry="2"/></Ic>;
    case "fortune":
      return <Ic><circle cx="20" cy="20" r="11" opacity=".2"/><path d="M20 9L20 13"/><path d="M20 27L20 31"/><path d="M9 20L13 20"/><path d="M27 20L31 20"/><circle cx="20" cy="20" r="2" fill={gold} stroke="none"/></Ic>;
    default:
      return <Ic><circle cx="20" cy="20" r="10"/></Ic>;
  }
}

// ═══ Mandala Hero Orb ═══
function MandalaOrb({ size = 280 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      {/* Outer glow halo */}
      <div style={{
        position: "absolute", inset: -40, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(212,176,122,0.18) 0%, rgba(120,90,180,0.1) 40%, transparent 70%)`,
        filter: "blur(25px)",
      }}/>

      <svg width={size} height={size} viewBox="0 0 280 280" fill="none" style={{ position: "absolute", inset: 0, animation: "orb_spinSlow 80s linear infinite" }}>
        <defs>
          <radialGradient id="orbHomeGrad">
            <stop offset="0%" stopColor="rgba(212,176,122,0.25)"/>
            <stop offset="60%" stopColor="rgba(120,90,180,0.15)"/>
            <stop offset="100%" stopColor="rgba(60,80,140,0.05)"/>
          </radialGradient>
        </defs>
        <circle cx="140" cy="140" r="100" fill="url(#orbHomeGrad)" opacity="0.6"/>
        <circle cx="140" cy="140" r="120" stroke="rgba(212,176,122,0.5)" strokeWidth="0.5" fill="none"/>
        <circle cx="140" cy="140" r="105" stroke="rgba(245,241,232,0.2)" strokeWidth="0.3" fill="none"/>
        <circle cx="140" cy="140" r="80" stroke="rgba(212,176,122,0.4)" strokeWidth="0.5" fill="none" strokeDasharray="2 4"/>
        <circle cx="140" cy="140" r="55" stroke="rgba(245,241,232,0.25)" strokeWidth="0.3" fill="none"/>

        {/* Zodiac ticks */}
        <g stroke="rgba(212,176,122,0.6)" strokeWidth="0.5">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
            const rad = (a-90)*Math.PI/180;
            const x1 = 140 + 115 * Math.cos(rad);
            const y1 = 140 + 115 * Math.sin(rad);
            const x2 = 140 + 125 * Math.cos(rad);
            const y2 = 140 + 125 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}/>;
          })}
        </g>

        {/* Constellation dots */}
        <circle cx="140" cy="60" r="2" fill="rgba(212,176,122,0.9)"/>
        <circle cx="220" cy="140" r="2" fill="rgba(212,176,122,0.7)"/>
        <circle cx="140" cy="220" r="2" fill="rgba(212,176,122,0.7)"/>
        <circle cx="60" cy="140" r="2" fill="rgba(212,176,122,0.9)"/>
        <circle cx="100" cy="80" r="1.5" fill="rgba(245,241,232,0.6)"/>
        <circle cx="180" cy="80" r="1.5" fill="rgba(245,241,232,0.6)"/>
        <circle cx="180" cy="200" r="1.5" fill="rgba(245,241,232,0.6)"/>
        <circle cx="100" cy="200" r="1.5" fill="rgba(245,241,232,0.6)"/>

        <g stroke="rgba(212,176,122,0.25)" strokeWidth="0.4">
          <line x1="140" y1="60" x2="100" y2="80"/>
          <line x1="100" y1="80" x2="60" y2="140"/>
          <line x1="60" y1="140" x2="100" y2="200"/>
          <line x1="100" y1="200" x2="140" y2="220"/>
          <line x1="140" y1="220" x2="180" y2="200"/>
          <line x1="180" y1="200" x2="220" y2="140"/>
          <line x1="220" y1="140" x2="180" y2="80"/>
          <line x1="180" y1="80" x2="140" y2="60"/>
        </g>

        <circle cx="140" cy="140" r="22" fill="rgba(245,241,232,0.04)" stroke="rgba(212,176,122,0.5)" strokeWidth="0.5"/>
        <circle cx="140" cy="140" r="3" fill="rgba(212,176,122,0.95)"/>
      </svg>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  let daily = "Three thousand years of wisdom and you still texted them back.";
  try {
    const q = getDailyQuote();
    if (q && typeof q === "string") daily = q;
  } catch (e) {}

  const fadeUp = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(16px)",
    transition: `all .9s cubic-bezier(.16,1,.3,1) ${d}s`,
  });

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });

  const libraryCards = [
    { id: "master", title: "The Master", desc: "Live · AI", route: "/master", featured: true },
    { id: "tarot", title: "Tarot", desc: "3-card spread", route: "/tarot" },
    { id: "meihua", title: "I Ching", desc: "Hexagram", route: "/meihua" },
    { id: "bazi", title: "Bazi", desc: "Compatibility", route: "/bazi" },
    { id: "zodiac", title: "Zodiac", desc: "12 animals", route: "/zodiac" },
    { id: "elements", title: "Five Elements", desc: "Wu Xing", route: "/elements" },
    { id: "qian", title: "Oracle", desc: "Temple sticks", route: "/qian" },
    { id: "fortune", title: "Today's Energy", desc: "Daily reading", route: "/fortune" },
  ];

  return (
    <>
      <style>{`
        @keyframes orb_spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes orb_float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .v4-hero-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-weight: 300;
          color: ${ivory};
          line-height: 1.05;
          letter-spacing: -0.5px;
          font-size: 38px;
          margin: 0 0 18px;
        }
        @media (min-width: 768px) { .v4-hero-title { font-size: 52px; } }
        @media (min-width: 1024px) { .v4-hero-title { font-size: 64px; margin-bottom: 22px; } }

        .v4-library-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) { .v4-library-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; } }
        @media (min-width: 1024px) { .v4-library-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; } }

        .v4-card-hover { transition: all .5s cubic-bezier(.16,1,.3,1); cursor: pointer; }
        .v4-card-hover:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(212, 176, 122, 0.35) !important;
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: "60px 0 40px", textAlign: "center", position: "relative", ...fadeUp(0) }}>

        {/* Mandala orb hero */}
        <div style={{ animation: "orb_float 6s ease-in-out infinite", marginBottom: 36 }}>
          <MandalaOrb size={typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 280}/>
        </div>

        {/* Issue label */}
        <div className="fl-label" style={{ marginBottom: 18 }}>
          ✦ Issue Nº 02 · {today}
        </div>

        {/* Magazine title */}
        <h1 className="v4-hero-title">
          The veil is thin<br/>
          <em style={{
            fontWeight: 300, fontStyle: "italic",
            background: `linear-gradient(135deg, ${goldLight}, ${gold} 60%, #856A39)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            tonight.
          </em>
        </h1>

        <p style={{
          fontSize: 13, lineHeight: 2, color: ivoryMute,
          maxWidth: 380, margin: "0 auto 40px", letterSpacing: 0.3,
        }}>
          A master is reading the energy of this hour.<br/>Step inside.
        </p>

        {/* CTA glass pill */}
        <button
          onClick={() => { track("enter_reading_clicked"); navigate("/master"); }}
          className="fl-glass-strong"
          style={{
            padding: "15px 42px",
            color: ivory, fontSize: 11, letterSpacing: 3,
            textTransform: "uppercase", fontWeight: 500,
            cursor: "pointer",
            border: "0.5px solid rgba(212,176,122,0.4)",
            background: "rgba(212,176,122,0.1)",
            transition: "all .4s cubic-bezier(.16,1,.3,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,176,122,0.18)";
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(212,176,122,0.1)";
            e.currentTarget.style.transform = "none";
          }}
        >
          Enter Reading
        </button>

        {/* Soft signature */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 24, height: "0.5px", background: "rgba(212,176,122,0.4)" }}/>
          <span style={{ fontSize: 10, color: ivoryDim, letterSpacing: 2 }}>
            Free · 3 questions today
          </span>
          <div style={{ width: 24, height: "0.5px", background: "rgba(212,176,122,0.4)" }}/>
        </div>
      </section>

      {/* ═══ Daily Wisdom — single editorial card ═══ */}
      <section style={{ marginBottom: 48, ...fadeUp(0.15) }}>
        <div className="fl-glass" style={{
          padding: "32px 28px",
          textAlign: "center",
          maxWidth: 540, margin: "0 auto",
        }}>
          <div className="fl-label" style={{ marginBottom: 16 }}>
            ☾ Daily Wisdom
          </div>
          <p className="fl-serif" style={{
            fontSize: 18, fontStyle: "italic",
            color: "rgba(245,241,232,0.85)",
            lineHeight: 1.8, letterSpacing: 0.3,
            margin: 0,
          }}>
            "{daily}"
          </p>
        </div>
      </section>

      {/* ═══ THE LIBRARY ═══ */}
      <section style={{ marginBottom: 48, ...fadeUp(0.25) }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 30, height: "0.5px", background: "rgba(212,176,122,0.4)" }}/>
            <span className="fl-label">The Library</span>
            <div style={{ width: 30, height: "0.5px", background: "rgba(212,176,122,0.4)" }}/>
          </div>
        </div>

        <div className="v4-library-grid">
          {libraryCards.map((item) => (
            <div key={item.id}
              onClick={() => { track("card_clicked", { card: item.id }); navigate(item.route); }}
              className={`fl-glass v4-card-hover ${item.featured ? "fl-glass-strong" : ""}`}
              style={{
                padding: "22px 16px",
                textAlign: "center",
                position: "relative",
                ...(item.featured ? {
                  background: "rgba(212,176,122,0.08)",
                  border: "0.5px solid rgba(212,176,122,0.3)",
                } : {})
              }}>

              {item.featured && (
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  fontSize: 7, letterSpacing: 2, textTransform: "uppercase",
                  color: gold, opacity: 0.85,
                }}>
                  ★ Featured
                </div>
              )}

              <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
                <CardIcon id={item.id}/>
              </div>
              <div className="fl-serif" style={{
                fontSize: 16, color: "rgba(245,241,232,0.95)",
                marginBottom: 4, letterSpacing: 0.3,
              }}>
                {item.title}
              </div>
              <div className="fl-label">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Compliance ═══ */}
      <div style={{ textAlign: "center", ...fadeUp(0.4) }}>
        <div style={{ fontSize: 9, color: ivoryDim, letterSpacing: 1, lineHeight: 1.8 }}>
          For entertainment only. Not medical, financial, or professional advice.
        </div>
      </div>
    </>
  );
}
