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
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* Header — mesh3d style: minimal, clean, sticky */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(0,0,0,.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#FFF", letterSpacing: 1, fontFamily: "'DM Sans', sans-serif" }}>FateLoop</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {!isHome && (
              <span onClick={() => navigate("/")} style={{ fontSize: 13, color: "#666", cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={(e) => e.target.style.color = "#FFF"}
                onMouseLeave={(e) => e.target.style.color = "#666"}>
                Home
              </span>
            )}
            <span onClick={toggleLang} style={{ fontSize: 12, color: "#444", cursor: "pointer", padding: "4px 10px", borderRadius: 6, border: "1px solid #1A1A1A", transition: "all .2s" }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#333"; e.target.style.color = "#888"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#1A1A1A"; e.target.style.color = "#444"; }}>
              {i18n.language === "zh" ? "EN" : "中文"}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <Outlet />
      </main>

      {/* Footer — minimal */}
      <footer style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 32px", borderTop: "1px solid #111", marginTop: 60 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#333" }}>© 2026 FateLoop</span>
          <span onClick={() => navigate("/privacy")} style={{ fontSize: 12, color: "#333", cursor: "pointer", transition: "color .2s" }}
            onMouseEnter={(e) => e.target.style.color = "#666"}
            onMouseLeave={(e) => e.target.style.color = "#333"}>
            Privacy
          </span>
        </div>
      </footer>
    </div>
  );
}
