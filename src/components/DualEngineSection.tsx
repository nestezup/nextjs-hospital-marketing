import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

export default function DualEngineSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            전략과 실행, 두 개의 엔진
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            대부분의 마케팅 대행사는 ‘실행’만 합니다.
            <br />
            대부분의 컨설팅사는 ‘전략’만 제시합니다.
            <br />
            <strong className="text-gray-900">우리는 다릅니다.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white border border-gray-200 border-l-4 border-l-primary-600 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-700">위딘비즈랩(주)</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary-600">전략의 뇌</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">병원 경영 전략 수립</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">브랜드 포지셔닝 설계</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">조직문화/리더십 컨설팅</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">장기 성장 로드맵 설계</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 border-l-4 border-l-primary-600 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-700">(주)이엠마케팅</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary-600">실행의 손</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">블로그/SNS/광고 통합 실행</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">CRM/고객여정 자동화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">콘텐츠 제작 및 최적화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">월간 성과 리포트</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary-50 border-l-4 border-primary-600">
            <CardContent className="p-8 text-center">
              <blockquote className="text-2xl font-bold text-gray-900">
                &ldquo;전략을 세우고, 그것을 끝까지 실행하며, 성과로 완성합니다&rdquo;
              </blockquote>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <blockquote className="text-lg font-semibold text-gray-900">
              💡 <strong>&ldquo;지역 내 1위 병원 → 철학이 있는 브랜드 병원 → 상생의 병원 비즈니스 생태계 구축&rdquo;</strong> <br></br>온라인 미팅으로 전국 어디서나 협업 가능합니다.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
