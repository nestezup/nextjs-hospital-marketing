import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function RoadmapSection() {
  const roadmapPhases = [
    {
      month: "1-3개월",
      title: "진단 및 전략 수립",
      items: [
        "병원 현황 진단 및 경쟁 분석",
        "브랜드 포지셔닝 전략 수립",
        "타겟 고객 페르소나 설정",
        "연간 마케팅 로드맵 작성"
      ]
    },
    {
      month: "4-6개월",
      title: "기반 구축 및 콘텐츠 제작",
      items: [
        "블로그 최적화 및 SEO 설정",
        "핵심 키워드 콘텐츠 100개 작성",
        "CRM 시스템 구축 및 자동화",
        "직원 교육 프로그램 시작"
      ]
    },
    {
      month: "7-9개월",
      title: "본격 실행 및 광고 운영",
      items: [
        "네이버/구글 광고 캠페인 런칭",
        "SNS 채널 운영 및 콘텐츠 발행",
        "고객 후기 및 사례 수집",
        "월간 성과 리포트 및 개선"
      ]
    },
    {
      month: "10-12개월",
      title: "성과 최적화 및 확장",
      items: [
        "광고 ROI 최적화 및 스케일업",
        "브랜드 인지도 확장 전략",
        "재방문 고객 관리 시스템",
        "차년도 성장 전략 수립"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-background via-brand-turquoise/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-deep-blue via-brand-cerulean to-brand-turquoise bg-clip-text text-transparent">
              12개월 로드맵
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              체계적인 단계별 실행 계획으로 병원의 성장을 완성합니다.<br />
              각 단계마다 명확한 목표와 실행 과제가 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {roadmapPhases.map((phase, index) => {
              const gradientColors = [
                "from-brand-deep-blue to-brand-cerulean",
                "from-brand-cerulean to-brand-turquoise",
                "from-brand-turquoise to-brand-amber",
                "from-brand-amber to-brand-deep-blue"
              ];
              return (
                <Card key={index} className="border-2 border-transparent hover:border-brand-cerulean hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`bg-gradient-to-br ${gradientColors[index]} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm text-brand-cerulean font-bold">{phase.month}</div>
                        <CardTitle className="text-xl text-brand-deep-blue">{phase.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-brand-turquoise mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-12 bg-gradient-to-br from-brand-deep-blue/10 via-brand-cerulean/10 to-brand-turquoise/10 border-2 border-brand-cerulean/30 shadow-xl">
            <CardContent className="p-8 text-center">
              <p className="text-xl md:text-2xl font-bold text-brand-deep-blue mb-3">
                💡 12개월 후, 당신의 병원은 지역 내 확고한 입지를 확보하게 됩니다
              </p>
              <p className="text-lg text-muted-foreground">
                단순한 광고 대행이 아닌, 병원의 전체 성장 과정을 함께 설계하고 실행합니다
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
