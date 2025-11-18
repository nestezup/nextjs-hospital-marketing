'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function EnhancedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas 크기 설정
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 3D 파티클 애니메이션
    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;
        this.size = Math.random() * 2 + 1;
        // 새로운 컬러 팔레트를 사용한 파티클 컬러
        const colors = [
          `rgba(10, 36, 99, 0.8)`,   // 딥 블루 (Primary)
          `rgba(62, 146, 204, 0.8)`, // 세리우리안 블루 (Secondary)
          `rgba(241, 143, 1, 0.8)`,  // 앰버 (Accent)
          `rgba(78, 205, 196, 0.6)`, // 터코이즈
          `rgba(107, 76, 122, 0.6)`, // 라벤더
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;

        if (this.z < 1) {
          this.z = 1000;
          this.x = Math.random() * width - width / 2;
          this.y = Math.random() * height - height / 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + width / 2;
        const y2d = this.y * scale + height / 2;
        const size2d = this.size * scale;

        if (x2d < 0 || x2d > width || y2d < 0 || y2d > height) return;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx, canvas.width, canvas.height);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Canvas Background - 3D 파티클 효과 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Clean overlay - 파티클과 조화를 위한 오버레이 */}
      <div className="absolute inset-0 bg-slate-900/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.08 } },
          }}
        >
          {/* Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-[#F18F01]" />
            <span className="text-sm font-medium text-white">
              20년 경력의 병원 마케팅 전문가
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              {/* <span className="text-6xl md:text-7xl text-[#3E92CC] font-serif">&ldquo;</span> */}
              철학을 설계하고,
              <br />
              <span className="block mt-4 text-[#4ECDC4] font-bold">
                성과로 완성합니다
              </span>
              {/* <span className="text-6xl md:text-7xl text-[#3E92CC] font-serif">&rdquo;</span> */}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            “개원 초기부터 장기 운영까지,
            <br />
            병원의 모든 성장 단계를 함께합니다”
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {[{
              icon: <TrendingUp className="h-8 w-8 text-[#4ECDC4]" />, value: "20+", label: "년 경력"
            }, {
              icon: <Users className="h-8 w-8 text-[#3E92CC]" />, value: "100+", label: "성공 사례"
            }, {
              icon: <Target className="h-8 w-8 text-[#F18F01]" />, value: "병원, 의원 맞춤형", label: "AI 솔루션, 챗봇, 맞춤형 SaaS, CRM연동"
            }].map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2 text-center">{stat.value}</div>
                <div className="text-sm text-gray-300 text-center">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/consultation">
              <Button size="lg" className="text-lg text-white font-bold px-10 py-7 bg-gradient-to-r from-brand-deep-blue to-brand-cerulean hover:from-brand-cerulean hover:to-brand-turquoise shadow-2xl hover:shadow-brand-cerulean/50 hover:scale-105 transition-all duration-300">
                무료 상담 신청하기
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="text-lg font-bold px-10 py-7 border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-xl backdrop-blur-sm">
                성공 사례 보기
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <blockquote className="border-l-4 border-[#4ECDC4] pl-6 text-gray-300 text-sm">
              <p className="mb-2">
                “밝은세상안과, 굿모닝성모안과, 김해 최안과, 연수김안과 등”
              </p>
              <p className="text-[#F18F01]">
                — 우리 손에서 탄생한 병원들이 지역 내 성장을 이뤘습니다
              </p>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll" />
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(12px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
