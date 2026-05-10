# 투비스토리㈜ 홈페이지 — 프로젝트 컨텍스트 (CLAUDE.md)

<!--
  ══════════════════════════════════════════════════════════════
  이 파일의 역할
  ══════════════════════════════════════════════════════════════

  [Claude Code 사용자에게]
  Claude Code가 프로젝트 시작 시 자동으로 읽는 컨텍스트 파일입니다.
  "이 프로젝트가 뭔지, 어떻게 만들어야 하는지"를
  Claude가 항상 알 수 있게 합니다.

  [일반 개발자에게]
  이 파일은 "프로젝트 헌법"입니다. 코드 작업 전 반드시 읽으세요.
  모든 설계 결정의 이유가 여기 있습니다.
  전체 온보딩 문서는 README.md를 보세요.

  [변경 시]
  결정사항이 바뀌면 코드보다 이 파일을 먼저 업데이트하세요.
  코드와 이 파일이 불일치하면 혼란이 생깁니다.
  ══════════════════════════════════════════════════════════════
-->

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 회사명 | 투비스토리㈜ (2BSTORY Co., Ltd.) |
| 사이트 | www.2bstory.com |
| 업종 | 디지털 마케팅 대행사 |
| 창립 | 2008년 (18년 경력) |
| 직원 | 15명 |
| 대표 | 심진보 (HP KOREA IT컨설턴트 12년 출신, 단독 저서 11권) |
| 주소 | 서울특별시 강남구 역삼로 123, 한양빌딩 7층 |
| 전화 | 070-8676-7132 (대표 직통: 010-8718-5000) |
| 이메일 | help@2bstory.com |
| 벤치마크 | mezzomedia.co.kr — 데이터 중심 구조, 신뢰감 있는 서체·여백 참고 |

**이 사이트의 목적:**
1. **리드 수집** — 문의 폼, 백서 다운로드, 무료 진단 신청이 실제로 작동해야 함
2. **신뢰 구축** — 18년·100개 기업·저서 11권을 설득력 있게 보여주기
3. **SEO** — 병원마케팅·B2B마케팅·가맹마케팅 키워드 검색 노출

---

## 기술 스택

```
프레임워크:  Next.js 15 (App Router, TypeScript)
             └─ 선택 이유: SSR/SSG 통합, SEO 자동화, 바이브 코딩 최적화

스타일링:   Tailwind CSS v4
             └─ 선택 이유: AI가 클래스명 그대로 생성, 디자인 토큰과 직결

패키지관리:  pnpm
             └─ npm보다 3배 빠름

배포:       Vercel
             └─ GitHub push → 자동 배포, 무료 SSL, 미리보기 URL

폼:         Formspree
             └─ 서버 코드 없이 폼→이메일 알림, 월 50건 무료

CMS:        JSON 파일 (Phase 1~3) → Sanity (Phase 4)
             └─ Phase 1~3은 content/*.json으로 충분
             └─ Phase 4에서 직원이 웹 UI로 칼럼 직접 관리할 때 Sanity 추가

아이콘:     Lucide React
             └─ Next.js 최적화, MIT 라이선스

이미지:     next/image (WebP 자동 변환)
             └─ 주의: <img> 태그 사용 금지. 반드시 next/image 사용.

분석:       GA4
             └─ 마케팅 대행사답게 자체 사이트도 GA로 분석
```

---

## 폴더 구조

