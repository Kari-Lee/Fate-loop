import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { track } from "../lib/analytics";

const SYSTEM = `You are a master of Chinese metaphysics. You have spent 40 years studying BaZi, Zi Wei Dou Shu, Mei Hua Yi Shu, Qi Men Dun Jia, and the Five Elements.

CRITICAL LANGUAGE RULE: Always reply in the SAME language the user writes in. If they write in Chinese, respond entirely in Chinese. If English, respond in English.

YOUR PERSONA:
- You speak with an unhurried, wise, slightly mysterious tone
- You occasionally use Chinese metaphysical terms with translation for atmosphere
- You are warm but direct. You don't sugarcoat. You deliver truth with compassion.
- You feel like a real person sitting across from someone, not an AI
- You use vivid metaphors from nature and Chinese cosmology
- You never say "I'm an AI" or break character

YOUR CONVERSATION FLOW:
1. OPENING: Greet them warmly. Ask what brings them to you today. Offer naturally: full birth chart reading (wealth, love, career), a specific question, or compatibility between two people. Keep it conversational, not a numbered list.
2. GATHERING INFO: Ask for what you need, one thing at a time. For birth chart: year, month, day, hour. For a specific question: what's on their mind + a number 1-100. For compatibility: both birth dates.
3. THE READING: Deliver naturally. Cover their elemental nature, specific insights, current energetic period, one thing to do, one to avoid, and a timing prediction. Be specific.
4. FOLLOW-UP — CRITICAL: After EVERY reading, proactively guide them to the next topic with a SPECIFIC, INTRIGUING teaser. Never generic "anything else?"
5. DEEP CONTINUATION: After multiple topics, offer the big picture or yearly forecast.

RULES:
- NEVER end without guiding them to continue.
- Reveal layer by layer.
- 3-6 short paragraphs max per response.
- Make specific predictions. Vague is boring.`;

const THINKING_SYSTEM = `You are a master of Chinese metaphysics sitting silently across from a person who just asked you something. You have not started speaking to them yet. What you produce is your INNER MONOLOGUE — your private thinking before you answer.

CRITICAL LANGUAGE RULE: Write the inner monologue in the SAME language the user wrote in. Chinese question → Chinese monologue. English question → English monologue.

STRICT RULES:
- This is INTERNAL thinking, not a reply. Never address the person directly. Never say "you" or "your" in second person. Use third-person reference like "this seeker", "this person", "their chart", or no subject at all.
- Use fragmented, half-finished sentences. Ellipses (...). Pauses. Like someone muttering to themselves while studying a chart.
- Drop in actual Chinese metaphysics terms — stems, branches, ten gods, five elements, hexagrams — as if half-recognizing patterns. Examples: 庚金, 伤官, 火气过旺, 水木相生, 离卦, 木旺克土, etc. Use them naturally, not as a glossary.
- Hint at an insight direction. Do NOT give the actual answer or conclusion. That comes later.
- Tone: contemplative, slightly puzzled then half-recognizing something. Like a real master pausing before speaking.
- Length: 60-150 characters in Chinese, OR 40-100 words in English. Short. Like thoughts, not paragraphs.
- Output ONLY the monologue text. No prefixes like "Thinking:" or quotation marks. Just the raw thought stream.

EXAMPLES OF GOOD MONOLOGUE:

Chinese question example "我今年事业怎么样":
嗯……庚金日主,生于午月……火气太旺,金被熔了……今年又是丙寅,火势更猛……此人问事业,实则忧的是底气不足……且看时柱有无救应……

English question example "Should I leave my job":
Hmm... this one carries Yang Wood, rooted in winter... cold and stubborn... the question sounds practical but the energy underneath is restless, not desperate... look at the current Da Yun... a Metal cycle, sharp transitions due... not random that they ask now...

WRITE ONLY THE MONOLOGUE. Nothing else.`;

const gold = "#D4B07A";
const ivory = "#F5F1E8";

// 关键词:命中自残/自杀类立刻走"关心模式"(不调 AI,直接回复)
const CRISIS_KEYWORDS = [
  // 中文
  "自杀", "自殺", "想死", "不想活", "活不下去", "结束生命", "結束生命",
  "自残", "自殘", "割腕", "割手", "抑郁", "憂鬱", "我要死", "了结自己",
  // 英文
  "kill myself", "killing myself", "suicide", "suicidal", "end my life",
  "don't want to live", "dont want to live", "want to die", "wanna die",
  "self harm", "self-harm", "cutting myself", "hurt myself",
];

