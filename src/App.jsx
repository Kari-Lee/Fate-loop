import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function TestHome() {
  return (
    <div style={{ background: "#050505", color: "#FFF", minHeight: "100vh", padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>FateLoop Works!</h1>
      <p style={{ color: "#888", marginBottom: 20 }}>If you can see this, React is running correctly.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link to="/master" style={{ color: "#C92A2A" }}>→ The Master</Link>
        <Link to="/elements" style={{ color: "#C92A2A" }}>→ Five Elements</Link>
        <Link to="/tarot" style={{ color: "#C92A2A" }}>→ Tarot</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHome />} />
        <Route path="*" element={<TestHome />} />
      </Routes>
    </BrowserRouter>
  );
}
