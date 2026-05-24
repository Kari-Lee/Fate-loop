import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";

export default function Home() {
  const navigate = useNavigate();
  const daily = getDailyQuote();

  return (
    <div className="animate-fu">
      {/* Hero */}
      <section style={{ padding: "80px 0 60px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#444", marginBottom: 24 }}>Chinese Mysticism × AI</div>
        <h1 className="font-serif" style={{ fontSize: 44, fontWeight: 400, color: "#FFF", lineHeight: 1.2, marginBottom: 20 }}>
          Decode every word.<br />Reveal every fate.
        </h1>
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, maxWidth: 420, margin: "0 auto 36px" }}>
          Ancient Chinese wisdom meets modern AI. Consult the Master, cast hexagrams, read the Five Elements, and discover what the universe has written for you.
        </p>
        <button onClick={() => navigate("/master")}
          className="card-hover"
          style={{ background: "#FFF", color: "#000", border: "none", padding: "14px 40px", borderRadius: 99, fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: 1 }}>
          Consult the Master
        </button>
      </section>

      {/* The Master — featured card */}
      <section style={{ marginBottom: 48 }}>
        <div onClick={() => navigate("/master")}
          className="card-hover"
          style={{ background: "#0A0A0A", borderRadius: 16, padding: "40px 32px", border: "1px solid #1A1A1A", cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #333, transparent)" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#555", marginBottom: 16 }}>✦ Live AI Reading</div>
              <div className="font-serif" style={{ fontSize: 28, color: "#FFF", marginBottom: 8, fontWeight: 400 }}>The Master</div>
              <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>Ask anything. Birth chart, love, career, wealth — the chart speaks.</div>
            </div>
            <div className="animate-float" style={{ fontSize: 48, marginLeft: 24, flexShrink: 0, opacity: .7 }}>🌙</div>
          </div>
        </div>
      </section>

      {/* Featured tools — 2 column */}
      <section style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#444", marginBottom: 20 }}>Featured</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { path: "/elements", icon: "🌿", title: "Five Elements", desc: "Love match by birth element" },
            { path: "/zodiac", icon: "🐉", title: "Zodiac Match", desc: "12 animals — toxic or soulmate?" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)}
              className="card-hover"
              style={{ background: "#0A0A0A", borderRadius: 14, padding: "28px 22px", border: "1px solid #1A1A1A", cursor: "pointer" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#FFF", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divination tools — grid */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { path: "/meihua", icon: "🌸", title: "Plum Blossom", desc: "I Ching hexagram oracle" },
            { path: "/tarot", icon: "🃏", title: "Tarot", desc: "Three-card love reading" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)}
              className="card-hover"
              style={{ background: "#0A0A0A", borderRadius: 14, padding: "28px 22px", border: "1px solid #1A1A1A", cursor: "pointer" }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#FFF", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* More tools — 3 column */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#444", marginBottom: 20 }}>More</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { path: "/qian", icon: "🏮", title: "Oracle" },
            { path: "/bazi", icon: "💫", title: "Bazi" },
            { path: "/fortune", icon: "✨", title: "Fortune" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)}
              className="card-hover"
              style={{ background: "#0A0A0A", borderRadius: 14, padding: "24px 16px", border: "1px solid #1A1A1A", cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#FFF" }}>{item.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily wisdom — editorial quote block */}
      <section style={{ marginBottom: 48, padding: "32px 0", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div className="font-serif" style={{ fontSize: 16, color: "#555", lineHeight: 2, fontStyle: "italic", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          "{daily}"
        </div>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#333", textAlign: "center", marginTop: 20 }}>Daily Wisdom</div>
      </section>

      {/* Five Elements strip — decorative */}
      <section style={{ marginBottom: 20, textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {[
            { emoji: "🌿", name: "Wood", color: "#3D6B4A" },
            { emoji: "🔥", name: "Fire", color: "#8B3A2A" },
            { emoji: "🏔", name: "Earth", color: "#7A6540" },
            { emoji: "⚔️", name: "Metal", color: "#6A6A6A" },
            { emoji: "🌊", name: "Water", color: "#3A5A85" },
          ].map((el) => (
            <div key={el.name}>
              <div style={{ fontSize: 20, marginBottom: 6, opacity: .6 }}>{el.emoji}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#333" }}>{el.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
