import Image from "next/image";

export function HeroIllustration() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/70 bg-white/60 p-2 shadow-sm">
      <div className="relative h-full w-full">
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
