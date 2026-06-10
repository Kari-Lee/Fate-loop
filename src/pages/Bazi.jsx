import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { C, sec } from "../data/colors";
import { calcBazi, baziCompat } from "../data/bazi";

export default function Bazi() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language === "zh" ? "zh" : "en";
  const [calType, setCalType] = useState("solar");
  const [d1, setD1] = useState({ y: "", m: "", d: "" });
  const [d2, setD2] = useState({ y: "", m: "", d: "" });
  const [result, setResult] = useState(null);

  const doBazi = () => {
    const b1 = calcBazi(parseInt(d1.y), parseInt(d1.m), parseInt(d1.d));
    const b2 = calcBazi(parseInt(d2.y), parseInt(d2.m), parseInt(d2.d));
    setResult(baziCompat(b1, b2));
  };

  const ready = d1.y && d1.m && d1.d && d2.y && d2.m && d2.d;

  const dateBlock = (num, label, date, setDate) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span className="fl-serif" style={{ fontSize: 17, color: C.gold }}>{num}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{label}</span>
      </div>
      <div style={{ display: "flex", gap: 18, alignItems: "flex-end" }}>
        {[{ k: "y", ph: t("bazi.year"), flex: 1.6 }, { k: "m", ph: t("bazi.month"), flex: 1 }, { k: "d", ph: t("bazi.day"), flex: 1 }].map((f) => (
          <div key={f.k} style={{ flex: f.flex }}>
            <input type="tel" inputMode="numeric" pattern="[0-9]*"
              value={date[f.k]} onChange={(e) => setDate({ ...date, [f.k]: e.target.value })}
              className="fl-serif"
              style={{ width: "100%", background: "transparent", border: "none", borderBottom: `1px solid ${C.gold}66`, padding: "6px 0 9px", textAlign: "center", fontSize: 23, color: C.ink, transition: "border-color .3s" }}
              onFocus={(e) => { e.target.style.borderBottomColor = C.gold; }}
              onBlur={(e) => { e.target.style.borderBottomColor = `${C.gold}66`; }} />
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.sub, textAlign: "center", marginTop: 7 }}>{f.ph}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (result) return (
    <div className="animate-fu">
      <div className="rounded-3xl py-9 px-6 text-center relative overflow-hidden mb-4" style={{ background: "linear-gradient(135deg,rgba(40,24,48,.92),rgba(24,14,30,.88))", border: "1px solid rgba(224,169,158,.18)", color: C.ink }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 30%,rgba(200, 142, 130,.12),transparent 60%)" }} />
        <div className="text-[12px] tracking-[3px] mb-3 relative" style={{ color: C.gold }}>{t("bazi.score")}</div>
        <div className="font-serif text-[56px] font-black relative" style={{ color: C.ink }}>{result.score}<span className="text-[20px]">%</span></div>
        <div className="font-serif text-[22px] font-bold mt-2 relative" style={{ color: C.gold }}>{result.type[lang]}</div>
      </div>
      <div className="flex gap-3 mb-4">
        {[{ label: t("bazi.you"), gz: result.gz1, w: result.w1, sx: result.sx1 }, { label: t("bazi.them"), gz: result.gz2, w: result.w2, sx: result.sx2 }].map((p, i) => (
          <div key={i} className="flex-1 text-center" style={{ ...sec, marginTop: 0 }}>
            <div className="text-[11px] mb-1.5" style={{ color: C.muted }}>{p.label}</div>
            <div className="font-serif text-[20px] font-bold" style={{ color: C.ink }}>{p.gz[lang]}</div>
            <div className="text-[12px] mt-1" style={{ color: C.sub }}>{lang === "zh" ? `${p.w.zh}命 · 属${p.sx.zh}` : `${p.w.en} element · Year of ${p.sx.en}`}</div>
          </div>
        ))}
        <div className="flex items-center"><span className="text-[24px]" style={{ color: C.gold }}>❤️</span></div>
      </div>
      <div style={sec}>
        <div className="fl-label" style={{ color: C.gold, marginBottom: 14 }}>{lang === "zh" ? "命理详解" : "The Reading"}</div>
        <div className="text-[15px]" style={{ lineHeight: 2, color: C.ink + "DD", whiteSpace: "pre-line" }}>{result.analysis[lang]}</div>
      </div>
      <div onClick={() => navigate("/master")} className="cursor-pointer" style={{ marginTop: 16, padding: "20px 18px", borderRadius: 18, background: "rgba(224,169,158,.1)", border: "1px solid rgba(224,169,158,.3)", transition: "all .3s" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(224,169,158,.16)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(224,169,158,.1)"; }}>
        <div className="fl-label" style={{ color: C.gold, marginBottom: 8 }}>{lang === "zh" ? "想问得更多?" : "Want to go deeper?"}</div>
        <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.7 }}>
          {lang === "zh" ? "把你们的故事讲给「大师」听，得到一份只属于你们俩的深度解读" : "Tell the Master your story for a reading made only for the two of you"}
          <span style={{ color: C.gold, marginLeft: 6, fontWeight: 600 }}>→</span>
        </div>
      </div>
      <button onClick={() => setResult(null)} className="w-full mt-4 py-4 rounded-2xl text-[14px] font-semibold cursor-pointer" style={{ background: C.card, color: C.sub, border: `1px solid ${C.line}` }}>{t("bazi.retry")}</button>
    </div>
  );

  return (
    <div className="animate-fu">
      <div className="text-center" style={{ marginBottom: 26 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <svg width="46" height="46" viewBox="0 0 80 80" fill="none">
            <circle cx="31" cy="40" r="20" stroke={C.gold} strokeWidth="1.1" opacity="0.9" />
            <circle cx="49" cy="40" r="20" stroke="#C8968C" strokeWidth="1.1" opacity="0.65" />
            <circle cx="40" cy="40" r="2.2" fill={C.gold} />
            <circle cx="40" cy="16" r="1.3" fill={C.gold} />
            <circle cx="40" cy="64" r="1.3" fill={C.gold} />
          </svg>
        </div>
        <div className="font-serif text-[26px] font-bold mb-1.5" style={{ color: C.ink }}>{t("bazi.title")}</div>
        <div className="text-[13px]" style={{ color: C.sub, marginBottom: 22 }}>{t("bazi.desc")}</div>
        <div style={{ display: "inline-flex", gap: 26 }}>
          {["solar", "lunar"].map((ct) => (
            <button key={ct} onClick={() => setCalType(ct)}
              style={{ background: "transparent", border: "none", padding: "0 0 7px", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                color: calType === ct ? C.gold : C.sub,
                borderBottom: calType === ct ? `1.5px solid ${C.gold}` : "1.5px solid transparent" }}>
              {t(`bazi.${ct}`)}
            </button>
          ))}
        </div>
      </div>
      {dateBlock("01", t("bazi.yourBday"), d1, setD1)}
      {dateBlock("02", t("bazi.theirBday"), d2, setD2)}
      <button onClick={doBazi} disabled={!ready} className="w-full mt-2 py-4 rounded-[18px] text-[16px] font-bold border-none cursor-pointer"
        style={{ color: ready ? "#130A16" : C.sub, background: ready ? `linear-gradient(135deg, ${C.gold}, #C8968C)` : "rgba(255,255,255,.05)", border: ready ? "none" : `1px solid ${C.line}`, boxShadow: ready ? "0 10px 30px rgba(224,169,158,.25)" : "none", letterSpacing: 1 }}>
        {t("bazi.submit")} {ready ? "→" : ""}
      </button>
    </div>
  );
}
