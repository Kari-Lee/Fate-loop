export default function Privacy() {
  return (
    <div className="animate-fu" style={{ padding: "40px 0" }}>
      <div style={{ background: "#FFF", borderRadius: 16, padding: "40px 32px", border: "1px solid #EFEFEF" }}>
        <h2 className="font-serif" style={{ fontSize: 28, fontWeight: 400, color: "#1A1A1A", marginBottom: 32 }}>Privacy Policy</h2>
        <div style={{ fontSize: 14, color: "#666", lineHeight: 2 }}>
          <p style={{ marginBottom: 16 }}><strong style={{ color: "#1A1A1A" }}>Last updated: June 2025</strong></p>
          <p style={{ marginBottom: 16 }}>FateLoop respects and protects your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginTop: 24, marginBottom: 8 }}>What We Collect</h3>
          <p style={{ marginBottom: 16 }}>Birthday information for compatibility features, question context for divination readings. We do not store your personal information. Anonymous analytics via Vercel (no cookies).</p>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginTop: 24, marginBottom: 8 }}>How We Use Data</h3>
          <p style={{ marginBottom: 16 }}>Text submitted for readings is sent to Google Gemini API for generating interpretations and discarded after processing.</p>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginTop: 24, marginBottom: 8 }}>Disclaimer</h3>
          <p>All readings are for entertainment purposes only. These tools draw on traditional Chinese cosmological systems and should be enjoyed as cultural exploration.</p>
        </div>
      </div>
    </div>
  );
}
