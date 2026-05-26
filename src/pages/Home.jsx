import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";

const red = "#C92A2A";
const gold = "#B8964A";

function Star({ size = 20, color = red, filled = true, opacity = 1 }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}><path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z" fill={filled ? color : "none"} stroke={filled ? "none" : color} strokeWidth="1.5"/></svg>;
}

function I({ children, c, size = 40 }) {
  return <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}

const ic = { master: gold, elements: "#C45A3A", zodiac: "#D4842A", meihua: "#8A5A6A", tarot: "#7A4A5A", oracle: "#C45A3A", bazi: "#AA6A4A", fortune: "#D4742A" };

const icons = {
  master: (c) => <I c={c} size={44}><circle cx="20" cy="20" r="14" strokeWidth=".7"/><circle cx="20" cy="20" r="8" strokeWidth=".4" opacity=".25"/><circle cx="20" cy="14" r="1.5" fill={c} stroke="none"/><line x1="20" y1="17" x2="20" y2="26" strokeWidth=".7"/><line x1="16" y1="20" x2="24" y2="20" strokeWidth=".4" opacity=".3"/></I>,
  elements: (c) => <I c={c}><circle cx="20" cy="10" r="3" strokeWidth=".7"/><circle cx="30" cy="18" r="3" strokeWidth=".7"/><circle cx="26" cy="30" r="3" strokeWidth=".7"/><circle cx="14" cy="30" r="3" strokeWidth=".7"/><circle cx="10" cy="18" r="3" strokeWidth=".7"/></I>,
  zodiac: (c) => <I c={c}><circle cx="20" cy="20" r="15" strokeWidth=".35" opacity=".15"/><circle cx="20" cy="20" r="10" strokeWidth=".7"/>{[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=><circle key={i} cx={20+15*Math.cos(a*Math.PI/180)} cy={20+15*Math.sin(a*Math.PI/180)} r=".8" fill={c} stroke="none" opacity=".35"/>)}</I>,
  tarot: (c) => <I c={c}><rect x="13" y="9" width="14" height="22" rx="2" strokeWidth=".7"/><circle cx="20" cy="18" r="3.5" strokeWidth=".5"/></I>,
  fortune: (c) => <I c={c}><circle cx="20" cy="20" r="11" strokeWidth=".35" opacity=".2"/><path d="M20 9L20 13"/><path d="M20 27L20 31"/><path d="M9 20L13 20"/><path d="M27 20L31 20"/><circle cx="20" cy="20" r="2" fill={c} stroke="none" opacity=".4"/></I>,
};

function dg(isH, accent) {
  return {
    background: isH ? "rgba(255,255,255,.045)" : "rgba(255,255,255,.015)",
    border: `1px solid rgba(255,255,255,${isH ? ".08" : ".025"})`,
    borderRadius: 18, cursor: "pointer",
    transition: "all .6s cubic-bezier(.16,1,.3,1)",
    transform: isH ? "translateY(-6px)" : "none",
    boxShadow: isH ? `0 32px 80px rgba(0,0,0,.4), 0 0 80px ${accent || red}08` : "none",
  };
}

