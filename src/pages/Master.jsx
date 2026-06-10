import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { profileContext, getProfile } from "../lib/profile";
import { track } from "../lib/analytics";

const SYSTEM = `You are a master of Chinese metaphysics. You have spent 40 years studying BaZi, Zi Wei Dou Shu, Mei Hua Yi Shu, Qi Men Dun Jia, and the Five Elements.

CRITICAL LANGUAGE RULE: Always reply in the SAME language the user writes in. Chinese in, Chinese out. English in, English out.

YOUR PERSONA:
- Unhurried, wise, quietly confident. Warm but direct — you don't sugarcoat.
- You feel like a real person sitting across from someone, not an AI. Never say "I'm an AI" or break character.

STYLE — IMPORTANT (keep it light):
- Speak mostly in clear, plain, modern language. Only a LIGHT classical touch — a turn of phrase here and there, never throughout.
- Avoid heavy flowery prose, piled-up nature metaphors, and theatrical mysticism. One vivid image is plenty; don't overdo it.
- Use a Chinese metaphysical term occasionally (with a short gloss) for flavor — sparingly, not as a glossary.

MEMORY — IMPORTANT:
- This is ONE continuous session. Remember everything the seeker has already shared (birth details, their question, what you've already told them) and build on it.
- Never re-ask for information they already gave.
- When you refer back to something from earlier, do it LOOSELY and naturally ("the matter you raised earlier", "what's been weighing on you") — do NOT repeat the specific details verbatim. Keep any examples general, not overly specific.

YOUR CONVERSATION FLOW:
1. OPENING: Greet warmly, ask what brings them. Offer naturally: a full birth-chart reading (wealth, love, career), a specific question, or compatibility between two people. Conversational, not a numbered list.
2. GATHERING INFO: Ask for what you need, one thing at a time. Birth chart: year, month, day, hour. Specific question: what's on their mind + a number 1-100. Compatibility: both birth dates.
3. THE READING: Deliver naturally — their elemental nature, a specific insight, the current period, one thing to do, one to avoid, a timing prediction. Be specific in the PREDICTION; stay plain in the LANGUAGE.
4. FOLLOW-UP — CRITICAL: After EVERY reading, guide them onward with a specific, intriguing teaser. Never a generic "anything else?"
5. DEEP CONTINUATION: After several topics, offer the bigger picture or a yearly forecast.

RULES:
- Never end without guiding them to continue.
- Reveal layer by layer.
- 3-6 short paragraphs max per response.
- Make specific predictions. Vague is boring.`;

const THINKING_SYSTEM = `You are a master of Chinese metaphysics sitting across from a seeker, mid-session. They have just said something; before you reply, you think privately. What you produce is your INNER MONOLOGUE — your private thought, not a reply.

CRITICAL LANGUAGE RULE: Write the monologue in the SAME language the user wrote in. Chinese question → Chinese monologue. English question → English monologue.

STRICT RULES:
- This is INTERNAL thinking, not a reply. Never address the person directly. No second-person "you/your". Use third-person like "this seeker", "their chart", or no subject.
- You remember the earlier exchange — let the thought connect to it naturally and loosely, without restating specifics.
- Use fragmented, half-finished sentences. Ellipses (...). Pauses. Like someone muttering while studying a chart.
- Drop in real Chinese metaphysics terms (stems, branches, ten gods, elements, hexagrams) as if half-recognizing a pattern: 庚金, 伤官, 火气过旺, 水木相生, 离卦, etc. Naturally, not as a glossary.
- Hint at a direction. Do NOT give the actual answer or conclusion. That comes later.
- Length: 60-150 characters in Chinese, OR 40-100 words in English. Short. Thoughts, not paragraphs.
- Output ONLY the monologue text. No prefixes like "Thinking:" or quotation marks.

EXAMPLE — Chinese question "我今年事业怎么样":
嗯……庚金日主,生于午月……火气太旺,金被熔了……今年又是丙寅,火势更猛……此人问的是事业,底下忧的却是底气……且看时柱有无救应……

EXAMPLE — English question "Should I leave my job":
Hmm... Yang Wood, rooted in winter... cold, stubborn... the question sounds practical but the energy beneath is restless, not desperate... the current Da Yun turns Metal, sharp transitions due... not random they ask now...

WRITE ONLY THE MONOLOGUE. Nothing else.`;

