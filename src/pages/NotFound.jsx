import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="animate-fu text-center py-16">
      <div className="text-[72px] mb-4 animate-float">🌀</div>
      <div className="font-serif text-[32px] font-bold mb-2" style={{ color: "#FFF" }}>404</div>
      <div className="text-[15px] mb-8" style={{ color: "#555" }}>This page left you on read</div>
      <button onClick={() => navigate("/")} className="px-8 py-3 rounded-2xl text-[15px] font-bold border-none cursor-pointer"
        style={{ background: "#FFF", color: "#000" }}>Go Home</button>
    </div>
  );
}
