export default function RippleHero() {
  return (
    <div className="relative flex h-[320px] w-full items-center justify-center overflow-hidden md:h-[420px]">
      {/* Concentric ripples expanding from a single point of action */}
      <div className="absolute h-2 w-2 rounded-full bg-marigold" />
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="ripple-ring absolute rounded-full border border-marigold/40"
          style={{
            width: 24,
            height: 24,
            animationDelay: `${i * 1}s`,
          }}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, var(--color-ink) 72%)",
        }}
      />
    </div>
  );
}