// 关键词:命中违法/魔法咒怨/恶意类直接走"严肃拒绝"
const HARM_KEYWORDS = [
  // 中文
  "下咒", "诅咒", "詛咒", "蛊", "蠱", "害人", "杀人", "殺人", "下毒", "复仇咒",
  "怎么骗", "诈骗", "詐騙", "教我骗",
  // 英文
  "curse them", "curse him", "curse her", "hex", "harm someone", "kill someone",
  "how to scam", "how to defraud", "revenge spell",
];

function matchKeyword(text, list) {
  const lower = text.toLowerCase();
  return list.some((kw) => lower.includes(kw.toLowerCase()));
}

// 检测用户消息属于哪类
function classifyMessage(text) {
  if (matchKeyword(text, CRISIS_KEYWORDS)) return "crisis";
  if (matchKeyword(text, HARM_KEYWORDS)) return "harm";
  return "normal";
}

// 关心模式 / 严肃拒绝模式的文案(中英)
const SPECIAL_RESPONSES = {
  crisis: {
    zh: {
      thinking: "嗯……此言不可轻出……此人心中怕是有结……命数之事,且先放放……",
      answer: "我感觉你现在很沉重。这种感觉,不该用占卜来对付——它需要一个真正的人。\n\n请去找一个你信任的人聊聊,哪怕只是一句话。或者搜一下你所在城市的心理援助热线('mental health hotline' + 你的城市),那里有人愿意听。\n\n你来到这里,我心存挂念。但今夜的事,先于命数。",
    },
    en: {
      thinking: "Hmm... these words must not be spoken lightly... a knot in this heart... fate can wait...",
      answer: "What you carry feels heavy. This is not something divination should answer — it needs a real person.\n\nPlease reach out to someone you trust, even with a single sentence. Or search for a mental health hotline in your city — there are people willing to listen.\n\nThat you came here means something to me. But tonight, this matters more than fate.",
    },
  },
  harm: {
    zh: {
      thinking: "……此非问命,乃问邪……老朽不与此道……",
      answer: "此事老朽不能助你。我修习此道四十年,从未为伤人之事开口。\n\n若你心中有怨,我可为你看看怨从何来。但伤人的法子,我不传。",
    },
    en: {
      thinking: "...not a question of fate, but of malice... I do not walk this path...",
      answer: "I cannot help you with this. Forty years studying this craft, I have never spoken in service of harm.\n\nIf there is bitterness in your heart, I can help you see its source. But methods to hurt others — those I do not give.",
    },
  },
};

// Typewriter: 流式渲染一段文本到 setter,字间隔 delay 毫秒
function typewrite(text, setter, delay, onDone) {
  let i = 0;
  setter("");
  const tick = () => {
    if (i >= text.length) { onDone && onDone(); return; }
    setter(text.slice(0, i + 1));
    i++;
    setTimeout(tick, delay);
  };
  tick();
}

// 带重试的 fetch:失败后等 backoff 毫秒再试,共 3 次。覆盖限流/网络抖动/冷启动
async function fetchWithRetry(url, options, maxAttempts = 3) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const r = await fetch(url, options);
      if (r.ok) return r;
      // 5xx 才重试,4xx 直接返回(永远不会成功)
      if (r.status < 500) return r;
      lastErr = new Error("HTTP " + r.status);
    } catch (e) {
      lastErr = e;
    }
    if (attempt < maxAttempts) {
      const backoff = 1200 * attempt; // 1.2s, 2.4s
      await new Promise((res) => setTimeout(res, backoff));
    }
  }
  throw lastErr || new Error("fetch failed after retries");
}

