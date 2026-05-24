import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";

export default function Home() {
  const navigate = useNavigate();
  const daily = getDailyQuote();

  return (
    <div className="animate-fu">
      {/* Hero */}
      <section style={{ padding: "72px 0 56px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: "#BBB", marginBottom: 24 }}>Chinese Mysticism × AI</div>
        <h1 className="font-serif" style={{ fontSize: 42, fontWeight: 400, color: "#1A1A1A", lineHeight: 1.25, marginBottom: 20 }}>
          Decode every word.<br />Reveal every fate.
        </h1>
        <p style={{ fontSize: 14, color: "#999", lineHeight: 1.8, maxWidth: 400, margin: "0 auto 36px" }}>
          Ancient Chinese wisdom meets modern AI. Consult the Master, cast hexagrams, and discover what the universe has written for you.
        </p>
        <button onClick={() => navigate("/master")}
          style={{ background: "#1A1A1A", color: "#FFF", border: "none", padding: "13px 36px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: .5, transition: "all .3s" }}
          onMouseEnter={(e) => { e.target.style.background = "#333"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = "#1A1A1A"; e.target.style.transform = "none"; }}>
          Consult the Master →
        </button>
      </section>

      {/* The Master card */}
      <section style={{ marginBottom: 40 }}>
        <div onClick={() => navigate("/master")} className="card-hover"
          style={{ background: "#FFF", borderRadius: 16, padding: "36px 32px", border: "1px solid #EFEFEF", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#BBB", marginBottom: 14 }}>✦ Live AI Reading</div>
              <div className="font-serif" style={{ fontSize: 26, color: "#1A1A1A", marginBottom: 8, fontWeight: 500 }}>The Master</div>
              <div style={{ fontSize: 13, color: "#999", lineHeight: 1.7 }}>Ask anything about your birth chart, love, career, or wealth.</div>
            </div>
            <div className="animate-float" style={{ fontSize: 44, marginLeft: 24, flexShrink: 0 }}>🌙</div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#BBB", marginBottom: 16 }}>Featured</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { path: "/elements", icon: "🌿", title: "Five Elements", desc: "Love match by birth element" },
            { path: "/zodiac", icon: "🐉", title: "Zodiac Match", desc: "Toxic or soulmate?" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="card-hover"
              style={{ background: "#FFF", borderRadius: 14, padding: "28px 22px", border: "1px solid #EFEFEF", cursor: "pointer" }}>
              <div style={{ fontSize: 30, marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginBottom: 5 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#AAA", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divination */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { path: "/meihua", icon: "🌸", title: "Plum Blossom", desc: "I Ching hexagram oracle" },
            { path: "/tarot", icon: "🃏", title: "Tarot", desc: "Three-card love reading" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="card-hover"
              style={{ background: "#FFF", borderRadius: 14, padding: "28px 22px", border: "1px solid #EFEFEF", cursor: "pointer" }}>
              <div style={{ fontSize: 30, marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginBottom: 5 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#AAA", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* More */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#BBB", marginBottom: 16 }}>More</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { path: "/qian", icon: "🏮", title: "Oracle" },
            { path: "/bazi", icon: "💫", title: "Bazi" },
            { path: "/fortune", icon: "✨", title: "Fortune" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="card-hover"
              style={{ background: "#FFF", borderRadius: 14, padding: "22px 14px", border: "1px solid #EFEFEF", cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A1A" }}>{item.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section style={{ marginBottom: 40, padding: "28px 0", borderTop: "1px solid #EFEFEF", borderBottom: "1px solid #EFEFEF" }}>
        <div className="font-serif" style={{ fontSize: 16, color: "#999", lineHeight: 2, fontStyle: "italic", textAlign: "center", maxWidth: 460, margin: "0 auto" }}>
          "{daily}"
        </div>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: "#CCC", textAlign: "center", marginTop: 18 }}>Daily Wisdom</div>
      </section>

      {/* Elements strip */}
      <section style={{ textAlign: "center", paddingBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {[
            { e: "🌿", n: "Wood" }, { e: "🔥", n: "Fire" }, { e: "🏔", n: "Earth" }, { e: "⚔️", n: "Metal" }, { e: "🌊", n: "Water" },
          ].map((el) => (
            <div key={el.n}>
              <div style={{ fontSize: 18, marginBottom: 4, opacity: .5 }}>{el.e}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#CCC" }}>{el.n}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
