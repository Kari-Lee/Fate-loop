import { useState, useRef } from "react";
import { TRIGRAMS, castMeiHua, castByTime } from "../data/meihua";
import { callAI } from "../lib/api";

const gold = "#A08050";
const card = "#111114";
const line = "#1E1E22";
const ink = "#E8E4DC";

const TOPICS = [
  { id: "crush", icon: "💘", label: "Someone I like", prompt: "a crush or new attraction" },
  { id: "relationship", icon: "💑", label: "Current relationship", prompt: "an existing relationship" },
  { id: "ex", icon: "💔", label: "An ex", prompt: "an ex-partner or past relationship" },
  { id: "confess", icon: "✉️", label: "Should I confess?", prompt: "whether to confess feelings" },
  { id: "future", icon: "🔮", label: "My love future", prompt: "what love holds in the future" },
  { id: "other", icon: "✦", label: "Something else", prompt: "a personal love question" },
];

const SYSTEM_PROMPT = `You are a master of Mei Hua Yi Shu (梅花易数), the ancient Chinese Plum Blossom divination system. You've been reading hexagrams for decades. Your style is:

- Mysterious but warm, like a wise elder in a candlelit temple
- You speak with quiet authority — never rushed, never uncertain  
- You weave the hexagram symbolism naturally into your reading
- You are specific and personal, not generic
- You address the querent directly as "you"
- You occasionally use poetic Chinese phrases (with translation) for atmosphere
- You give real, actionable advice — not just vague spiritual talk
- Your readings feel like a conversation, not a textbook

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
  const [step, setStep] = useState(0); // 0=intro, 1=topic, 2=detail, 3=number, 4=casting, 5=reading, 6=result
  const [topic, setTopic] = useState(null);
  const [detail, setDetail] = useState("");
  const [nums, setNums] = useState({ a: "", b: "", c: "" });
  const [hex, setHex] = useState(null);
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const intervalRef = useRef(null);

  const doReading = async (hexResult) => {
    setStep(5);
    setLoading(true);
    const msgs = ["Reading the lines…", "Consulting the trigrams…", "The hexagram speaks…", "Interpreting the change…"];
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
      setReading({ opening: "The hexagram has been cast.", present: hexResult.reading, shift: hexResult.changedReading, core: "Trust what you feel.", advice: "Be patient.", timing: "Change comes within one lunar cycle.", chinese_wisdom: "缘分天注定 — Fate is written in the stars." });
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

  // Trigram visual
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
              <div style={{ width: size, height: 4, background: gold, borderRadius: 2 }} />
            ) : (
              <><div style={{ width: size * 0.4, height: 4, background: gold, borderRadius: 2 }} /><div style={{ width: size * 0.4, height: 4, background: gold, borderRadius: 2 }} /></>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Step 0: Intro
  if (step === 0) return (
    <div className="animate-fu text-center" style={{ padding: "40px 0" }}>
      <div className="text-[64px] mb-4 animate-float">🌸</div>
      <div style={{ fontSize: 14, fontWeight: 100, letterSpacing: 12, color: gold + "60", fontFamily: "'Noto Serif SC', serif" }}>梅花易数</div>
      <div className="font-serif text-[28px] font-bold mt-2 mb-4" style={{ color: ink }}>Plum Blossom Oracle</div>
      <div className="text-[13px] mx-auto mb-8" style={{ color: "#555", lineHeight: 2, maxWidth: 320 }}>
        An 800-year-old divination system created by Shao Yong during the Song Dynasty. The universe speaks through numbers and moments.
      </div>
      <button onClick={() => setStep(1)} style={{ background: `linear-gradient(135deg, ${gold}, #C4A06A)`, color: "#0A0A0C", border: "none", padding: "16px 48px", borderRadius: 16, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 2 }}>
        Begin Your Reading ✦
      </button>
    </div>
  );

  // Step 1: Topic
  if (step === 1) return (
    <div className="animate-fu">
      <div className="text-center mb-6">
        <div className="text-[11px] tracking-[4px] uppercase mb-2" style={{ color: gold }}>Step 1 of 3</div>
        <div className="font-serif text-[22px] font-bold" style={{ color: ink }}>What weighs on your heart?</div>
        <div className="text-[13px] mt-2" style={{ color: "#555" }}>The hexagram needs direction. Choose your question.</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TOPICS.map((t) => (
          <div key={t.id} onClick={() => { setTopic(t); setStep(2); }}
            className="cursor-pointer transition-all"
            style={{ background: card, borderRadius: 18, padding: "24px 16px", textAlign: "center", border: `1px solid ${line}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold + "40"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = line; e.currentTarget.style.transform = "none"; }}>
            <div className="text-[28px] mb-2">{t.icon}</div>
            <div className="text-[13px] font-bold" style={{ color: ink }}>{t.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Detail
  if (step === 2) return (
    <div className="animate-fu">
      <div className="text-center mb-6">
        <div className="text-[11px] tracking-[4px] uppercase mb-2" style={{ color: gold }}>Step 2 of 3</div>
        <div className="font-serif text-[22px] font-bold" style={{ color: ink }}>Tell me more</div>
        <div className="text-[13px] mt-2" style={{ color: "#555" }}>The more the oracle knows, the deeper the reading. Or skip — fate finds a way.</div>
      </div>
      <div style={{ background: card, borderRadius: 20, padding: 24, border: `1px solid ${line}` }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[20px]">{topic.icon}</span>
          <span className="text-[13px] font-bold" style={{ color: gold }}>{topic.label}</span>
        </div>
        <textarea
          value={detail} onChange={(e) => setDetail(e.target.value)}
          placeholder="How long have you known them? What happened recently? What keeps you up at night?"
          rows={4}
          style={{ width: "100%", background: "transparent", border: "none", color: ink, fontSize: 14, lineHeight: 2, resize: "none", outline: "none" }}
        />
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => setStep(1)} style={{ flex: 1, padding: 14, borderRadius: 14, background: card, color: "#666", border: `1px solid ${line}`, fontSize: 14, cursor: "pointer" }}>Back</button>
        <button onClick={() => setStep(3)} style={{ flex: 2, padding: 14, borderRadius: 14, background: `linear-gradient(135deg, ${gold}, #C4A06A)`, color: "#0A0A0C", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          {detail.trim() ? "Continue ✦" : "Skip — Let Fate Decide ✦"}
        </button>
      </div>
    </div>
  );

  // Step 3: Number input
  if (step === 3) return (
    <div className="animate-fu">
      <div className="text-center mb-6">
        <div className="text-[11px] tracking-[4px] uppercase mb-2" style={{ color: gold }}>Step 3 of 3</div>
        <div className="font-serif text-[22px] font-bold" style={{ color: ink }}>Cast the Hexagram</div>
        <div className="text-[13px] mt-2" style={{ color: "#555" }}>Choose how the oracle speaks to you</div>
      </div>

      {/* Number method */}
      <div style={{ background: card, borderRadius: 20, padding: 24, border: `1px solid ${line}`, marginBottom: 16 }}>
        <div className="text-[12px] font-bold tracking-[2px] uppercase mb-4" style={{ color: gold }}>Method 1 · Numbers</div>
        <div className="text-[13px] mb-4" style={{ color: "#555" }}>Close your eyes. Think of your question. Let three numbers come to you.</div>
        <div className="flex gap-3 mb-4">
          {[
            { key: "a", ph: "1st" },
            { key: "b", ph: "2nd" },
            { key: "c", ph: "3rd" },
          ].map((f) => (
            <input key={f.key} type="tel" inputMode="numeric" placeholder={f.ph} maxLength={3}
              value={nums[f.key]} onChange={(e) => setNums({ ...nums, [f.key]: e.target.value })}
              style={{ flex: 1, background: "#0A0A0C", border: `1px solid ${line}`, borderRadius: 12, padding: "14px", color: ink, fontSize: 20, textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, minWidth: 0 }}
            />
          ))}
        </div>
        <button onClick={castWithNumbers} disabled={!nums.a || !nums.b || !nums.c}
          style={{ width: "100%", padding: 14, borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, cursor: nums.a && nums.b && nums.c ? "pointer" : "default", background: nums.a && nums.b && nums.c ? `linear-gradient(135deg, ${gold}, #C4A06A)` : "#1E1E22", color: nums.a && nums.b && nums.c ? "#0A0A0C" : "#444" }}>
          Cast with Numbers
        </button>
      </div>

      {/* Time method */}
      <div style={{ background: card, borderRadius: 20, padding: 24, border: `1px solid ${line}` }}>
        <div className="text-[12px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "#6B9B7A" }}>Method 2 · This Moment</div>
        <div className="text-[13px] mb-4" style={{ color: "#555" }}>Let the current time and date cast your hexagram. The universe chose this moment for a reason.</div>
        <button onClick={castWithTime}
          style={{ width: "100%", padding: 14, borderRadius: 14, border: `1px solid #6B9B7A40`, fontSize: 14, fontWeight: 700, cursor: "pointer", background: "#0D1A12", color: "#6B9B7A" }}>
          Cast by This Moment ✦
        </button>
      </div>

      <button onClick={() => setStep(2)} className="mt-4" style={{ width: "100%", padding: 12, borderRadius: 14, background: "transparent", color: "#444", border: "none", fontSize: 13, cursor: "pointer" }}>← Back</button>
    </div>
  );

  // Step 5: Loading
  if (step === 5) return (
    <div className="animate-fu text-center" style={{ padding: "80px 0" }}>
      <div className="text-[56px] mb-6" style={{ animation: "float 1.5s ease infinite" }}>🌸</div>
      <div className="font-serif text-[18px] italic mb-3" style={{ color: gold }}>{loadMsg}</div>
      <div className="flex justify-center gap-6 mt-8">
        {hex && (
          <>
            <div className="text-center">
              <TrigramLines trigram={hex.upper} />
              <div style={{ height: 8 }} />
              <TrigramLines trigram={hex.lower} />
              <div className="text-[10px] mt-2" style={{ color: "#444" }}>本卦</div>
            </div>
            <div className="text-[20px] self-center" style={{ color: "#333" }}>→</div>
            <div className="text-center">
              <TrigramLines trigram={hex.changedUpper} />
              <div style={{ height: 8 }} />
              <TrigramLines trigram={hex.changedLower} />
              <div className="text-[10px] mt-2" style={{ color: "#444" }}>变卦</div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Step 6: Result
  if (step === 6 && hex && reading) return (
    <div className="animate-fu">
      {/* Hexagram display */}
      <div className="text-center mb-5" style={{ background: "linear-gradient(180deg, #111114, #0A0A0C)", borderRadius: 24, padding: "36px 24px", border: `1px solid ${line}` }}>
        <div className="text-[10px] tracking-[4px] uppercase mb-5" style={{ color: gold }}>Your Hexagram</div>
        <div className="flex justify-center gap-10 mb-6">
          <div className="text-center">
            <TrigramLines trigram={hex.upper} size={36} />
            <div style={{ height: 10 }} />
            <TrigramLines trigram={hex.lower} size={36} />
            <div className="text-[11px] font-bold mt-3" style={{ color: "#555" }}>本卦 Primary</div>
            <div className="text-[13px] font-bold mt-1" style={{ color: ink }}>{hex.upper.en} / {hex.lower.en}</div>
          </div>
          <div className="self-center text-[18px]" style={{ color: gold }}>→</div>
          <div className="text-center">
            <TrigramLines trigram={hex.changedUpper} size={36} />
            <div style={{ height: 10 }} />
            <TrigramLines trigram={hex.changedLower} size={36} />
            <div className="text-[11px] font-bold mt-3" style={{ color: "#555" }}>变卦 Changed</div>
            <div className="text-[13px] font-bold mt-1" style={{ color: ink }}>{hex.changedUpper.en} / {hex.changedLower.en}</div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {[hex.upper, hex.lower].map((t, i) => (
            <span key={i} className="text-[10px] px-3 py-1 rounded-full" style={{ background: gold + "15", color: gold, border: `1px solid ${gold}20` }}>{t.element}</span>
          ))}
        </div>
      </div>

      {/* AI Reading */}
      <div style={{ background: card, borderRadius: 20, padding: "28px 24px", border: `1px solid ${line}`, marginBottom: 16 }}>
        <div className="font-serif text-[16px] italic mb-5" style={{ color: gold, lineHeight: 1.8 }}>{reading.opening}</div>
        
        <div className="mb-5">
          <div className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "#6B9B7A" }}>Present Energy · 本卦</div>
          <div className="text-[14px]" style={{ color: "#999", lineHeight: 2 }}>{reading.present}</div>
        </div>

        <div className="mb-5">
          <div className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "#C75B3A" }}>The Shift · 变卦</div>
          <div className="text-[14px]" style={{ color: "#999", lineHeight: 2 }}>{reading.shift}</div>
        </div>

        <div className="mb-5 p-4 rounded-2xl" style={{ background: "#0A0A0C", borderLeft: `3px solid ${gold}40` }}>
          <div className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: gold }}>Core Truth</div>
          <div className="font-serif text-[15px]" style={{ color: ink, lineHeight: 2 }}>{reading.core}</div>
        </div>

        <div className="mb-5">
          <div className="text-[10px] font-bold tracking-[3px] uppercase mb-2" style={{ color: "#4A6FA5" }}>What To Do</div>
          <div className="text-[14px]" style={{ color: "#999", lineHeight: 2 }}>{reading.advice}</div>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="flex-1 p-3.5 rounded-xl" style={{ background: "#0A0A0C" }}>
            <div className="text-[9px] font-bold tracking-[2px] uppercase mb-1" style={{ color: "#555" }}>Timing</div>
            <div className="text-[12px]" style={{ color: "#888", lineHeight: 1.6 }}>{reading.timing}</div>
          </div>
        </div>

        {reading.chinese_wisdom && (
          <div className="text-center p-4 rounded-xl" style={{ background: gold + "08" }}>
            <div className="font-serif text-[15px] italic" style={{ color: gold, lineHeight: 1.8 }}>{reading.chinese_wisdom}</div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="text-center mb-4">
        <div className="text-[11px]" style={{ color: "#333" }}>Screenshot & share your reading</div>
      </div>
      <button onClick={reset} style={{ width: "100%", padding: 16, borderRadius: 16, background: card, color: "#666", border: `1px solid ${line}`, fontSize: 14, cursor: "pointer" }}>
        New Reading ↻
      </button>
    </div>
  );

  return null;
}
