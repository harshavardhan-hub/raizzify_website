export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-24 px-6 md:px-12 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Refund and Cancellation Policy</h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated July 24, 2024</p>
        
        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">RETURN POLICY</h2>
            <h3 className="text-xl font-bold text-white mt-6 mb-3">REFUNDS</h3>
            <p>All sales are final and no refund will be issued.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">QUESTIONS</h2>
            <p>If you have any questions concerning our return policy, please contact us at:</p>
            <a href="mailto:customerservice@raizzify.com" className="mt-2 inline-block text-accent font-medium hover:text-white transition-colors">
              customerservice@raizzify.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
