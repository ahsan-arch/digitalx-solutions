import Image from "next/image";

type SectionIllustrationProps = {
  src: string;
  alt?: string;
  aspect?: string;
  priority?: boolean;
};

function getDefaultAlt(src: string): string {
  const slug = src.split("/").pop()?.replace(/\.[^/.]+$/, "") || "illustration";
  const map: Record<string, string> = {
    about: "DigitalX Solutions engineering team and enterprise automation architecture",
    au: "DigitalX Solutions Australian operations map for AI voice agents and CRM integrations",
    contact: "Schedule a strategy consultation for AI voice receptionists and workflow automations",
    industries: "Industry specific AI automation playbooks for US and Australian service businesses",
    insights: "Technical insights and ROI benchmarks for AI voice receptionists and automations",
    pricing: "Transparent pricing breakdown for AI voice receptionists, GoHighLevel, and n8n",
    process: "DigitalX 4-phase agile methodology for designing and deploying enterprise automations",
    "meta-ads": "Meta Ads Conversion API CAPI server-side tracking and attribution architecture",
    "web-dev": "Modern high-performance Next.js web application architecture and design",
    solutions: "Comprehensive AI voice agents, CRM integrations, and n8n workflow automations",
    usa: "DigitalX Solutions United States service area map for AI automation and CAPI tracking",
    work: "Enterprise client case studies, verified ROI metrics, and automation results",
  };
  return map[slug] || `DigitalX Solutions ${slug.replace(/-/g, " ")} architectural diagram`;
}

export function SectionIllustration({
  src,
  alt = "",
  aspect = "aspect-[4/3]",
  priority = false,
}: SectionIllustrationProps) {
  const resolvedAlt = alt && alt.trim().length > 0 ? alt : getDefaultAlt(src);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-border/70 bg-white/60 p-2 shadow-sm ${aspect}`}>
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={resolvedAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
