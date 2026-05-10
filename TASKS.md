# 투비스토리 홈페이지 — 바이브 코딩 태스크 목록

<!--
  ══════════════════════════════════════════════════════════════
  이 파일의 역할
  ══════════════════════════════════════════════════════════════

  [Claude Code 사용자에게]
  태스크 코드 블록을 복사해서 Claude Code 프롬프트에 붙여넣으세요.
  하나 완료 → 확인 → 다음 태스크. 절대 한꺼번에 여러 개 실행하지 마세요.

  [일반 개발자에게]
  각 태스크가 "무엇을", "왜", "어떻게" 만들어야 하는지 설명합니다.
  태스크를 직접 읽고 구현하면 됩니다. Claude Code 없이도 됩니다.

  [완료 표시]
  완료한 태스크는 - [ ] → - [x] 로 바꾸세요.

  [의존성]
  TASK-001 (셋업) → TASK-002, 003 (기반) → TASK-004 (레이아웃)
  → TASK-005, 006, 007 (Phase 1 페이지) → TASK-008 (배포)
  Phase 2~4는 배포 후 순차 진행.
  ══════════════════════════════════════════════════════════════
-->

---

## ✅ Phase 1 — 핵심 오픈 (목표 10시간)

> 이 8개 태스크가 완료되면 사이트를 오픈할 수 있습니다.
> Phase 2~4는 오픈 후 순차적으로 추가합니다.

---

### TASK-001. 프로젝트 초기 셋업

**목적:**
코딩의 출발점. 이 태스크가 끝나야 이후 태스크를 진행할 수 있습니다.
Next.js 15 + Tailwind CSS v4 + 브랜드 설정까지 한 번에 완료합니다.

**완료 기준:**
- `pnpm dev` 실행 시 localhost:3000에서 기본 페이지가 열림
- 브라우저 콘솔에 오류 없음
- Pretendard 폰트가 적용되어 보임

```
Next.js 15 프로젝트를 셋업해줘.

# 1. 프로젝트 생성
pnpm create next-app@latest 2bstory-website \
  --typescript --tailwind --eslint \
  --app --import-alias "@/*"
cd 2bstory-website

# 2. 추가 패키지 설치
pnpm add lucide-react @formspree/react
pnpm add -D @types/node

# 3. tailwind.config.ts 를 아래 내용으로 덮어써줘
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#D94A0F",  // ⚠️ 로고.ai 확인 후 확정 필요
          hover:   "#B83D0C",
          light:   "#FFF0EB",
        },
        dark:   "#1F1F1F",
        soft:   "#F8F8F8",
        line:   "#E5E5E5",
        "text-primary":   "#333333",
        "text-muted":     "#666666",
        "text-disabled":  "#AAAAAA",
      },
      fontFamily: {
        sans: ["Pretendard", "Noto Sans KR", "sans-serif"],
      },
      fontSize: {
        display: ["56px", { lineHeight: "1.15", fontWeight: "700" }],
        h1:      ["40px", { lineHeight: "1.20", fontWeight: "700" }],
        h2:      ["28px", { lineHeight: "1.30", fontWeight: "700" }],
        h3:      ["22px", { lineHeight: "1.40", fontWeight: "600" }],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;

# 4. app/globals.css 에 Pretendard 폰트 CDN + CSS 변수 추가
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand:          #D94A0F;
  --brand-hover:    #B83D0C;
  --brand-light:    #FFF0EB;
  --dark:           #1F1F1F;
  --text-primary:   #333333;
  --text-muted:     #666666;
  --text-disabled:  #AAAAAA;
  --bg-base:        #FFFFFF;
  --bg-soft:        #F8F8F8;
  --bg-line:        #E5E5E5;
}

# 5. .env.local 파일 생성 (값은 빈칸으로)
NEXT_PUBLIC_FORMSPREE_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# 6. lib/utils.ts 생성 (cn 함수)
pnpm add clsx tailwind-merge

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind 클래스 병합 유틸. 조건부 클래스 적용 시 사용.
// 예: cn("px-4", isActive && "bg-brand", className)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

# 7. pnpm dev 실행해서 오류 없는지 확인
```
- [ ] 완료

---

### TASK-002. 공통 UI 컴포넌트 생성

**목적:**
이후 모든 페이지에서 재사용할 원자 단위 컴포넌트를 먼저 만듭니다.
이 컴포넌트들이 없으면 페이지 작업이 불가능합니다.

**중요한 설계 결정:**
- Button: `href` prop 있으면 Next.js Link (SEO), 없으면 button 태그
- CounterCard: Intersection Observer 사용 → `use client` 필요
- FAQAccordion: useState 사용 → `use client` 필요
- 나머지: Server Component (use client 없음)

**완료 기준:**
- `components/ui/` 아래에 7개 파일 생성됨
- TypeScript 오류 없음
- 각 컴포넌트의 props 타입이 명확하게 정의됨

```
components/ui/ 아래에 공통 컴포넌트 7개를 만들어줘.
각 파일에 한국어 JSDoc 주석을 충실하게 달아줘.

1. Button.tsx
   - variants: 'primary' | 'secondary' | 'ghost' | 'dark'
   - sizes: 'sm' | 'md' | 'lg'
   - href prop 있으면 Next.js Link, 없으면 <button>
   - loading 상태 시 Loader2 아이콘 스피너
   - disabled 상태 처리
   - className prop으로 외부에서 추가 클래스 가능
   - primary: bg-brand text-white hover:bg-brand-hover transition-colors
   - secondary: border-2 border-brand text-brand hover:bg-brand-light
   - ghost: text-text-primary underline-offset-4 hover:underline
   - dark: bg-dark text-white hover:bg-[#2D2D2D]
   - 주석: 섹션당 primary 버튼은 1개만 사용할 것 (마케팅 원칙)

2. SectionTitle.tsx
   - props: eyebrow?(string), title(string), description?(string), align?('left'|'center')
   - eyebrow: text-sm font-bold uppercase tracking-[0.15em] text-brand
   - title: text-h2 font-bold text-dark
   - description: text-text-muted text-lg
   - 주석: eyebrow는 "WHY 2BSTORY", "HOSPITAL MARKETING" 같은 영문 서브타이틀

3. CounterCard.tsx
   - 'use client' 필요 (Intersection Observer 사용)
   - props: value(number), suffix(string), label(string)
   - Intersection Observer로 뷰포트 진입 시 카운터 시작
   - 0 → value까지 2000ms ease-out 애니메이션
   - value 큰 숫자(text-5xl font-bold text-dark) + suffix(text-3xl text-brand)
   - label(text-sm text-text-muted mt-2)
   - 주석: 히어로 아래 "18년 | 100+ | 11권 | 15명" 섹션에서 사용

4. PromiseCard.tsx
   - props: icon(LucideIcon), title(string), description(string)
   - 아이콘: 48px 원형 배경 bg-brand-light, 아이콘 색 text-brand
   - hover: border border-brand transition-colors 0.2s
   - translateY(-4px) + shadow-md on hover
   - 주석: CLAUDE.md의 4가지 약속 데이터와 함께 사용

5. CaseCard.tsx
   - props: industry(string), anonymousTitle(string), challenge(string), action(string), result(string)
   - 좌측 세로 바: border-l-4 border-brand
   - 섹션 라벨(도전과제/우리가 한 일/결과): text-xs font-bold uppercase tracking-wider text-brand
   - 배경: bg-soft rounded-2xl p-8
   - 주석: content/cases.json의 데이터를 받아서 렌더링

6. BookCard.tsx
   - props: title(string), subtitle?(string), publisher(string), year?(number), coverSrc(string), purchaseUrl?(string), isSelfPublished(boolean)
   - 표지 이미지: next/image, aspect-ratio 2:3 (세로형 책 표지)
   - isSelfPublished=true 시 상단에 "투비스토리 출판" 배지 (bg-brand text-white text-xs)
   - purchaseUrl 있으면 [구매하기] 버튼
   - hover: translateY(-4px) + shadow-lg
   - 주석: isSelfPublished 책이 4권 (최근 자체 출판 강조)

7. FAQAccordion.tsx
   - 'use client' 필요 (useState 사용)
   - props: items(Array<{q:string, a:string}>), defaultOpen?(number[])
   - 아코디언 열림/닫힘: useState로 관리
   - Q 앞: 오렌지 원형 번호 (01, 02, ...)
   - 우측: ChevronDown ↔ ChevronUp (오렌지)
   - 내용: max-height transition 250ms ease-out
   - 주석: Contact us 페이지에서 FAQ 10개에 사용
```
- [ ] 완료