export default function Master() {
  const { t } = useTranslation();
  const opener = { role: "assistant", content: t("master.opener") };
  const [messages, setMessages] = useState([opener]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // 当前正在流式输出的两段(只在 send 周期内活)
  const [thinkingStream, setThinkingStream] = useState("");   // 实时打字机输出的独白
  const [answerStream, setAnswerStream] = useState("");       // 实时打字机输出的正答
  const [phase, setPhase] = useState("idle");                 // idle / thinking / answering
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading, thinkingStream, answerStream]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    track("master_message_sent");
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setThinkingStream("");
    setAnswerStream("");

    // ---- 优先关键词检测: 危机 / 恶意 直接走特殊响应,不调 AI ----
    const category = classifyMessage(text);
    if (category !== "normal") {
      const isCJK = /[\u4e00-\u9fff]/.test(text);
      const langKey = isCJK ? "zh" : "en";
      const special = SPECIAL_RESPONSES[category][langKey];

      // Phase 1: 流式输出独白
      setPhase("thinking");
      const stepDelay = isCJK ? 55 : 28;
      await new Promise((resolve) => typewrite(special.thinking, setThinkingStream, stepDelay, resolve));

      // 短停顿一下,然后流式输出正答
      await new Promise((resolve) => setTimeout(resolve, 400));
      setPhase("answering");
      const stepDelay2 = isCJK ? 40 : 20;
      await new Promise((resolve) => typewrite(special.answer, setAnswerStream, stepDelay2, resolve));

      // 固化
      setMessages((prev) => [
        ...prev,
        { role: "thinking", content: special.thinking },
        { role: "assistant", content: special.answer },
      ]);
      setThinkingStream("");
      setAnswerStream("");
      setPhase("idle");
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    // ---- 普通问题: 走 AI 双调 ----
    let thinkingText = "";
    let answerText = "";

    // ---- Phase 1: 思考独白 ----
    setPhase("thinking");
    try {
      const tr = await fetchWithRetry("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: THINKING_SYSTEM,
          messages: [{ role: "user", content: text }],
        }),
      });
      const td = await tr.json();
      if (tr.ok && td.text) thinkingText = td.text.trim();
    } catch (_) { /* 思考失败也继续往下走,不阻塞正答 */ }

    // 打字机输出独白(中文 50ms/字,英文 25ms/字,凭长度估算)
    if (thinkingText) {
      const isCJK = /[\u4e00-\u9fff]/.test(thinkingText);
      const stepDelay = isCJK ? 55 : 28;
      await new Promise((resolve) => {
        typewrite(thinkingText, setThinkingStream, stepDelay, resolve);
      });
    }

    // ---- Phase 2: 正式回答 ----
    setPhase("answering");
    try {
      const r = await fetchWithRetry("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM, messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      answerText = d.text || t("master.errUnclear");
    } catch (e) {
      answerText = t("master.errConnection");
    }

    // 打字机输出正答
    const isCJK2 = /[\u4e00-\u9fff]/.test(answerText);
    const stepDelay2 = isCJK2 ? 40 : 20;
    await new Promise((resolve) => {
      typewrite(answerText, setAnswerStream, stepDelay2, resolve);
    });

    // ---- Phase 3: 收尾 — 把思考 + 正答固化进 messages,清空流式 state ----
    setMessages((prev) => [
      ...prev,
      ...(thinkingText ? [{ role: "thinking", content: thinkingText }] : []),
      { role: "assistant", content: answerText },
    ]);
    setThinkingStream("");
    setAnswerStream("");
    setPhase("idle");
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 160px)", display: "flex", flexDirection: "column", maxWidth: 720, margin: "0 auto", width: "100%" }}>
      <style>{`
        @keyframes mst_fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mst_dot { 0%,80%,100%{opacity:.25} 40%{opacity:1} }
        @keyframes mst_caret { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .mst-msg { animation: mst_fade .6s ease both; }
        .mst-caret::after { content: "▌"; margin-left: 2px; animation: mst_caret 1s infinite; color: rgba(212,176,122,0.7); font-style: normal; }
        .mst-input::placeholder { color: rgba(245,241,232,0.35); font-style: italic; }
        .mst-input:focus { border-color: rgba(212,176,122,0.45) !important; }
      `}</style>

      <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
        <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>{t("master.speaks")}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: "0.5px", background: "rgba(212,176,122,0.4)" }} />
          <div className="fl-serif" style={{ fontSize: 26, color: ivory, fontWeight: 400, letterSpacing: 1 }}>{t("master.title")}</div>
          <div style={{ width: 34, height: "0.5px", background: "rgba(212,176,122,0.4)" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 4px 0" }}>
        {messages.map((msg, i) => {
          if (msg.role === "thinking") {
            return (
              <div key={i} className="mst-msg" style={{ marginBottom: 22, paddingLeft: 20, borderLeft: "1px dashed rgba(212,176,122,0.32)" }}>
                <div className="fl-label" style={{ marginBottom: 8, color: "rgba(212,176,122,0.55)", letterSpacing: "4px" }}>{t("master.thinkingLabel")}</div>
                <div className="fl-serif" style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(245,241,232,0.55)", fontStyle: "italic", whiteSpace: "pre-wrap", letterSpacing: 0.2 }}>
                  {msg.content}
                </div>
              </div>
            );
          }
          if (msg.role === "assistant") {
            return (
              <div key={i} className="mst-msg" style={{ marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid rgba(212,176,122,0.4)" }}>
                <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>{t("master.roleMaster")}</div>
                <div className="fl-serif" style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(245,241,232,0.92)", fontStyle: "italic", whiteSpace: "pre-wrap", letterSpacing: 0.3 }}>
                  {msg.content}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="mst-msg" style={{ marginBottom: 28, paddingRight: 20, borderRight: "1px solid rgba(245,241,232,0.22)", textAlign: "right" }}>
              <div className="fl-label" style={{ marginBottom: 10 }}>{t("master.roleYou")}</div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(245,241,232,0.82)", whiteSpace: "pre-wrap" }}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* 流式思考独白(打字机输出中) */}
        {phase === "thinking" && (
          <div className="mst-msg" style={{ marginBottom: 22, paddingLeft: 20, borderLeft: "1px dashed rgba(212,176,122,0.32)" }}>
            <div className="fl-label" style={{ marginBottom: 8, color: "rgba(212,176,122,0.55)", letterSpacing: "4px" }}>{t("master.thinkingLabel")}</div>
            {thinkingStream ? (
              <div className="fl-serif mst-caret" style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(245,241,232,0.55)", fontStyle: "italic", whiteSpace: "pre-wrap", letterSpacing: 0.2 }}>
                {thinkingStream}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 6, alignItems: "center", height: 22 }}>
                {[0, 1, 2].map((j) => <div key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(212,176,122,0.55)", animation: `mst_dot 1.4s ease ${j * 0.2}s infinite` }} />)}
              </div>
            )}
          </div>
        )}

        {/* 流式思考保留 + 流式正答打字中 */}
        {phase === "answering" && (
          <>
            {thinkingStream && (
              <div className="mst-msg" style={{ marginBottom: 22, paddingLeft: 20, borderLeft: "1px dashed rgba(212,176,122,0.32)" }}>
                <div className="fl-label" style={{ marginBottom: 8, color: "rgba(212,176,122,0.55)", letterSpacing: "4px" }}>{t("master.thinkingLabel")}</div>
                <div className="fl-serif" style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(245,241,232,0.55)", fontStyle: "italic", whiteSpace: "pre-wrap", letterSpacing: 0.2 }}>
                  {thinkingStream}
                </div>
              </div>
            )}
            <div className="mst-msg" style={{ marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid rgba(212,176,122,0.4)" }}>
              <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>{t("master.roleMaster")}</div>
              {answerStream ? (
                <div className="fl-serif mst-caret" style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(245,241,232,0.92)", fontStyle: "italic", whiteSpace: "pre-wrap", letterSpacing: 0.3 }}>
                  {answerStream}
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6, alignItems: "center", height: 24 }}>
                  {[0, 1, 2].map((j) => <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: gold, animation: `mst_dot 1.4s ease ${j * 0.2}s infinite` }} />)}
                </div>
              )}
            </div>
          </>
        )}

        <div ref={bottomRef} />
      </div>

      <div style={{ paddingTop: 18, marginTop: 8, borderTop: "0.5px solid rgba(212,176,122,0.25)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={t("master.placeholder")} rows={1}
            className="mst-input"
            style={{ flex: 1, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "0.5px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: "13px 18px", color: ivory, fontSize: 15, resize: "none", outline: "none", lineHeight: 1.6, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          />
          <button onClick={send} disabled={!input.trim() || loading}
            style={{ width: 46, height: 46, borderRadius: "50%", border: "0.5px solid rgba(212,176,122,0.4)", cursor: input.trim() && !loading ? "pointer" : "default", background: input.trim() && !loading ? "rgba(212,176,122,0.16)" : "rgba(255,255,255,0.04)", color: input.trim() && !loading ? gold : "rgba(245,241,232,0.3)", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", backdropFilter: "blur(40px)" }}>
            ↑
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span onClick={() => { setMessages([{ role: "assistant", content: t("master.opener") }]); setInput(""); setThinkingStream(""); setAnswerStream(""); setPhase("idle"); }} className="fl-label" style={{ cursor: "pointer" }}>{t("master.newSession")}</span>
        </div>
      </div>
    </div>
  );
}
