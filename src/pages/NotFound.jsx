import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="animate-fu" style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16, opacity: .5 }}>🌀</div>
      <div className="font-serif" style={{ fontSize: 32, fontWeight: 400, color: "#1A1A1A", marginBottom: 8 }}>404</div>
      <div style={{ fontSize: 14, color: "#999", marginBottom: 32 }}>This page left you on read</div>
      <button onClick={() => navigate("/")}
        style={{ background: "#1A1A1A", color: "#FFF", border: "none", padding: "12px 32px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        Go Home
      </button>
    </div>
  );
}
