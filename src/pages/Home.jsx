import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";

const gold = "#A08050";
const card = "#111114";
const line = "#1E1E22";
const ink = "#E8E4DC";

export default function Home() {
  const navigate = useNavigate();
  const daily = getDailyQuote();

  const Card = ({ path, icon, title, desc, gradient, big }) => (
    <div onClick={() => navigate(path)} className="cursor-pointer transition-all"
      style={{ background: gradient || card, borderRadius: big ? 24 : 20, padding: big ? "36px 28px" : "28px 18px", border: `1px solid ${line}`, textAlign: big ? "left" : "center" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "#2A2A30"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = line; }}>
      {big ? (
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[5px] uppercase mb-3" style={{ color: gold }}>Core Reading</div>
            <div className="font-serif text-[26px] font-bold mb-2" style={{ color: ink, lineHeight: 1.3 }}>{title}</div>
            <div className="text-[12px]" style={{ color: "#555" }}>{desc}</div>
          </div>
          <div className="text-[52px] animate-float shrink-0 ml-4">{icon}</div>
        </div>
      ) : (
        <>
          <div className="text-[36px] mb-3">{icon}</div>
          <div className="text-[14px] font-bold mb-1" style={{ color: ink }}>{title}</div>
          <div className="text-[10px]" style={{ color: "#555" }}>{desc}</div>
        </>
      )}
    </div>
  );

  return (
    <div className="animate-fu">
      {/* Hero - The Master */}
      <div onClick={() => navigate("/master")} className="cursor-pointer relative overflow-hidden mb-4"
        style={{ background: "linear-gradient(160deg, #15101E 0%, #0D0A12 40%, #111114 100%)", borderRadius: 28, padding: "44px 28px", border: `1px solid #2A2230` }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(160,128,80,.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[6px] uppercase mb-4" style={{ color: gold }}>✦ Live Reading</div>
            <div className="font-serif text-[30px] font-bold mb-2" style={{ color: ink, lineHeight: 1.2 }}>Consult<br/>The Master</div>
            <div className="text-[12px] mt-3" style={{ color: "#666", lineHeight: 1.7 }}>AI fortune teller trained in BaZi, Five Elements, and 3,000 years of Chinese wisdom. Ask anything.</div>
          </div>
          <div className="text-[60px] animate-float shrink-0 ml-4" style={{ filter: "drop-shadow(0 0 20px rgba(160,128,80,.2))" }}>🌙</div>
        </div>
      </div>

      {/* Five Elements & Zodiac */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Card path="/elements" icon="🌿" title="Five Elements" desc="Love match by birth element" gradient="linear-gradient(160deg, #0D1A12, #111114)" />
        <Card path="/zodiac" icon="🐉" title="Zodiac Match" desc="Toxic or soulmate?" gradient="linear-gradient(160deg, #1A0F0A, #111114)" />
      </div>

      {/* Daily wisdom */}
      <div className="mb-4" style={{ background: card, borderRadius: 20, padding: "24px 28px", border: `1px solid ${line}` }}>
        <div className="font-serif text-[14px] italic" style={{ color: "#777", lineHeight: 2 }}>{"\u201C"}{daily}{"\u201D"}</div>
        <div className="text-[9px] font-bold tracking-[4px] uppercase mt-3" style={{ color: gold }}>Daily Wisdom</div>
      </div>

      {/* Divination grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <Card path="/meihua" icon="🌸" title="Plum Blossom" desc="I Ching hexagram oracle" gradient="linear-gradient(160deg, #1A1510, #111114)" />
        <Card path="/tarot" icon="🃏" title="Tarot" desc="Three-card love reading" gradient="linear-gradient(160deg, #15101E, #111114)" />
      </div>
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <Card path="/qian" icon="🏮" title="Oracle" desc="Temple sticks" />
        <Card path="/bazi" icon="💫" title="Bazi" desc="Destiny pairing" />
        <Card path="/fortune" icon="✨" title="Fortune" desc="Today's energy" />
      </div>

      {/* Five Elements explainer */}
      <div style={{ background: card, borderRadius: 20, padding: "28px", border: `1px solid ${line}` }}>
        <div className="text-[10px] font-bold tracking-[4px] uppercase mb-4" style={{ color: gold }}>The Five Elements</div>
        <div className="text-[13px] mb-4" style={{ color: "#555", lineHeight: 2 }}>
          An ancient Chinese system that maps the universe into five forces locked in an eternal cycle of creation and destruction.
        </div>
        <div className="flex justify-between">
          {[
            { emoji: "🌿", name: "Wood", color: "#4A7C59" },
            { emoji: "🔥", name: "Fire", color: "#C75B3A" },
            { emoji: "🏔", name: "Earth", color: "#A08050" },
            { emoji: "⚔️", name: "Metal", color: "#8A8A8A" },
            { emoji: "🌊", name: "Water", color: "#4A6FA5" },
          ].map((el) => (
            <div key={el.name} className="text-center">
              <div className="text-[24px] mb-1">{el.emoji}</div>
              <div className="text-[10px] font-bold" style={{ color: el.color }}>{el.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
