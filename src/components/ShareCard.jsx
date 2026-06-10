import { useState } from "react";
import { createPortal } from "react-dom";
import { C } from "../data/colors";
import { generateShareCard } from "../lib/shareCard";

// Drop-in "生成分享卡" button + preview/save overlay.
// `buildOpts` returns the options object for generateShareCard (see shareCard.js).
export default function ShareCardButton({ buildOpts, lang }) {
  const [img, setImg] = useState(null);
  const [busy, setBusy] = useState(false);
  const zh = lang === "zh";

  const make = async () => {
    setBusy(true);
    try { setImg(await generateShareCard(buildOpts())); }
    catch (e) { console.error(e); }
    finally { setBusy(false); }
  };

  const share = async () => {
    try {
      const blob = await (await fetch(img)).blob();
      const file = new File([blob], "fateloop.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
        return;
      }
    } catch (e) {}
    window.open(img, "_blank");
  };

  return (
    <>
      <button onClick={make} disabled={busy} className="w-full mt-4 py-4 rounded-2xl text-[15px] font-bold cursor-pointer"
        style={{ color: "#130A16", background: `linear-gradient(135deg, ${C.gold}, #C8968C)`, border: "none", boxShadow: "0 10px 30px rgba(224,169,158,.25)", letterSpacing: 1, opacity: busy ? 0.7 : 1 }}>
        {busy ? (zh ? "生成中…" : "Creating…") : (zh ? "✦ 生成分享卡" : "✦ Create share card")}
      </button>

      {img && createPortal(
        <div onClick={() => setImg(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(10,5,12,.86)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <img src={img} alt="share card" onClick={(e) => e.stopPropagation()} style={{ width: "min(78vw, 330px)", borderRadius: 18, boxShadow: "0 24px 70px rgba(0,0,0,.6)" }} />
          <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <button onClick={share} className="cursor-pointer" style={{ padding: "13px 26px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, color: "#130A16", background: `linear-gradient(135deg, ${C.gold}, #C8968C)` }}>{zh ? "分享 / 保存" : "Share / Save"}</button>
            <a href={img} download="fateloop.png" className="cursor-pointer" style={{ padding: "13px 26px", borderRadius: 14, border: `1px solid ${C.line}`, fontSize: 14, fontWeight: 600, color: C.ink, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>{zh ? "下载" : "Download"}</a>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: C.sub }}>{zh ? "长按图片也可保存 / 分享 · 点空白关闭" : "Long-press image to save · tap outside to close"}</div>
        </div>,
        document.body
      )}
    </>
  );
}