---

### TASK-003. content JSON 데이터 파일 생성

**목적:**
페이지들이 보여줄 데이터를 준비합니다.
JSON 파일을 수정하면 코드 변경 없이 데이터를 추가/수정할 수 있습니다.

**중요:**
- `cases.json`의 `result` 수치는 현재 "[수치 보강 필요]" 상태
- 실제 수치를 대표님께 확인하면 이 JSON 파일만 수정하면 됨
- `clients.json`은 현재 20개 샘플만. 나중에 100+개 추가 예정

```
content/ 폴더에 정적 데이터 JSON 파일 4개를 만들어줘.
각 파일 상단에 JSON 스키마를 JSDoc 주석으로 설명해줘.

1. content/books.json
스키마 (TypeScript interface):
  id: string          // "b01" ~ "b11"
  title: string
  subtitle?: string
  author: string      // 대부분 "심진보", 링크드인책은 "심진보 외"
  publisher: string
  year?: number       // 일부 미확인
  isbn?: string       // 2002, 2006년본은 ISBN 없음
  coverSrc: string    // "/assets/06_books/[isbn].jpg" 또는 빈 문자열
  purchaseUrl?: string
  isSelfPublished: boolean  // 최근 4권(08~11)이 투비스토리 자체 출판
  category: string[]  // ["hospital"], ["b2b"], ["it"] 등
  featured: boolean   // 홈·대표소개 페이지 대표작 표시용

도서 11권:
  b01: IT재해복구 전략과 구현 / 2002 / 미확인 출판사 / isSelfPublished:false / category:["it"]
  b02: 미래기업의 생존전략 유틸리티 컴퓨팅 / 전자신문사 / 2006 / category:["it"]
  b03: 링크드인 무작정 따라하기 / 길벗 / 2013 / isbn:9788966185849 / category:["b2b"]
  b04: 페이스북 광고 이기는 전략 / e비즈북스 / 2017 / isbn:9791157830848 / featured:true / category:["sns","ad"]
  b05: B2B 마케팅 이기는 전략 / e비즈북스 / 2019 / isbn:9791157831555 / featured:true / category:["b2b"]
  b06: 원장님께 드리는 병원마케팅 조언 100 / e비즈북스 / 2021 / isbn:9791157832347 / featured:true / category:["hospital"]
  b07: 병원 개원 마케팅 이기는 전략 / e비즈북스 / isbn:9791157833306 / category:["hospital"]
  b08: 원장님을 위한 병원마케팅 자가 진단 KIT / 투비스토리 / isbn:9791198859907 / isSelfPublished:true / category:["hospital"]
  b09: AI 시대 타깃 광고 이기는 전략 / 투비스토리 / isbn:9791198859921 / isSelfPublished:true / featured:true / category:["ai","ad"]
  b10: 병원 개원 마케팅 트렌드 2026 / 투비스토리 / isbn:9791198859969 / isSelfPublished:true / category:["hospital"]
  b11: 의사를 위한 AI 출판 가이드 / 투비스토리 / isbn:9791198859976 / isSelfPublished:true / category:["hospital","ai"]

2. content/clients.json
스키마:
  id: string
  name: string
  logoSrc: string    // "/assets/clients/[slug].png" (파일 없으면 빈 문자열)
  category: 'hospital' | 'education' | 'general' | 'public' | 'ngo'
  url?: string

아래 광고주 20개로 채워줘:
  hospital(5): 국립암센터, GS안과, 새빛안과병원, 아이디성형외과, 청구경희한의원
  education(5): YBM NET, 파고다어학원, 한솔교육, 매일경제 교육센터, 서강대학교 경영전문대학원
  general(5): 한국HP, SK렌터카, CJ푸드빌, GSSHOP, 달바
  public(3): 국민건강보험공단, 대한장애인체육회, 중소기업기술혁신협회
  ngo(2): 국제앰네스티, 아름다운재단

3. content/cases.json
스키마:
  id: string
  industry: 'b2b' | 'hospital' | 'franchise' | 'education' | 'ngo'
  subtype?: string   // "eye", "dental" 등 세부 유형
  anonymousTitle: string   // 익명화된 기업명
  challenge: string
  action: string
  result: string     // 지금은 "[수치 보강 필요]" — 대표님 확인 후 업데이트
  period?: string

5개 케이스 (산업별 1개):
  case-hospital-01: 서울 소재 안과 의원 / subtype:eye
    challenge: 월 광고비 증가에도 신환 수 정체. 라식·라섹·백내장 키워드 혼재.
    action: GA 감사 → 시술별 랜딩 3개 분리 → 네이버 플레이스 최적화
    result: [수치 보강 필요]
    period: 3개월

  case-b2b-01: 국내 IT 솔루션 기업 (직원 50명대)
    challenge: 월 광고비 500만원 집행 중. 리드 단가 너무 높음. MQL→SQL 전환율 5% 미만.
    action: GA 감사 → 직무/문제/솔루션 키워드 분리 → 산업별 랜딩 3개 → 폼 최적화
    result: [수치 보강 필요]

  case-franchise-01: 만화방 프랜차이즈 (1호점 오픈 단계)
    challenge: 브랜드 인지도 없음. 가맹 문의 유입 자체가 없는 상태.
    action: 1호점 매출 데이터 기반 페르소나 설계 → 창업/소자본/만화방가맹 키워드 → 로컬 패키지
    result: 200호점 달성 (투비스토리 1호점부터 진행) / [추가 수치 보강 필요]

  case-education-01: 국내 중형 어학원
    challenge: 신학기마다 수강 전환율 들쭉날쭉. 학습자/결제자 구분 없는 단일 광고.
    action: 의사결정자 3분류(학습자/결제자/추천인) 별도 메시지 → 시즌별 자동전환 → 무료체험 퍼널
    result: [수치 보강 필요]

  case-ngo-01: 국내 비영리 단체 (해외 지부 연계)
    challenge: 정기 후원자 수 증가 정체. 캠페인 시즌에만 반짝 반응.
    action: 정기/일시/서명 후원 각각 별도 CTA → 스토리텔링 콘텐츠 → SNS 운영 일원화
    result: [수치 보강 필요]

4. content/columns.json
스키마:
  id: string
  title: string
  category: 'hospital' | 'b2b' | 'franchise' | 'education' | 'general'
  date: string       // "2026-05-01"
  summary: string    // 한 줄 요약 (카드에 표시)
  slug: string       // URL 슬러그 (영문 kebab-case)
  readingTime: string

5개 샘플:
  col-01: 2026년 병원 개원 마케팅 3대 트렌드 / hospital / 2026-05-01
    summary: AI 검색 시대에 병원 개원 마케팅은 어떻게 달라지는가.
  col-02: B2B 리드 단가를 절반으로 줄인 3가지 방법 / b2b / 2026-04-15
    summary: 키워드 분리, 랜딩 최적화, MA 도입 — 실제 케이스로 설명합니다.
  col-03: 원장님이 책을 써야 하는 이유 / hospital / 2026-04-01
    summary: 책은 가장 긴 수명을 가진 마케팅 자산입니다. 실제 사례 포함.
  col-04: 검색 광고가 효과 없다고 느껴질 때 점검할 5가지 / general / 2026-03-15
    summary: 광고비는 늘었는데 전환은 줄었다면, 이 5가지를 먼저 확인하세요.
  col-05: 가맹점 모집 광고, 1호점부터 200호점까지 달랐던 것 / franchise / 2026-03-01
    summary: 놀숲 만화방 사례로 보는 가맹 성장 단계별 마케팅 전략.
```
- [ ] 완료

