import Image from "next/image";

export function HeroIllustration() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/70 bg-white/60 p-2 shadow-sm">
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src="/hero-illustration.svg"
          alt="DigitalX Solutions AI voice agents and business automation architecture diagram"
          width={800}
          height={600}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-contain"
          style={{ width: "100%", height: "auto", maxHeight: "480px" }}
        />
      </div>
    </div>
  );
}
