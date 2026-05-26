import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ELEMENTS, SHENG, SHENG_DESC, KE, KE_DESC, SAME_DESC, getElement, getZodiacIndex, ZODIAC } from "../data/wuxing";

const red = "#C92A2A";
const gold = "#B8964A";

const REL_TYPES = [
  { id: "crush", label: "Crush", icon: "💘" },
  { id: "dating", label: "Dating", icon: "💕" },
  { id: "partner", label: "Partner", icon: "💍" },
  { id: "friends", label: "Friends", icon: "🤝" },
];

function Star({ size = 20, color = red, filled = true, opacity = 1 }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}><path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z" fill={filled ? color : "none"} stroke={filled ? "none" : color} strokeWidth="1.5"/></svg>;
}

function glass(isH) {
  return {
    background: isH ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.02)",
    border: `1px solid rgba(255,255,255,${isH ? ".08" : ".03"})`,
    borderRadius: 16, cursor: "pointer",
    transition: "all .5s cubic-bezier(.16,1,.3,1)",
    transform: isH ? "translateY(-3px)" : "none",
  };
}

export default function Elements() {
  const navigate = useNavigate();
  const [relType, setRelType] = useState(null);
  const [d1, setD1] = useState({ y: "", m: "", d: "", h: "" });
  const [d2, setD2] = useState({ y: "", m: "", d: "", h: "" });
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0); // 0=reltype, 1=input, 2=result

  const calculate = () => {
    if (!d1.y || !d1.m || !d1.d || !d2.y || !d2.m || !d2.d) return;
    const e1 = getElement(+d1.y, +d1.m, +d1.d);
    const e2 = getElement(+d2.y, +d2.m, +d2.d);
    const z1 = getZodiacIndex(+d1.y);
    const z2 = getZodiacIndex(+d2.y);
    const zh1 = e1.zh, zh2 = e2.zh;

    let relationship = "neutral", relDesc = null;
    if (zh1 === zh2) { relationship = "same"; relDesc = { en: `Both ${ELEMENTS[zh1].en}`, desc: SAME_DESC[zh1] }; }
    else if (SHENG[zh1] === zh2) { relationship = "you_feed"; relDesc = SHENG_DESC[`${zh1}→${zh2}`]; }
    else if (SHENG[zh2] === zh1) { relationship = "they_feed"; relDesc = SHENG_DESC[`${zh2}→${zh1}`]; }
    else if (KE[zh1] === zh2) { relationship = "you_overcome"; relDesc = KE_DESC[`${zh1}→${zh2}`]; }
    else if (KE[zh2] === zh1) { relationship = "they_overcome"; relDesc = KE_DESC[`${zh2}→${zh1}`]; }

    let score = 60;
    if (relationship === "same") score = 70;
    if (relationship.includes("feed")) score = 85;
    if (relationship.includes("overcome")) score = 35;
    score += Math.floor(Math.random() * 8) - 4; // slight variance
    score = Math.max(15, Math.min(96, score));

    const isGood = score >= 60;
    const verdicts = isGood
      ? ["Your elements dance together.", "The cycle flows in your favor.", "Ancient harmony detected."]
      : ["Your elements create friction.", "The cycle demands work.", "Growth through tension."];
    const verdict = verdicts[Math.floor(Math.random() * verdicts.length)];

    const shareLine = isGood
      ? `${ELEMENTS[zh1].en} + ${ELEMENTS[zh2].en} = ${score}% compatible. The universe approves.`
      : `${ELEMENTS[zh1].en} + ${ELEMENTS[zh2].en} = ${score}% compatible. The universe has notes.`;

    setResult({ e1, e2, z1, z2, relationship, relDesc, score, isGood, verdict, shareLine, noHour: !d1.h && !d2.h });
    setStep(2);
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: "FateLoop — Five Elements", text: result.shareLine, url: "https://fateloop.app/elements" }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(result.shareLine + "\n\nfateloop.app/elements").then(() => alert("Copied!"));
    }
  };

  const reset = () => { setStep(0); setRelType(null); setD1({ y: "", m: "", d: "", h: "" }); setD2({ y: "", m: "", d: "", h: "" }); setResult(null); };

  const inputStyle = { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: "14px 16px", color: "#FFF", fontSize: 16, textAlign: "center", minWidth: 0, outline: "none", transition: "border-color .3s", width: "100%" };

  // Step 0: Relationship type
  if (step === 0) return (
    <div className="animate-fu" style={{ padding: "48px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <Star size={12} color={gold} filled opacity={.3}/>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#FFF", fontWeight: 400, marginTop: 16, marginBottom: 8 }}>Five Elements</div>
        <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>What kind of connection are you exploring?</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 360, margin: "0 auto" }}>
        {REL_TYPES.map((rt) => (
          <div key={rt.id} onClick={() => { setRelType(rt); setStep(1); }}
            style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.04)", borderRadius: 16, padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "all .4s cubic-bezier(.16,1,.3,1)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{rt.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#CCC" }}>{rt.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 1: Input dates
  if (step === 1) return (
    <div className="animate-fu" style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: gold, marginBottom: 8, opacity: .7 }}>{relType.icon} {relType.label}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#FFF", fontWeight: 400 }}>Enter birth dates</div>
      </div>

      {[{ label: "Your birthday", d: d1, setD: setD1 }, { label: "Their birthday", d: d2, setD: setD2 }].map((p, pi) => (
        <div key={pi} style={{ background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.03)", borderRadius: 18, padding: "24px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#555", marginBottom: 14, fontWeight: 500 }}>{p.label}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...inputStyle, flex: 2 }} type="tel" inputMode="numeric" placeholder="Year" maxLength={4} value={p.d.y} onChange={(e) => p.setD({ ...p.d, y: e.target.value })}/>
            <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" placeholder="Mo" maxLength={2} value={p.d.m} onChange={(e) => p.setD({ ...p.d, m: e.target.value })}/>
            <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" placeholder="Day" maxLength={2} value={p.d.d} onChange={(e) => p.setD({ ...p.d, d: e.target.value })}/>
          </div>
          <div style={{ marginTop: 10 }}>
            <input style={{ ...inputStyle, fontSize: 13 }} type="tel" inputMode="numeric" placeholder="Hour of birth (optional — skip if unknown)" maxLength={2} value={p.d.h} onChange={(e) => p.setD({ ...p.d, h: e.target.value })}/>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button onClick={() => setStep(0)} style={{ flex: 1, padding: "14px", borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)", color: "#666", fontSize: 13, cursor: "pointer" }}>Back</button>
        <button onClick={calculate} disabled={!d1.y || !d1.m || !d1.d || !d2.y || !d2.m || !d2.d}
          style={{ flex: 2, padding: "14px", borderRadius: 14, border: "none", fontSize: 13, fontWeight: 600, cursor: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? "pointer" : "default", letterSpacing: 1, textTransform: "uppercase", background: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? red : "rgba(255,255,255,.05)", color: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? "#FFF" : "#333", transition: "all .3s" }}>
          Reveal Elements
        </button>
      </div>
    </div>
  );

  // Step 2: Result
  if (step === 2 && result) {
    const el1 = ELEMENTS[result.e1.zh];
    const el2 = ELEMENTS[result.e2.zh];
    const z1 = ZODIAC[result.z1];
    const z2 = ZODIAC[result.z2];

    return (
      <div className="animate-fu" style={{ padding: "40px 0" }}>
        {result.noHour && (
          <div style={{ textAlign: "center", marginBottom: 20, padding: "10px 16px", background: "rgba(255,255,255,.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,.03)" }}>
            <div style={{ fontSize: 11, color: "#444", letterSpacing: .5 }}>Simplified reading without birth hour</div>
          </div>
        )}

        {/* Compatibility score — big, clear */}
        <div style={{ textAlign: "center", padding: "40px 24px", background: "rgba(255,255,255,.02)", borderRadius: 22, border: "1px solid rgba(255,255,255,.03)", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${result.isGood ? "#5A8A6A" : red}30, transparent)` }}/>
          <div style={{ fontSize: 9, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 16 }}>{relType.icon} {relType.label} compatibility</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 72, fontWeight: 300, color: result.isGood ? "#5A8A6A" : red, lineHeight: 1 }}>{result.score}<span style={{ fontSize: 24, opacity: .5 }}>%</span></div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#888", fontStyle: "italic", marginTop: 12 }}>{result.verdict}</div>
        </div>

        {/* Element cards side by side */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {[{ el: el1, label: "You", z: z1 }, { el: el2, label: "Them", z: z2 }].map((p, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,.02)", borderRadius: 16, padding: "24px 16px", textAlign: "center", border: "1px solid rgba(255,255,255,.03)" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#555", textTransform: "uppercase", marginBottom: 10 }}>{p.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: p.el.color, fontWeight: 400, marginBottom: 4 }}>{p.el.en}</div>
              <div style={{ fontSize: 11, color: "#444" }}>{p.z.emoji} {p.z.en}</div>
            </div>
          ))}
        </div>

        {/* 3 human-readable insights */}
        <div style={{ background: "rgba(255,255,255,.02)", borderRadius: 18, padding: "28px 24px", border: "1px solid rgba(255,255,255,.03)", marginBottom: 20 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: gold, marginBottom: 18, fontWeight: 500, opacity: .6 }}>
            {result.relationship.includes("feed") ? "Who nurtures whom" : result.relationship.includes("overcome") ? "Where you clash" : "Your dynamic"}
          </div>
          <div style={{ fontSize: 14, color: "#888", lineHeight: 2, marginBottom: 16 }}>{result.relDesc?.desc || "Your elements don't directly interact — your story is yours to write."}</div>
          <div style={{ fontSize: 14, color: "#666", lineHeight: 2, marginBottom: 16 }}>{el1.loveStyle}</div>
          <div style={{ fontSize: 14, color: "#666", lineHeight: 2 }}>{el2.shadow}</div>
        </div>

        {/* Shareable quote card */}
        <div style={{ background: `linear-gradient(135deg, rgba(255,255,255,.03), rgba(255,255,255,.01))`, borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(255,255,255,.04)", textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#777", fontStyle: "italic", lineHeight: 1.8, marginBottom: 16 }}>"{result.shareLine}"</div>
          <button onClick={share} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 99, padding: "10px 28px", fontSize: 11, color: "#888", cursor: "pointer", letterSpacing: 1, transition: "all .3s" }}
            onMouseEnter={(e) => { e.target.style.color = "#FFF"; e.target.style.borderColor = "rgba(255,255,255,.15)"; }}
            onMouseLeave={(e) => { e.target.style.color = "#888"; e.target.style.borderColor = "rgba(255,255,255,.08)"; }}>
            Share Result ↗
          </button>
        </div>

        {/* CTAs — continue exploring */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate("/master")} style={{ padding: "16px 12px", borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)", color: "#888", fontSize: 12, cursor: "pointer", transition: "all .3s", letterSpacing: .5 }}
            onMouseEnter={(e) => { e.target.style.borderColor = `${gold}30`; e.target.style.color = "#CCC"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,.05)"; e.target.style.color = "#888"; }}>
            🌙 Ask the Master
          </button>
          <button onClick={() => navigate("/tarot")} style={{ padding: "16px 12px", borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)", color: "#888", fontSize: 12, cursor: "pointer", transition: "all .3s", letterSpacing: .5 }}
            onMouseEnter={(e) => { e.target.style.borderColor = `${red}30`; e.target.style.color = "#CCC"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,.05)"; e.target.style.color = "#888"; }}>
            🃏 Draw 3 Tarot Cards
          </button>
        </div>

        <button onClick={reset} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "transparent", border: "1px solid rgba(255,255,255,.04)", color: "#444", fontSize: 12, cursor: "pointer", letterSpacing: 1 }}>
          New Reading ↻
        </button>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{ fontSize: 9, color: "#222", letterSpacing: 1 }}>For entertainment only.</div>
        </div>
      </div>
    );
  }

  return null;
}