```
2bstory-website/
│
├── CLAUDE.md          ← 지금 이 파일. 프로젝트 컨텍스트.
│                         Claude Code가 시작 시 자동으로 읽음.
│                         일반 개발자에게는 "프로젝트 헌법" 역할.
│
├── TASKS.md           ← 구현 태스크 목록 (Phase 1~4, 총 16개).
│                         바이브 코딩: 태스크를 Claude에 복붙.
│                         일반 개발: 태스크를 직접 읽고 구현.
│
├── README.md          ← 처음 보는 개발자를 위한 온보딩 가이드.
│                         왜 이렇게 구성했는지, 어디까지 됐는지, 뭘 해야 하는지.
│
├── app/               ← Next.js App Router. 폴더명 = URL 경로.
│   │
│   ├── layout.tsx     ← 최상위 레이아웃.
│   │                     GNB + 본문(children) + Footer + FloatingCTA.
│   │                     폰트 로드, GA 스크립트, 기본 메타데이터도 여기.
│   │
│   ├── page.tsx       ← HOME (/)
│   │                     7개 섹션: 히어로→약속→카운터→분야→로고→인사이트→CTA
│   │
│   ├── about/
│   │   ├── page.tsx         ← 회사소개 (/about)
│   │   └── ceo/page.tsx     ← 대표소개 (/about/ceo)
│   │                           신뢰의 핵심 페이지. 프로필·영상·칼럼·저서 모두 여기.
│   │                           처음 방문자가 "믿을 수 있는 곳인가" 판단하는 페이지.
│   │
│   ├── b2b/page.tsx         ← B2B마케팅 (/b2b)
│   │                           12단계 방법론 + 백서 다운로드(리드 수집 핵심 채널)
│   │
│   ├── hospital/page.tsx    ← 병원마케팅 (/hospital)
│   │                           ★ 가장 중요한 산업 페이지.
│   │                           병원 전문 도서 5권 + 원장님 책 출간 서비스 포함.
│   │                           다른 마케팅 대행사에는 없는 독보적 차별점.
│   │
│   ├── franchise/page.tsx   ← 가맹마케팅 (/franchise)
│   ├── education/page.tsx   ← 교육마케팅 (/education)
│   ├── web/page.tsx         ← 홈페이지·영상 제작 (/web)
│   ├── ngo/page.tsx         ← NGO마케팅 (/ngo) — 국제앰네스티·아름다운재단
│   ├── etc/page.tsx         ← 기타마케팅·공공기관 (/etc)
│   ├── consulting/page.tsx  ← 교육·컨설팅 상품 (/consulting)
│   ├── gov/page.tsx         ← 정부과제 (/gov)
│   ├── books/page.tsx       ← 도서출판 (/books) — 11권 전체 전시
│   ├── contact/page.tsx     ← Contact us + FAQ 10개 + 오시는 길 (/contact)
│   ├── privacy/page.tsx     ← 개인정보처리방침 (/privacy) [법적 필수, 오픈 전 완성]
│   └── terms/page.tsx       ← 이용약관 (/terms) [법적 필수]
│
├── components/
│   │
│   ├── layout/
│   │   ├── GNB.tsx          ← 상단 내비게이션 바.
│   │   │                       - 스크롤 시 높이 72px→64px, 배경 투명→흰색+그림자.
│   │   │                       - 현재 경로 강조 (usePathname 훅 사용 → use client 필요).
│   │   │                       - 모바일: 햄버거(Menu 아이콘) → 전체화면 오버레이.
│   │   │                       - [TODO] 카카오톡 채널 ID 확정 후 FloatingCTA에 적용.
│   │   │
│   │   ├── Footer.tsx       ← 하단 footer.
│   │   │                       - 회사정보: 상호·대표·주소·전화·이메일.
│   │   │                       - [TODO] 사업자등록번호, 통신판매업신고번호, 개인정보책임자.
│   │   │                       - 링크: 개인정보처리방침(/privacy), 이용약관(/terms).
│   │   │
│   │   └── FloatingCTA.tsx  ← 우하단 고정 버튼 3개.
│   │                           - 카카오톡 #FEE500 / 전화 #D94A0F / 맨위로 #333333.
│   │                           - 맨위로 버튼: 스크롤 300px 이상 시만 표시.
│   │                           - 각 버튼 hover: 왼쪽으로 라벨 텍스트 슬라이드인.
│   │
│   ├── sections/            ← 페이지 섹션 단위 컴포넌트.
│   │   │                       각 섹션은 독립적이고 여러 페이지에서 재사용 가능하게 설계.
│   │   │
│   │   ├── HeroSection.tsx        ← 히어로 (배경·카피·CTA 버튼)
│   │   ├── PromiseSection.tsx     ← 4가지 약속 (HOME·회사소개 공통 사용)
│   │   ├── CounterSection.tsx     ← 숫자 카운터 (18년·100+·11권·15명)
│   │   ├── ClientLogoSection.tsx  ← 광고주 로고 슬라이더 + 카테고리 탭
│   │   └── CTABannerSection.tsx   ← 하단 오렌지 CTA 배너 (3단계 버튼 포함)
│   │
│   └── ui/                  ← 원자 단위 재사용 컴포넌트.
│       │                       다른 컴포넌트나 페이지에서 import해서 사용.
│       │
│       ├── Button.tsx       ← 버튼 컴포넌트.
│       │                       variants: primary | secondary | ghost | dark.
│       │                       href prop 있으면 Next.js Link, 없으면 <button>.
│       │                       ★ primary 버튼: 섹션당 1개만 (마케팅 원칙).
│       │
│       ├── SectionTitle.tsx ← 섹션 제목 블록.
│       │                       eyebrow(작은 영문 서브타이틀) + title + description.
│       │                       eyebrow: 오렌지, uppercase, letter-spacing 넓게.
│       │
│       ├── CounterCard.tsx  ← 숫자 카운터.
│       │                       Intersection Observer: 뷰포트 진입 시 애니메이션 시작.
│       │                       0 → 목표값, 2초 ease-out. use client 필요.
│       │
│       ├── PromiseCard.tsx  ← 4가지 약속 카드.
│       │                       아이콘(Lucide) + 제목 + 2줄 설명.
│       │                       hover: 오렌지 테두리 transition.
│       │
│       ├── CaseCard.tsx     ← 케이스 스터디 카드.
│       │                       도전과제 / 우리가 한 일 / 결과(Before→After).
│       │                       좌측 4px solid #D94A0F 세로 바.
│       │                       result 수치는 cases.json에서 가져옴.
│       │
│       ├── BookCard.tsx     ← 도서 카드.
│       │                       표지 이미지 + 제목 + 출판사 + 구매 링크.
│       │                       isSelfPublished=true → "투비스토리 출판" 오렌지 배지.
│       │
│       └── FAQAccordion.tsx ← FAQ 아코디언 10개.
│                               max-height transition 250ms ease-out.
│                               기본 3개 열림. use client 필요.
│
├── content/                 ← 정적 데이터 JSON. Phase 1~3에서 사용.
│   │                           Phase 4에서 칼럼·세미나 등은 Sanity로 이관 예정.
│   │                           JSON 수정만으로 데이터 추가 가능 (코드 변경 불필요).
│   │
│   ├── books.json           ← 도서 11권.
│   │                           id·title·subtitle·publisher·year·isbn·
│   │                           coverSrc·purchaseUrl·isSelfPublished·category·featured.
│   │
│   ├── clients.json         ← 광고주 목록.
│   │                           id·name·logoSrc·category(hospital|education|general|public|ngo).
│   │                           현재 샘플 20개. 실제 100+ 수집 후 추가 예정.
│   │
│   ├── cases.json           ← 케이스 스터디.
│   │                           industry·anonymousTitle·challenge·action·result.
│   │                           result 수치: 현재 "[수치 보강 필요]". 대표님 확인 후 채움.
│   │
│   └── columns.json         ← 대표 칼럼.
│                               title·category·date·summary·slug·readingTime.
│                               초기 5개 샘플. Phase 4에서 Sanity로 이관.
│
├── public/
│   └── assets/
│       ├── 01_logo/
│       │   ├── 2bstory_logo.svg       ← [TODO] .ai 파일에서 변환 필요 (디자이너 의뢰)
│       │   ├── 2bstory_logo_white.svg ← [TODO] 흰색 반전 버전 (다크 배경용)
│       │   └── 2bstory_logo.jpg       ← ✅ 보유 (임시 사용 가능)
│       │
│       ├── 06_books/                  ← ✅ 도서 표지 9장 보유 (파일명: ISBN.jpg)
│       │                                 IT재해복구(2002)·유틸리티컴퓨팅(2006) 표지 없음
│       │
│       ├── clients/                   ← 광고주 로고 PNG (아직 비어 있음)
│       │                                 clients.json의 logoSrc 경로에 맞게 추가
│       │
│       ├── photos/                    ← 인물·사무실·강연 사진
│       │                                 ✅ 대표 프로필 사진 1장 보유
│       │                                 ❌ 사무실·팀 사진 미촬영
│       │
│       └── docs/                      ← 다운로드 PDF
│           ├── 2bstory_intro.pdf      ← ✅ 회사소개서 보유
│           └── whitepaper-*.pdf       ← ❌ 백서 3개 내용 미작성
│
├── lib/
│   └── utils.ts             ← cn() 함수(clsx + tailwind-merge) 등 공통 유틸
│
├── styles/
│   └── globals.css          ← Tailwind base import + :root CSS 변수
│
├── tailwind.config.ts       ← 브랜드 컬러·폰트·사이즈 커스텀
│                               ★ brand.DEFAULT = 브랜드 오렌지 (⚠️ 아직 미확정)
│                               값 하나만 바꾸면 전체 반영됨
│
├── next.config.ts           ← 이미지 도메인 허용 목록 등
└── .env.local               ← 환경 변수 (절대 Git에 올리지 않음!)
```

