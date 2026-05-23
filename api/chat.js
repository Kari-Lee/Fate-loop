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

  try {
    const body = req.body;
    const messages = [];
    if (body.system) messages.push({ role: "system", content: body.system });
    messages.push({ role: "user", content: body.message });

    const response = await fetch(baseUrl + "/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
      body: JSON.stringify({ model, max_tokens: 4000, messages }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));
    return res.status(200).json({ text: data.choices?.[0]?.message?.content || "" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal error" });
  }
}
