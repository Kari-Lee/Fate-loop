import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

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
    <div style={{ background: "#FAFAFA", minHeight: "100vh" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,250,.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #EFEFEF" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A", letterSpacing: .5 }}>FateLoop</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {!isHome && (
              <span onClick={() => navigate("/")} style={{ fontSize: 13, color: "#999", cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={(e) => e.target.style.color = "#1A1A1A"}
                onMouseLeave={(e) => e.target.style.color = "#999"}>Home</span>
            )}
            <span onClick={toggleLang} style={{ fontSize: 11, color: "#AAA", cursor: "pointer", padding: "4px 10px", borderRadius: 6, border: "1px solid #E8E8E8", transition: "all .2s" }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#CCC"; e.target.style.color = "#666"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#E8E8E8"; e.target.style.color = "#AAA"; }}>
              {i18n.language === "zh" ? "EN" : "中文"}
            </span>
          </div>
        </div>
      </header>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <Outlet />
      </main>
      <footer style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 28px", borderTop: "1px solid #EFEFEF", marginTop: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#CCC" }}>© 2026 FateLoop</span>
          <span onClick={() => navigate("/privacy")} style={{ fontSize: 11, color: "#CCC", cursor: "pointer" }}>Privacy</span>
        </div>
      </footer>
    </div>
  );
}