---

### TASK-004. 공통 레이아웃 (GNB · Footer · FloatingCTA)

**목적:**
모든 페이지에 공통으로 들어가는 레이아웃을 먼저 완성합니다.
이 작업이 끝나야 각 페이지가 GNB와 Footer를 자동으로 갖게 됩니다.

**설계 결정:**
- GNB: `use client` 필요 (usePathname, 모바일 메뉴 useState)
- Footer: Server Component (정적 정보만)
- FloatingCTA: `use client` 필요 (스크롤 감지 useEffect)

**주의:**
- 사업자번호·통신판매업신고번호·개인정보책임자 → [TODO] 처리
- 카카오톡 채널 URL → [TODO] 처리

```
app/layout.tsx와 레이아웃 컴포넌트 3개를 만들어줘.
미확정 항목은 {/* [TODO: 항목명] */} 주석 처리해줘.

1. components/layout/GNB.tsx
특성:
  - 'use client' 필요 (usePathname, useState 사용)
  - 고정 상단 (fixed top-0 left-0 right-0 z-50)
  - 스크롤 감지: 0px → 투명 배경, 1px 이상 → 흰 배경 + shadow-sm
  - 높이: 72px (스크롤 후 64px)

구조:
  - 좌: 로고 (Image, src="/assets/01_logo/2bstory_logo.svg")
        SVG 없으면 텍스트 "2BSTORY"로 fallback
  - 중: 대메뉴 링크 (PC에서만 보임, 모바일 hidden)
        홈 / 회사소개(드롭다운) / B2B마케팅 / 가맹마케팅 / 병원마케팅
        / 교육마케팅 / 홈페이지·영상 / NGO마케팅 / 기타마케팅
        / 교육·컨설팅 / 정부과제 / Contact us
        회사소개 드롭다운: 대표소개 / 광고대행 / 컨설팅 / 교육 / 도서출판
  - 우: [상담문의] 버튼 → /contact (Button variant="primary" size="sm")
  - 현재 경로 강조: usePathname()으로 active 링크에 text-brand font-bold

모바일 (md 미만):
  - 중앙 메뉴 hidden
  - 우측에 Menu 아이콘 버튼 (햄버거)
  - 클릭 시 전체화면 오버레이 메뉴 (fixed inset-0 bg-white z-50)
  - 오버레이에 X 버튼, 전체 메뉴 링크 목록 표시

2. components/layout/Footer.tsx
특성:
  - Server Component (정적 정보만, use client 불필요)
  - 배경: bg-[#1F1F1F] text-white

구조 (2열):
  좌(60%):
    - 로고 (흰색 반전 버전: /assets/01_logo/2bstory_logo_white.svg)
      없으면 흰색 텍스트 "2BSTORY"
    - 회사정보 (text-sm text-gray-400):
        투비스토리 주식회사 | 대표이사: 심진보
        서울특별시 강남구 역삼로 123, 한양빌딩 7층
        T. 070-8676-7132 | E. help@2bstory.com
        사업자등록번호: {/* [TODO: 사업자번호] */}
        통신판매업신고번호: {/* [TODO: 통신판매업신고번호] */}
        개인정보 책임자: {/* [TODO: 개인정보책임자] */}
  우(40%):
    - 메뉴 링크 목록
    - 개인정보처리방침 / 이용약관 (볼드)

하단:
  Copyright © 2008 투비스토리㈜ All rights reserved.

3. components/layout/FloatingCTA.tsx
특성:
  - 'use client' 필요 (스크롤 이벤트 useEffect)
  - fixed bottom-8 right-6 z-40
  - 세로로 3개 원형 버튼 (w-12 h-12)

버튼 3개 (위에서 아래):
  ① 카카오톡: bg-[#FEE500] text-black, MessageCircle 아이콘
               href="{/* [TODO: 카카오 채널 URL] */}"
  ② 전화걸기: bg-brand text-white, Phone 아이콘
               href="tel:070-8676-7132"
  ③ 맨위로:   bg-[#333333] text-white, ChevronUp 아이콘
               스크롤 300px 미만 시 hidden (opacity-0 pointer-events-none)
               클릭 시 window.scrollTo({ top: 0, behavior: 'smooth' })

각 버튼 hover:
  - 왼쪽으로 라벨 텍스트 슬라이드인 (absolute right-14, opacity 전환)
  - 라벨 텍스트: "카카오 상담" / "전화 문의" / "맨 위로"

4. app/layout.tsx
  - GNB + {children} + Footer + FloatingCTA
  - main 태그에 pt-[72px] (GNB 높이만큼 패딩)
  - Pretendard 폰트 className 적용
  - GA4 Script (NEXT_PUBLIC_GA_ID 환경변수 사용)
  - 기본 metadata:
      title: "투비스토리㈜ | 데이터로 검증된 18년 디지털 마케팅"
      description: "B2B·병원·가맹·교육 분야 특화 디지털 마케팅 대행사. 2008년 창립. 100여 개 기업 파트너. 대표 단독 저서 11권."
      openGraph: type:"website", locale:"ko_KR", siteName:"투비스토리"
```
- [ ] 완료

---

### TASK-005. HOME 페이지

**목적:**
첫인상을 결정하는 가장 중요한 페이지. 7개 섹션으로 구성됩니다.
"왜 투비스토리인가"를 설득력 있게 보여주는 것이 핵심입니다.

**핵심 메시지:**
- 히어로: "18년 경력, 데이터로 증명"
- 4가지 약속: "다른 대행사가 따라할 수 없는 4가지"
- 숫자: 18년 / 100+ / 11권 / 15명
- 분야 카드: 6개 전문 분야
- 광고주 로고: 신뢰 구축
- 인사이트: 대표가 직접 씀 (신뢰 구축)
- CTA 배너: 3단계 전환 유도

