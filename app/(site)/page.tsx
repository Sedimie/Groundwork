import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest mb-6">Documentation</p>
          <h1 className="font-serif text-5xl sm:text-6xl tracking-tight mb-10 leading-tight">
            The standard implementation<br />of web features
          </h1>
          <p className="text-xl text-[var(--color-muted)] max-w-2xl mb-12 leading-relaxed">
            Groundwork compiles RFCs, security models, and correct implementations into one place per feature.
            The same code Sedim uses — annotated, explained, and owned by you.
          </p>
          <div className="flex gap-4">
            <Link href="/guides" className="btn btn-primary">
              <span>Browse Guides</span>
              <span>→</span>
            </Link>
            <Link href="/reference" className="btn btn-secondary">
              <span>API Reference</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Table */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-serif text-2xl mb-10">Feature Guides</h2>
        <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">Feature</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">Concepts</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider">Implementation</th>
                <th className="text-left py-4 px-6 text-xs font-medium text-[var(--color-muted)] uppercase tracking-wider w-28">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Authentication", concepts: "Sessions, hashing, OAuth PKCE, TOTP, magic links", impl: "Argon2id, SHA-256 sessions, RFC 7636, RFC 6238" },
                { name: "Realtime & Chat", concepts: "WebSocket lifecycle, pub/sub, presence", impl: "Single node → Redis pub/sub" },
                { name: "Notifications", concepts: "Delivery guarantees, read state, fan-out", impl: "SSE + WebSocket hybrid" },
                { name: "Payments", concepts: "Webhook reliability, idempotency, reconciliation", impl: "Stripe + Razorpay" },
                { name: "File Uploads", concepts: "Multipart, resumable, presigned URLs", impl: "S3-compatible pipeline" },
                { name: "AI / RAG", concepts: "Chunking, embedding, retrieval quality", impl: "pgvector, streaming responses" },
                { name: "WebRTC", concepts: "Signaling, ICE, STUN/TURN, SFU vs P2P", impl: "mediasoup, peer-to-peer" },
              ].map((row, i) => (
                <tr key={row.name} className={i !== 0 ? "border-t border-[var(--color-border)]" : ""}>
                  <td className="py-5 px-6 font-medium text-base">{row.name}</td>
                  <td className="py-5 px-6 text-[15px] text-[var(--color-muted)]">{row.concepts}</td>
                  <td className="py-5 px-6 text-[15px] text-[var(--color-muted)]">{row.impl}</td>
                  <td className="py-5 px-6">
                    <span className="text-xs text-[var(--color-muted)] bg-[var(--color-surface)] px-2.5 py-1.5 rounded">Coming</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="font-serif text-2xl mb-10">Explore</h2>
        <div className="grid gap-5 md:grid-cols-4">
          <Link href="/guides" className="card p-7">
            <h3 className="font-serif text-xl mb-3">Guides</h3>
            <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">
              Long-form implementation guides covering architecture decisions and deep technical dives.
            </p>
          </Link>
          <Link href="/reference" className="card p-7">
            <h3 className="font-serif text-xl mb-3">Reference</h3>
            <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">
              Complete API documentation for CLI commands, modules, and configuration options.
            </p>
          </Link>
          <Link href="/blog" className="card p-7">
            <h3 className="font-serif text-xl mb-3">Blog</h3>
            <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">
              Thoughts on tooling, build-in-public updates, and lessons learned.
            </p>
          </Link>
          <Link href="/tutorials" className="card p-7">
            <h3 className="font-serif text-xl mb-3">Tutorials</h3>
            <p className="text-[15px] text-[var(--color-muted)] leading-relaxed">
              Step-by-step tutorials to get you started with practical implementations.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}