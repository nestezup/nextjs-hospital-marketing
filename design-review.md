# 디자인 리뷰 및 재배치 제안

## 발견된 문제
- **팔레트 불일치 + 미정의 색상 토큰**: 히어로에서 `#F18F01`, `#3E92CC`, `#4ECDC4` 등 별도 팔레트와 `from-brand-deep-blue` 계열 그라데이션을 사용하지만(`src/components/EnhancedHero.tsx:125-182`), Tailwind 설정에 `brand-*` 색상이 정의되어 있지 않아(`tailwind.config.ts:12-74`) 일관된 톤이 깨지고 실제 그라데이션 색도 비어 있습니다.
- **CTA 스크롤 타깃 부재**: 여러 섹션이 `document.getElementById("contact")`로 스크롤을 시도하지만 홈에는 해당 id가 없어 무의미한 클릭이 됨(`src/components/PricingSection.tsx:143`, `FAQSection.tsx:96`, `CTASection.tsx:61`, `ContractProcessSection.tsx:146`, `LetterSection.tsx:89`).
- **배경/톤이 과도하게 뒤섞임**: 히어로(다크) 이후에도 `bg-gray-50`(About, `AboutSection.tsx:6`), `bg-white`(DualEngine, `DualEngineSection.tsx:6`), `bg-muted/30`(HospitalStages, `HospitalStagesSection.tsx:36`), 또 다른 화이트/그라데이션(CTA, `CTASection.tsx:6`; Letter, `LetterSection.tsx:6`)이 짧은 간격으로 반복돼 페이지가 조각난 느낌입니다.
- **정보 흐름 혼선**: 홈 구조가 `About → DualEngine → HospitalStages → Books → Specialties → Pricing → Roadmap → CRM → FAQ → CTA → Contract Process → Letter → Map` 순서로 나열되어(`src/app/page.tsx:25-37`), 문제 인식/신뢰/해결/증거/전환의 스토리가 뒤섞여 있습니다. (예: 가격이 신뢰/프로세스보다 먼저 등장, CTA가 프로세스보다 앞.)
- **브랜드 타이포 혼선**: 네 가지 폰트를 모두 로드하고(`src/app/globals.css:3-194`), 헤더에서 실시간 폰트 전환 UI를 노출(`src/components/Navbar.tsx:55-74,112-133`)해 브랜드 톤이 고정되지 않고 초기 로드 성능도 악화됩니다.

## 개선 제안 (섹션 내용은 유지)
- **색상 체계 단일화**: 히어로만 다크(현재 스타일 유지)로 두고, 그 외 섹션은 Tailwind에 정의된 primary/secondary/accent 톤만 사용하도록 CSS 클래스 재정렬. `brand-*` 색상이 필요하다면 tailwind.config에 정식 정의 후 동일 팔레트로 통일.
- **CTA 목표 명확화**: 홈에 `id="contact"` 섹션을 추가하거나 모든 CTA를 `/consultation` 링크로 통합해 클릭 시 즉시 폼으로 이동하도록 정리.
- **배경 리듬 정리**: 히어로(다크) 이후로 `화이트 → 라이트 그레이` 두 톤만 교차 사용하고, 불필요한 그라데이션 블록(CTA/Letter)의 배경을 단색 혹은 얕은 틴트로 교체해 호흡을 맞추기.
- **카드 스타일 일원화**: 테두리/음영이 섹션마다 달라 심심함+과잉이 혼재. 기본 카드(얇은 border, 가벼운 shadow-sm) 한 가지를 정하고, 강조 카드에만 두꺼운 border/살짝 떠오르는 shadow 적용.
- **타이포 고정**: 메인 폰트 1종(예: Pretendard)만 노출하고 폰트 스위처는 내부 검토용 옵션으로 숨김 처리 또는 제거. 헤딩/본문의 사이즈 스케일까지 글로벌 토큰에 맞추어 들쭉날쭉한 가독성 개선.
- **동작 확인 가능한 CTA**: 주요 버튼 텍스트/행동을 2개 이내(“상담 신청”, “사례 보기”)로 재사용해 사용자 결정 피로도 감소.

## 추천 섹션 재배치 (내용 그대로, 위치만 조정)
1. 히어로 (다크)
2. About – 철학/신뢰 선언
3. HospitalStages – 문제 인식 & 단계별 공감
4. DualEngine – 해결 접근법(전략+실행)
5. Specialties – 우리가 잘하는 분야 명시
6. CRMSection – 솔루션 기능(제품/서비스 레이어)
7. RoadmapSection – 12개월 실행 계획
8. PricingSection – 패키지/예산 안내
9. ContractProcessSection – 계약/진행 방식
10. BooksSection + LetterSection – 전문성 근거 & 휴먼 터치
11. FAQSection – 이탈 방지 Q&A
12. CTASection – 최종 전환 유도
13. Map (연락/위치 정보 가이드)

이 순서는 "공감 → 해결 제안 → 역량 증명 → 실행/비용 → 신뢰 보강 → 전환" 흐름을 유지합니다. 필요 시 HospitalStages/DualEngine을 하나의 라이트 블록에 묶고, Pricing/Contract를 같은 배경에 배치하면 톤 전환이 덜 거칠어집니다.