---

## 브랜드 / 디자인 시스템

### 컬러 팔레트

```css
/*
 * ⚠️ 브랜드 오렌지 최종 확정 필요
 *
 * 현재 두 값이 혼재:
 *   #D94A0F — 대표님(사용자)이 직접 명시한 값. 어두운 벽돌 오렌지.
 *   #F4751A — 로고 JPG 파일 픽셀 분석 실측값. 밝고 따뜻한 오렌지.
 *
 * JPG 압축 손실로 인해 #F4751A에 오차 있을 수 있음.
 * 확정 방법: 일러스트레이터에서 assets/01_logo/2bstory_logo.ai 열기
 *            → 스포이트 도구로 오렌지 픽셀 클릭 → HEX 값 복사
 *            → tailwind.config.ts의 brand.DEFAULT에 업데이트
 * 현재: 코드 전체는 #D94A0F 기준으로 작성됨.
 */

:root {
  /* 브랜드 컬러 */
  --brand:         #D94A0F;   /* 메인 오렌지 — 버튼·CTA·아이콘·강조 */
  --brand-hover:   #B83D0C;   /* 호버·액티브 — brand보다 약 15% 어둡게 */
  --brand-light:   #FFF0EB;   /* 연한 오렌지 — CTA 박스 배경, 카드 hover 배경 */

  /* 텍스트 */
  --dark:          #1F1F1F;   /* 히어로 배경, 강한 헤딩, 다크 섹션 */
  --text-primary:  #333333;   /* 본문 기본 텍스트 */
  --text-muted:    #666666;   /* 서브카피, 날짜, 캡션 */
  --text-disabled: #AAAAAA;   /* 비활성 텍스트, 폼 placeholder */

  /* 배경 */
  --bg-base:       #FFFFFF;   /* 기본 흰 배경 */
  --bg-soft:       #F8F8F8;   /* 교대 섹션 배경 (흰 ↔ 이 색 번갈아 사용) */
  --bg-line:       #E5E5E5;   /* 구분선, 카드 테두리 */
}
```

