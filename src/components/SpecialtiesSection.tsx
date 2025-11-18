import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const specialties = [
  {
    id: "ophthalmology",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop&q=80",
    name: "안과",
    badge: "1차 핵심 타겟",
    description: "라식/라섹, 백내장, 노안",
    strategy: "시즌별 맞춤 전략",
    color: "from-primary-600 to-primary-700",
  },
  {
    id: "dentistry",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80",
    name: "치과",
    badge: "핵심 타겟",
    description: "임플란트, 교정, 심미",
    strategy: "지역 밀착 전략",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    id: "internal-medicine",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop&q=80",
    name: "내과",
    badge: "핵심 타겟",
    description: "건강검진, 만성질환",
    strategy: "신뢰 기반 마케팅",
    color: "from-primary-500 to-secondary-500",
  },
  {
    id: "orthopedics",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop&q=80",
    name: "정형외과",
    badge: "핵심 타겟",
    description: "척추, 관절, 스포츠 손상",
    strategy: "비수술 치료 강조",
    color: "from-accent-500 to-accent-600",
  },
];

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            우리가 가장 잘 아는 진료과목
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            20년간 성공시킨 병원들의 전문 분야
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {specialties.map((specialty) => {
            return (
              <Card
                key={specialty.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-200"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={specialty.image}
                    alt={specialty.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${specialty.color} opacity-30 group-hover:opacity-40 transition-opacity`} />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{specialty.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {specialty.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-3">
                    {specialty.description}
                  </CardDescription>
                  <p className="text-sm font-semibold text-primary-600">
                    {specialty.strategy}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-primary-900">진료과목별 특화 전략</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed">
              모든 진료과목이 같은 방식으로 마케팅되어서는 안 됩니다.
              <br />
              환자의 고민, 검색 패턴, 의사결정 과정이 모두 다르기 때문입니다.
              <br />
              <strong className="text-primary-800 font-bold">
                우리는 진료과목별 특성을 정확히 이해하고, 각 과목에 최적화된
                전략을 실행합니다.
              </strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
