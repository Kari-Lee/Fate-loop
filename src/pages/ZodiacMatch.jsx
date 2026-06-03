import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ZODIAC, TOXIC_COMBOS, HARMONY_COMBOS, getZodiacIndex } from "../data/wuxing";

const C = {
  gold: "#B8964A",
  card: "rgba(255,255,255,.02)",
  line: "rgba(255,255,255,.06)",
  ink: "#F5F1E8",
  sub: "rgba(245,241,232,0.6)",
  muted: "rgba(245,241,232,0.35)",
  sage: "#6B9B7A",
  rose: "#C75B3A",
};

export default function ZodiacMatch() {
  const { t } = useTranslation();
  const [you, setYou] = useState(null);
  const [them, setThem] = useState(null);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState("you");

  const selectSign = (idx) => {
    if (step === "you") {
      setYou(idx);
      setStep("them");
    } else if (step === "them") {
      setThem(idx);
      const toxic = TOXIC_COMBOS.find((c) => (c.a === you && c.b === idx) || (c.b === you && c.a === idx));
      const harmony = HARMONY_COMBOS.find((c) => (c.a === you && c.b === idx) || (c.b === you && c.a === idx));
      setResult({ you, them: idx, toxic, harmony });
      setStep("result");
    }
  };

  const reset = () => { setYou(null); setThem(null); setResult(null); setStep("you"); };

  const SignGrid = ({ selected, onSelect, exclude }) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
      {ZODIAC.map((z, i) => {
        const isSelected = selected === i;
        const isExcluded = exclude === i;
        return (
          <div key={i} onClick={() => !isExcluded && onSelect(i)}
            style={{
              background: isSelected ? "rgba(184,150,74,.15)" : C.card,
              border: isSelected ? `1.5px solid ${C.gold}` : `1px solid ${C.line}`,
              borderRadius: 16, padding: "18px 8px", textAlign: "center",
              cursor: isExcluded ? "default" : "pointer", opacity: isExcluded ? 0.25 : 1,
              transition: "all .2s",
            }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>{z.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? C.gold : C.sub }}>{z.en}</div>
            <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>{z.years}</div>
          </div>
        );
      })}
    </div>
  );

  if (step === "result" && result) {
    const youZ = ZODIAC[result.you];
    const themZ = ZODIAC[result.them];
    const combo = result.toxic || result.harmony;
    const isToxic = !!result.toxic;
    const isHarmony = !!result.harmony;

    return (
      <div>
        <div style={{ textAlign: "center", padding: "20px 0 12px" }}>
          <span style={{ fontSize: 10, letterSpacing: 6, color: C.gold, textTransform: "uppercase" }}>{t("zodiac.kicker")}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, padding: "12px 0 32px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 52 }}>{youZ.emoji}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 8 }}>{youZ.en}</div>
            <div style={{ fontSize: 10, color: C.muted }}>{t("zodiac.you")}</div>
          </div>
          <div style={{ fontSize: 28, color: isToxic ? C.rose : isHarmony ? C.sage : C.muted }}>
            {isToxic ? "⚡" : isHarmony ? "✦" : "·"}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 52 }}>{themZ.emoji}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 8 }}>{themZ.en}</div>
            <div style={{ fontSize: 10, color: C.muted }}>{t("zodiac.them")}</div>
          </div>
        </div>

        {combo ? (
          <div>
            <div style={{
              textAlign: "center", padding: "32px 24px", borderRadius: 20,
              background: C.card,
              border: `1px solid ${isToxic ? "rgba(199,91,58,.3)" : "rgba(107,155,122,.3)"}`,
              marginBottom: 16,
            }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{isToxic ? (result.toxic.level || "⚡") : "💚"}</div>
              <div style={{
                fontSize: 12, fontWeight: 900, letterSpacing: 4, textTransform: "uppercase",
                color: isToxic ? C.rose : C.sage, marginBottom: 16,
              }}>
                {combo.label}
              </div>
              <div style={{ fontSize: 15, lineHeight: 2, color: C.sub }}>{combo.desc}</div>
            </div>

            <div style={{
              padding: "24px", borderRadius: 16,
              background: C.card, border: `1px solid ${C.line}`,
              borderLeft: `3px solid ${isToxic ? C.rose : C.sage}`,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, textTransform: "uppercase", marginBottom: 10 }}>
                {isToxic ? t("zodiac.survival") : t("zodiac.whyWorks")}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.9, color: C.sub }}>{combo.advice || combo.desc}</div>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center", padding: "32px 24px", borderRadius: 20,
            background: C.card, border: `1px solid ${C.line}`,
          }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🤝</div>
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 4, color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>{t("zodiac.neutral")}</div>
            <div style={{ fontSize: 14, lineHeight: 2, color: C.sub }}>
              {t("zodiac.neutralDesc", { you: youZ.en, them: themZ.en })}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", margin: "28px 0 16px" }}>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2 }}>{t("zodiac.shareHint")}</div>
        </div>

        <button onClick={reset} style={{
          width: "100%", padding: 16, borderRadius: 14, border: `1px solid ${C.line}`,
          background: C.card, color: C.sub, fontSize: 14, cursor: "pointer", marginTop: 8,
        }}>{t("zodiac.tryAnother")}</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: "20px 0 12px" }}>
        <div style={{ fontSize: 60, fontWeight: 100, letterSpacing: 16, color: C.gold }}>生肖</div>
        <div style={{ fontSize: 11, letterSpacing: 8, textTransform: "uppercase", color: C.sub, marginTop: 8 }}>{t("zodiac.title")}</div>
        <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.8, maxWidth: 340, margin: "16px auto 0" }}>
          {t("zodiac.intro")}
        </p>
      </div>

      <div style={{
        padding: "28px 20px", borderRadius: 20, background: C.card,
        border: `1px solid ${C.line}`, marginTop: 28,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16,
          color: step === "you" ? C.gold : C.sage,
        }}>
          {step === "you" ? t("zodiac.pickYou") : t("zodiac.pickThem")}
        </div>

        {step === "them" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, padding: "10px 14px", borderRadius: 12, background: "rgba(255,255,255,.02)" }}>
            <span style={{ fontSize: 24 }}>{ZODIAC[you].emoji}</span>
            <span style={{ fontSize: 13, color: C.sub }}>{t("zodiac.you")}: <strong style={{ color: C.gold }}>{ZODIAC[you].en}</strong></span>
            <span onClick={() => { setYou(null); setStep("you"); }} style={{ marginLeft: "auto", fontSize: 12, color: C.muted, cursor: "pointer" }}>{t("zodiac.change")}</span>
          </div>
        )}

        <SignGrid selected={step === "you" ? you : them} onSelect={selectSign} exclude={step === "them" ? you : null} />
      </div>

      <div style={{
        marginTop: 20, padding: "24px", borderRadius: 20,
        background: C.card, border: `1px solid ${C.line}`,
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.rose, textTransform: "uppercase", marginBottom: 16 }}>{t("zodiac.toxicTitle")}</div>
        {TOXIC_COMBOS.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < TOXIC_COMBOS.length - 1 ? `1px solid ${C.line}` : "none" }}>
            <span style={{ fontSize: 18, width: 40, textAlign: "center" }}>{ZODIAC[c.a].emoji}</span>
            <span style={{ fontSize: 14, color: C.muted }}>×</span>
            <span style={{ fontSize: 18, width: 40, textAlign: "center" }}>{ZODIAC[c.b].emoji}</span>
            <span style={{ fontSize: 12, color: C.sub, flex: 1 }}>{ZODIAC[c.a].en} × {ZODIAC[c.b].en}</span>
            <span style={{ fontSize: 10, color: C.rose, fontWeight: 700 }}>{c.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