### 타이포그래피

```
폰트 스택: "Pretendard", "Noto Sans KR", sans-serif
선택 이유: Pretendard는 한국어·영문 통합, 가독성 최상, 무료 CDN.
           Noto Sans KR은 Pretendard 로드 실패 시 폴백.

타이포 스케일:
  Display  56px  Bold 700   lh 1.15  → 히어로 메인 카피
  H1       40px  Bold 700   lh 1.20  → 페이지 제목 (각 페이지에 1개만)
  H2       28px  Bold 700   lh 1.30  → 섹션 제목
  H3       22px  SemiBold 600         → 서브섹션 제목, 카드 제목
  Body-lg  18px  Regular 400 lh 1.70 → 강조 본문, 인트로 카피
  Body     16px  Regular 400 lh 1.75 → 기본 본문
  Small    14px  Regular 400          → 부가 텍스트, 버튼 레이블
  Caption  12px  Regular 400          → 날짜, 메타, 배지

모바일 (< 768px) 축소:
  Display → 36px  /  H1 → 28px  /  H2 → 22px  /  Body → 15px
```

### 간격 규칙

```
섹션 상하 패딩 (PC):     96px  (Tailwind: py-24)
섹션 상하 패딩 (모바일): 56px  (Tailwind: py-14)
컨테이너 최대 너비:      1200px (max-w-[1200px] mx-auto)
컨테이너 좌우 패딩:      24px PC / 16px 모바일 (px-6 / px-4)
카드 내부 패딩:          24px ~ 32px (p-6 / p-8)
카드 간격:              24px (gap-6)
```

