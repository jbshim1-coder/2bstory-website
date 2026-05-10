import Button from "@/components/ui/Button";

export default function CTABannerSection() {
  return (
    <section className="bg-brand py-20">
      <div className="max-w-container mx-auto px-6 text-center">
        <h2 className="text-h1 font-black text-white mb-4">
          지금 바로 마케팅을 점검해 보세요
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          30분 무료 진단으로 현재 마케팅의 문제를 짚어드립니다.
          비용이나 계약 없이 솔직하게 이야기합니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href="/contact?type=diagnosis"
            variant="dark"
            size="lg"
            className="w-full sm:w-auto"
          >
            30분 무료 마케팅 진단 신청
          </Button>
          <a
            href="tel:010-8718-5000"
            className="inline-flex items-center gap-2 text-white font-semibold text-base hover:underline underline-offset-4 transition-all"
          >
            대표 직통 010-8718-5000
          </a>
        </div>
      </div>
    </section>
  );
}
