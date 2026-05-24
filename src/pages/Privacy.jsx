export default function Privacy() {
  return (
    <div className="animate-fu">
      <div className="rounded-3xl p-7" style={{ background: "#111114", border: "1px solid #1E1E22" }}>
        <h2 className="font-serif text-[24px] font-bold mb-6" style={{ color: "#E8E4DC" }}>Privacy Policy</h2>
        <div className="text-[14px] space-y-4" style={{ color: "#999", lineHeight: 2 }}>
          <p><strong style={{ color: "#E8E4DC" }}>Last updated: June 2025</strong></p>
          <p>FateLoop respects and protects your privacy. This policy explains how we collect, use, and safeguard your information.</p>

          <h3 className="font-serif text-[16px] font-bold pt-2" style={{ color: "#E8E4DC" }}>What We Collect</h3>
          <p><strong>Content you provide</strong>: Birthday information (for compatibility and fortune features), question context (for divination readings). This data is only transmitted to AI providers during analysis — we do not store your personal information.</p>
          <p><strong>Automatically collected</strong>: We use Vercel Analytics for anonymous page view statistics (no cookies, no personal identification).</p>

          <h3 className="font-serif text-[16px] font-bold pt-2" style={{ color: "#E8E4DC" }}>How We Use Data</h3>
          <p>Text you submit for divination readings is used solely to generate the current reading. It is sent to third-party AI services (Google Gemini) and discarded after processing. Our servers do not retain your personal content.</p>

          <h3 className="font-serif text-[16px] font-bold pt-2" style={{ color: "#E8E4DC" }}>Third-Party Services</h3>
          <p><strong>AI readings</strong>: Google Gemini API for generating personalized interpretations</p>
          <p><strong>Hosting</strong>: Vercel (deployment and serverless functions)</p>
          <p><strong>Analytics</strong>: Vercel Analytics (anonymous, cookie-free)</p>

          <h3 className="font-serif text-[16px] font-bold pt-2" style={{ color: "#E8E4DC" }}>Data Security</h3>
          <p>All data transmission uses HTTPS encryption. We do not sell, trade, or transfer your information to third parties for marketing purposes.</p>

          <h3 className="font-serif text-[16px] font-bold pt-2" style={{ color: "#E8E4DC" }}>Your Rights</h3>
          <p>Since we do not store personal data, there is no data to request deletion of. For privacy questions, please contact us via GitHub Issues.</p>

          <h3 className="font-serif text-[16px] font-bold pt-2" style={{ color: "#E8E4DC" }}>Disclaimer</h3>
          <p>All readings and analysis provided by FateLoop are for entertainment purposes only and do not constitute professional advice of any kind. These tools draw on traditional Chinese cosmological systems and should be enjoyed as cultural exploration.</p>
        </div>
      </div>
    </div>
  );
}
