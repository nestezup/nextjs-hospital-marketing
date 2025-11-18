import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HospitalStagesSection() {
  const stages = [
    {
      emoji: "🏥",
      badge: "개원 초기 (0~2년차)",
      title: '"지역 1위, 지금 만들어야 합니다"',
      description: "개원 후 2년은 골든타임입니다. 이 시기에 제대로 된 마케팅 투입과 브랜드 구축 없이는 5년 후 경쟁에서 밀려날 수밖에 없습니다.",
      features: [
        "→ 개원 초기 브랜드 포지셔닝 전략",
        "→ 블로그 최적화 + 지역 광고 통합 실행",
        "→ 내부 프로세스 구축 (상담-수술-사후관리)",
        "→ 목표: 2년 내 지역 내 1위 입지 확보"
      ]
    },
    {
      emoji: "📉",
      badge: "성장 정체/하락기 (5~15년차)",
      title: '"잃어버린 1위, 다시 탈환할 수 있습니다"',
      description: "개원 후 5년이 지나고 경쟁 병원이 생기면서 예전만큼 환자가 오지 않습니까? 마케팅 비용은 늘어나는데 전환율은 떨어지고, 직원들의 사기도 예전 같지 않습니까?",
      features: [
        "→ 현장 진단 + 컨설팅 리포트",
        "→ 고객 경험 재설계 (내원 전-중-후)",
        "→ 블로그 자산 재구축 + CRM 자동화",
        "→ 직원 교육 프로그램 (월 1회)"
      ]
    },
    {
      emoji: "👑",
      badge: "장기 운영 병원 (15~25년+)",
      title: '"안정적이지만, 새로운 도약이 필요합니다"',
      description: "25년 이상 지역 내 입지를 충분히 확보했지만, '이대로 괜찮을까?' 하는 고민이 있으신가요? 실제 컨설팅 결과, 장기 운영 병원도 전략적 리뉴얼을 통해 새로운 성장을 이뤄냈습니다.",
      features: [
        "→ 차세대 브랜드 리뉴얼 전략",
        "→ 2세대 승계 준비 컨설팅",
        "→ 신규 진료과목 런칭 전략",
        "→ 장기 파트너십 (10년+ 실적 보유)"
      ]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          지금 이 순간, 원장님의 병원은 어느 단계입니까?
        </h2>
        <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
          병원의 성장 단계에 따라 필요한 전략이 다릅니다.<br />
          우리는 각 단계에 최적화된 솔루션을 제공합니다.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stages.map((stage, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="text-5xl mb-4">{stage.emoji}</div>
                <div className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  {stage.badge}
                </div>
                <CardTitle className="text-2xl">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{stage.description}</p>
                <h4 className="font-semibold mb-2">✅ 우리가 제공하는 것:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {stage.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