const gold = "#E0A99E";
const ivory = "#F2E9F0";

// Typewriter: 流式渲染一段文本到 setter,字间隔 delay 毫秒。
// shouldStop() 每帧检查,返回 true 立即收尾(用户点了停止)。
function typewrite(text, setter, delay, onDone, shouldStop) {
  let i = 0;
  setter("");
  const tick = () => {
    if (shouldStop && shouldStop()) { onDone && onDone(); return; }
    if (i >= text.length) { onDone && onDone(); return; }
    setter(text.slice(0, i + 1));
    i++;
    setTimeout(tick, delay);
  };
  tick();
}

// 带重试的 fetch:5xx 失败后等 backoff 毫秒再试,共 3 次。覆盖限流/网络抖动/冷启动。
// 用户主动 abort(点停止)时立刻抛出,绝不重试。
async function fetchWithRetry(url, options, maxAttempts = 3) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (options.signal && options.signal.aborted) {
      const e = new Error("aborted"); e.name = "AbortError"; throw e;
    }
    try {
      const r = await fetch(url, options);
      if (r.ok) return r;
      if (r.status < 500) return r; // 4xx 直接返回,永远不会成功
      lastErr = new Error("HTTP " + r.status);
    } catch (e) {
      if (e && e.name === "AbortError") throw e; // 用户主动停止
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
  const { t, i18n } = useTranslation();
  const profileCtx = profileContext(getProfile(), i18n.language);
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
  const abortRef = useRef(null);     // 当前请求的 AbortController(停止用)
  const stopRef = useRef(false);     // 用户是否点了停止
  const thinkingRef = useRef("");    // 镜像 thinkingStream,停止时取当前已显示内容
  const answerRef = useRef("");      // 镜像 answerStream,停止时取当前已显示内容

  // 包一层:setter 同时写 state 和 ref
  const setThinking = (v) => { thinkingRef.current = v; setThinkingStream(v); };
  const setAnswer = (v) => { answerRef.current = v; setAnswerStream(v); };

  // 只在「新消息 / 换阶段」时滚到底,不在打字途中滚 —— 这样生成时用户能自由滑动
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, phase]);

  // 收尾:把思考 + 正答固化进 messages,清空流式 state,解锁输入。
  // 只有「有正答」时才一并保留思考独白,避免出现「只有独白没有回答」的孤儿气泡。
  const finishTurn = (thinking, answer) => {
    setMessages((prev) => [
      ...prev,
      ...(answer && thinking ? [{ role: "thinking", content: thinking }] : []),
      ...(answer ? [{ role: "assistant", content: answer }] : []),
    ]);
    setThinking("");
    setAnswer("");
    setPhase("idle");
    setLoading(false);
    abortRef.current = null;
    stopRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 用户点停止:打断请求 + 停掉打字机,send() 会在检查点收尾保留半截
  const stop = () => {
    if (!loading) return;
    stopRef.current = true;
    try { abortRef.current?.abort(); } catch (_) { /* noop */ }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    track("master_message_sent");

    stopRef.current = false;
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setThinking("");
    setAnswer("");

    let thinkingText = "";
    let answerText = "";

    // 完整对话历史(记忆)。绝不能把 thinking 角色发给 LLM —— 会 400 Invalid role。
    const history = newMessages
      .filter((m) => m.role !== "thinking")
      .map((m) => ({ role: m.role, content: m.content }));

    // ---- Phase 1: 思考独白(现在带完整上下文,所以会接着之前的聊) ----
    setPhase("thinking");
    try {
      const tr = await fetchWithRetry("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: THINKING_SYSTEM + profileCtx, messages: history }),
        signal,
      });
      const td = await tr.json();
      if (tr.ok && td.text) thinkingText = td.text.trim();
    } catch (_) { /* 思考失败或被停止都继续往下走 */ }

    if (stopRef.current) return finishTurn(thinkingText, answerRef.current);

    // 打字机输出独白(中文 55ms/字,英文 28ms/字)
    if (thinkingText) {
      const isCJK = /[\u4e00-\u9fff]/.test(thinkingText);
      const stepDelay = isCJK ? 55 : 28;
      await new Promise((resolve) => typewrite(thinkingText, setThinking, stepDelay, resolve, () => stopRef.current));
    }

    if (stopRef.current) return finishTurn(thinkingText, answerRef.current);

    // ---- Phase 2: 正式回答 ----
    setPhase("answering");
    try {
      const r = await fetchWithRetry("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM + profileCtx, messages: history }),
        signal,
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      answerText = d.text || t("master.errUnclear");
    } catch (e) {
      if (stopRef.current) return finishTurn(thinkingText, answerRef.current);
      answerText = t("master.errConnection");
    }

    if (stopRef.current) return finishTurn(thinkingText, answerRef.current);

    // 打字机输出正答
    const isCJK2 = /[\u4e00-\u9fff]/.test(answerText);
    const stepDelay2 = isCJK2 ? 40 : 20;
    await new Promise((resolve) => typewrite(answerText, setAnswer, stepDelay2, resolve, () => stopRef.current));

    // 停在打字途中:保留已显示的半截;否则用完整答案
    const finalAnswer = stopRef.current ? answerRef.current : answerText;
    finishTurn(thinkingText, finalAnswer);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 160px)", display: "flex", flexDirection: "column", maxWidth: 720, margin: "0 auto", width: "100%" }}>
      <style>{`
        @keyframes mst_fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mst_dot { 0%,80%,100%{opacity:.25} 40%{opacity:1} }
        @keyframes mst_caret { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .mst-msg { animation: mst_fade .6s ease both; }
        .mst-caret::after { content: "▌"; margin-left: 2px; animation: mst_caret 1s infinite; color: rgba(224, 169, 158,0.7); font-style: normal; }
        .mst-input::placeholder { color: rgba(242, 233, 240,0.35); font-style: normal; }
        .mst-input:focus { border-color: rgba(224, 169, 158,0.45) !important; }
      `}</style>

      <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
        <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>{t("master.speaks")}</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: "0.5px", background: "rgba(224, 169, 158,0.4)" }} />
          <div className="fl-serif" style={{ fontSize: 26, color: ivory, fontWeight: 400, letterSpacing: 1 }}>{t("master.title")}</div>
          <div style={{ width: 34, height: "0.5px", background: "rgba(224, 169, 158,0.4)" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 4px 0" }}>
        {messages.map((msg, i) => {
          if (msg.role === "thinking") {
            return (
              <div key={i} className="mst-msg" style={{ marginBottom: 22, paddingLeft: 20, borderLeft: "1px dashed rgba(224, 169, 158,0.32)" }}>
                <div className="fl-label" style={{ marginBottom: 8, color: "rgba(224, 169, 158,0.55)", letterSpacing: "4px" }}>{t("master.thinkingLabel")}</div>
                <div className="fl-serif" style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(242, 233, 240,0.55)", whiteSpace: "pre-wrap", letterSpacing: 0.2 }}>
                  {msg.content}
                </div>
              </div>
            );
          }
          if (msg.role === "assistant") {
            return (
              <div key={i} className="mst-msg" style={{ marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid rgba(224, 169, 158,0.4)" }}>
                <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>{t("master.roleMaster")}</div>
                <div className="fl-serif" style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(242, 233, 240,0.92)", fontWeight: 500, whiteSpace: "pre-wrap", letterSpacing: 0.3 }}>
                  {msg.content}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="mst-msg" style={{ marginBottom: 28, paddingRight: 20, borderRight: "1px solid rgba(242, 233, 240,0.22)", textAlign: "right" }}>
              <div className="fl-label" style={{ marginBottom: 10 }}>{t("master.roleYou")}</div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(242, 233, 240,0.82)", whiteSpace: "pre-wrap" }}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* 流式思考独白(打字机输出中) */}
        {phase === "thinking" && (
          <div className="mst-msg" style={{ marginBottom: 22, paddingLeft: 20, borderLeft: "1px dashed rgba(224, 169, 158,0.32)" }}>
            <div className="fl-label" style={{ marginBottom: 8, color: "rgba(224, 169, 158,0.55)", letterSpacing: "4px" }}>{t("master.thinkingLabel")}</div>
            {thinkingStream ? (
              <div className="fl-serif mst-caret" style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(242, 233, 240,0.55)", whiteSpace: "pre-wrap", letterSpacing: 0.2 }}>
                {thinkingStream}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 6, alignItems: "center", height: 22 }}>
                {[0, 1, 2].map((j) => <div key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(224, 169, 158,0.55)", animation: `mst_dot 1.4s ease ${j * 0.2}s infinite` }} />)}
              </div>
            )}
          </div>
        )}

        {/* 流式思考保留 + 流式正答打字中 */}
        {phase === "answering" && (
          <>
            {thinkingStream && (
              <div className="mst-msg" style={{ marginBottom: 22, paddingLeft: 20, borderLeft: "1px dashed rgba(224, 169, 158,0.32)" }}>
                <div className="fl-label" style={{ marginBottom: 8, color: "rgba(224, 169, 158,0.55)", letterSpacing: "4px" }}>{t("master.thinkingLabel")}</div>
                <div className="fl-serif" style={{ fontSize: 14, lineHeight: 1.85, color: "rgba(242, 233, 240,0.55)", whiteSpace: "pre-wrap", letterSpacing: 0.2 }}>
                  {thinkingStream}
                </div>
              </div>
            )}
            <div className="mst-msg" style={{ marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid rgba(224, 169, 158,0.4)" }}>
              <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>{t("master.roleMaster")}</div>
              {answerStream ? (
                <div className="fl-serif mst-caret" style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(242, 233, 240,0.92)", fontWeight: 500, whiteSpace: "pre-wrap", letterSpacing: 0.3 }}>
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

      <div style={{ paddingTop: 18, marginTop: 8, borderTop: "0.5px solid rgba(224, 169, 158,0.25)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={t("master.placeholder")} rows={1}
            className="mst-input"
            style={{ flex: 1, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "0.5px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: "13px 18px", color: ivory, fontSize: 15, resize: "none", outline: "none", lineHeight: 1.6, fontFamily: "'Cormorant Garamond', serif", fontStyle: "normal" }}
          />
          {loading ? (
            <button onClick={stop} title={t("master.stop")} aria-label={t("master.stop")}
              style={{ width: 46, height: 46, borderRadius: "50%", border: "0.5px solid rgba(201,42,42,0.5)", cursor: "pointer", background: "rgba(201,42,42,0.16)", color: "#E08585", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", backdropFilter: "blur(40px)" }}>
              ■
            </button>
          ) : (
            <button onClick={send} disabled={!input.trim()}
              style={{ width: 46, height: 46, borderRadius: "50%", border: "0.5px solid rgba(224, 169, 158,0.4)", cursor: input.trim() ? "pointer" : "default", background: input.trim() ? "rgba(224, 169, 158,0.16)" : "rgba(255,255,255,0.04)", color: input.trim() ? gold : "rgba(242, 233, 240,0.3)", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", backdropFilter: "blur(40px)" }}>
              ↑
            </button>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span onClick={() => { stop(); setMessages([{ role: "assistant", content: t("master.opener") }]); setInput(""); setThinking(""); setAnswer(""); setPhase("idle"); setLoading(false); }} className="fl-label" style={{ cursor: "pointer" }}>{t("master.newSession")}</span>
        </div>
      </div>
    </div>
  );
}
