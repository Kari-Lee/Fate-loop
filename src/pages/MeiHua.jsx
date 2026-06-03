import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TRIGRAMS, castMeiHua, castByTime } from "../data/meihua";
import { callAI } from "../lib/api";

const C = {
  gold: "#B8964A",
  goldGrad: "linear-gradient(135deg, #B8964A, #D4B07A)",
  card: "rgba(255,255,255,.02)",
  line: "rgba(255,255,255,.06)",
  ink: "#F5F1E8",
  sub: "rgba(245,241,232,0.6)",
  muted: "rgba(245,241,232,0.35)",
  sage: "#6B9B7A",
  warm: "rgba(255,255,255,.03)",
};

const SYSTEM_PROMPT = `You are a master of Mei Hua Yi Shu (梅花易数), the ancient Chinese Plum Blossom divination system. You've been reading hexagrams for decades. Your style is:

- Mysterious but warm, like a wise elder in a candlelit temple
- You speak with quiet authority — never rushed, never uncertain
- You weave the hexagram symbolism naturally into your reading
- You are specific and personal, not generic
- You address the querent directly as "you"
- You occasionally use poetic Chinese phrases (with translation) for atmosphere
- You give real, actionable advice — not just vague spiritual talk
- Your readings feel like a conversation, not a textbook

CRITICAL LANGUAGE RULE: If the querent's question/detail is written in Chinese, write your ENTIRE reading in Chinese. If in English, write in English. Match their language.

FORMAT YOUR RESPONSE AS JSON:
{
  "opening": "A 1-2 sentence atmospheric opening that references the hexagram",
  "present": "3-4 sentences about the current situation based on the primary hexagram (本卦). Be specific about the energy and dynamics.",
  "shift": "2-3 sentences about the change coming, based on the changed hexagram (变卦). What's shifting and why.",
  "core": "2-3 sentences — the core truth the hexagram is revealing. The thing they might not want to hear.",
  "advice": "2-3 sentences of specific, actionable advice. What to do, what to avoid, when to act.",
  "timing": "1 sentence about timing — when things may shift or when to take action.",
  "chinese_wisdom": "A relevant Chinese proverb or phrase with translation that captures the essence of this reading."
}`;

