import EnhancedHero from "@/components/EnhancedHero";
import AboutSection from "@/components/AboutSection";
import DualEngineSection from "@/components/DualEngineSection";
import HospitalStagesSection from "@/components/HospitalStagesSection";
import BooksSection from "@/components/BooksSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import PricingSection from "@/components/PricingSection";
import RoadmapSection from "@/components/RoadmapSection";
import CRMSection from "@/components/CRMSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ContractProcessSection from "@/components/ContractProcessSection";
import LetterSection from "@/components/LetterSection";
import Map from "@/components/Map";
export default function HomePage() {
  return (
    <main className="min-h-screen pt-16 bg-white">
      {/* 히어로 섹션 - 항상 다크 모드 */}
      <div className="relative">
        <EnhancedHero />
      </div>

      {/* 나머지 섹션들 - 항상 라이트 모드 */}
      <div className="bg-white">
        {/* 2. 브랜드 철학 및 차별점 */}
        <AboutSection />
        <DualEngineSection />

        {/* 3. 병원 성장 단계별 솔루션 */}
        <HospitalStagesSection />

        {/* 4. 전문성 및 주요 진료 과목 */}
        <BooksSection />
        <SpecialtiesSection />

        {/* 5. 12개월 성장 로드맵 */}
        <RoadmapSection />

        {/* 6. 테크 솔루션 (CRM) */}
        <CRMSection />

        {/* 7. 가격 및 패키지 */}
        <PricingSection />

        {/* 8. 계약 프로세스 */}
        <ContractProcessSection />

        {/* 9. FAQ 및 대표 서신 */}
        <FAQSection />
        <LetterSection />

        {/* 10. 프로모션 및 푸터 */}
        <CTASection />
        <Map />
      </div>
    </main>
  );
}
