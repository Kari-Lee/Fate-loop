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
    <div style={{ margin: "0 -32px", minHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", padding: "32px 32px 24px", borderBottom: "1px solid rgba(0,0,0,.04)" }}>
        <div style={{ fontSize: 9, letterSpacing: 6, textTransform: "uppercase", color: "#B5AFA0", marginBottom: 8, fontWeight: 500 }}>✦ Live Reading</div>
        <div className="font-serif" style={{ fontSize: 24, color: "#1A1A1A", fontWeight: 400 }}>The Master</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 0" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 20, display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 30, height: 30, borderRadius: 99, background: "rgba(255,255,255,.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginRight: 10, marginTop: 4, flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 40 40" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round"><circle cx="20" cy="20" r="10"/><circle cx="20" cy="16" r="1.5" fill="#8B7355" stroke="none"/><line x1="20" y1="19" x2="20" y2="25"/></svg>
              </div>
            )}
            <div style={{
              maxWidth: msg.role === "user" ? "78%" : "84%",
              padding: "14px 18px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user" ? "#1A1A1A" : "rgba(255,255,255,.6)",
              backdropFilter: msg.role === "assistant" ? "blur(16px)" : "none",
              border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,.7)",
              fontSize: 14, lineHeight: 1.9,
              color: msg.role === "user" ? "#F0EDE8" : "#555",
              whiteSpace: "pre-wrap",
              fontFamily: msg.role === "assistant" ? "'Cormorant Garamond', serif" : "inherit",
              letterSpacing: msg.role === "assistant" ? .3 : 0,
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 99, background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none" stroke="#8B7355" strokeWidth="1.5"><circle cx="20" cy="20" r="10"/></svg>
            </div>
            <div style={{ padding: "14px 18px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.7)" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {[0,1,2].map((j) => <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0B89A", animation: `bounce .9s ease ${j*.15}s infinite` }}/>)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: "12px 24px 24px", borderTop: "1px solid rgba(0,0,0,.04)", background: "rgba(240,237,232,.5)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", gap: 10, maxWidth: 540, margin: "0 auto" }}>
          <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Speak to the Master..." rows={1}
            style={{ flex: 1, background: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.7)", borderRadius: 14, padding: "12px 16px", color: "#1A1A1A", fontSize: 14, resize: "none", outline: "none", lineHeight: 1.6, backdropFilter: "blur(12px)" }}
          />
          <button onClick={send} disabled={!input.trim() || loading}
            style={{ width: 44, height: 44, borderRadius: 12, border: "none", cursor: input.trim() && !loading ? "pointer" : "default", background: input.trim() && !loading ? "#1A1A1A" : "rgba(255,255,255,.4)", color: input.trim() && !loading ? "#F0EDE8" : "#CCC", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
            ↑
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span onClick={() => { setMessages([OPENER]); setInput(""); }} style={{ fontSize: 11, color: "#CCC", cursor: "pointer" }}>New session ↻</span>
        </div>
      </div>
    </div>
  );
}
