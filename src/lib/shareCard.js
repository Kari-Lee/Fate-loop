// Generic share-card generator (V1 "classic poster" layout) used by Bazi,
// Fortune and MeiHua result pages. Returns a PNG data URL.
// Drawn on 1080x1350 (4:5), in a 360x450 base space scaled 3x.
import qrcode from "qrcode-generator";

const SERIF = "'Cormorant Garamond', 'Noto Serif SC', 'Songti SC', 'STSong', serif";
const SANS = "'DM Sans', system-ui, sans-serif";
const CSERIF = "'Noto Serif SC', 'Songti SC', 'STSong', 'PingFang SC', serif";

const DEFAULT_URL = "https://fate-loop.vercel.app";

export async function generateShareCard(opts) {
  const { lang = "en", feature = "FateLoop", big, stars, verdict, subMain, subSmall, quote, campaign = "share", url } = opts;
  const qrUrl = url || `${DEFAULT_URL}/?utm_source=sharecard&utm_medium=qr&utm_campaign=${campaign}`;
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}

  const S = 3, BW = 360, BH = 450;
  const canvas = document.createElement("canvas");
  canvas.width = BW * S; canvas.height = BH * S;
  const x = canvas.getContext("2d");
  x.scale(S, S);
  const cx = BW / 2;
  const zh = lang === "zh";

  // background
  x.fillStyle = "#160c1b"; x.fillRect(0, 0, BW, BH);
  let g = x.createRadialGradient(cx, -20, 0, cx, -20, 420);
  g.addColorStop(0, "rgba(150,95,175,.5)"); g.addColorStop(1, "rgba(150,95,175,0)");
  x.fillStyle = g; x.fillRect(0, 0, BW, BH);
  g = x.createRadialGradient(BW, BH, 0, BW, BH, 360);
  g.addColorStop(0, "rgba(220,150,140,.2)"); g.addColorStop(1, "rgba(220,150,140,0)");
  x.fillStyle = g; x.fillRect(0, 0, BW, BH);

  x.textAlign = "center";

  // orb mark
  const oy = 66;
  x.strokeStyle = "rgba(224,169,158,.75)"; x.lineWidth = 1;
  [18, 12].forEach((r, i) => { x.globalAlpha = i ? 0.6 : 1; x.beginPath(); x.arc(cx, oy, r, 0, 7); x.stroke(); });
  x.globalAlpha = 1; x.setLineDash([1.5, 3]); x.beginPath(); x.arc(cx, oy, 24, 0, 7); x.stroke(); x.setLineDash([]);
  x.fillStyle = "#E0A99E"; x.beginPath(); x.arc(cx, oy, 2.5, 0, 7); x.fill();

  // logo
  x.letterSpacing = "3px"; x.font = `600 11px ${SANS}`; x.fillStyle = "#E0A99E";
  x.fillText("✦  FATELOOP · " + feature, cx, 110);
  x.letterSpacing = "0px";

  // focal: stars or big gradient text
  if (typeof stars === "number") {
    x.font = `400 30px ${SERIF}`;
    const star = "★", gapW = x.measureText(star).width + 4, total = gapW * 5, sx = cx - total / 2 + gapW / 2;
    for (let i = 0; i < 5; i++) {
      x.fillStyle = i < stars ? "#E0A99E" : "rgba(242,233,240,.18)";
      x.fillText(star, sx + i * gapW, 205);
    }
  } else if (big) {
    const ng = x.createLinearGradient(cx - 80, 150, cx + 80, 215);
    ng.addColorStop(0, "#FBE9E2"); ng.addColorStop(0.55, "#E0A99E"); ng.addColorStop(1, "#C58A7E");
    x.fillStyle = ng;
    let bf = 62; x.font = `600 ${bf}px ${SERIF}`;
    while (x.measureText(big).width > BW - 70 && bf > 30) { bf -= 2; x.font = `600 ${bf}px ${SERIF}`; }
    x.fillText(big, cx, 210);
  }

  // verdict
  if (verdict) { x.font = `700 30px ${CSERIF}`; x.fillStyle = "#F2E9F0"; x.fillText(verdict, cx, 252); }

  // subMain (supports "A ♥ B")
  if (subMain) {
    x.font = `600 25px ${CSERIF}`;
    if (subMain.includes("♥")) {
      const [a, b] = subMain.split("♥").map((s) => s.trim());
      x.fillStyle = "#F2E9F0"; x.textAlign = "right"; x.fillText(a, cx - 24, 306);
      x.textAlign = "left"; x.fillText(b, cx + 24, 306);
      x.textAlign = "center"; x.font = `400 18px ${SANS}`; x.fillStyle = "#E0A99E"; x.fillText("♥", cx, 303);
    } else { x.fillStyle = "#F2E9F0"; x.fillText(subMain, cx, 306); }
  }

  // subSmall
  if (subSmall) { x.font = `400 12px ${CSERIF}`; x.fillStyle = "rgba(242,233,240,.5)"; x.fillText(subSmall, cx, 332); }

  // divider dots (above quote, avoids colliding with footer)
  x.fillStyle = "rgba(224,169,158,.45)";
  for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(cx - 32 + i * 8, 354, 1, 0, 7); x.fill(); }

  // quote (prefer one line by shrinking; fall back to 2 lines)
  if (quote) {
    const q = "「" + quote + "」";
    x.fillStyle = "rgba(242,233,240,.85)";
    const maxW = BW - 48;
    let qf = 17; x.font = `italic 400 ${qf}px ${CSERIF}`;
    while (x.measureText(q).width > maxW && qf > 12) { qf -= 1; x.font = `italic 400 ${qf}px ${CSERIF}`; }
    if (x.measureText(q).width <= maxW) {
      x.fillText(q, cx, 390);
    } else {
      qf = 14; x.font = `italic 400 ${qf}px ${CSERIF}`;
      let cut = Math.floor(q.length / 2);
      const seps = ["，", "。", "、", "·", " ", ",", "."];
      for (let r = 0; r < q.length; r++) {
        if (seps.includes(q[cut + r])) { cut = cut + r + 1; break; }
        if (seps.includes(q[cut - r])) { cut = cut - r + 1; break; }
      }
      let l1 = q.slice(0, cut), l2 = q.slice(cut);
      while (Math.max(x.measureText(l1).width, x.measureText(l2).width) > maxW && qf > 11) { qf -= 1; x.font = `italic 400 ${qf}px ${CSERIF}`; }
      x.fillText(l1, cx, 380); x.fillText(l2, cx, 380 + qf + 5);
    }
  }

  // footer: real QR + caption
  const fy = BH - 42, qs = 36;
  const qr = qrcode(0, "M"); qr.addData(qrUrl); qr.make();
  const mc = qr.getModuleCount(), cell = qs / mc;
  const cap1 = "FateLoop", cap2 = zh ? "扫码测你们的" : "Scan to try yours";
  x.font = `500 15px ${SERIF}`; const capW = Math.max(x.measureText(cap1).width, 96);
  const groupW = qs + 12 + capW, gx = cx - groupW / 2;
  // QR light background plate
  x.fillStyle = "#F2E9F0"; roundRect(x, gx - 3, fy - 3, qs + 6, qs + 6, 4); x.fill();
  x.fillStyle = "#180d1d";
  for (let r = 0; r < mc; r++) for (let c = 0; c < mc; c++) if (qr.isDark(r, c)) x.fillRect(gx + c * cell, fy + r * cell, cell + 0.5, cell + 0.5);
  // caption
  x.textAlign = "left";
  x.font = `500 15px ${SERIF}`; x.fillStyle = "#F2E9F0"; x.fillText(cap1, gx + qs + 12, fy + 14);
  x.font = `400 10px ${SANS}`; x.fillStyle = "rgba(242,233,240,.5)"; x.fillText(cap2, gx + qs + 12, fy + 30);

  return canvas.toDataURL("image/png");
}

function roundRect(x, px, py, w, h, r) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}
