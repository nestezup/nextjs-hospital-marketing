import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Smile, Stethoscope, Bone } from "lucide-react";

const specialties = [
  {
    id: "ophthalmology",
    icon: Eye,
    name: "안과",
    badge: "1차 핵심 타겟",
    description: "라식/라섹, 백내장, 노안",
    strategy: "시즌별 맞춤 전략",
    color: "from-brand-deep-blue to-brand-cerulean",
  },
  {
    id: "dentistry",
    icon: Smile,
    name: "치과",
    badge: "핵심 타겟",
    description: "임플란트, 교정, 심미",
    strategy: "지역 밀착 전략",
    color: "from-brand-cerulean to-brand-turquoise",
  },
  {
    id: "internal-medicine",
    icon: Stethoscope,
    name: "내과",
    badge: "핵심 타겟",
    description: "건강검진, 만성질환",
    strategy: "신뢰 기반 마케팅",
    color: "from-brand-turquoise to-brand-amber",
  },
  {
    id: "orthopedics",
    icon: Bone,
    name: "정형외과",
    badge: "핵심 타겟",
    description: "척추, 관절, 스포츠 손상",
    strategy: "비수술 치료 강조",
    color: "from-brand-amber to-brand-deep-blue",
  },
];

export default function SpecialtiesSection() {
  return (
    <section id="specialties" className="py-20 bg-gradient-to-b from-background to-muted/30">
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
            const Icon = specialty.icon;
            return (
              <Card
                key={specialty.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-brand-cerulean"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${specialty.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{specialty.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {specialty.badge}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-3">
                    {specialty.description}
                  </CardDescription>
                  <p className="text-sm font-semibold text-primary">
                    {specialty.strategy}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-br from-brand-deep-blue/10 via-brand-cerulean/10 to-brand-turquoise/10 border-brand-cerulean/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-brand-deep-blue">진료과목별 특화 전략</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              모든 진료과목이 같은 방식으로 마케팅되어서는 안 됩니다.
              <br />
              환자의 고민, 검색 패턴, 의사결정 과정이 모두 다르기 때문입니다.
              <br />
              <strong className="text-brand-deep-blue font-bold">
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
