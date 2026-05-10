import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import PromiseSection from "@/components/sections/PromiseSection";
import CounterSection from "@/components/sections/CounterSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "2008년 창립. 디지털 마케팅 대행사 투비스토리㈜. 단독 저서 11권, 100여 개 광고주, 15명 전문 인력.",
};

const milestones = [
  { year: "2008", event: "투비스토리㈜ 창립 (강남구 역삼동)" },
  { year: "2010", event: "병원마케팅 전문 서비스 런칭" },
  { year: "2013", event: "첫 단독 저서 출판 (매일경제 강의 시작)" },
  { year: "2016", event: "B2B·가맹 마케팅 서비스 확장" },
  { year: "2019", event: "광고주 100개사 달성" },
  { year: "2021", event: "출판 브랜드 런칭 (문화체육관광부 등록 출판사)" },
  { year: "2024", event: "단독 저서 11권 달성" },
];

const trustItems = [
  "문화체육관광부 등록 출판사",
  "매일경제 교육센터 강사 8년",
  "서강대·숙명여대 마케팅 강의",
  "100여 개 기업 마케팅 운영 경험",
];

export default function AboutPage() {
  return (
    <>
      {/* 히어로 */}
      <section className="bg-dark py-24">
        <div className="max-w-container mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            About Us
          </p>
          <h1 className="text-h1 md:text-display font-black text-white leading-tight mb-6 max-w-2xl">
            2008년부터<br />한 길만 걸었습니다.
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl">
            마케팅을 강의하고, 강의한 내용을 현장에서 직접 운영합니다.<br />
            그 경험을 책으로 썼고, 책에서 말한 방법을 캠페인에 씁니다.
          </p>
        </div>
      </section>

      {/* 신뢰 배지 */}
      <section className="py-16 bg-white border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {trustItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-medium text-dark">
                <CheckCircle size={16} className="text-brand flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 약속 */}
      <PromiseSection bg="soft" />

      {/* 숫자 */}
      <CounterSection />

      {/* 연혁 */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            eyebrow="History"
            title="18년의 발자취"
            align="left"
          />
          <div className="max-w-2xl space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-brand mt-1 flex-shrink-0" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-line mt-1" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-bold text-brand mb-1">{m.year}</p>
                  <p className="text-base text-dark">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABannerSection />
    </>
  );
}
