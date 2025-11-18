import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, Building2, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
            우리는 광고를 팔지 않습니다.
            <br />
            병원의 미래를 설계합니다.
          </h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            브랜드는 병원의 내면이 외부로 말하는 언어입니다.
            <br />
            우리는 단순한 광고 대행사가 아닙니다.
            <br />
            병원의 정체성부터 환자 경험, 직원 교육, 지역 내 포지셔닝까지
            <br />
            <strong className="text-gray-900">병원의 전 생애주기를 설계하는 파트너</strong>입니다.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white border border-gray-200 border-t-4 border-t-primary-600 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CircleCheck className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">1. 결과로 증명합니다</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  밝은세상안과, 굿모닝성모안과, 김해 최안과, 연수김안과 등<br />
                  우리 손에서 탄생한 병원들이 지역 내 성장을 이뤘습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 border-t-4 border-t-primary-600 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">2. 내부를 가장 잘 압니다</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  마케팅은 유입이 아닙니다. 내원 후 경험, 고객 여정, 사후 관리까지<br />
                  병원 전체를 설계할 수 있는 전문 컨설턴트입니다.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 border-t-4 border-t-primary-600 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-xl text-gray-900">3. 의식 있는 병원을 돕습니다</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  돈보다 철학, 단기보다 지속.<br />
                  의료가 더 나은 방향으로 가는 길에,<br />
                  <strong className="text-gray-900">철학 있는 마케팅</strong>을 실행합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