export default function Home() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const daily = getDailyQuote();

  return (
    <div>
      {/* Hero — single clear CTA */}
      <section style={{ padding: "80px 0 64px", textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}><Star size={12} color={gold} filled opacity={.35}/></div>
        <div style={{ fontSize: 10, letterSpacing: 10, textTransform: "uppercase", color: gold, marginBottom: 36, fontWeight: 500, opacity: .7 }}>Ancient Wisdom · AI</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "#FFF", lineHeight: 1.08, marginBottom: 28, letterSpacing: -1 }}>
          Decode every word.<br/><span style={{ color: red, fontStyle: "italic" }}>Reveal every fate.</span>
        </h1>
        <p style={{ fontSize: 13, color: "#444", lineHeight: 2.2, maxWidth: 320, margin: "0 auto 48px" }}>
          Consult the Master. Cast hexagrams.<br/>Discover what the universe has written.
        </p>
        <button onClick={() => navigate("/master")}
          style={{ background: red, color: "#FFF", border: "none", padding: "16px 52px", borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 2.5, textTransform: "uppercase", boxShadow: `0 0 40px ${red}30`, transition: "all .4s cubic-bezier(.16,1,.3,1)" }}
          onMouseEnter={(e) => { e.target.style.transform = "translateY(-3px) scale(1.03)"; e.target.style.boxShadow = `0 0 60px ${red}45`; }}
          onMouseLeave={(e) => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 0 40px ${red}30`; }}>
          Consult the Master
        </button>
      </section>

      {/* ═══ Today's Fate — daily engagement hook ═══ */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingLeft: 4 }}>
          <Star size={5} color={gold} filled opacity={.35}/>
          <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: "#444", fontWeight: 500 }}>Today</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,.04), transparent)", marginLeft: 8 }}/>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Daily Fortune */}
          <div onMouseEnter={() => setHovered("fortune")} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/fortune")}
            style={{ ...dg(hovered === "fortune", ic.fortune), padding: "32px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: `linear-gradient(90deg, transparent, ${ic.fortune}40, transparent)`, width: hovered === "fortune" ? "100%" : "0%", transition: "width .6s cubic-bezier(.16,1,.3,1)" }}/>
            <div style={{ marginBottom: 16, transition: "transform .5s cubic-bezier(.16,1,.3,1)", transform: hovered === "fortune" ? "scale(1.12)" : "scale(1)", transformOrigin: "left bottom" }}>{icons.fortune(ic.fortune)}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: hovered === "fortune" ? "#FFF" : "#CCC", transition: "color .4s", marginBottom: 5 }}>Daily Fortune</div>
            <div style={{ fontSize: 12, color: hovered === "fortune" ? "#666" : "#333", transition: "color .4s", lineHeight: 1.6 }}>Your love energy today</div>
          </div>

          {/* Daily Wisdom quote */}
          <div style={{ background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.025)", borderRadius: 18, padding: "24px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#444", lineHeight: 2, fontStyle: "italic", marginBottom: 12 }}>"{daily}"</div>
            <div style={{ fontSize: 8, letterSpacing: 6, textTransform: "uppercase", color: "#222" }}>Daily Wisdom</div>
          </div>
        </div>
      </section>

      {/* ═══ Trending — shareable, easy, daily opens ═══ */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingLeft: 4 }}>
          <Star size={5} color={red} filled opacity={.3}/>
          <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: "#444", fontWeight: 500 }}>Trending</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,.04), transparent)", marginLeft: 8 }}/>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {[
            { id: "zodiac", title: "Zodiac Match", desc: "Toxic or soulmate? Find out.", tag: "Most shared" },
            { id: "tarot", title: "Tarot Reading", desc: "Three-card love spread", tag: "Popular" },
          ].map((item) => {
            const isH = hovered === item.id;
            return (
              <div key={item.id} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/" + item.id)}
                style={{ ...dg(isH, ic[item.id]), padding: "32px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: `linear-gradient(90deg, transparent, ${ic[item.id]}40, transparent)`, width: isH ? "100%" : "0%", transition: "width .6s cubic-bezier(.16,1,.3,1)" }}/>
                {item.tag && <div style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: red, marginBottom: 14, fontWeight: 600, opacity: .7 }}>{item.tag}</div>}
                <div style={{ marginBottom: 16, transition: "transform .5s cubic-bezier(.16,1,.3,1)", transform: isH ? "scale(1.12)" : "scale(1)", transformOrigin: "left bottom" }}>{icons[item.id](ic[item.id])}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: isH ? "#FFF" : "#CCC", transition: "color .4s", marginBottom: 5 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: isH ? "#666" : "#333", transition: "color .4s", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ Destiny — deep readings, requires birth data ═══ */}
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingLeft: 4 }}>
          <Star size={5} color={gold} filled opacity={.3}/>
          <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: "#444", fontWeight: 500 }}>Destiny</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,.04), transparent)", marginLeft: 8 }}/>
        </div>

        {/* The Master — hero */}
        <div onMouseEnter={() => setHovered("master")} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/master")}
          style={{ ...dg(hovered === "master"), borderRadius: 22, padding: "44px 36px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: `linear-gradient(90deg, transparent, ${gold}35, transparent)`, width: hovered === "master" ? "100%" : "0%", transition: "width .7s cubic-bezier(.16,1,.3,1)" }}/>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Star size={8} color={gold} filled opacity={.5}/>
                <span style={{ fontSize: 9, letterSpacing: 7, textTransform: "uppercase", color: gold, fontWeight: 500, opacity: .7 }}>Live AI Session</span>
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#FFF", marginBottom: 10, fontWeight: 400 }}>The Master</div>
              <div style={{ fontSize: 13, color: "#444", lineHeight: 1.9 }}>Full birth chart · Life path · Predictions</div>
            </div>
            <div style={{ marginLeft: 32, flexShrink: 0, transition: "transform .6s cubic-bezier(.16,1,.3,1)", transform: hovered === "master" ? "scale(1.15)" : "scale(1)" }}>{icons.master(ic.master)}</div>
          </div>
        </div>

        {/* Elements + Bazi + Meihua */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { id: "elements", title: "Five Elements", desc: "Love compatibility" },
            { id: "bazi", title: "Bazi Match", desc: "Destiny pairing" },
            { id: "meihua", title: "Plum Blossom", desc: "I Ching oracle" },
          ].map((item) => {
            const isH = hovered === item.id;
            return (
              <div key={item.id} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/" + item.id)}
                style={{ ...dg(isH, ic[item.id]), padding: "28px 16px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: `linear-gradient(90deg, transparent, ${ic[item.id]}30, transparent)`, width: isH ? "100%" : "0%", transition: "width .5s cubic-bezier(.16,1,.3,1)" }}/>
                <div style={{ marginBottom: 12, display: "flex", justifyContent: "center", transition: "transform .45s cubic-bezier(.16,1,.3,1)", transform: isH ? "scale(1.18)" : "scale(1)" }}>{icons[item.id](ic[item.id])}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: isH ? "#DDD" : "#888", transition: "color .4s", marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: isH ? "#555" : "#2A2A2A", transition: "color .4s" }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Oracle Sticks — standalone since it's unique UX */}
      <section style={{ marginBottom: 48 }}>
        <div onMouseEnter={() => setHovered("qian")} onMouseLeave={() => setHovered(null)} onClick={() => navigate("/qian")}
            style={{ ...dg(hovered === "qian", ic.oracle), padding: "28px 32px", display: "flex", alignItems: "center", gap: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, height: 1, background: `linear-gradient(90deg, transparent, ${ic.oracle}30, transparent)`, width: hovered === "qian" ? "100%" : "0%", transition: "width .5s cubic-bezier(.16,1,.3,1)" }}/>
            <div style={{ fontSize: 28, transition: "transform .4s cubic-bezier(.16,1,.3,1)", transform: hovered === "qian" ? "scale(1.15)" : "scale(1)" }}>🏮</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: hovered === "qian" ? "#DDD" : "#999", transition: "color .4s" }}>Oracle Sticks</div>
              <div style={{ fontSize: 11, color: hovered === "qian" ? "#555" : "#333", transition: "color .4s" }}>Ancient temple fortune — shake and reveal</div>
            </div>
          </div>
      </section>

      {/* Compliance — fixed visible */}
      <div style={{ textAlign: "center", padding: "0 0 16px" }}>
        <div style={{ fontSize: 9, color: "#222", letterSpacing: 1, lineHeight: 1.8 }}>For entertainment only. Not medical, financial, or professional advice.</div>
      </div>
    </div>
  );
}
