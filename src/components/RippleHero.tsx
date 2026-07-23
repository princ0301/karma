import Image from "next/image";

export default function RippleHero() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <figure className="relative h-[320px] overflow-hidden rounded-3xl border border-white/10 md:h-[440px]">
        <Image
          src="/images/K_2.jpeg"
          alt="Karma volunteers learning alongside children outdoors"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-2 w-2 rounded-full bg-marigold" />
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="ripple-ring absolute rounded-full border border-marigold/50"
              style={{
                width: 24,
                height: 24,
                animationDelay: `${index * 1}s`,
              }}
            />
          ))}
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-marigold">
            Learning together
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-paper md:text-base">
            Small circles of attention can become a lifetime of possibility.
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
