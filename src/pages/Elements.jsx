import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { C, sec } from "../data/colors";
import { ELEMENTS, SHENG, SHENG_DESC, KE, KE_DESC, SAME_DESC, getElement, getZodiacIndex, ZODIAC } from "../data/wuxing";

export default function Elements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [relType, setRelType] = useState(null);
  const [d1, setD1] = useState({ y: "", m: "", d: "", h: "" });
  const [d2, setD2] = useState({ y: "", m: "", d: "", h: "" });
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);

  const REL_TYPES = [
    { id: "crush", label: t("elements.relCrush"), icon: "💘" },
    { id: "dating", label: t("elements.relDating"), icon: "💕" },
    { id: "partner", label: t("elements.relPartner"), icon: "💍" },
    { id: "friends", label: t("elements.relFriends"), icon: "🤝" },
  ];

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
    score += Math.floor(Math.random() * 8) - 4;
    score = Math.max(15, Math.min(96, score));

    const isGood = score >= 60;
    const verdictKey = isGood ? "good" : "bad";
    const verdictIdx = Math.floor(Math.random() * 3);
    const verdict = t(`elements.verdict.${verdictKey}.${verdictIdx}`);
    const shareLine = isGood
      ? t("elements.shareGood", { e1: ELEMENTS[zh1].en, e2: ELEMENTS[zh2].en, score })
      : t("elements.shareBad", { e1: ELEMENTS[zh1].en, e2: ELEMENTS[zh2].en, score });

    setResult({ e1, e2, z1, z2, relationship, relDesc, score, isGood, verdict, shareLine, noHour: !d1.h && !d2.h });
    setStep(2);
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: "FateLoop — Five Elements", text: result.shareLine, url: "https://fate-loop.vercel.app/elements" }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(result.shareLine + "\n\nfate-loop.vercel.app/elements").then(() => alert(t("elements.copied")));
    }
  };

  const reset = () => { setStep(0); setRelType(null); setD1({ y: "", m: "", d: "", h: "" }); setD2({ y: "", m: "", d: "", h: "" }); setResult(null); };

  const inputStyle = {
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)",
    borderRadius: 12, padding: "14px 16px", color: C.ink, fontSize: 16,
    textAlign: "center", minWidth: 0, outline: "none", transition: "border-color .3s", width: "100%",
  };

  // Step 0: relationship type
  if (step === 0) return (
    <div className="animate-fu" style={{ padding: "48px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="font-serif" style={{ fontSize: 32, color: C.ink, fontWeight: 400, marginBottom: 8 }}>{t("elements.title")}</div>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.8 }}>{t("elements.relPrompt")}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 360, margin: "0 auto" }}>
        {REL_TYPES.map((rt) => (
          <div key={rt.id} onClick={() => { setRelType(rt); setStep(1); }}
            style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "all .4s cubic-bezier(.16,1,.3,1)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.line; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{rt.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{rt.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 1: dates
  if (step === 1) return (
    <div className="animate-fu" style={{ padding: "40px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, marginBottom: 10, opacity: .8 }}>{relType.icon} {relType.label}</div>
        <div className="font-serif" style={{ fontSize: 28, color: C.ink, fontWeight: 400 }}>{t("elements.enterDates")}</div>
      </div>

      {[{ label: t("elements.yourBday"), d: d1, setD: setD1 }, { label: t("elements.theirBday"), d: d2, setD: setD2 }].map((p, pi) => (
        <div key={pi} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: "24px 20px", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.sub, marginBottom: 14, fontWeight: 500 }}>{p.label}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={{ ...inputStyle, flex: 2 }} type="tel" inputMode="numeric" placeholder={t("elements.phYear")} maxLength={4} value={p.d.y} onChange={(e) => p.setD({ ...p.d, y: e.target.value })} />
            <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" placeholder={t("elements.phMonth")} maxLength={2} value={p.d.m} onChange={(e) => p.setD({ ...p.d, m: e.target.value })} />
            <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" placeholder={t("elements.phDay")} maxLength={2} value={p.d.d} onChange={(e) => p.setD({ ...p.d, d: e.target.value })} />
          </div>
          <div style={{ marginTop: 10 }}>
            <input style={{ ...inputStyle, fontSize: 13 }} type="tel" inputMode="numeric" placeholder={t("elements.phHour")} maxLength={2} value={p.d.h} onChange={(e) => p.setD({ ...p.d, h: e.target.value })} />
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button onClick={() => setStep(0)} style={{ flex: 1, padding: "14px", borderRadius: 14, background: C.card, border: `1px solid ${C.line}`, color: C.sub, fontSize: 13, cursor: "pointer" }}>{t("elements.back")}</button>
        <button onClick={calculate} disabled={!d1.y || !d1.m || !d1.d || !d2.y || !d2.m || !d2.d}
          className={d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? "animate-glow" : ""}
          style={{
            flex: 2, padding: "14px", borderRadius: 14, border: "none", fontSize: 13, fontWeight: 700,
            cursor: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? "pointer" : "default",
            letterSpacing: 1, textTransform: "uppercase",
            background: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? `linear-gradient(135deg, ${C.gold}, ${C.rose})` : "rgba(255,255,255,.05)",
            color: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? C.ink : C.sub,
            boxShadow: d1.y && d1.m && d1.d && d2.y && d2.m && d2.d ? `0 8px 28px rgba(184,151,106,.2)` : "none",
            transition: "all .3s",
          }}>
          {t("elements.reveal")}
        </button>
      </div>
    </div>
  );

  // Step 2: result
  if (step === 2 && result) {
    const el1 = ELEMENTS[result.e1.zh];
    const el2 = ELEMENTS[result.e2.zh];
    const z1 = ZODIAC[result.z1];
    const z2 = ZODIAC[result.z2];

    const relTitle = result.relationship.includes("feed")
      ? t("elements.relTitle.feed")
      : result.relationship.includes("overcome")
      ? t("elements.relTitle.clash")
      : t("elements.relTitle.dynamic");

    return (
      <div className="animate-fu" style={{ padding: "40px 0" }}>
        {result.noHour && (
          <div style={{ textAlign: "center", marginBottom: 20, padding: "10px 16px", background: C.card, borderRadius: 10, border: `1px solid ${C.line}` }}>
            <div style={{ fontSize: 11, color: C.sub, letterSpacing: .5 }}>{t("elements.noHourNote")}</div>
          </div>
        )}

        {/* Compatibility score */}
        <div style={{ textAlign: "center", padding: "40px 24px", background: C.card, borderRadius: 22, border: `1px solid ${C.line}`, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${result.isGood ? C.sage : C.rose}40, transparent)` }} />
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.sub, marginBottom: 16 }}>{relType.icon} {relType.label} {t("elements.compatibilityLabel")}</div>
          <div className="font-serif" style={{ fontSize: 72, fontWeight: 300, color: result.isGood ? C.sage : C.rose, lineHeight: 1 }}>{result.score}<span style={{ fontSize: 24, opacity: .5 }}>%</span></div>
          <div className="font-serif" style={{ fontSize: 18, color: C.ink + "AA", fontStyle: "italic", marginTop: 12 }}>{result.verdict}</div>
        </div>

        {/* Element cards */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {[{ el: el1, label: t("elements.you"), z: z1 }, { el: el2, label: t("elements.them"), z: z2 }].map((p, i) => (
            <div key={i} style={{ flex: 1, background: C.card, borderRadius: 16, padding: "24px 16px", textAlign: "center", border: `1px solid ${C.line}` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.sub, textTransform: "uppercase", marginBottom: 10 }}>{p.label}</div>
              <div className="font-serif" style={{ fontSize: 28, color: p.el.color, fontWeight: 400, marginBottom: 4 }}>{p.el.en}</div>
              <div style={{ fontSize: 11, color: C.sub }}>{p.z.emoji} {p.z.en}</div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div style={{ ...sec, marginTop: 0, marginBottom: 20 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.gold, marginBottom: 18, fontWeight: 500, opacity: .8 }}>{relTitle}</div>
          <div style={{ fontSize: 14, color: C.ink + "CC", lineHeight: 2, marginBottom: 16 }}>{result.relDesc?.desc || t("elements.neutralFallback")}</div>
          <div style={{ fontSize: 14, color: C.ink + "AA", lineHeight: 2, marginBottom: 16 }}>{el1.loveStyle}</div>
          <div style={{ fontSize: 14, color: C.ink + "AA", lineHeight: 2 }}>{el2.shadow}</div>
        </div>

        {/* Shareable card */}
        <div style={{ background: `linear-gradient(135deg, rgba(255,255,255,.03), rgba(255,255,255,.01))`, borderRadius: 16, padding: "28px 24px", border: `1px solid ${C.line}`, textAlign: "center", marginBottom: 24 }}>
          <div className="font-serif" style={{ fontSize: 16, color: C.ink + "BB", fontStyle: "italic", lineHeight: 1.8, marginBottom: 16 }}>"{result.shareLine}"</div>
          <button onClick={share} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 99, padding: "10px 28px", fontSize: 11, color: C.ink + "AA", cursor: "pointer", letterSpacing: 1, transition: "all .3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.ink + "AA"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; }}>
            {t("elements.shareBtn")}
          </button>
        </div>

        {/* CTAs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate("/master")} style={{ padding: "16px 12px", borderRadius: 14, background: C.card, border: `1px solid ${C.line}`, color: C.ink + "AA", fontSize: 12, cursor: "pointer", transition: "all .3s", letterSpacing: .5 }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.gold}50`; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.ink + "AA"; }}>
            {t("elements.ctaMaster")}
          </button>
          <button onClick={() => navigate("/tarot")} style={{ padding: "16px 12px", borderRadius: 14, background: C.card, border: `1px solid ${C.line}`, color: C.ink + "AA", fontSize: 12, cursor: "pointer", transition: "all .3s", letterSpacing: .5 }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.rose}50`; e.currentTarget.style.color = C.ink; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.ink + "AA"; }}>
            {t("elements.ctaTarot")}
          </button>
        </div>

        <button onClick={reset} style={{ width: "100%", padding: "14px", borderRadius: 14, background: "transparent", border: `1px solid ${C.line}`, color: C.sub, fontSize: 12, cursor: "pointer", letterSpacing: 1 }}>
          {t("elements.newReading")}
        </button>
      </div>
    );
  }

  return null;
}