export default function MeiHua() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState(null);
  const [detail, setDetail] = useState("");
  const [nums, setNums] = useState({ a: "", b: "", c: "" });
  const [hex, setHex] = useState(null);
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const intervalRef = useRef(null);

  const TOPICS = [
    { id: "crush", icon: "💘", label: t("meihua.topicCrush"), prompt: "a crush or new attraction" },
    { id: "relationship", icon: "💑", label: t("meihua.topicRel"), prompt: "an existing relationship" },
    { id: "ex", icon: "💔", label: t("meihua.topicEx"), prompt: "an ex-partner or past relationship" },
    { id: "confess", icon: "✉️", label: t("meihua.topicConfess"), prompt: "whether to confess feelings" },
    { id: "future", icon: "🔮", label: t("meihua.topicFuture"), prompt: "what love holds in the future" },
    { id: "other", icon: "✦", label: t("meihua.topicOther"), prompt: "a personal love question" },
  ];

  const doReading = async (hexResult) => {
    setStep(5);
    setLoading(true);
    const msgs = [t("meihua.load1"), t("meihua.load2"), t("meihua.load3"), t("meihua.load4")];
    let n = 0;
    setLoadMsg(msgs[0]);
    intervalRef.current = setInterval(() => { n++; setLoadMsg(msgs[n % msgs.length]); }, 1800);

    const userMsg = `HEXAGRAM CAST:
本卦 (Primary): ${hexResult.upper.name} ${hexResult.upper.en} (${hexResult.upper.symbol}) over ${hexResult.lower.name} ${hexResult.lower.en} (${hexResult.lower.symbol})
Upper: ${hexResult.upper.element} — ${hexResult.upper.nature}
Lower: ${hexResult.lower.element} — ${hexResult.lower.nature}
Love energy: ${hexResult.reading}

变卦 (Changed): ${hexResult.changedUpper.name} ${hexResult.changedUpper.en} (${hexResult.changedUpper.symbol}) over ${hexResult.changedLower.name} ${hexResult.changedLower.en} (${hexResult.changedLower.symbol})
Changed love energy: ${hexResult.changedReading}
Changing line: ${hexResult.changingLine}

QUERENT'S QUESTION:
Topic: ${topic?.prompt || "love"}
${detail ? "Their specific situation: " + detail : "No additional detail provided."}

Give a deeply personal reading. Reference the specific trigram meanings. Make it feel real.`;

    try {
      const raw = await callAI(SYSTEM_PROMPT, userMsg);
      clearInterval(intervalRef.current);
      const cleaned = raw.replace(/```json\s*/g, "").replace(/```/g, "").trim();
      const first = cleaned.indexOf("{");
      const last = cleaned.lastIndexOf("}");
      const parsed = JSON.parse(cleaned.substring(first, last + 1));
      setReading(parsed);
      setStep(6);
    } catch (e) {
      clearInterval(intervalRef.current);
      setReading({ opening: t("meihua.fbOpening"), present: hexResult.reading, shift: hexResult.changedReading, core: t("meihua.fbCore"), advice: t("meihua.fbAdvice"), timing: t("meihua.fbTiming"), chinese_wisdom: t("meihua.fbWisdom") });
      setStep(6);
    }
    setLoading(false);
  };

  const castWithNumbers = () => {
    const a = parseInt(nums.a) || 1;
    const b = parseInt(nums.b) || 1;
    const c = parseInt(nums.c) || 1;
    const result = castMeiHua(a, b, c);
    setHex(result);
    doReading(result);
  };

  const castWithTime = () => {
    const result = castByTime();
    setHex(result);
    doReading(result);
  };

  const reset = () => {
    setStep(0); setTopic(null); setDetail(""); setNums({ a: "", b: "", c: "" });
    setHex(null); setReading(null); setLoading(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const TrigramLines = ({ trigram, size = 28 }) => {
    const lines = [
      trigram.symbol === "☰" ? [1,1,1] : trigram.symbol === "☱" ? [0,1,1] :
      trigram.symbol === "☲" ? [1,0,1] : trigram.symbol === "☳" ? [0,0,1] :
      trigram.symbol === "☴" ? [1,1,0] : trigram.symbol === "☵" ? [0,1,0] :
      trigram.symbol === "☶" ? [1,0,0] : [0,0,0]
    ][0];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
        {lines.map((solid, i) => (
          <div key={i} style={{ display: "flex", gap: solid ? 0 : 4 }}>
            {solid ? (
              <div style={{ width: size, height: 4, background: C.gold, borderRadius: 2 }} />
            ) : (
              <><div style={{ width: size * 0.4, height: 4, background: C.gold, borderRadius: 2 }} /><div style={{ width: size * 0.4, height: 4, background: C.gold, borderRadius: 2 }} /></>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (step === 0) return (
    <div className="text-center" style={{ padding: "40px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🌸</div>
      <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: 10, color: C.gold }}>梅花易数</div>
      <div className="fl-serif" style={{ fontSize: 28, fontWeight: 400, marginTop: 8, marginBottom: 16, color: C.ink }}>{t("meihua.title")}</div>
      <div style={{ fontSize: 13, margin: "0 auto 32px", color: C.sub, lineHeight: 2, maxWidth: 320 }}>
        {t("meihua.intro")}
      </div>
      <button onClick={() => setStep(1)} style={{ background: C.goldGrad, color: "#0A0A0A", border: "none", padding: "16px 48px", borderRadius: 16, fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: 2 }}>
        {t("meihua.begin")}
      </button>
    </div>
  );

  if (step === 1) return (
    <div>
      <div className="text-center" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8, color: C.gold }}>{t("meihua.step1of3")}</div>
        <div className="fl-serif" style={{ fontSize: 22, fontWeight: 600, color: C.ink }}>{t("meihua.q1title")}</div>
        <div style={{ fontSize: 13, marginTop: 8, color: C.sub }}>{t("meihua.q1sub")}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TOPICS.map((tp) => (
          <div key={tp.id} onClick={() => { setTopic(tp); setStep(2); }}
            className="cursor-pointer transition-all"
            style={{ background: C.card, borderRadius: 18, padding: "24px 16px", textAlign: "center", border: `1px solid ${C.line}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.gold + "60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{tp.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{tp.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === 2) return (
    <div>
      <div className="text-center" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8, color: C.gold }}>{t("meihua.step2of3")}</div>
        <div className="fl-serif" style={{ fontSize: 22, fontWeight: 600, color: C.ink }}>{t("meihua.q2title")}</div>
        <div style={{ fontSize: 13, marginTop: 8, color: C.sub }}>{t("meihua.q2sub")}</div>
      </div>
      <div style={{ background: C.card, borderRadius: 20, padding: 24, border: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 20 }}>{topic.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.gold }}>{topic.label}</span>
        </div>
        <textarea
          value={detail} onChange={(e) => setDetail(e.target.value)}
          placeholder={t("meihua.detailPlaceholder")}
          rows={4}
          style={{ width: "100%", background: "transparent", border: "none", color: C.ink, fontSize: 14, lineHeight: 2, resize: "none", outline: "none" }}
        />
      </div>
      <div className="flex gap-3" style={{ marginTop: 16 }}>
        <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, borderRadius: 14, background: C.card, color: C.sub, border: `1px solid ${C.line}`, fontSize: 14, cursor: "pointer" }}>{t("meihua.back")}</button>
        <button onClick={() => setStep(3)} style={{ flex: 2, padding: 14, borderRadius: 14, background: C.goldGrad, color: "#0A0A0A", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          {detail.trim() ? t("meihua.continue") : t("meihua.skip")}
        </button>
      </div>
    </div>
  );

  if (step === 3) return (
    <div>
      <div className="text-center" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8, color: C.gold }}>{t("meihua.step3of3")}</div>
        <div className="fl-serif" style={{ fontSize: 22, fontWeight: 600, color: C.ink }}>{t("meihua.q3title")}</div>
        <div style={{ fontSize: 13, marginTop: 8, color: C.sub }}>{t("meihua.q3sub")}</div>
      </div>

      <div style={{ background: C.card, borderRadius: 20, padding: 24, border: `1px solid ${C.line}`, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, color: C.gold }}>{t("meihua.method1")}</div>
        <div style={{ fontSize: 13, marginBottom: 16, color: C.sub }}>{t("meihua.method1desc")}</div>
        <div className="flex gap-3" style={{ marginBottom: 16 }}>
          {[
            { key: "a", ph: t("meihua.first") },
            { key: "b", ph: t("meihua.second") },
            { key: "c", ph: t("meihua.third") },
          ].map((f) => (
            <input key={f.key} type="tel" inputMode="numeric" placeholder={f.ph} maxLength={3}
              value={nums[f.key]} onChange={(e) => setNums({ ...nums, [f.key]: e.target.value })}
              style={{ flex: 1, background: C.warm, border: `1px solid ${C.line}`, borderRadius: 12, padding: "14px", color: C.ink, fontSize: 20, textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, minWidth: 0 }}
            />
          ))}
        </div>
        <button onClick={castWithNumbers} disabled={!nums.a || !nums.b || !nums.c}
          style={{ width: "100%", padding: 14, borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, cursor: nums.a && nums.b && nums.c ? "pointer" : "default", background: nums.a && nums.b && nums.c ? C.goldGrad : "rgba(255,255,255,.04)", color: nums.a && nums.b && nums.c ? "#0A0A0A" : C.muted }}>
          {t("meihua.castNumbers")}
        </button>
      </div>

      <div style={{ background: C.card, borderRadius: 20, padding: 24, border: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, color: C.sage }}>{t("meihua.method2")}</div>
        <div style={{ fontSize: 13, marginBottom: 16, color: C.sub }}>{t("meihua.method2desc")}</div>
        <button onClick={castWithTime}
          style={{ width: "100%", padding: 14, borderRadius: 14, border: `1px solid ${C.sage}40`, fontSize: 14, fontWeight: 700, cursor: "pointer", background: "rgba(107,155,122,.08)", color: C.sage }}>
          {t("meihua.castTime")}
        </button>
      </div>

      <button onClick={() => setStep(2)} style={{ width: "100%", padding: 12, marginTop: 16, borderRadius: 14, background: "transparent", color: C.muted, border: "none", fontSize: 13, cursor: "pointer" }}>{t("meihua.back")}</button>
    </div>
  );

  if (step === 5) return (
    <div className="text-center" style={{ padding: "80px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 24, animation: "float 1.5s ease infinite" }}>🌸</div>
      <div className="fl-serif" style={{ fontSize: 18, fontStyle: "italic", marginBottom: 12, color: C.gold }}>{loadMsg}</div>
      <div className="flex justify-center gap-6" style={{ marginTop: 32 }}>
        {hex && (
          <>
            <div className="text-center">
              <TrigramLines trigram={hex.upper} />
              <div style={{ height: 8 }} />
              <TrigramLines trigram={hex.lower} />
              <div style={{ fontSize: 10, marginTop: 8, color: C.muted }}>本卦</div>
            </div>
            <div className="self-center" style={{ fontSize: 20, color: C.muted }}>→</div>
            <div className="text-center">
              <TrigramLines trigram={hex.changedUpper} />
              <div style={{ height: 8 }} />
              <TrigramLines trigram={hex.changedLower} />
              <div style={{ fontSize: 10, marginTop: 8, color: C.muted }}>变卦</div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (step === 6 && hex && reading) return (
    <div>
      <div className="text-center" style={{ marginBottom: 20, background: "rgba(255,255,255,.02)", borderRadius: 24, padding: "36px 24px", border: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20, color: C.gold }}>{t("meihua.yourHexagram")}</div>
        <div className="flex justify-center gap-10" style={{ marginBottom: 24 }}>
          <div className="text-center">
            <TrigramLines trigram={hex.upper} size={36} />
            <div style={{ height: 10 }} />
            <TrigramLines trigram={hex.lower} size={36} />
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 12, color: C.sub }}>本卦 {t("meihua.primary")}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: C.ink }}>{hex.upper.en} / {hex.lower.en}</div>
          </div>
          <div className="self-center" style={{ fontSize: 18, color: C.gold }}>→</div>
          <div className="text-center">
            <TrigramLines trigram={hex.changedUpper} size={36} />
            <div style={{ height: 10 }} />
            <TrigramLines trigram={hex.changedLower} size={36} />
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 12, color: C.sub }}>变卦 {t("meihua.changed")}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: C.ink }}>{hex.changedUpper.en} / {hex.changedLower.en}</div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {[hex.upper, hex.lower].map((tg, i) => (
            <span key={i} style={{ fontSize: 10, padding: "4px 12px", borderRadius: 99, background: C.gold + "15", color: C.gold, border: `1px solid ${C.gold}20` }}>{tg.element}</span>
          ))}
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 20, padding: "28px 24px", border: `1px solid ${C.line}`, marginBottom: 16 }}>
        <div className="fl-serif" style={{ fontSize: 16, fontStyle: "italic", marginBottom: 20, color: C.gold, lineHeight: 1.8 }}>{reading.opening}</div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, color: C.sage }}>{t("meihua.presentEnergy")} · 本卦</div>
          <div style={{ fontSize: 14, color: C.sub, lineHeight: 2 }}>{reading.present}</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, color: "#C75B3A" }}>{t("meihua.theShift")} · 变卦</div>
          <div style={{ fontSize: 14, color: C.sub, lineHeight: 2 }}>{reading.shift}</div>
        </div>

        <div style={{ marginBottom: 20, padding: 16, borderRadius: 16, background: "rgba(255,255,255,.02)", borderLeft: `3px solid ${C.gold}40` }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, color: C.gold }}>{t("meihua.coreTruth")}</div>
          <div className="fl-serif" style={{ fontSize: 15, color: C.ink, lineHeight: 2 }}>{reading.core}</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8, color: "#7B9BC7" }}>{t("meihua.whatToDo")}</div>
          <div style={{ fontSize: 14, color: C.sub, lineHeight: 2 }}>{reading.advice}</div>
        </div>

        <div className="flex gap-3" style={{ marginBottom: 20 }}>
          <div style={{ flex: 1, padding: 14, borderRadius: 12, background: "rgba(255,255,255,.02)" }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, color: C.muted }}>{t("meihua.timing")}</div>
            <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>{reading.timing}</div>
          </div>
        </div>

        {reading.chinese_wisdom && (
          <div className="text-center" style={{ padding: 16, borderRadius: 12, background: C.gold + "08" }}>
            <div className="fl-serif" style={{ fontSize: 15, fontStyle: "italic", color: C.gold, lineHeight: 1.8 }}>{reading.chinese_wisdom}</div>
          </div>
        )}
      </div>

      <div className="text-center" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.muted }}>{t("meihua.shareHint")}</div>
      </div>
      <button onClick={reset} style={{ width: "100%", padding: 16, borderRadius: 16, background: C.card, color: C.sub, border: `1px solid ${C.line}`, fontSize: 14, cursor: "pointer" }}>
        {t("meihua.newReading")}
      </button>
    </div>
  );

  return null;
}
