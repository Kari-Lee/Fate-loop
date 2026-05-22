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
    <div className="min-h-screen" style={{ background: "#0A0A0C" }}>
      <div className="pt-12 pb-4 px-5 max-w-[500px] lg:max-w-[720px] mx-auto">
        <div className="flex items-start justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer text-center flex-1">
            <div className="text-[9px] font-bold tracking-[6px] mb-3" style={{ color: "#A08050" }}>命运循环</div>
            <h1 className="font-serif leading-none" style={{ fontSize: 38, fontWeight: 700, color: "#E8E4DC", letterSpacing: 4 }}>FateLoop</h1>
            <div className="mx-auto my-3" style={{ width: 24, height: 1, background: "#A08050" }} />
            <p className="text-[11px] tracking-[3px] italic font-serif" style={{ color: "#555" }}>decode every word</p>
          </div>
          <button onClick={toggleLang} className="text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer shrink-0 mt-1"
            style={{ color: "#A08050", border: "1px solid #1E1E22", background: "#111114" }}>
            {i18n.language === "zh" ? "EN" : "中文"}
          </button>
        </div>
        {!isHome && (
          <div className="mt-5">
            <span onClick={() => navigate("/")} className="text-[12px] font-semibold cursor-pointer" style={{ color: "#A08050" }}>← Back</span>
          </div>
        )}
      </div>
      <div className="px-5 max-w-[500px] lg:max-w-[720px] mx-auto pb-20">
        <Outlet />
      </div>
      <div className="text-center pt-10 pb-8 px-5">
        <div className="text-[10px] tracking-[4px]" style={{ color: "#222" }}>FATELOOP</div>
        <span onClick={() => navigate("/privacy")} className="text-[10px] cursor-pointer" style={{ color: "#222" }}>Privacy</span>
      </div>
    </div>
  );
}