### 컴포넌트 설계 원칙

```
★ 버튼 Primary (오렌지) 규칙:
  - 섹션당 단 1개만.
  - 이유: 두 개 이상이면 클릭률 급감. (마케팅 대행사의 A/B 테스트 결과)
  - 같은 섹션에 두 번째 CTA가 필요하면 secondary 또는 ghost 사용.

섹션 배경 교대 규칙:
  - 흰색 (#FFFFFF) ↔ 연회색 (#F8F8F8) 번갈아 사용.
  - 시각적 리듬을 만들고 섹션 경계를 자연스럽게 구분.
  - CTA 섹션만 예외: #D94A0F (오렌지) 배경.
  - 히어로, 일부 특별 섹션: #1F1F1F (다크) 배경.

카드 hover 효과:
  - transform: translateY(-4px)
  - box-shadow: 0 8px 24px rgba(0,0,0,0.08)
  - transition: 0.2s ease-out
  - 빠르게 뜨고 천천히 내려오는 느낌.

모바일 반응형:
  - 모든 다열 그리드 → 1열 (grid-cols-1)
  - GNB → 햄버거 메뉴 (Menu 아이콘 → 전체화면 오버레이)
  - 히어로 CTA 버튼 → 가로 배열에서 세로 배열로
  - 텍스트 크기: 위 타이포 스케일 참고
```

---

## 핵심 콘텐츠 (코드에 자주 쓰는 텍스트)

### 4가지 약속 — 전 페이지 일관 적용

```
이 4가지가 투비스토리의 핵심 차별점입니다.
HOME, 회사소개, 대표소개, 산업 페이지 등에 반복 노출.
다른 대행사가 따라할 수 없는 검증 가능한 사실 기반.

약속 1: "광고대행사 중 유일하게, 책으로 검증되었습니다."
  설명: "단독 저서 11권. 매일경제 교육센터 8년 강의."
  아이콘: BookOpen (Lucide)

약속 2: "운영자가 강의하고, 강사가 운영합니다."
  설명: "매일경제·서강대·숙명여대 현역 강사 + 매주 캠페인 직접 검토."
  아이콘: GraduationCap (Lucide)

약속 3: "산업을 압니다. 100여 개의 케이스로 압니다."
  설명: "병원 100+, 가맹 200호점, B2B SaaS, 교육 18년."
  아이콘: Building2 (Lucide)

약속 4: "데이터로 답합니다. 18년의 데이터입니다."
  설명: "GA·GTM·픽셀 직접 세팅. 매체 기여도까지 수치로."
  아이콘: BarChart3 (Lucide)
```

### CTA 3단계 — 모든 페이지 적용

```
이유: 처음 방문자는 "무료 진단 신청"이 부담스러움.
      가벼운 진입 → 중간 → 본격 순서로 자연스럽게 유도해야 전환율이 높음.

🟡 가벼운 진입 (이메일만 요구):
   "백서 무료 다운로드" → /b2b#whitepaper
   "뉴스레터 구독"
   "무료 세미나 신청"

🟠 중간 진입 (이름+회사+전화 요구):
   "30분 무료 마케팅 진단 신청" → /contact?type=diagnosis

🔴 본격 진입 (직접 통화):
   "대표 직통: 010-8718-5000" → tel:010-8718-5000
```

### URL 라우팅 맵

```
/ ─────────── HOME
/about ──────── 회사소개
/about/ceo ──── 대표소개 (신뢰의 핵심 페이지)
/b2b ─────────  B2B마케팅
/hospital ────── 병원마케팅 (★ 가장 중요한 산업 페이지)
/franchise ───── 가맹마케팅
/education ───── 교육마케팅
/web ─────────  홈페이지/영상 제작
/ngo ─────────  NGO마케팅
/etc ─────────  기타마케팅·공공기관
/consulting ──── 교육·컨설팅 상품
/gov ─────────  정부과제
/books ─────── 도서출판 (11권 전시)
/contact ──────  Contact us + FAQ + 오시는 길
/privacy ──────  개인정보처리방침 [법적 필수]
/terms ─────────  이용약관 [법적 필수]
```

