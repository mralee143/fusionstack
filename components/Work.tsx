export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-28">
      {/* Section wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(205,231,255,0.6), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <p className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-accent">
          <span aria-hidden className="h-2 w-2 bg-accent" />
          Portfolio
        </p>
      </div>
    </section>
  );
}
