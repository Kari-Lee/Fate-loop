import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("yidu-lang") === "zh" ? "zh" : "en"; } catch { return "en"; }
  });
  const dragonRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragonRef.current || window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      dragonRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const enter = () => navigate("/home");
  const toggle = () => { const n = lang === "zh" ? "en" : "zh"; setLang(n); try { localStorage.setItem("yidu-lang", n); } catch {} };

  const T = {
    en: { nav: "Enter ›", m1: "Master", m2: "Divination", line1: "Ancient wisdom", line2: "meets this moment", sub: "Free · 3 readings today", cta: "Begin", qLabel: "Today · Wisdom", quote: "Water doesn't fight Fire.\nIt just wins, quietly." },
    zh: { nav: "进入 ›", m1: "大师", m2: "占卜", line1: "古老的智慧", line2: "遇见此刻的你", sub: "免费 · 今日三问", cta: "开始解读", qLabel: "今日 · 箴言", quote: "水不与火相争，\n它只是静静地赢。" },
  }[lang];

  const fade = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(14px)",
    transition: `all 1s cubic-bezier(.16,1,.3,1) ${d}s`,
  });

  const glass = {
    background: "rgba(255,255,255,.32)",
    backdropFilter: "blur(16px) saturate(1.4)",
    WebkitBackdropFilter: "blur(16px) saturate(1.4)",
    border: "0.5px solid rgba(255,255,255,.6)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.7), 0 6px 24px rgba(42,37,32,.08)",
  };
  const ink = "#2A2520";
  const rust = "#9A2D22";

  return (
    <div style={{
      position: "fixed", inset: 0, overflow: "hidden",
      background: "linear-gradient(180deg, #FCFBF8 0%, #F4F0E8 100%)",
      fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600&display=swap');
        @keyframes ld_float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes ld_spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .ld-serif { font-family: 'Noto Serif SC', 'Songti SC', serif; }
      `}</style>

      {/* glass nav pill */}
      <div style={{ position: "relative", zIndex: 8, display: "flex", justifyContent: "center", paddingTop: 20, ...fade(0) }}>
        <div style={{ ...glass, borderRadius: 99, padding: "10px 22px", display: "flex", alignItems: "center", gap: 16 }}>
          <span className="ld-serif" style={{ fontSize: 16, color: ink, letterSpacing: 2, fontWeight: 600 }}>✦ FateLoop</span>
          <span style={{ width: "0.5px", height: 12, background: "rgba(42,37,32,.2)" }}/>
          <span onClick={enter} style={{ fontSize: 11, color: "#5A554C", cursor: "pointer" }}>{T.m1}</span>
          <span onClick={enter} style={{ fontSize: 11, color: "#5A554C", cursor: "pointer" }}>{T.m2}</span>
          <span onClick={toggle} style={{ fontSize: 11, color: "#5A554C", cursor: "pointer" }}>{lang === "zh" ? "EN" : "中文"}</span>
          <span onClick={enter} style={{ fontSize: 11, color: rust, cursor: "pointer" }}>{T.nav}</span>
        </div>
      </div>

      {/* rotating bagua array behind */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.4, zIndex: 1, pointerEvents: "none" }}>
        <svg viewBox="0 0 320 320" width="min(80vw, 360px)" height="min(80vw, 360px)" style={{ animation: "ld_spin 75s linear infinite", display: "block" }}>
          <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(42,37,32,.28)" strokeWidth="0.5"/>
          <circle cx="160" cy="160" r="126" fill="none" stroke="rgba(42,37,32,.18)" strokeWidth="0.5"/>
          <circle cx="160" cy="160" r="98" fill="none" stroke="rgba(42,37,32,.15)" strokeWidth="0.5" strokeDasharray="1 6"/>
          <circle cx="160" cy="160" r="68" fill="none" stroke="rgba(154,45,34,.28)" strokeWidth="0.5"/>
          <g fill="#2A2520" opacity="0.4" fontSize="15" textAnchor="middle" fontFamily="'Songti SC',serif">
            <text x="160" y="48">☰</text><text x="244" y="80">☴</text><text x="278" y="165">☵</text>
            <text x="244" y="250">☶</text><text x="160" y="282">☷</text><text x="76" y="250">☳</text>
            <text x="42" y="165">☲</text><text x="76" y="80">☱</text>
          </g>
          <circle cx="160" cy="160" r="4" fill="rgba(154,45,34,.5)"/>
        </svg>
      </div>

      {/* dragon — white bg blends into white page, no cutout needed */}
      <div ref={dragonRef} style={{
        position: "absolute", inset: 0, top: 20, zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "ld_float 10s ease-in-out infinite",
        opacity: loaded ? 1 : 0, transition: "opacity 1.6s ease", pointerEvents: "none",
      }}>
        <img src="/dragon.png" alt=""
          style={{ height: "96%", maxWidth: "98%", objectFit: "contain", mixBlendMode: "multiply" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      {/* glass wisdom chip */}
      <div style={{ position: "absolute", top: "30%", right: 20, zIndex: 7, animation: "ld_float 8s ease-in-out infinite", ...fade(0.8) }}>
        <div style={{ ...glass, borderRadius: 14, padding: "13px 16px", maxWidth: 150 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: rust, textTransform: "uppercase", marginBottom: 6 }}>{T.qLabel}</div>
          <div className="ld-serif" style={{ fontSize: 12, color: ink, lineHeight: 1.6, fontStyle: "italic", whiteSpace: "pre-line" }}>{T.quote}</div>
        </div>
      </div>

      {/* bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "34%", background: "linear-gradient(0deg, #F4F0E8 28%, transparent)", pointerEvents: "none", zIndex: 4 }}/>

      {/* title + glass cta */}
      <div style={{ position: "absolute", bottom: "6%", left: 0, right: 0, zIndex: 8, padding: "0 32px" }}>
        <h1 className="ld-serif" style={{ margin: 0, color: ink, fontWeight: 600, lineHeight: 1.08, fontSize: "clamp(34px, 9vw, 50px)" }}>
          <span style={{ display: "block", ...fade(0.3) }}>{T.line1}</span>
          <span style={{ display: "block", ...fade(0.45) }}>{T.line2}</span>
        </h1>
        <div style={{ ...fade(0.65), marginTop: 22, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span onClick={enter} style={{ ...glass, borderRadius: 99, padding: "14px 36px", fontSize: 12, letterSpacing: 3, color: ink, fontWeight: 500, cursor: "pointer" }}>
            {T.cta}
          </span>
          <span style={{ color: "#6B645A", fontSize: 11, letterSpacing: 1 }}>{T.sub}</span>
        </div>
      </div>
    </div>
  );
}