---

## 개발 규칙

### 컴포넌트 작성 원칙

```typescript
// ✅ 올바른 컴포넌트 작성 예시
// - Server Component 기본 (파일 상단에 'use client' 없음)
// - props 타입을 interface로 파일 상단에 정의
// - Tailwind 클래스만 사용 (인라인 style 객체 금지)
// - next/image 사용 (<img> 태그 금지)
// - 한국어 주석 허용 (오히려 권장)

/**
 * 4가지 약속 카드 컴포넌트
 *
 * HOME, 회사소개 등 여러 페이지에서 공통으로 사용.
 * PromiseSection.tsx에서 4개를 grid로 배열함.
 */
interface PromiseCardProps {
  icon: React.ComponentType<{ className?: string }>; // Lucide 아이콘
  title: string;       // 약속 제목 (예: "책으로 검증된 유일한 대행사")
  description: string; // 2줄 설명
}

// ❌ 하지 말 것 목록
// 1. 인라인 style 객체 사용
const bad1 = <div style={{ backgroundColor: '#D94A0F' }} />;
// → Tailwind: className="bg-[#D94A0F]"

// 2. <img> 태그 사용
const bad2 = <img src="/logo.png" alt="로고" />;
// → import Image from 'next/image'; <Image ... />

// 3. any 타입 사용
const bad3: any = fetchData();
// → unknown 또는 정확한 타입 정의 사용

// 4. 불필요한 'use client' 남용
// → useState, useEffect, 이벤트 핸들러 없으면 Server Component 유지
```

### 'use client' 사용 기준

```typescript
// ✅ 'use client' 필요한 컴포넌트:
//   - GNB.tsx: usePathname(), 모바일 메뉴 useState
//   - FAQAccordion.tsx: 열림/닫힘 useState
//   - CounterCard.tsx: Intersection Observer (useEffect)
//   - FloatingCTA.tsx: 스크롤 감지 useEffect

// ✅ 'use client' 불필요 (Server Component):
//   - 대부분의 페이지 파일 (app/*/page.tsx)
//   - 정적 섹션 컴포넌트 (HeroSection, PromiseSection 등)
//   - BookCard, CaseCard 등 데이터 표시 컴포넌트
```

### 네이밍 규칙

```
컴포넌트 파일:  PascalCase    → HeroSection.tsx, BookCard.tsx
훅 파일:       camelCase     → useScrollY.ts, useIntersection.ts
유틸 함수:     camelCase     → formatDate.ts, cn.ts
JSON 데이터키: camelCase     → coverSrc, isSelfPublished, purchaseUrl
상수:          SCREAMING     → MAX_OPEN_FAQ, COUNTER_DURATION_MS
CSS 변수:      kebab-case    → --brand, --text-primary, --bg-soft
```

### JSON 데이터 수정 방법

```
광고주 추가:    content/clients.json에 객체 추가. 코드 수정 없음.
칼럼 추가:     content/columns.json에 객체 추가. 코드 수정 없음.
케이스 수치:   content/cases.json의 result 필드 수정.
도서 추가:     content/books.json 추가 + 표지 이미지 public/assets/06_books/ 배치.
로고 추가:     public/assets/clients/에 PNG 배치 + clients.json에 경로 추가.
```

### Git 커밋 규칙

```
feat:     새 기능        → feat: 병원마케팅 케이스 스터디 탭 추가
fix:      버그 수정      → fix: 모바일 GNB 오버레이 z-index 수정
chore:    설정·데이터    → chore: clients.json에 YBM 로고 추가
style:    스타일 조정    → style: 히어로 모바일 패딩 조정
docs:     문서 수정      → docs: README 배포 섹션 업데이트
refactor: 리팩토링       → refactor: CaseCard 공통 컴포넌트로 분리
```

---

## 환경 변수 (.env.local)

