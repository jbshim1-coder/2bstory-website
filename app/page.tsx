import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PromiseSection from "@/components/sections/PromiseSection";
import CounterSection from "@/components/sections/CounterSection";
import CTABannerSection from "@/components/sections/CTABannerSection";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import columnsData from "@/content/columns.json";

const columns = columnsData.columns;

export const metadata: Metadata = {
  title: "투비스토리㈜ | 디지털 마케팅 대행사",
  description:
    "2008년부터 100여 개 기업과 함께한 디지털 마케팅 대행사. 병원마케팅·B2B·가맹·교육 전문.",
};

const services = [
  { label: "병원마케팅", href: "/hospital", desc: "개원·성형·피부·치과 전문" },
  { label: "B2B마케팅", href: "/b2b", desc: "리드 수집·MQL 전환 12단계" },
  { label: "가맹마케팅", href: "/franchise", desc: "가맹점 200호점 운영 경험" },
  { label: "교육마케팅", href: "/education", desc: "학원·대학·에듀테크" },
  { label: "홈페이지·영상", href: "/web", desc: "전환율 중심 제작" },
  { label: "NGO마케팅", href: "/ngo", desc: "국제앰네스티·아름다운재단" },
];

export default function HomePage() {
  const recentColumns = columns.slice(0, 3);

  return (
    <>
      {/* §1 히어로 */}
      <section className="bg-dark py-28 md:py-36">
        <div className="max-w-container mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-6">
            Since 2008
          </p>
          <h1 className="text-[36px] md:text-display font-black text-white leading-tight mb-6 max-w-3xl">
            마케팅 대행사 중<br />
            책을 쓴 유일한 회사입니다.
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            단독 저서 11권. 18년간 100여 개 기업과 일했습니다.<br />
            강의한 방법론을 다음 날 캠페인에 씁니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact?type=diagnosis" size="lg">
              30분 무료 마케팅 진단
            </Button>
            <Button href="/about/ceo" variant="ghost" size="lg" className="text-white hover:text-white/80">
              대표 소개 보기 <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* §2 약속 */}
      <PromiseSection bg="white" />

      {/* §3 숫자 카운터 */}
      <CounterSection />

      {/* §4 서비스 분야 */}
      <section className="py-24 bg-soft">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            eyebrow="Services"
            title="어떤 산업이든 데이터로 접근합니다"
            description="18년간 축적한 산업별 케이스를 기반으로 캠페인을 설계합니다."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group p-8 bg-white border border-line rounded-sm hover:border-brand hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <h3 className="text-h3 font-bold text-dark mb-2 group-hover:text-brand transition-colors">
                  {s.label}
                </h3>
                <p className="text-sm text-text-muted mb-4">{s.desc}</p>
                <span className="text-xs font-medium text-brand flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  자세히 보기 <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* §5 인사이트 (칼럼) */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            eyebrow="Insights"
            title="현장에서 나온 마케팅 이야기"
            description="책에서 말한 방법론을 실무에서 어떻게 쓰는지 공유합니다."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {recentColumns.map((col) => (
              <article
                key={col.slug}
                className="p-8 border border-line rounded-sm hover:border-brand hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">
                  {col.category}
                </p>
                <h3 className="text-h3 font-bold text-dark mb-3 leading-snug">
                  {col.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {col.summary}
                </p>
                <p className="text-xs text-text-disabled">
                  {col.date} · {col.readingTime}
                </p>
              </article>
            ))}
          </div>
          <div className="text-center">
            <Button href="/about/ceo#columns" variant="secondary">
              칼럼 더 보기
            </Button>
          </div>
        </div>
      </section>

      {/* §6 CTA 배너 */}
      <CTABannerSection />
    </>
  );
}
