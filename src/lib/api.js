export async function callAI(sys, message) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: sys, message }),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "API error");
  return d.text || "";
}
