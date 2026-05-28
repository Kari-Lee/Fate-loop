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
    try { localStorage.setItem("yidu-lang", next); } catch (e) {}
  };

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      color: "#F5F1E8",
      fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
      background: `
        radial-gradient(ellipse 80% 60% at 20% 20%, rgba(120, 90, 180, 0.32) 0%, transparent 50%),
        radial-gradient(ellipse 70% 50% at 80% 30%, rgba(180, 120, 90, 0.22) 0%, transparent 55%),
        radial-gradient(ellipse 90% 70% at 50% 90%, rgba(60, 80, 140, 0.35) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 70% 75%, rgba(200, 160, 100, 0.15) 0%, transparent 55%),
        linear-gradient(180deg, #0A0612 0%, #050A18 50%, #07050F 100%)
      `,
      backgroundAttachment: "fixed",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        body { background: #050A18; margin: 0; }

        /* Container responsive */
        .fl-container {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
        }
        @media (min-width: 768px) {
          .fl-container { max-width: 880px; padding: 0 36px; }
        }
        @media (min-width: 1024px) {
          .fl-container { max-width: 1080px; padding: 0 48px; }
        }
        @media (min-width: 1440px) {
          .fl-container { max-width: 1200px; padding: 0 56px; }
        }

        /* Glass utility — reusable across all pages */
        .fl-glass {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .fl-glass-strong {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(60px) saturate(2);
          -webkit-backdrop-filter: blur(60px) saturate(2);
          border: 0.5px solid rgba(255, 255, 255, 0.18);
          border-radius: 28px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2),
            0 16px 60px rgba(0, 0, 0, 0.5);
        }
        .fl-glass-pill {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(40px) saturate(1.8);
          -webkit-backdrop-filter: blur(40px) saturate(1.8);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 99px;
        }
        .fl-label {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(245, 241, 232, 0.5); font-weight: 500;
        }
        .fl-label-gold { color: rgba(212, 176, 122, 0.85); }
        .fl-serif { font-family: 'Cormorant Garamond', 'Georgia', serif; }
      `}</style>

      {/* Noise texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        opacity: 0.35, mixBlendMode: "overlay", zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`,
      }}/>

      {/* Subtle stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {[
          { t: "12%", l: "18%", s: 2, o: 0.8, glow: true },
          { t: "22%", l: "8%", s: 1, o: 0.5 },
          { t: "18%", r: "22%", s: 1.5, o: 0.7, glow: true },
          { t: "35%", r: "15%", s: 1, o: 0.4 },
          { b: "35%", l: "12%", s: 2, o: 0.7, glow: true },
          { b: "25%", r: "35%", s: 1, o: 0.4 },
          { t: "50%", l: "88%", s: 1.5, o: 0.6, glow: true },
          { t: "65%", l: "28%", s: 1, o: 0.3 },
          { t: "78%", r: "10%", s: 1.5, o: 0.5 },
        ].map((st, i) => (
          <div key={i} style={{
            position: "absolute", top: st.t, bottom: st.b, left: st.l, right: st.r,
            width: st.s, height: st.s, borderRadius: "50%",
            background: "rgba(255,255,255," + st.o + ")",
            boxShadow: st.glow ? "0 0 4px rgba(255,255,255," + st.o + ")" : "none",
          }}/>
        ))}
      </div>

      {/* Floating glass header pill */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "20px 0",
        display: "flex", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div className="fl-glass-pill" style={{
          padding: "10px 22px",
          display: "flex", alignItems: "center", gap: 18,
          pointerEvents: "auto",
        }}>
          <div onClick={() => navigate("/")} style={{
            display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
          }}>
            <svg width="11" height="11" viewBox="0 0 100 100">
              <path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z" fill="rgba(245,241,232,0.95)"/>
            </svg>
            <span className="fl-serif" style={{
              fontSize: 14, letterSpacing: 2.5, color: "rgba(245,241,232,0.95)",
            }}>FateLoop</span>
          </div>
          <div style={{ width: "0.5px", height: 12, background: "rgba(255,255,255,0.15)" }}/>
          {!isHome && (
            <span onClick={() => navigate("/")} className="fl-label" style={{ cursor: "pointer" }}>Home</span>
          )}
          <span onClick={toggleLang} className="fl-label" style={{ cursor: "pointer" }}>
            {i18n.language === "zh" ? "EN" : "中文"}
          </span>
        </div>
      </header>

      {/* MAIN content */}
      <main className="fl-container" style={{ position: "relative", zIndex: 4, paddingBottom: 80 }}>
        <Outlet />
      </main>

      {/* Footer signature */}
      <footer style={{
        position: "relative", zIndex: 4,
        textAlign: "center", padding: "32px 0 40px",
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 30, height: "0.5px", background: "rgba(212,176,122,0.35)" }}/>
          <span className="fl-label" onClick={() => navigate("/privacy")} style={{ cursor: "pointer" }}>
            Made in alignment · Privacy
          </span>
          <div style={{ width: 30, height: "0.5px", background: "rgba(212,176,122,0.35)" }}/>
        </div>
      </footer>
    </div>
  );
}
