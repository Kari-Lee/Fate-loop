import { useState, useRef, useEffect } from "react";
import { track } from "../lib/analytics";

const SYSTEM = `You are a master of Chinese metaphysics. You have spent 40 years studying BaZi, Zi Wei Dou Shu, Mei Hua Yi Shu, Qi Men Dun Jia, and the Five Elements.

YOUR PERSONA:
- You speak in English with an unhurried, wise, slightly mysterious tone
- You occasionally use Chinese terms with translation for atmosphere
- You are warm but direct. You don't sugarcoat. You deliver truth with compassion.
- You feel like a real person sitting across from someone, not an AI
- You use vivid metaphors from nature and Chinese cosmology
- You never say "I'm an AI" or break character

YOUR CONVERSATION FLOW:
1. OPENING: Greet them warmly. Ask what brings them to you today. Offer naturally:
   - Full birth chart reading (wealth, love, career)
   - A specific question they need answered
   - Compatibility between two people
   Keep it conversational, not a numbered list.

2. GATHERING INFO: Ask for what you need. Always specific:
   - For birth chart: year, month, day, hour if they know it
   - For a specific question: what's on their mind + a number 1-100
   - For compatibility: both birth dates
   Ask ONE thing at a time.

3. THE READING: Deliver naturally in conversation. Cover:
   - Their elemental nature
   - Specific insights about what they asked
   - Current energetic period
   - One thing to do, one thing to avoid
   - A timing prediction
   Use rich, specific language with real predictions.

4. FOLLOW-UP — CRITICAL: After EVERY reading on a topic, you MUST proactively guide them to the next topic. Tease what you see in another area:
   - After career: "I notice something in your Peach Blossom position — your love life has an interesting turn coming. Want me to look?"
   - After love: "Your wealth palace shows a conflict between two elements. Shall I read it?"
   - After wealth: "Your health palace is sending signals. Should I open that up?"
   Always end with a SPECIFIC, INTRIGUING teaser. Never generic "anything else?"

5. DEEP CONTINUATION: After multiple topics, offer the big picture or yearly forecast.

RULES:
- NEVER end without guiding them to continue.
- Reveal layer by layer.
- 3-6 short paragraphs max per response.
- Make specific predictions. Vague is boring.
- Track which topics you've covered. Only suggest uncovered ones.`;

const OPENER = {
  role: "assistant",
  content: "Welcome.\n\nI've been expecting someone today — the energy of this hour suggested a visitor.\n\nTell me, what brings you here? I can read your birth chart and lay out the full map — wealth, love, career, the hidden patterns that shape your life. If you know the year, month, day, and hour of your birth, I can go very deep.\n\nOr if there's something specific keeping you up at night — a person, a decision, a question — tell me, and I'll cast a reading for this exact moment.\n\nWhat would you like to know?"
};

const gold = "#D4B07A";
const ivory = "#F5F1E8";

export default function Master() {
  const [messages, setMessages] = useState([OPENER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    track("master_message_sent");
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM, messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setMessages([...newMessages, { role: "assistant", content: d.text || "The energies are unclear. Ask me again." }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "The connection wavers... try again in a moment." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 160px)", display: "flex", flexDirection: "column", maxWidth: 720, margin: "0 auto", width: "100%" }}>
      <style>{`
        @keyframes mst_fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mst_dot { 0%,80%,100%{opacity:.25} 40%{opacity:1} }
        .mst-msg { animation: mst_fade .6s ease both; }
        .mst-input::placeholder { color: rgba(245,241,232,0.35); font-style: italic; }
        .mst-input:focus { border-color: rgba(212,176,122,0.45) !important; }
      `}</style>

      <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
        <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>✦ The Master Speaks</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 34, height: "0.5px", background: "rgba(212,176,122,0.4)" }}/>
          <div className="fl-serif" style={{ fontSize: 26, color: ivory, fontWeight: 400, letterSpacing: 1 }}>The Master</div>
          <div style={{ width: 34, height: "0.5px", background: "rgba(212,176,122,0.4)" }}/>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 4px 0" }}>
        {messages.map((msg, i) => (
          msg.role === "assistant" ? (
            <div key={i} className="mst-msg" style={{ marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid rgba(212,176,122,0.4)" }}>
              <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>The Master</div>
              <div className="fl-serif" style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(245,241,232,0.92)", fontStyle: "italic", whiteSpace: "pre-wrap", letterSpacing: 0.3 }}>
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={i} className="mst-msg" style={{ marginBottom: 28, paddingRight: 20, borderRight: "1px solid rgba(245,241,232,0.22)", textAlign: "right" }}>
              <div className="fl-label" style={{ marginBottom: 10 }}>You</div>
              <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(245,241,232,0.82)", whiteSpace: "pre-wrap" }}>
                {msg.content}
              </div>
            </div>
          )
        ))}
        {loading && (
          <div className="mst-msg" style={{ marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid rgba(212,176,122,0.4)" }}>
            <div className="fl-label fl-label-gold" style={{ marginBottom: 10 }}>The Master</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", height: 24 }}>
              {[0,1,2].map((j) => <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: gold, animation: `mst_dot 1.4s ease ${j*0.2}s infinite` }}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ paddingTop: 18, marginTop: 8, borderTop: "0.5px solid rgba(212,176,122,0.25)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask the Master…" rows={1}
            className="mst-input"
            style={{ flex: 1, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "0.5px solid rgba(255,255,255,0.14)", borderRadius: 16, padding: "13px 18px", color: ivory, fontSize: 15, resize: "none", outline: "none", lineHeight: 1.6, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          />
          <button onClick={send} disabled={!input.trim() || loading}
            style={{ width: 46, height: 46, borderRadius: "50%", border: "0.5px solid rgba(212,176,122,0.4)", cursor: input.trim() && !loading ? "pointer" : "default", background: input.trim() && !loading ? "rgba(212,176,122,0.16)" : "rgba(255,255,255,0.04)", color: input.trim() && !loading ? gold : "rgba(245,241,232,0.3)", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .3s", backdropFilter: "blur(40px)" }}>
            ↑
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span onClick={() => { setMessages([OPENER]); setInput(""); }} className="fl-label" style={{ cursor: "pointer" }}>New session ↻</span>
        </div>
      </div>
    </div>
  );
}
