# /new-page — 새 페이지 생성

## 사용법
```
/new-page [페이지명] [URL경로]
```

## 예시
```
/new-page "가맹마케팅" franchise
/new-page "교육마케팅" education
/new-page "NGO마케팅" ngo
```

---

## 이 커맨드가 하는 일

1. `app/[URL경로]/page.tsx` 생성
2. 해당 페이지의 기본 섹션 구조 (히어로→케이스→방법론→CTA) 적용
3. `content/cases.json`에서 해당 industry 데이터 자동 연결
4. `app/sitemap.ts`에 URL 추가

---

## 실행 프롬프트 (Claude Code가 이 내용을 그대로 실행)

다음 작업을 수행해줘:

### Step 1 — 페이지 파일 생성
`app/$ROUTE/page.tsx` 를 생성해줘.

**구조 (아래 순서로 섹션 배치):**

```typescript
import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CaseCard } from '@/components/ui/CaseCard';
import { CTABannerSection } from '@/components/sections/CTABannerSection';
import casesData from '@/content/cases.json';

export const metadata: Metadata = {
  title: '$PAGE_NAME — 투비스토리㈜',
  description: '[TODO: 페이지 설명 — 원고 v3 참고]',
};

export default function $PAGE_NAME_Page() {
  // content/cases.json에서 해당 industry 필터링
  const cases = casesData.cases.filter(c => c.industry === '$INDUSTRY');
  
  return (
    <div>
      {/* §01 히어로 */}
      <HeroSection
        eyebrow="$EYEBROW"
        title="[TODO: H1 — 원고 v3 $PAGE_NAME 섹션 참고]"
        subtitle="[TODO: 서브카피]"
        ctaText="무료 진단 신청"
        ctaHref="/contact?type=$INDUSTRY"
      />
      
      {/* §02 케이스 스터디 */}
      <section className="wf-white-sec py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-h2 font-bold mb-8">실제 케이스 스터디</h2>
          {cases.map(c => (
            <CaseCard key={c.id} {...c} />
          ))}
        </div>
      </section>
      
      {/* §03 방법론 [TODO: 원고 v3에서 해당 섹션 내용 가져오기] */}
      
      {/* §04 CTA 배너 */}
      <CTABannerSection
        title="[TODO: CTA 헤드라인]"
        ctaText="무료 진단 신청"
        ctaHref="/contact?type=$INDUSTRY"
      />
    </div>
  );
}
```

### Step 2 — sitemap.ts 업데이트
`app/sitemap.ts`의 URL 배열에 `/$ROUTE` 추가.

### Step 3 — 확인
```bash
pnpm build
```
오류 없으면 완료. 오류 있으면 수정.

---

## 원고 참고 위치
새 페이지 내용은 `docs/투비스토리_홈페이지_원고초안_v3.docx` 의 해당 챕터를 참고하세요.

| 페이지 | 원고 챕터 |
|--------|-----------|
| 가맹마케팅 | 10. 가맹마케팅 |
| 교육마케팅 | 12. 교육마케팅 |
| NGO마케팅 | 14. NGO마케팅 |
| 기타마케팅 | 15. 기타 마케팅 |
| 교육·컨설팅 | 16. 교육 / 컨설팅 |
| 정부과제 | 17. 정부과제 |
