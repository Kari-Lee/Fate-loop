import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProfile, saveProfile, clearProfile, deriveChart } from "../lib/profile";

const gold = "#E0A99E";
const ink = "#F2E9F0";
const sub = "rgba(242, 233, 240,0.6)";
const muted = "rgba(242, 233, 240,0.35)";
const line = "rgba(255,255,255,.08)";

export default function Profile() {
  if (typeof document !== "undefined" && !document.getElementById("profile-ph-style")) {
    const s = document.createElement("style"); s.id = "profile-ph-style";
    s.textContent = "input::placeholder{color:rgba(242, 233, 240,0.4)!important;opacity:1}";
    document.head.appendChild(s);
  }
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const [p, setP] = useState({ name: "", gender: "", year: "", month: "", day: "", hour: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getProfile();
    if (existing) { setP({ name: "", gender: "", year: "", month: "", day: "", hour: "", ...existing }); setSaved(true); }
  }, []);

  const chart = saved ? deriveChart(p) : (p.year ? deriveChart(p) : null);

  const onSave = () => {
    if (!p.year || !p.month || !p.day) return;
    saveProfile(p);
    setSaved(true);
  };

  const onClear = () => {
    clearProfile();
    setP({ name: "", gender: "", year: "", month: "", day: "", hour: "" });
    setSaved(false);
  };

  const L = (zh, en) => (lang === "zh" ? zh : en);

  const inputStyle = {
    background: "rgba(255,255,255,.04)", border: `0.5px solid ${line}`,
    borderRadius: 12, padding: "13px 14px", color: ink, fontSize: 15,
    textAlign: "center", outline: "none", width: "100%", minWidth: 0,
    fontFamily: "'Cormorant Garamond', serif",
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 0 40px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>✦ {L("我的命盘", "My Chart")}</div>
        <div className="fl-serif" style={{ fontSize: 26, color: ink, fontWeight: 400, letterSpacing: 1 }}>
          {L("命盘档案", "Your Birth Chart")}
        </div>
        <div style={{ fontSize: 12, color: sub, marginTop: 8, lineHeight: 1.7 }}>
          {L("填一次，大师与各占卜将自动为你解读", "Fill once — The Master and all readings remember you")}
        </div>
      </div>

      {/* derived chart preview */}
      {chart && (
        <div className="fl-glass" style={{ padding: "24px 20px", marginBottom: 20, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            <div>
              <div style={{ fontSize: 36 }}>{chart.zodiac?.emoji}</div>
              <div className="fl-label" style={{ marginTop: 6 }}>{L("生肖", "Zodiac")}</div>
              <div className="fl-serif" style={{ fontSize: 16, color: ink, marginTop: 2 }}>
                {lang === "zh" ? chart.zodiac?.zh : chart.zodiac?.en}
              </div>
            </div>
            <div style={{ width: "0.5px", background: line }} />
            <div>
              <div className="fl-serif" style={{ fontSize: 30, color: chart.element?.color || gold }}>{chart.element?.symbol}</div>
              <div className="fl-label" style={{ marginTop: 8 }}>{L("五行", "Element")}</div>
              <div className="fl-serif" style={{ fontSize: 16, color: ink, marginTop: 2 }}>{chart.element?.en}</div>
            </div>
          </div>
        </div>
      )}

      {/* form */}
      <div className="fl-glass" style={{ padding: "24px 20px" }}>
        <div className="fl-label" style={{ marginBottom: 8 }}>{L("昵称", "Name")}</div>
        <input style={{ ...inputStyle, textAlign: "left", marginBottom: 18 }} value={p.name}
          onChange={(e) => setP({ ...p, name: e.target.value })} placeholder={L("如何称呼你", "What should we call you")} />

        <div className="fl-label" style={{ marginBottom: 8 }}>{L("性别", "Gender")}</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          {[["female", L("女", "Female")], ["male", L("男", "Male")], ["other", L("其他", "Other")]].map(([v, lbl]) => (
            <div key={v} onClick={() => setP({ ...p, gender: v })}
              style={{ flex: 1, textAlign: "center", padding: "11px 0", borderRadius: 10, cursor: "pointer",
                background: p.gender === v ? "rgba(224, 169, 158,.15)" : "rgba(255,255,255,.03)",
                border: `0.5px solid ${p.gender === v ? "rgba(224, 169, 158,.4)" : line}`,
                color: p.gender === v ? gold : sub, fontSize: 13 }}>
              {lbl}
            </div>
          ))}
        </div>

        <div className="fl-label" style={{ marginBottom: 8 }}>{L("生辰", "Birth date")}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input style={{ ...inputStyle, flex: 2 }} type="tel" inputMode="numeric" maxLength={4}
            placeholder={L("年", "Year")} value={p.year} onChange={(e) => setP({ ...p, year: e.target.value })} />
          <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" maxLength={2}
            placeholder={L("月", "Mon")} value={p.month} onChange={(e) => setP({ ...p, month: e.target.value })} />
          <input style={{ ...inputStyle, flex: 1 }} type="tel" inputMode="numeric" maxLength={2}
            placeholder={L("日", "Day")} value={p.day} onChange={(e) => setP({ ...p, day: e.target.value })} />
        </div>
        <input style={{ ...inputStyle, marginBottom: 22 }} type="tel" inputMode="numeric" maxLength={2}
          placeholder={L("时辰（选填，0-23）", "Hour (optional, 0-23)")} value={p.hour} onChange={(e) => setP({ ...p, hour: e.target.value })} />

        <button onClick={onSave} disabled={!p.year || !p.month || !p.day}
          className="fl-glass-strong"
          style={{ width: "100%", padding: "15px", borderRadius: 14, border: `0.5px solid rgba(224, 169, 158,.4)`,
            background: p.year && p.month && p.day ? "rgba(224, 169, 158,.14)" : "rgba(255,255,255,.04)",
            color: p.year && p.month && p.day ? ink : muted, fontSize: 12, letterSpacing: 3,
            textTransform: "uppercase", fontWeight: 500, cursor: p.year && p.month && p.day ? "pointer" : "default" }}>
          {saved ? L("更新命盘", "Update Chart") : L("建立命盘", "Create Chart")}
        </button>

        {saved && (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
            <span onClick={() => navigate("/master")} className="fl-label fl-label-gold" style={{ cursor: "pointer" }}>
              {L("去问大师 ›", "Ask The Master ›")}
            </span>
            <span onClick={onClear} className="fl-label" style={{ cursor: "pointer" }}>
              {L("清除", "Clear")}
            </span>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: 18 }}>
        <span style={{ fontSize: 10, color: muted, letterSpacing: 1 }}>
          {L("命盘仅存于你的设备，不上传", "Your chart stays on your device — never uploaded")}
        </span>
      </div>
    </div>
  );
}