```
app/page.tsx (HOME 페이지)를 만들어줘.
Server Component로 작성. 섹션 순서대로 아래에서 위로 쌓임.

# 섹션 1: 히어로 (min-h-screen)
배경: bg-gradient-to-br from-[#1F1F1F] to-[#2D1208]
레이아웃 (2열, md 이상):
  좌(md:w-2/5):
    - 대표 영상 썸네일 카드 (rounded-2xl overflow-hidden)
    - Image src="/assets/photos/ceo_lecture.jpg"
      없으면 bg-[#2A2A2A] placeholder div
    - ▶ 재생 버튼 오버레이: 흰 원형 Play 아이콘 (w-16 h-16)
    - {/* [TODO: 유튜브 영상 ID 확정 후 클릭 시 모달로 임베드] */}
  우(md:w-3/5):
    - 뱃지: "2008년 창립 · 18년 경력" (border border-brand text-brand rounded-full text-sm px-4 py-1)
    - H1: "데이터로 검증된 18년,\n결과로 증명하는 디지털 마케팅." (text-white text-4xl md:text-display)
    - 서브: "검색·SNS·디스플레이를 하나의 데이터로 잇고, 광고비 한 푼까지 매출과 연결합니다." (text-gray-300 text-lg)
    - 버튼 2개 (flex gap-4):
        [무료 마케팅 진단 받기] → /contact?type=diagnosis (primary)
        [회사소개서 다운로드] → /assets/docs/2bstory_intro.pdf (secondary, target="_blank")

# 섹션 2: 4가지 약속 (bg-brand-light)
SectionTitle: eyebrow="WHY 2BSTORY" title="왜 투비스토리여야 하는가?"
PromiseCard 4개 (grid md:grid-cols-4):
  { icon: BookOpen,      title: "책으로 검증된 유일한 대행사",        description: "대표 단독 저서 11권. 베스트셀러 광고·B2B·병원 마케팅 전문서." }
  { icon: GraduationCap, title: "운영자가 강의하고, 강사가 운영합니다", description: "매일경제 교육센터 8년 강의. 강의 내용을 다음 날 캠페인에 반영합니다." }
  { icon: Building2,     title: "산업을 100여 개의 케이스로 압니다",   description: "병원 100+·가맹 200호점·B2B·교육. 산업 용어부터 다릅니다." }
  { icon: BarChart3,     title: "데이터로 답합니다. 18년의 데이터로.", description: "GA·GTM·픽셀 직접 세팅. 매체 기여도까지 수치로 보고합니다." }

# 섹션 3: 숫자 카운터 (bg-white)
SectionTitle 없음 (숫자가 곧 메시지)
CounterCard 4개 (grid md:grid-cols-4):
  { value:18,  suffix:"년",  label:"2008년 창립부터 지금까지" }
  { value:100, suffix:"+",  label:"직접 진행한 기업 수" }
  { value:11,  suffix:"권", label:"대표 단독 저서" }
  { value:15,  suffix:"명", label:"마케팅·디자인·개발 정예 인력" }

# 섹션 4: 마케팅 분야 카드 (bg-soft)
SectionTitle: eyebrow="EXPERTISE" title="투비스토리의 6가지 전문 영역"
카드 6개 (grid md:grid-cols-3 gap-6):
  각 카드: 아이콘(Lucide) + 분야명(text-h3) + 한줄설명 + "자세히 보기 →" 링크
  B2B마케팅(/b2b): Briefcase 아이콘 / "리드 생성부터 CRM 연동까지. 12단계 방법론."
  병원마케팅(/hospital): Hospital 아이콘 / "100여 개 병원. 5권의 전문서. 자체 출판."
  가맹마케팅(/franchise): Store 아이콘 / "1호점부터 200호점까지 함께."
  교육마케팅(/education): BookOpen 아이콘 / "YBM 그룹사 6개 브랜드 일괄 운영 경험."
  홈페이지·영상(/web): Monitor 아이콘 / "전환되는 사이트. 웹툰·인포그래픽·영상."
  NGO마케팅(/ngo): Heart 아이콘 / "국제앰네스티·아름다운재단 등 비영리."
카드 hover: translateY(-4px) shadow-md transition 0.2s ease-out

# 섹션 5: 광고주 로고 (bg-white)
SectionTitle: eyebrow="CLIENTS" title="함께한 기업들"
탭 4개 (use client 필요, useState로 활성 탭 관리):
  병원·의원 | 교육 | 일반·외식 | 공공·NGO
탭 선택 시 해당 category 로고 그리드 (content/clients.json import)
로고: Image 컴포넌트, 그레이스케일 hover시 컬러 (filter grayscale → none)
로고 없으면 회사명 텍스트로 fallback

# 섹션 6: 대표 인사이트 (bg-soft)
SectionTitle: title="심진보 대표의 마케팅 노트"
서브: "현장에서 직접 운영하는 캠페인 이야기. 책이 나오기 전, 여기에서 먼저 나옵니다."
레이아웃 (2열):
  좌(md:w-3/5): content/columns.json 최신 3개
    카드: 분류 태그(bg-brand-light text-brand rounded-full text-xs) + 제목 + 날짜 + 요약 + "읽기 →"
  우(md:w-2/5): 강연 영상 클립 썸네일 2개
    {/* [TODO: 유튜브 클립 썸네일 이미지 실제 영상 ID 확정 후] */}
    지금은 bg-gray-200 placeholder
하단: [모든 칼럼 보기 →] Button variant="ghost" → /about/ceo#columns

# 섹션 7: CTA 배너 (bg-brand)
텍스트(흰색) H2: "마케팅, 데이터로 답해 드립니다."
버튼 3개 (flex flex-wrap justify-center gap-4):
  [백서 무료 다운로드] → /b2b#whitepaper (secondary, 흰 테두리)
  [30분 무료 진단 신청] → /contact?type=diagnosis (secondary, 흰 테두리)
  [대표 직통: 010-8718-5000] → tel:010-8718-5000 (ghost, 흰색)
```
- [ ] 완료

---

### TASK-006. Contact us 페이지 + FAQ

**목적:**
리드 수집의 최종 관문. FAQ로 의심을 해소하고, 폼으로 전환시킵니다.
Formspree 연동으로 서버 코드 없이 이메일 수신.

**주의:**
- FAQ 10개 순서 중요: 수수료→계약→계정접근→보고서→담당자→효과→이전→예산→소재→정산
- 폼 제출 후 성공/실패 메시지 처리 필요
- 미확정 항목([TODO])은 placeholder 처리

