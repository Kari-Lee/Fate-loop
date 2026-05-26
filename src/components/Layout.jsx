import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const red = "#C92A2A";

function Star({ size, color, filled, opacity }) {
  return <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}><path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z" fill={filled ? color : "none"} stroke={filled ? "none" : color} strokeWidth="1.5"/></svg>;
}

export default function Layout() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleLang = () => {
    const next = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(next);
    localStorage.setItem("yidu-lang", next);
  };

  return (
    <div style={{ background: "#050505", minHeight: "100vh", position: "relative", overflow: "hidden", color: "#FFF" }}>
      {/* Ambient */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "5%", left: "50%", marginLeft: "-40%", width: "80%", height: "50%", borderRadius: "50%", background: `radial-gradient(circle, ${red}05 0%, transparent 65%)`, filter: "blur(80px)" }}/>
      </div>
      {/* Vignette */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3, background: "radial-gradient(ellipse 65% 55% at 50% 45%, transparent 0%, #050505 100%)" }}/>
      {/* Breathing stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "12%", right: "7%", "--o": ".1", animation: "breathe 7s ease-in-out infinite" }}><Star size={28} color={red} filled opacity={.1}/></div>
        <div style={{ position: "absolute", top: "55%", left: "3%", "--o": ".06", animation: "breathe 9s ease-in-out 1s infinite" }}><Star size={18} color={red} filled opacity={.06}/></div>
        <div style={{ position: "absolute", bottom: "18%", right: "5%", "--o": ".05", animation: "breathe 8s ease-in-out 3s infinite" }}><Star size={14} color={red} filled opacity={.05}/></div>
      </div>

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(5,5,5,.7)", backdropFilter: "blur(32px) saturate(1.2)", borderBottom: "1px solid rgba(255,255,255,.03)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "18px 36px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <Star size={11} color={red} filled opacity={.6}/>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#FFF", letterSpacing: 1.5 }}>FateLoop</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {!isHome && <span onClick={() => navigate("/")} style={{ fontSize: 12, color: "#444", cursor: "pointer", transition: "color .3s" }} onMouseEnter={(e) => e.target.style.color = "#888"} onMouseLeave={(e) => e.target.style.color = "#444"}>Home</span>}
            <div style={{ width: 1, height: 12, background: "#1A1A1A" }}/>
            <span onClick={toggleLang} style={{ fontSize: 11, color: "#333", cursor: "pointer", letterSpacing: .5 }}>{i18n.language === "zh" ? "EN" : "中文"}</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "0 36px", position: "relative", zIndex: 4 }}>
        <Outlet />
      </main>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,.02)", marginTop: 48, background: "rgba(5,5,5,.5)", backdropFilter: "blur(12px)", position: "relative", zIndex: 4 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "28px 36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Star size={6} color={red} filled opacity={.2}/>
            <span style={{ fontSize: 10, color: "#222", letterSpacing: 1 }}>© 2026 FateLoop</span>
          </div>
          <span onClick={() => navigate("/privacy")} style={{ fontSize: 10, color: "#222", cursor: "pointer", letterSpacing: 1 }}>Privacy</span>
        </div>
      </footer>
    </div>
  );
}