```bash
# ──────────────────────────────────────────────────────────
# ⚠️ 이 파일은 절대 Git에 올리지 마세요. .gitignore에 포함됨.
# ──────────────────────────────────────────────────────────

# Formspree: 문의 폼 → 이메일 알림
# 발급: https://formspree.io 가입 → 폼 생성 → Form ID 복사
NEXT_PUBLIC_FORMSPREE_ID=

# Google Analytics 4
# 발급: GA 콘솔 → 속성 생성 → 데이터 스트림 → 측정 ID (G-XXXXXXX 형식)
NEXT_PUBLIC_GA_ID=

# Sanity CMS: Phase 4에서만 사용. 지금은 비워도 됨.
# 발급: https://sanity.io 가입 → 프로젝트 생성
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

---

## 자주 쓰는 명령어

```bash
pnpm dev          # 개발 서버 (http://localhost:3000)
pnpm build        # 프로덕션 빌드 (배포 전 오류 없는지 반드시 확인)
pnpm lint         # ESLint 검사
pnpm type-check   # TypeScript 타입 검사
git push          # main 브랜치 push → Vercel 자동 배포 트리거
```

---

## 현재 진행 단계

```
✅ 완료 (코딩 시작 전 설계 전부 완료)
  - 원고 v3 (18개 페이지 전체 카피)
  - 기술 스펙 확정 (Next.js 15 + Tailwind v4 + Vercel + Formspree)
  - 디자인 시스템 확정 (컬러·서체·간격·컴포넌트)
  - 자산 수집 (로고 .ai/.jpg, 도서 표지 9장, 회사소개서 PDF)
  - CLAUDE.md, TASKS.md, README.md 작성

🚧 다음 작업 (TASK-001부터 순서대로)
  Phase 1: HOME / 회사소개 / 대표소개 / Contact us → Vercel 오픈

⬜ 이후 작업
  Phase 2: 산업 페이지 5개 (병원·B2B·가맹·교육·NGO)
  Phase 3: 나머지 (홈페이지영상·기타·컨설팅·정부과제·도서출판)
  Phase 4: Sanity CMS + SEO + 영상 + 개인정보처리방침
```

---

## ⚠️ 미확정 항목 목록 — [TODO] 처리 후 계속 진행

> 아래 항목을 만나면 멈추지 말고 `{/* [TODO: 항목명] */}` 주석 달고 계속 진행.
> 실제 값이 확정되면 해당 파일만 수정하면 됩니다.

| 항목 | 현재 상태 | 확정 후 수정할 파일 |
|------|-----------|---------------------|
| 브랜드 오렌지 정확값 | #D94A0F 임시 사용 | tailwind.config.ts → brand.DEFAULT |
| 로고 SVG | .ai/.jpg만 보유 | public/assets/01_logo/ |
| 로고 흰색 반전 버전 | 미제작 | public/assets/01_logo/ |
| 카카오톡 채널 ID | 미개설 | components/layout/FloatingCTA.tsx |
| 사업자등록번호 | 미확인 | components/layout/Footer.tsx |
| 통신판매업 신고번호 | 미확인 | components/layout/Footer.tsx |
| 개인정보 책임자 | 미확인 | app/privacy/page.tsx |
| 오시는 길 (지하철·버스) | 미확인 | app/contact/page.tsx |
| 케이스 스터디 수치 | "[수치 보강 필요]" | content/cases.json → result 필드 |
| 대표 영상 YouTube ID | 미촬영 | app/about/ceo/page.tsx |
| 광고주 로고 100+ | 샘플 20개만 | content/clients.json + public/assets/clients/ |
| 백서 PDF 3개 | 내용 미작성 | public/assets/docs/ + b2b/page.tsx 링크 |
| 칼럼 실제 글 5~10편 | 샘플 5개만 | content/columns.json |

---

## ⚠️ 바이브 코딩 마스터 규칙 (필수 — 심진보 마스터 가이드)

> 전체 규칙 원문: `03_바이브코딩_Claude_Code/03-0_바이브코딩_마스터규칙.docx`

### Git 커밋 전 반드시 설정 (배포 차단 방지)

```bash
# Ubuntu 서버 기본값으로 커밋하면 Vercel이 배포를 차단함
# 프로젝트 시작 시 한 번만 실행하면 됨
git config user.name "jbshim1-coder"
git config user.email "jbshim1@gmail.com"
```

### 코딩 시작 전 체크 (자료 없으면 해당 섹션 만들지 않음)

```
- 로고 SVG/PNG    → 없으면 <span> 텍스트 로고. placeholder 이미지 절대 금지.
- 실제 회사 사진   → 없으면 Unsplash 관련 이미지 URL (next.config.ts remotePatterns 추가)
- 개인정보처리방침  → 내용 없으면 페이지 자체 생성 금지. 빈 페이지 절대 금지.
- 실제 연락처/주소  → 더미 데이터 절대 금지 (02-000-0000 금지)
- 실적/연혁 데이터  → 없으면 섹션 자체를 빼거나 숨김 처리
```

### DB/API 연동 패턴

```typescript
const hasDb = false  // DB 마이그레이션 전까지 false 유지. 코드에 명시.
// Blob/파일업로드 → 토큰 미설정 시 비활성화 (500 에러 방지)
// 이메일 → 도메인 미인증 시 onboarding@resend.dev 테스트 모드
// reCAPTCHA → 키 없으면 graceful skip (폼 작동은 계속)
```

### 콘텐츠 SSoT — 이것만은 반드시 지킬 것

```
컴포넌트 .tsx에 한글 직접 입력 금지 → content.ko.json에서만 관리
hex 색상 직접 입력 금지 → tailwind.config.ts + tokens.css 토큰만 사용
```

### AI 티 제거 — 절대 쓰지 말 것

```
텍스트: "혁신적인" "최첨단" "글로벌 리더" "고객 중심" "synergy" "cutting-edge"
        숫자 조작 금지 — 실제 연도·실적만 (20년 노하우 등 근거 없는 숫자 금지)