```
app/contact/page.tsx를 만들어줘.
'use client' 섹션(FAQ, 폼)과 Server 섹션(헤더, CTA, 지도)을 분리해서 작성.

# 섹션 1: 페이지 헤더 (bg-dark, py-24)
eyebrow: "CONTACT"
H1(흰색): "첫 미팅은 무료입니다."
서브(회색): "모든 문의는 1영업일 내 담당 컨설턴트가 직접 연락드립니다."

# 섹션 2: FAQ 아코디언 (bg-white)
SectionTitle: title="의뢰 전 가장 많이 묻는 10가지"
서브: "투비스토리에 마케팅을 맡기기 전, 가장 궁금한 것들에 먼저 답합니다."
FAQAccordion 컴포넌트, defaultOpen=[0,1,2] (첫 3개 기본 열림)
FAQ 데이터:
  Q1:"대행 수수료/마진은 어떻게 되나요?"
  A1:"광고비의 일정 비율을 수수료로 청구합니다. 정확한 요율은 광고비 규모와 서비스 범위에 따라 달라지므로 상담 시 명확하게 안내드립니다. 숨겨진 수수료는 없습니다."

  Q2:"계약 기간은 얼마나 묶이나요? 중도 해지 가능한가요?"
  A2:"최소 3개월을 권장하지만 강제하지 않습니다. 1개월 전 사전 통보로 해지 가능합니다. 광고 계정의 소유권은 항상 광고주에게 있습니다."

  Q3:"우리 회사가 광고 계정에 직접 접근할 수 있나요?"
  A3:"네. 모든 광고 계정은 광고주 명의로 생성하거나 광고주 계정에 대행사를 연결하는 방식으로 운영합니다. 언제든지 직접 확인 가능합니다."

  Q4:"보고서는 어떤 형식·주기로 받게 되나요?"
  A4:"주간 운영 현황 리포트와 월간 성과 분석 리포트를 기본 제공합니다. 매체별 ROAS·CPA·전환율을 Google Analytics 기준으로 정리하며, 대시보드 공유도 가능합니다."

  Q5:"담당자가 자주 바뀌지 않나요?"
  A5:"15명 정예 인력으로 운영합니다. 주요 캠페인은 대표가 매주 직접 검토합니다. 일반 대형 대행사와 달리 담당자 이동이 적습니다."

  Q6:"첫 한 달 동안 효과가 없으면 어떻게 하나요?"
  A6:"광고 효과는 일반적으로 2~3개월의 최적화 기간이 필요합니다. 1개월 후 중간 점검 미팅을 진행하며, 전략이 맞지 않으면 즉시 조정합니다. 첫 달 결과를 투명하게 보고서로 공유드립니다."

  Q7:"다른 대행사에서 옮겨가는 절차는 어떻게 되나요?"
  A7:"기존 대행사 계약 종료 시점에 맞춰 계정 이전 작업을 진행합니다. 기존 데이터·히스토리를 최대한 이관하며, 공백 기간이 발생하지 않도록 일정을 조율합니다."

  Q8:"우리 회사 광고비 규모가 작아도 가능한가요?"
  A8:"월 광고비 100만원부터 상담 가능합니다. 규모보다 산업 적합성과 성장 가능성을 먼저 봅니다. 소규모 예산일수록 데이터 기반 운영의 효율이 더 크게 나타납니다."

  Q9:"콘텐츠·소재 제작 비용은 별도인가요?"
  A9:"기본 배너·카드뉴스 소재는 대행 서비스에 포함됩니다. 웹툰·영상·홈페이지 등 별도 제작물은 추가 견적으로 진행하며 사전에 명확히 안내드립니다."

  Q10:"광고비 환불·정산 방식은 어떻게 되나요?"
  A10:"광고비는 광고주 명의 매체 계정에서 직접 집행됩니다. 미집행 광고비는 계정 잔액으로 남습니다. 대행 수수료는 청구 기간 기준으로 월 정산합니다."

# 섹션 3: 문의 폼 + 연락처 (2열)
좌(md:w-3/5): 문의 폼 (Formspree 연동, 'use client' 필요)
  id="contact-form"
  action: https://formspree.io/f/${NEXT_PUBLIC_FORMSPREE_ID}
  필드 (각 필드에 label + 에러 메시지):
    성함 (text, required)
    직함 (text)
    회사명 (text, required)
    이메일 (email, required)
    연락처 (tel, required)
    문의유형 (radio, required): 광고대행 | 컨설팅 | 교육 | 홈페이지제작 | 정부과제 | 기타
    현재 운영 매체 (checkbox): Meta | 네이버 | 구글 | 카카오 | 없음
    월 예상 예산 (radio): 100만미만 | 100~500만 | 500~1000만 | 1000~3000만 | 3000만이상
    문의내용 (textarea rows=5)
    개인정보처리방침 동의 (checkbox, required, /privacy 링크 포함)
  제출 버튼: Button variant="primary" fullWidth "문의하기"
  제출 성공: "감사합니다. 1영업일 내 담당 컨설턴트가 직접 연락드립니다." 메시지

우(md:w-2/5): 연락처 카드 (bg-soft rounded-2xl p-8)
  대표전화: 070-8676-7132
  대표직통: 010-8718-5000
  이메일: help@2bstory.com
  카카오톡: {/* [TODO: 채널 URL 확정 후] */}
  업무시간: 평일 10:00~19:00 (점심 12:30~13:30)

# 섹션 4: 3단계 CTA (bg-brand)
설명 텍스트(흰색): "지금 가장 편한 방법으로 시작하세요."
카드 3개 (grid md:grid-cols-3):
  🟡 제목:"백서 무료 다운로드" / 설명:"이메일 입력만으로 B2B·병원 분야 벤치마크 리포트 수신" / 링크:/b2b#whitepaper
  🟠 제목:"30분 무료 진단 신청" / 설명:"담당 컨설턴트가 현황 진단 후 개선 방향 제안" / 링크:#contact-form 스크롤
  🔴 제목:"대표 직통 전화" / 설명:"010-8718-5000" / 링크:tel:010-8718-5000

# 섹션 5: 오시는 길 (bg-white)
2열:
  좌(60%): 카카오맵 iframe
    주소: 서울특별시 강남구 역삼로 123
    height:400px
  우(40%): 주소·교통·주차 텍스트
    주소: 서울특별시 강남구 역삼로 123, 한양빌딩 7층
    지하철: {/* [TODO: 가까운 역/출구/도보 시간 확정] */}
    주차: 건물 지하 주차장 이용
    방문 안내:
      - 방문 미팅은 사전 예약제로 운영합니다.
      - 첫 미팅은 60분 무료입니다.
      - 현재 운영 중인 광고 계정에 읽기 권한을 미리 공유해 주시면 더 정확한 진단이 가능합니다.
```
- [ ] 완료

---

### TASK-007. 회사소개 + 대표소개 페이지

**목적:**
신뢰를 구축하는 핵심 페이지들. 처음 방문자가 "믿을 수 있는 회사인가" 판단합니다.
대표소개(/about/ceo)는 특히 중요 — 이력·영상·칼럼·저서가 모두 여기.

