// AI 拒答时的兜底:幽默回避(中英)。3 选 1 随机,避免重复感
const FALLBACK_HUMOR = {
  zh: [
    "嗯……此问不在占卜之列。换个想问的——感情、事业、来年运势,皆可。",
    "哈,此事不需老朽多言。换个值得问的吧。",
    "且收回此问。换个真心想知的事,我为你看。",
  ],
  en: [
    "Hmm... this is not a matter for divination. Ask me something else — love, career, the year ahead.",
    "Ha, this needs no master to answer. Try a real question.",
    "Set that aside. Ask me something you truly wish to know.",
  ],
};

// 简单语言检测:用户消息里有 CJK 字符 = 中文,否则英文
function detectLang(messages) {
  const userTexts = (messages || [])
    .filter((m) => m && m.role === "user")
    .map((m) => m.content || "")
    .join("");
  return /[\u4e00-\u9fff]/.test(userTexts) ? "zh" : "en";
}

function pickFallback(lang) {
  const arr = FALLBACK_HUMOR[lang] || FALLBACK_HUMOR.en;
  return arr[Math.floor(Math.random() * arr.length)];
}

// 把当前日期注入 system prompt,让 AI 知道真实"今天"
function injectDate(system) {
  if (!system) return system;
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const dateNote = `\n\nCURRENT DATE CONTEXT: Today's date is ${y}-${m}-${d}. When the user asks about "this year", "next year", or any time reference, use this date as the actual present moment. Do NOT mention any earlier year as "current".`;
  return system + dateNote;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const baseUrl = process.env.API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai";
  const model = process.env.AI_MODEL || "gemini-2.5-flash";

  const body = req.body || {};
  const lang = detectLang(body.messages);

  try {
    const messages = [];
    if (body.system) messages.push({ role: "system", content: injectDate(body.system) });

    if (body.messages && Array.isArray(body.messages)) {
      messages.push(...body.messages);
    } else if (body.message) {
      messages.push({ role: "user", content: body.message });
    }

    const response = await fetch(baseUrl + "/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
      body: JSON.stringify({ model, max_tokens: 4000, messages }),
    });
    const data = await response.json();

    // 上游非 200(含 safety filter 拒答):返回兜底,不抛 500
    if (!response.ok) {
      return res.status(200).json({ text: pickFallback(lang), rejected: true });
    }

    const text = data.choices?.[0]?.message?.content || "";

    // 空内容也走兜底(safety filter 常表现为空)
    if (!text.trim()) {
      return res.status(200).json({ text: pickFallback(lang), rejected: true });
    }

    return res.status(200).json({ text });
  } catch (err) {
    // 网络/解析异常也兜底(不让前端弹"连接中断")
    return res.status(200).json({ text: pickFallback(lang), rejected: true });
  }
}
