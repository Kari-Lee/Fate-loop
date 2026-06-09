// Local user profile (no login). Stored in localStorage.
import { getZodiacIndex, getElement, ZODIAC, ELEMENTS } from "../data/wuxing";

const KEY = "fateloop-profile";

export function getProfile() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveProfile(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    return true;
  } catch (e) {
    return false;
  }
}

export function clearProfile() {
  try { localStorage.removeItem(KEY); } catch (e) {}
}

export function hasProfile() {
  return !!getProfile();
}

// derive zodiac + element from birth date
export function deriveChart(p) {
  if (!p || !p.year) return null;
  try {
    const zIdx = getZodiacIndex(+p.year);
    const zodiac = ZODIAC[zIdx];
    const el = getElement(+p.year, +(p.month || 1), +(p.day || 1));
    const element = ELEMENTS[el.zh];
    return { zodiac, element, elZh: el.zh };
  } catch (e) {
    return null;
  }
}

// build a concise context string to feed the AI (so The Master "knows" the user)
export function profileContext(p, lang) {
  if (!p || !p.year) return "";
  const chart = deriveChart(p);
  const zEn = chart?.zodiac?.en || "";
  const elEn = chart?.element?.en || "";
  const name = p.name || "";
  const gender = p.gender || "";
  if (lang === "zh") {
    return `\n\n[访客档案 — 请自然地运用，不要生硬复述]\n姓名：${name || "（未填）"}\n性别：${gender || "（未填）"}\n生辰：${p.year}年${p.month || "?"}月${p.day || "?"}日${p.hour ? " " + p.hour + "时" : ""}\n生肖：${chart?.zodiac?.zh || ""}\n五行：${chart?.element?.symbol || ""}（${elEn}）`;
  }
  return `\n\n[VISITOR PROFILE — use naturally, do not recite mechanically]\nName: ${name || "(not given)"}\nGender: ${gender || "(not given)"}\nBirth: ${p.year}-${p.month || "?"}-${p.day || "?"}${p.hour ? " hour " + p.hour : ""}\nZodiac: ${zEn}\nElement: ${elEn}`;
}
