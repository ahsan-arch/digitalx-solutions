import { FloatingDock } from "@/components/navigation/floating-dock";
import { Footer } from "@/components/layout";
import { HeroSection } from "@/components/sections/hero-section";
import dynamic from "next/dynamic";

/* ── Lazy-load below-fold sections to cut initial JS payload ── */
const ServicesSection = dynamic(
  () =>
    import("@/components/sections/services-section").then(
      (mod) => mod.ServicesSection
    ),
  { ssr: true }
);

const MetaAdsSection = dynamic(
  () =>
    import("@/components/sections/meta-ads-section").then(
      (mod) => mod.MetaAdsSection
    ),
  { ssr: true }
);

const WorkSection = dynamic(
  () =>
    import("@/components/sections/work-section").then(
      (mod) => mod.WorkSection
    ),
  { ssr: true }
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact-section").then(
      (mod) => mod.ContactSection
    ),
  { ssr: true }
);

const PricingSection = dynamic(
  () =>
    import("@/components/sections/pricing-section").then(
      (mod) => mod.PricingSection
    ),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      <FloatingDock />
      <main id="main">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <MetaAdsSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
