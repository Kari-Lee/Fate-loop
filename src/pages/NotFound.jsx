import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="animate-fu" style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 16, opacity: .4 }}>🌀</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "#FFF", marginBottom: 8 }}>404</div>
      <div style={{ fontSize: 14, color: "#444", marginBottom: 32 }}>This page left you on read</div>
      <button onClick={() => navigate("/")} style={{ background: "#C92A2A", color: "#FFF", border: "none", padding: "12px 32px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 1 }}>Go Home</button>
    </div>
  );
}
