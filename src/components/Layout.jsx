import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// ═══ PREMIUM BLACK + DEEP RED + CHAMPAGNE GOLD ═══
const bg = "#0A0608";
const red = "#A6182B";
const gold = "#C9A961";
const text = "#F2E8D5";
const textSoft = "#B8A98E";
const textMute = "#7A6A55";
const textDim = "#4A3F32";
const lineGold = "#3D2E1F";

function Star({ size, color, filled, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z"
        fill={filled ? color : "none"} stroke={filled ? "none" : color} strokeWidth="1.5"/>
    </svg>
  );
}

export default function Layout() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleLang = () => {
    const next = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(next);
    try { localStorage.setItem("yidu-lang", next); } catch (e) {}
  };

  return (
    <div style={{ background: bg, minHeight: "100vh", position: "relative", overflow: "hidden", color: text }}>
      <style>{`
        /* Container responsive width */
        .fl-container {
          max-width: 640px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (min-width: 768px) {
          .fl-container { max-width: 820px; padding: 0 36px; }
        }
        @media (min-width: 1024px) {
          .fl-container { max-width: 1080px; padding: 0 48px; }
        }
        @media (min-width: 1440px) {
          .fl-container { max-width: 1200px; padding: 0 56px; }
        }

        /* Header */
        .fl-header-inner {
          max-width: 640px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .fl-header-inner { max-width: 820px; padding: 20px 36px; }
        }
        @media (min-width: 1024px) {
          .fl-header-inner { max-width: 1080px; padding: 22px 48px; }
        }
        @media (min-width: 1440px) {
          .fl-header-inner { max-width: 1200px; padding: 22px 56px; }
        }

        body { background: ${bg}; }
      `}</style>

      {/* Ambient warm glow layers */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-5%", left: "50%", marginLeft: "-45%",
          width: "90%", height: "55%", borderRadius: "50%",
          background: `radial-gradient(circle, ${red}1a 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}/>
        <div style={{
          position: "absolute", bottom: "-10%", right: "10%",
          width: "60%", height: "45%", borderRadius: "50%",
          background: `radial-gradient(circle, ${gold}10 0%, transparent 60%)`,
          filter: "blur(80px)",
        }}/>
        <div style={{
          position: "absolute", top: "45%", left: "-15%",
          width: "45%", height: "40%", borderRadius: "50%",
          background: `radial-gradient(circle, #6B0F1C40 0%, transparent 65%)`,
          filter: "blur(70px)",
        }}/>
      </div>

      {/* Vignette */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3,
        background: `radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, ${bg} 100%)`,
      }}/>

      {/* Decorative stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "10%", right: "8%" }}>
          <Star size={22} color={gold} filled={true} opacity={0.25}/>
        </div>
        <div style={{ position: "absolute", top: "55%", left: "4%" }}>
          <Star size={14} color={red} filled={true} opacity={0.18}/>
        </div>
        <div style={{ position: "absolute", bottom: "20%", right: "6%" }}>
          <Star size={12} color={gold} filled={true} opacity={0.14}/>
        </div>
        <div style={{ position: "absolute", top: "72%", left: "10%" }}>
          <Star size={10} color={red} filled={true} opacity={0.12}/>
        </div>
      </div>

      {/* HEADER */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: `${bg}d9`,
        backdropFilter: "blur(32px) saturate(1.4)",
        WebkitBackdropFilter: "blur(32px) saturate(1.4)",
        borderBottom: `1px solid ${lineGold}`,
      }}>
        <div className="fl-header-inner">
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <Star size={11} color={gold} filled={true} opacity={0.85}/>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18, fontWeight: 500, color: text, letterSpacing: 2,
            }}>FateLoop</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {!isHome && (
              <span onClick={() => navigate("/")} style={{
                fontSize: 11, color: textMute, cursor: "pointer", letterSpacing: 2,
                textTransform: "uppercase",
              }}>Home</span>
            )}
            <div style={{ width: 1, height: 12, background: lineGold }}/>
            <span onClick={toggleLang} style={{
              fontSize: 10, color: textMute, cursor: "pointer", letterSpacing: 3,
              textTransform: "uppercase",
            }}>
              {i18n.language === "zh" ? "EN" : "中文"}
            </span>
          </div>
        </div>
      </header>

      {/* MAIN — responsive container */}
      <main className="fl-container" style={{ position: "relative", zIndex: 4 }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${lineGold}`,
        marginTop: 48,
        background: `${bg}80`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "relative", zIndex: 4,
      }}>
        <div className="fl-header-inner" style={{ padding: "24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Star size={6} color={gold} filled={true} opacity={0.4}/>
            <span style={{ fontSize: 10, color: textDim, letterSpacing: 1 }}>© 2026 FateLoop</span>
          </div>
          <span onClick={() => navigate("/privacy")} style={{
            fontSize: 10, color: textDim, cursor: "pointer", letterSpacing: 2,
            textTransform: "uppercase",
          }}>
            Privacy
          </span>
        </div>
      </footer>
    </div>
  );
}
