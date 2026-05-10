import type { Metadata } from "next";
import Image from "next/image";
import CTABannerSection from "@/components/sections/CTABannerSection";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import booksData from "@/content/books.json";
import columnsData from "@/content/columns.json";

const books = booksData.books;
const columns = columnsData.columns;

export const metadata: Metadata = {
  title: "대표소개 — 심진보",
  description:
    "HP KOREA IT컨설턴트 12년, 단독 저서 11권, 매일경제 강사 8년. 투비스토리㈜ 대표 심진보.",
};

export default function CeoPage() {
  const featuredBooks = books.filter((b) => b.featured).slice(0, 6);

  return (
    <>
      {/* 히어로 */}
      <section className="bg-dark py-24">
        <div className="max-w-container mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            CEO Profile
          </p>
          <h1 className="text-h1 font-black text-white leading-tight mb-4">
            심진보 대표
          </h1>
          <p className="text-white/70 text-lg max-w-lg">
            HP KOREA IT컨설턴트 12년 출신.<br />
            책을 11권 쓴 마케터가 직접 운영합니다.
          </p>
        </div>
      </section>

      {/* 프로필 */}
      <section className="py-24 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* 사진 */}
            <div className="relative aspect-[3/4] max-w-sm">
              <Image
                src="/assets/photos/심진보_프로필사진.jpg"
                alt="심진보 대표"
                fill
                className="object-cover rounded-sm"
                priority
              />
            </div>
            {/* 소개 */}
            <div className="space-y-8">
              <div>
                <h2 className="text-h2 font-bold text-dark mb-4">
                  강단에서 말한 방법을<br />다음 날 캠페인에 씁니다.
                </h2>
                <p className="text-base text-text-muted leading-relaxed">
                  HP KOREA에서 12년간 대기업 IT 컨설팅을 했습니다.
                  데이터 기반 의사결정이 몸에 배었고, 그 습관을 마케팅에 그대로 가져왔습니다.
                </p>
                <p className="text-base text-text-muted leading-relaxed mt-4">
                  2008년 투비스토리를 창립한 후 매일경제, 서강대, 숙명여대에서
                  마케팅을 강의하면서 동시에 100여 개 기업의 캠페인을 직접 운영했습니다.
                  강의와 운영이 같은 사람이라는 것, 그게 투비스토리의 가장 큰 차별점입니다.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "HP KOREA IT컨설턴트 (12년)",
                  "투비스토리㈜ 대표 (2008년~현재)",
                  "매일경제 교육센터 강사 (8년)",
                  "서강대·숙명여대 마케팅 강의",
                  "단독 저서 11권",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Button href="/contact?type=diagnosis" size="lg">
                30분 무료 마케팅 진단 신청
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 저서 */}
      <section className="py-24 bg-soft" id="books">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            eyebrow="Books"
            title="책이 가장 솔직한 이력서입니다"
            description="11권의 책에 18년간 현장에서 검증한 방법론이 담겨 있습니다."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredBooks.map((book) => (
              <div key={book.id} className="group">
                <div className="relative aspect-[2/3] mb-3 overflow-hidden rounded-sm shadow-md group-hover:shadow-xl transition-shadow">
                  {book.coverSrc ? (
                    <Image
                      src={book.coverSrc}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-soft flex items-center justify-center p-4">
                      <p className="text-xs text-text-muted text-center leading-snug">{book.title}</p>
                    </div>
                  )}
                  {book.isSelfPublished && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-brand text-white px-2 py-0.5 rounded-sm">
                      투비스토리 출판
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-dark leading-tight line-clamp-2">
                  {book.title}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{book.year ?? ""}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/books" variant="secondary">
              전체 저서 보기
            </Button>
          </div>
        </div>
      </section>

      {/* 칼럼 */}
      <section className="py-24 bg-white" id="columns">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            eyebrow="Columns"
            title="현장에서 나온 마케팅 이야기"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.slice(0, 3).map((col) => (
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
        </div>
      </section>

      {/* ⚠️ OPEN Nice-to-have: 대표 YouTube 영상 확정 후 추가 */}

      <CTABannerSection />
    </>
  );
}
