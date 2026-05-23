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
      {/* Hero - Five Elements */}
      <Card path="/elements" icon="🌿" title="Five Elements Love Match" desc="Wood · Fire · Earth · Metal · Water" gradient="linear-gradient(160deg, #0D1A12, #111114)" big />

      <div style={{ height: 14 }} />

      {/* Zodiac - secondary hero */}
      <div onClick={() => navigate("/zodiac")} className="cursor-pointer relative overflow-hidden mb-4"
        style={{ background: "linear-gradient(160deg, #1A0F0A, #111114)", borderRadius: 24, padding: "32px 28px", border: `1px solid ${line}` }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[5px] uppercase mb-3" style={{ color: "#C75B3A" }}>Compatibility</div>
            <div className="font-serif text-[22px] font-bold mb-1" style={{ color: ink }}>Chinese Zodiac Match</div>
            <div className="text-[12px]" style={{ color: "#555" }}>12 animals · toxic or soulmate?</div>
          </div>
          <div className="text-[48px] animate-float shrink-0 ml-4">🐉</div>
        </div>
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
