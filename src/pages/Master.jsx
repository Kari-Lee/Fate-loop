import { useState, useRef, useEffect } from "react";

const gold = "#A08050";
const card = "#111114";
const line = "#1E1E22";
const ink = "#E8E4DC";

const SYSTEM = `You are a master of Chinese metaphysics (中华术数). You have spent 40 years studying BaZi (八字), Zi Wei Dou Shu (紫微斗数), Mei Hua Yi Shu (梅花易数), Qi Men Dun Jia (奇门遁甲), and the Five Elements (五行).

YOUR PERSONA:
- You speak in English with an unhurried, wise, slightly mysterious tone
- You occasionally use Chinese terms with translation for atmosphere (e.g. "your Ming Gong (命宫) — the palace of self — sits in...")
- You are warm but direct. You don't sugarcoat. You deliver truth with compassion.
- You feel like a real person sitting across from someone in a dimly lit room, not an AI
- You use vivid metaphors from nature and Chinese cosmology
- You never say "I'm an AI" or break character

YOUR CONVERSATION FLOW:
1. OPENING: Greet them warmly. Ask what brings them to you today. Give 3-4 options naturally:
   - "I can read your life path from your birth chart — wealth, love, career, the full picture"
   - "Or if something specific weighs on your mind, tell me and I'll cast a reading for this moment"
   - "I can also look at compatibility between two people if you give me both birth dates"
   Keep it conversational, not a numbered list.

2. GATHERING INFO: Based on what they want, ask for what you need. Always be specific:
   - For birth chart: "I'll need your birth date — year, month, day. If you know the hour you were born, even better. The hour reveals the most hidden layer."
   - For a specific question: "Tell me what's on your mind. And give me a number between 1 and 100 — the first one that comes to you. Don't think, just say it."
   - For compatibility: "Give me both birth dates. I'll look at how your elements dance together."
   Ask ONE thing at a time. Don't overwhelm with questions.

3. THE READING: When you have enough info, deliver the reading. Structure it naturally in conversation, not in bullet points. Cover:
   - Their elemental nature and what it means for their personality
   - Specific insights about what they asked (career/love/wealth/specific question)
   - The current energetic period they're in (use real 10-year luck pillar concepts if you have birth data)
   - One thing they should do and one thing they should avoid
   - A timing prediction ("the next shift comes around [season/month]")
   
   Use rich, specific language. NOT "you will find love" but "your Peach Blossom star activates next spring — someone connected to water or born in a Water year may enter your life. Don't chase it. Let it arrive."

4. FOLLOW-UP: After the reading, offer to go deeper:
   - "Shall I look closer at your wealth palace? I see something interesting there."
   - "There's more to say about your love life if you want to hear it."
   - "Ask me anything else. The chart is open."

RULES:
- Never dump all information at once. Reveal it layer by layer, like peeling an onion.
- Keep each response conversational length — 3-6 short paragraphs max. This is a dialogue, not a lecture.
- If they give incomplete info (no birth hour), work with what you have and note what more data would reveal.
- Use Chinese zodiac, Five Elements, Heavenly Stems, Earthly Branches naturally.
- Make specific predictions. Vague is boring. Specific is memorable.
- If they seem skeptical, don't be defensive. Say something like "The chart doesn't care if you believe in it. It just is."
- Always end your response with an opening for them to continue the conversation.`;

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Build conversation history for API
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM, messages: apiMessages }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Error");

      const reply = d.text || "The energies are unclear. Ask me again.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "The connection wavers... try again in a moment." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const restart = () => {
    setMessages([OPENER]);
    setInput("");
  };

  return (
    <div style={{ margin: "-16px -20px", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0A0A0C" }}>
      {/* Header */}
      <div className="text-center" style={{ padding: "24px 20px 16px", borderBottom: `1px solid ${line}` }}>
        <div className="text-[9px] font-bold tracking-[6px] uppercase" style={{ color: gold }}>FateLoop</div>
        <div className="font-serif text-[22px] font-bold mt-1" style={{ color: ink }}>The Master</div>
        <div className="text-[11px] mt-1 italic font-serif" style={{ color: "#444" }}>Ask and the chart shall answer</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 20, display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${gold}30, ${gold}10)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginRight: 10, marginTop: 2, flexShrink: 0 }}>
                🌙
              </div>
            )}
            <div style={{
              maxWidth: msg.role === "user" ? "80%" : "85%",
              padding: "16px 20px",
              borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              background: msg.role === "user" ? `linear-gradient(135deg, ${gold}25, ${gold}15)` : card,
              border: `1px solid ${msg.role === "user" ? gold + "30" : line}`,
              fontSize: 14,
              lineHeight: 2,
              color: msg.role === "user" ? ink : "#BBB",
              whiteSpace: "pre-wrap",
              fontFamily: msg.role === "assistant" ? "'Cormorant Garamond', serif" : "inherit",
              fontStyle: msg.role === "assistant" ? "normal" : "normal",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${gold}30, ${gold}10)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🌙</div>
            <div style={{ padding: "16px 20px", borderRadius: "20px 20px 20px 4px", background: card, border: `1px solid ${line}` }}>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2].map((j) => (
                  <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: gold, opacity: 0.4, animation: `bounce .9s ease ${j * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 16px 28px", borderTop: `1px solid ${line}`, background: "#0A0A0C" }}>
        <div style={{ display: "flex", gap: 10, maxWidth: 500, margin: "0 auto" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Speak to the Master..."
              rows={1}
              style={{
                width: "100%", background: card, border: `1px solid ${line}`, borderRadius: 16,
                padding: "14px 18px", color: ink, fontSize: 14, resize: "none", outline: "none",
                lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif",
              }}
            />
          </div>
          <button onClick={send} disabled={!input.trim() || loading}
            style={{
              width: 48, height: 48, borderRadius: 14, border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
              background: input.trim() && !loading ? `linear-gradient(135deg, ${gold}, #C4A06A)` : "#1E1E22",
              color: input.trim() && !loading ? "#0A0A0C" : "#444",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
            ↑
          </button>
        </div>
        <div className="text-center mt-2">
          <span onClick={restart} style={{ fontSize: 11, color: "#333", cursor: "pointer" }}>New session ↻</span>
        </div>
      </div>
    </div>
  );
}