```
app/about/page.tsx (회사소개)와 app/about/ceo/page.tsx (대표소개)를 만들어줘.

=== 회사소개 (/about) ===

섹션1: 페이지 히어로 (bg-dark, py-24)
  eyebrow: "ABOUT US"
  H1(흰색): "브랜드와 데이터, 두 축으로 성장하는 회사."
  서브: "투비스토리는 2008년 설립된 퍼포먼스 마케팅 전문 디지털 마케팅 대행사입니다."

섹션2: 4가지 약속 (bg-brand-light)
  HOME의 PromiseSection과 동일 컴포넌트 재사용
  (components/sections/PromiseSection.tsx로 분리 추천)

섹션3: 숫자 카운터 (bg-white)
  HOME의 CounterSection과 동일 컴포넌트 재사용

섹션4: 회사 정보 (bg-soft, 2열)
  좌: 정보 테이블 (dl/dt/dd 구조)
    회사명: 투비스토리 주식회사 (2BSTORY Co., Ltd.)
    설립일: 2008년
    대표이사: 심진보
    직원수: 15명
    주소: 서울특별시 강남구 역삼로 123, 한양빌딩 7층
    대표전화: 070-8676-7132
    이메일: help@2bstory.com
  우: 사무실 사진 (Image, src="/assets/photos/office.jpg")
      없으면 bg-gray-200 placeholder

섹션5: 조직도 (bg-white)
  SectionTitle: title="조직 구성"
  트리 다이어그램 (CSS만으로 구현, 라이브러리 사용 금지):
    대표이사 → 마케팅 1팀 (브랜드 마케팅·기업 전략)
             → 마케팅 2팀 (체험 마케팅·인플루언서)
             → 퍼포먼스팀 (SA·DA·SNS 광고 운영)
             → 디자인·개발팀 (홈페이지·웹툰·인포그래픽)

섹션6: 회사소개서 CTA (bg-brand-light)
  "투비스토리를 더 자세히 알고 싶다면"
  [회사소개서 PDF 다운로드] → /assets/docs/2bstory_intro.pdf (target="_blank")

=== 대표소개 (/about/ceo) ===

섹션1: CEO 프로필 (bg-white, py-24, 2열)
  좌(md:w-2/5): 대표 프로필 사진
    Image src="/assets/photos/ceo_profile.jpg"
    없으면 bg-gray-200 rounded-2xl placeholder
  우(md:w-3/5):
    eyebrow: "CEO"
    이름: 심진보 (text-h1)
    직함: 대표이사 (text-text-muted)
    메인 카피: "IT 컨설턴트에서 11권의 저자까지,\n현장에서 검증한 18년의 인사이트."
    약력 리스트 (Check 아이콘 + 텍스트):
      HP KOREA 선임 컨설턴트 (1999~2011, 12년)
      투비스토리㈜ 대표이사 (2008~현재)
      서강대학교 컴퓨터공학 석사
      서울신용보증재단 온라인 마케팅 멘토 (2023~)
      중소벤처기업부 소상공인진흥원 인증 컨설턴트
    연락처: 010-8718-5000 / help@2bstory.com

섹션2: 영상·강연 (bg-soft)
  SectionTitle: title="먼저 영상으로 만나보세요"
  메인 영상 영역:
    {/* [TODO: 유튜브 영상 ID 확정 후 iframe 임베드] */}
    지금은 bg-dark rounded-2xl 에 Play 버튼 placeholder
    하단 캡션: "투비스토리 심진보 대표의 마케팅 인사이트"
  강연 이력 리스트 (아이콘 타임라인):
    2014~현재: 매일경제 교육센터 디지털 마케팅 정규 과정
    서강대학교 경영전문대학원 SHAPE 외래 강의
    숙명여자대학교·서울벤처대학교 외래 강의
    기업 임직원 대상 사내교육·세미나 정기 운영

섹션3: 저서 11권 (bg-white)
  id="books"
  SectionTitle: eyebrow="BOOKS" title="11권의 저서"
  서브: "IT와 디지털 마케팅 분야의 전환점마다 책을 써왔습니다."
  content/books.json 전체를 BookCard로 (grid md:grid-cols-3 gap-6)
  "전체 도서 목록과 구매 → /books" 링크

섹션4: 대표 칼럼 (bg-soft)
  id="columns"
  SectionTitle: title="마케팅 노트"
  서브: "현장에서 직접 운영하는 캠페인 이야기. 책이 나오기 전, 여기에서 먼저 나옵니다."
  content/columns.json 최신 5개 카드
  각 카드: 분류 태그 + 제목 + 날짜 + 요약 + "읽기 →"

  뉴스레터 구독 박스 (bg-white rounded-2xl p-8 mt-8):
    "새 칼럼이 올라오면 이메일로 받아보세요."
    인풋(email placeholder="이메일 주소") + [구독하기] 버튼
    {/* [TODO: Formspree 뉴스레터 폼 ID 별도 생성 후 연결] */}

섹션5: 무료 진단 CTA (bg-brand)
  "대표와 직접 이야기하세요."
  서브: "첫 30분 무료. 현황 진단 + 개선 방향 제안."
  [30분 무료 진단 신청] → /contact?type=diagnosis (흰색 secondary 버튼)
```
- [ ] 완료

---

### TASK-008. Vercel 배포 + 도메인 연결

**목적:**
Phase 1 오픈. 빌드 오류 없이 Vercel에 배포하고, 2bstory.com에 연결합니다.

**주의:**
- `pnpm build` 오류 없이 완료되어야 함
- 기존 2bstory.com 호스팅의 DNS 설정 변경 필요 (기존 사이트 다운 주의)

```
배포 준비를 해줘.

1. next.config.ts 확인·업데이트
   - 외부 이미지 사용 시 도메인 허용 목록 추가
   - 기본 설정 최적화

2. app/sitemap.ts 생성
   import { MetadataRoute } from 'next';
   export default function sitemap(): MetadataRoute.Sitemap {
     const baseUrl = 'https://www.2bstory.com';
     // 모든 정적 페이지 URL 반환:
     // /, /about, /about/ceo, /b2b, /hospital, /franchise,
     // /education, /web, /ngo, /etc, /consulting, /gov, /books,
     // /contact, /privacy, /terms
   }

3. app/robots.ts 생성
   모든 크롤러 허용, sitemap URL 포함

4. pnpm build 실행
   오류 있으면 모두 수정해줘.
   TypeScript 오류, ESLint 오류, 빌드 오류 전부 잡아줘.

5. .gitignore 확인
   .env.local이 포함되어 있는지 확인.

배포 후 수동으로 할 일 (코드 아님):
  A. GitHub 저장소 생성: github.com/[계정]/2bstory-website
  B. git remote add origin [저장소 URL]
  C. git push origin main
  D. Vercel (vercel.com) 가입 → GitHub 연결 → 저장소 import
  E. Vercel 환경 변수 등록: NEXT_PUBLIC_FORMSPREE_ID, NEXT_PUBLIC_GA_ID
  F. 도메인 설정: Vercel에서 2bstory.com 추가 → DNS A레코드·CNAME 변경
```
- [ ] 완료

---

## 🟠 Phase 2 — 산업 페이지 5개

> Phase 1 오픈 후 순차 진행.
> 모든 산업 페이지는 히어로→케이스→방법론·서비스→로고→CTA 구조.

### TASK-009. 병원마케팅 페이지

**목적·중요성:**
가장 중요한 산업 페이지. 투비스토리의 독보적 차별점이 집중되어 있음.
- 병원 전문 도서 5권 (다른 대행사에 없음)
- 원장님 책 출간 서비스 (자체 출판사 보유)
- 비급여 마케팅 전문성

