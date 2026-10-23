import Image from "next/image";

export function HeroIllustration() {
  return (
    <div className="relative aspect-[4/3] w-full">
      {/* Ambient gradient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-6 h-28 w-28 rounded-full bg-accent-secondary/20 blur-2xl transition-transform duration-700 ease-out will-change-transform motion-safe:animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 rounded-full bg-accent/30 blur-2xl transition-transform duration-700 ease-out will-change-transform motion-safe:animate-pulse"
      />
      <div className="relative h-full w-full transition-transform duration-500 ease-out hover:scale-[1.02]">
        <Image
          src="/hero-illustration.svg"
          alt="DigitalX Solutions AI voice agents and business automation architecture diagram"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