이미지: 팀원처럼 보이는 Unsplash 인물 / 악수 사진 / 회의실 사진 / 지구본 아이콘
디자인: 무지개 그라디언트 / 카드+아이콘+제목+설명 3단 구성 3번 이상 반복
        "자세히 보기 →" 버튼 남발 / Hero 타이핑 효과 / 근거 없는 신뢰 배지
```

### 이미지 처리 3단계 결정 트리

```
발주처 이미지 있음 → public/images/에 저장, next/image 사용
발주처 이미지 없음 → Unsplash URL 직접 사용 (next.config.ts remotePatterns 추가)
로고 없음         → <span> 텍스트 로고 + 교체 포인트 주석
지도              → iframe 대신 이미지 + 클릭 시 카카오맵/구글맵 링크
```

---

## 출간사례·출판사 등록증 활용 (v3 final)

### 출간사례 4권 (`06-5_출간사례/`)

투비스토리가 "원장님 책 출간 서비스"를 통해 실제로 출판한 클라이언트 책들의 표지입니다.
**표지 이미지만 보유**. 메타정보(제목·저자·연도) 없음.

**활용 위치:**
- 병원마케팅 페이지(`/hospital`) §04 — "실제로 출간된 원장님들의 책" 갤러리
- 도서출판 페이지(`/books`) — 별도 섹션 "투비스토리가 출간한 원장님들의 책"

**구현 원칙:**
- `<Image>` 표지 이미지만 그리드(`md:grid-cols-4`)로 배치
- 제목·저자·구매링크·구매버튼 모두 추가 금지
- 호버 효과·확대 효과 가능 (lightbox 등)
- 캡션은 "원장님 책 출간 서비스를 통해 출판된 실제 사례" 정도로

### 출판사 등록증 (`06-6_legal/`)

투비스토리가 문화체육관광부에 등록된 정식 출판사임을 증명하는 자료.
"광고대행사인데 책도 정식 출판한다"의 법적 근거.

**활용 위치:**
- 도서출판 페이지(`/books`) 헤더 — "문화체육관광부 등록 출판사" 배지 형태로
- 회사소개 페이지(`/about`) — 신뢰 배지 영역

**구현 원칙:**
- 등록증 이미지 자체는 페이지 본문에 직접 노출하지 않음
- "문화체육관광부 등록 출판사" 텍스트 배지로 표시
- 클릭 시 lightbox로 등록증 이미지 확대 (선택사항)