```
app/hospital/page.tsx를 만들어줘.

섹션1: 히어로 (bg-dark)
  H1: "원장님의 병원, 디지털로 키웁니다."
  서브: "100여 개 병원·5권의 전문서·투비스토리 자체 출판"
  CTA: [원장님 전용 무료 상담] → /contact?type=hospital (primary)

섹션2: 케이스 스터디
  SectionTitle: title="실제 케이스 스터디"
  진료과목 탭(useState): 안과 | 치과 | 성형외과 | 한의원 | 기타
  content/cases.json에서 industry:"hospital" 필터 → CaseCard 표시
  탭 선택 시 해당 subtype 케이스 표시

섹션3: 병원 전문 도서 5권
  SectionTitle: title="병원 마케팅 분야 단독 저서 5권"
  서브: "어떤 마케팅 대행사도 이 정도 깊이는 없습니다."
  content/books.json에서 category에 "hospital" 포함된 책 → BookCard 가로 슬라이더
  (overflow-x-auto flex gap-4 snap-x snap-mandatory)
  isSelfPublished 배지 강조

섹션4: 원장님 책 출간 서비스 (bg-brand-light)
  SectionTitle: title="원장님 책 출간 서비스"
  서브: "투비스토리는 광고만 하지 않습니다. 원장님의 전문 지식을 책으로 만들어 드립니다."
  5단계 아이콘 스텝 (flex gap-4):
    기획(FileText) → 집필 코칭(PenLine) → 편집(Edit) → 출판(Book) → 서점 유통(Store)
  설명: "책은 가장 긴 수명을 가진 마케팅 자산입니다."
  CTA: [AI 출판 가이드 무료 발췌본 받기] → /contact?type=book_publishing

섹션5: 광고주 병원 로고
  content/clients.json에서 category:"hospital" → 로고 그리드

섹션6: 개원 컨설팅 (bg-soft)
  SectionTitle: title="병원 개원 컨설팅"
  아이콘 카드 6개 (grid md:grid-cols-3):
    입지 상권 분석(MapPin) | 병원 네이밍·브랜딩(Palette) | 홈페이지·예약 시스템(Monitor)
    네이버 플레이스·지도(Map) | 개원 첫 3개월 광고(Megaphone) | 콜센터 응대 스크립트(Phone)

섹션7: CTA 배너 (bg-brand)
  "개원을 준비 중이거나, 비급여 매출이 정체되어 있다면"
  [원장님 전용 무료 상담 신청] → /contact?type=hospital
```
- [ ] 완료

---

### TASK-010. B2B 마케팅 페이지

```
app/b2b/page.tsx를 만들어줘.
B2B는 "리드(Lead)" 싸움임을 강조. 12단계 방법론 + 백서 다운로드가 핵심.

섹션1: 히어로
  H1: "B2B 마케팅, 데이터로 답합니다."
  서브: "리드 단계부터 영업 인계까지, 12단계로 운영합니다."
  CTA: [백서 무료 다운로드] → #whitepaper (primary)

섹션2: 케이스 스터디
  content/cases.json industry:"b2b" → CaseCard

섹션3: 12단계 방법론
  SectionTitle: title="B2B 마케팅 12단계 해법"
  스텝 리스트 (grid md:grid-cols-2 gap-4):
    번호(오렌지 원형) + 단계명 + 한줄설명
    01.페르소나 정의 / 02.키워드 매핑 / 03.콘텐츠 자산 설계
    04.랜딩페이지 최적화 / 05.광고 운영(검색·디스플레이·LinkedIn)
    06.MA(마케팅자동화) 도입 / 07.리드 스코어링 / 08.영업 인계(MQL→SQL)
    09.CRM 연동 / 10.매체 기여도 분석 / 11.ROI 보고 / 12.전략 재수정

섹션4: 도서 (bg-soft)
  content/books.json에서 category에 "b2b" 포함 → BookCard
  설명: "이 페이지의 모든 방법론은 이 책에서 출발합니다."

섹션5: 링크드인 서비스
  3개 카드: Sponsored Content | Message Ads & Lead Gen | Sales Navigator

섹션6: 백서 다운로드 (id="whitepaper", bg-soft)
  SectionTitle: title="무료 백서 다운로드"
  서브: "리드 단가 벤치마크, KPI 설계 가이드, MA 도입 체크리스트 — 이메일 입력으로 즉시 수신."
  카드 3개:
    B2B 디지털 마케팅 KPI 설계 가이드 / [TODO: PDF 완성 후 링크]
    한국 B2B 시장 리드 단가 벤치마크 리포트 / [TODO]
    마케팅 자동화 도입 체크리스트 / [TODO]
  이메일 입력 폼 (Formspree 연동, 이메일만 수집)

섹션7: CTA 배너 (bg-brand)
  "B2B 리드 단가, 지금 얼마나 나오고 있나요?"
  [백서 먼저 받아보기] + [무료 진단 신청]
```
- [ ] 완료

---

### TASK-011. 가맹·교육·NGO 마케팅 페이지 (3개 일괄)

**목적:**
3개 페이지 모두 동일한 구조(히어로→케이스→방법론→CTA)를 따름.
내용만 다르게 채워 넣음.

```
아래 3개 페이지를 만들어줘. 각 페이지는 히어로→케이스→방법론→CTA 구조.

1. app/franchise/page.tsx (가맹마케팅)
   히어로 H1: "1호점부터 200호점까지, 가맹점주의 매출을 책임지는 마케팅."
   케이스: content/cases.json industry:"franchise"
   방법론 5단계:
     Step1. 1호점 매출 검증 — 광고 없이 자생 가능한 단위 경제 확인
     Step2. 가맹점주 페르소나 + 가맹문의 키워드 매핑
     Step3. 본사 가맹문의 랜딩 + 가맹설명회→계약 퍼널 설계
     Step4. 지점 오픈 시 지역 마케팅 패키지 일괄 운영 (네이버 플레이스, 지역 카페)
     Step5. 본사 통합 브랜드 + 지점 로컬 콘텐츠 분리 운영
   대표 사례 강조: 놀숲 만화방 200호점, 뉴욕야시장 100호점 (1호점부터 투비스토리 진행)

2. app/education/page.tsx (교육마케팅)
   히어로 H1: "교육 산업의 디지털 마케팅, 그 18년의 노하우."
   케이스: content/cases.json industry:"education"
   대표 광고주: YBM NET·리더스·잉글루·커리어캠퍼스·날톡·ECC / 파고다·한솔·매일경제 교육센터
   방법론 4단계:
     Step1. 의사결정자 3분류 — 학습자/결제자(부모)/추천인 각각 다른 메시지
     Step2. Long Funnel 설계 — 인지부터 결제까지 평균 30일 이상 동선 추적
     Step3. 무료 체험→유료 전환 퍼널
     Step4. 시즌별 자동전환 캠페인 (신학기/방학/시험/취업)

3. app/ngo/page.tsx (NGO마케팅)
   히어로 H1: "비영리의 메시지, 더 멀리 닿게 합니다."
   서브: "매출이 아닌 공감과 행동(후원·서명·참여)을 KPI로 합니다."
   케이스: content/cases.json industry:"ngo" (국제앰네스티·아름다운재단)
   비영리 특수성 5가지 아이콘 카드:
     ① 후원 전환 퍼널 — 정기/일시/서명 각각 다른 깔때기
     ② 메시지의 균형 — 감정 자극과 사실 전달 사이의 적정점
     ③ 회원 데이터 보호 — 후원자 개인정보, 동의 관리
     ④ 비용 효율 극대화 — 광고비 1원이 곧 캠페인 예산
     ⑤ 콘텐츠의 신뢰성 — 통계·인용·이미지 출처 검증
   CTA: [NGO·시민사회 단체 우대 견적 문의] → /contact?type=ngo
```
- [ ] 완료

---

## ⬜ Phase 3 — 나머지 페이지

### TASK-012. 홈페이지·영상 + 기타 + 컨설팅 + 정부과제

