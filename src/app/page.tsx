import EnhancedHero from "@/components/EnhancedHero";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import SpecialtyStrategySection from "@/components/SpecialtyStrategySection";
import PricingSection from "@/components/PricingSection";
import RoadmapSection from "@/components/RoadmapSection";
import CRMSection from "@/components/CRMSection";
import ContractProcessSection from "@/components/ContractProcessSection";
import FAQSection from "@/components/FAQSection";
import LetterSection from "@/components/LetterSection";
import Map from "@/components/Map";

export default function HomePage() {
  return (
    <main className="min-h-screen pt-16">
      <EnhancedHero />
      <SpecialtiesSection />
      <SpecialtyStrategySection />
      <PricingSection />
      <RoadmapSection />
      <CRMSection />
      <ContractProcessSection />
      <FAQSection />
      <LetterSection />
      <Map />
    </main>
  );
}
