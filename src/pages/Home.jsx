import { useNavigate } from "react-router-dom";
import { getDailyQuote } from "../data/quotes";

const gold = "#A08050";
const sub = "#555";
const card = "#111114";
const line = "#1E1E22";
const ink = "#E8E4DC";

export default function Home() {
  const navigate = useNavigate();
  const daily = getDailyQuote();

  return (
    <div className="animate-fu">
      {/* Hero - Quiz CTA */}
      <div onClick={() => navigate("/quiz")} className="cursor-pointer relative overflow-hidden mb-5"
        style={{ background: card, borderRadius: 24, padding: "36px 28px", border: `1px solid ${line}` }}>
        <div className="absolute top-0 left-0 w-1 h-full" style={{ background: gold }} />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[4px] uppercase mb-3" style={{ color: gold }}>Start Here</div>
            <div className="font-serif text-[26px] font-bold mb-2" style={{ color: ink }}>Attachment Style Quiz</div>
            <div className="text-[13px]" style={{ color: sub }}>24 questions · 3 min · brutally honest</div>
          </div>
          <div className="text-[48px] animate-float shrink-0 ml-4">🧪</div>
        </div>
      </div>

      {/* Daily quote */}
      <div className="mb-5" style={{ background: card, borderRadius: 20, padding: "24px 28px", border: `1px solid ${line}` }}>
        <div className="font-serif text-[14px] italic" style={{ color: "#888", lineHeight: 2 }}>{"\u201C"}{daily}{"\u201D"}</div>
        <div className="text-[9px] font-bold tracking-[4px] uppercase mt-2" style={{ color: gold }}>Daily Quote</div>
      </div>

      {/* AI Tools */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-[3px] h-3.5 rounded-sm" style={{ background: gold }} />
          <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: gold }}>AI Analysis</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { path: "/diagnose", icon: "🩺", l: "Chat Diagnosis", s: "AI reads both sides" },
            { path: "/translate", icon: "🔮", l: "Decode Subtext", s: "What they really mean" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="cursor-pointer transition-all"
              style={{ background: card, borderRadius: 20, padding: "28px 18px", textAlign: "center", border: `1px solid ${line}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2A2A30"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = line; e.currentTarget.style.transform = "none"; }}>
              <div className="text-[32px] mb-3">{item.icon}</div>
              <div className="text-[14px] font-bold mb-1" style={{ color: ink }}>{item.l}</div>
              <div className="text-[11px]" style={{ color: sub }}>{item.s}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {[
            { path: "/check", icon: "💊", l: "Send or Not", s: "Stop the impulse" },
            { path: "/predict", icon: "🔭", l: "Predict", s: "Where this goes" },
            { path: "/tarot", icon: "🌙", l: "Tarot", s: "Three cards" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="cursor-pointer transition-all"
              style={{ background: card, borderRadius: 16, padding: "20px 10px", textAlign: "center", border: `1px solid ${line}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
              <div className="text-[24px] mb-2">{item.icon}</div>
              <div className="text-[12px] font-bold" style={{ color: ink }}>{item.l}</div>
              <div className="text-[10px] mt-1" style={{ color: "#444" }}>{item.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chinese Mysticism */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-[3px] h-3.5 rounded-sm" style={{ background: "#C75B3A" }} />
          <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: "#C75B3A" }}>Chinese Mysticism</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { path: "/elements", icon: "🌿", l: "Five Elements", s: "Wood · Fire · Earth · Metal · Water", grad: "linear-gradient(135deg, #0D1A12, #111114)" },
            { path: "/zodiac", icon: "🐉", l: "Zodiac Match", s: "12 animals · toxic or soulmate?", grad: "linear-gradient(135deg, #1A0F0A, #111114)" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="cursor-pointer transition-all"
              style={{ background: item.grad, borderRadius: 20, padding: "28px 18px", textAlign: "left", border: `1px solid ${line}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
              <div className="text-[36px] mb-3">{item.icon}</div>
              <div className="text-[15px] font-bold mb-1" style={{ color: ink }}>{item.l}</div>
              <div className="text-[10px]" style={{ color: "#555" }}>{item.s}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { path: "/qian", icon: "🏮", l: "Oracle Sticks" },
            { path: "/bazi", icon: "💫", l: "Bazi Match" },
            { path: "/fortune", icon: "🌙", l: "Daily Fortune" },
          ].map((item) => (
            <div key={item.path} onClick={() => navigate(item.path)} className="cursor-pointer transition-all"
              style={{ background: card, borderRadius: 16, padding: "20px 10px", textAlign: "center", border: `1px solid ${line}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
              <div className="text-[24px] mb-2">{item.icon}</div>
              <div className="text-[12px] font-bold" style={{ color: ink }}>{item.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