```
4개 페이지를 만들어줘.

1. app/web/page.tsx (홈페이지·영상 제작)
   H1: "단순 제작이 아닌, '전환되는 디지털 자산'을 만듭니다."
   서브: "광고대행사가 만드는 홈페이지는 '예쁘기'와 '팔리기'의 균형이 다릅니다."
   제작 카테고리 6개 카드: 반응형 홈페이지|랜딩페이지|모바일앱|웹툰·캐릭터|인포그래픽|영상·모션
   포트폴리오 탭(useState): 홈페이지 | 웹툰 | 인포그래픽
   대표 포트폴리오 나열 (이미지 없으면 텍스트로):
     홈페이지: GS안과·새빛안과병원·고운결한의원·월드패밀리잉글리시 등
     웹툰: 중소기업기술혁신협회·파고다어학원·청구경희한의원
     인포그래픽: 국민건강보험공단 시리즈

2. app/etc/page.tsx (기타마케팅)
   H1: "어떤 산업이든, 데이터로 답하는 마케팅."
   공공·기관 섹션:
     국민건강보험공단·국립암센터·대한장애인체육회·중소기업기술혁신협회
     한국사회적기업진흥원·한국폴리텍대학·지식경제부·인천항만공사
   일반 산업군:
     IT: 한국HP·FPT KOREA·블로코 / 이커머스: GSSHOP·신세계TV쇼핑
     F&B: 빙그레·하겐다즈·CJ푸드빌 / 뷰티: 달바·SVR화장품
     기타: SK렌터카·런닝맨·고고키드·넥시스갤러리

3. app/consulting/page.tsx (교육·컨설팅)
   교육 상품 4종 카드: 퍼블릭 클래스|인하우스 교육|산업별 워크숍|1:1 멘토링
   컨설팅 상품 4종 카드: 무료 30분 진단|단기(4~6주)|중기(3~6개월)|연간 어드바이저리

4. app/gov/page.tsx (정부과제)
   H1: "정부지원사업, 마케팅까지 함께 설계합니다."
   지원 5단계: 마케팅항목 컨설팅→RFP 작성→과제 기간 운영→정산 자료→후속 매칭
   관련 활동: 서울신용보증재단 멘토·중소벤처기업부 인증 컨설턴트
```
- [ ] 완료

---

### TASK-013. 도서출판 페이지

```
app/books/page.tsx를 만들어줘.

섹션1: 히어로 (bg-dark)
  H1: "11권. 그리고 계속 씁니다."
  서브: "광고대행사가 직접 출판사가 된 회사. 18년의 현장이 책이 됩니다."

섹션2: 도서 그리드 (bg-white)
  SectionTitle: eyebrow="BOOKS" title="대표 심진보의 단독 저서"
  content/books.json 전체 → BookCard (grid md:grid-cols-3 gap-8)
  isSelfPublished=true인 최근 4권은 그리드 상단 또는 별도 "투비스토리 출판" 섹션으로 강조

섹션3: 원장님 출판 서비스 (bg-brand-light)
  "원장님의 전문 지식도 책으로"
  [AI 출판 가이드 무료 발췌본 받기] → /contact?type=book_publishing
```
- [ ] 완료

---

## ⬜ Phase 4 — SEO + 법적 페이지 + 마무리

### TASK-014. SEO 최적화

```
SEO 설정을 완성해줘.

1. 각 페이지별 metadata 추가 (아직 없는 페이지들)
   예시:
   // app/hospital/page.tsx
   export const metadata: Metadata = {
     title: "병원 마케팅 — 100여 개 병원, 5권의 전문서 | 투비스토리",
     description: "강남·지방대도시 100여 개 병원 비급여 마케팅. 병원마케팅 조언 100·개원 마케팅 이기는 전략 저자 직접 운영.",
     openGraph: { ... }
   };

2. 각 페이지 H1이 정확히 하나씩인지 확인하고 수정

3. public/og-image.png 존재 확인 (없으면 1200x630 placeholder 생성 안내)

4. pnpm build 후 빌드 경고·오류 모두 제거
```
- [ ] 완료

---

### TASK-015. 모바일 QA + 성능 최적화

```
모바일·성능 최적화를 해줘.

1. 모바일(375px) 화면 점검 리스트:
   - 텍스트 잘리는 곳 없는지
   - 모든 그리드가 1열로 전환되는지
   - GNB 햄버거 메뉴 열림/닫힘 정상 동작
   - FloatingCTA 버튼 터치 영역 최소 48px
   - 폼 인풋 터치 시 확대되지 않는지 (font-size: 16px 이상)

2. next/image 점검:
   - 모든 <img> 태그를 next/image로 교체
   - 히어로 이미지에 priority 속성 추가
   - 외부 이미지 도메인 next.config.ts에 등록 확인

3. 성능 개선:
   - pnpm build 후 번들 크기 확인
   - 큰 컴포넌트(>50KB) 있으면 dynamic import 적용
   - 폰트 로딩 최적화 (font-display: swap)
```
- [ ] 완료

---

### TASK-016. 개인정보처리방침 + 이용약관 [법적 필수]

**목적·중요성:**
개인정보보호법에 의거 홈페이지 오픈 전 필수. 없으면 과태료 대상.
특히 문의 폼에서 개인정보(이름·이메일·전화)를 수집하므로 반드시 필요.

```
개인정보처리방침과 이용약관 페이지를 만들어줘.

1. app/privacy/page.tsx (개인정보처리방침)
   표준 개인정보처리방침 양식으로 작성. 투비스토리에 맞게 구체화.

   포함 내용:
   - 개인정보 처리 목적
   - 수집하는 개인정보 항목:
       성명, 이메일, 연락처, 회사명 (문의 폼 기준)
   - 개인정보 보유 및 이용기간: 수집일로부터 3년 또는 동의 철회 시
   - 개인정보 제3자 제공: 없음 (Formspree로만 전송, 제3자 제공 없음)
   - 개인정보 처리 위탁: Formspree Inc. (폼 데이터 처리)
   - 정보주체의 권리: 열람·수정·삭제·처리정지 요청 방법
   - 개인정보 보호책임자:
       {/* [TODO: 이름·직함·이메일 확정 후 입력] */}
   - 시행일: {/* [TODO: 오픈 날짜] */}

2. app/terms/page.tsx (이용약관)
   기본 이용약관. 서비스 범위, 지적재산권, 면책조항 포함.

3. Footer.tsx 수정:
   "개인정보처리방침" → /privacy (font-bold로 강조)
   "이용약관" → /terms
   두 링크가 Footer 하단에 명확히 보이도록.
```
- [ ] 완료

---

## 📌 단발 태스크 — 필요할 때 복사해서 사용

```
# 특정 컴포넌트 수정
[컴포넌트명]에서 [수정 내용]을 변경해줘.

# 반응형 수정
모바일에서 [페이지명] 페이지의 [문제 상황]을 수정해줘.

# JSON 데이터 추가
content/clients.json에 아래 광고주를 추가해줘:
  name: "[회사명]", category: "[카테고리]", logoSrc: "[경로]"

# 빌드 오류 수정
pnpm build를 실행했더니 아래 오류가 났어. 전부 수정해줘:
[오류 메시지 붙여넣기]

# 페이지 컴포넌트 재사용
[A 페이지]의 [섹션명] 섹션을 [B 페이지]에도 동일하게 추가해줘.

# 미확정 항목 업데이트
[항목명]이 [값]으로 확정됐어. 관련된 모든 [TODO] 주석을 실제 값으로 교체해줘.
예: "카카오톡 채널 URL이 https://pf.kakao.com/xxxxx 로 확정됐어."
```
