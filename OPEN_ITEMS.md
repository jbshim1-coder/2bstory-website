# OPEN ITEMS — 코딩 전·중 발주처 확인 사항

> 단순한 TODO 목록이 아니다.
> 각 항목마다 **지금 상태 → 코드 영향 → 임시 대응 → 확정 후 처리**를 정의한다.
> 이게 있어야 자료 없이도 코딩이 멈추지 않는다.

표시 규칙:
- 🔴 **Blocking** — 없으면 코드가 막히거나 잘못된 값으로 진행됨
- 🟡 **Important** — 코딩은 가능하나 오픈 전 반드시 채워야 함
- 🟢 **Nice to have** — 운영 단계에서 채워도 됨

---

## 🔴 Blocking — 즉시 확인 필요

### B-1. 브랜드 오렌지 색상 정본

**현재 상태:**
- 사용자(대표님) 명시값: `#D94A0F` (어두운 벽돌 오렌지)
- 로고 JPG 픽셀 분석값: `#F4751A` (밝고 따뜻한 오렌지)
- JPG 압축 손실로 두 값이 다름. 어느 쪽이 진짜인지 불명.

**코드 영향:**
- `tailwind.config.ts` → `brand.DEFAULT`
- `styles/globals.css` → `--brand`
- 모든 버튼, CTA 배너, 강조 텍스트, 배지 전체에 반영

**임시 대응:**
`#D94A0F` (사용자 명시값)로 전체 진행. 주석으로 표시:
```css
/* ⚠️ OPEN B-1: .ai 파일 확인 후 확정 필요. 현재 #D94A0F 임시 사용 */
--brand: #D94A0F;
```

**확정 후 처리:**
1. 일러스트레이터에서 `2bstory_logo.ai` 열기
2. 스포이트 도구로 오렌지 클릭 → HEX 복사
3. `tailwind.config.ts`의 `brand.DEFAULT` 한 줄만 수정
4. 전체 자동 반영

---

### B-2. 로고 SVG 파일

**현재 상태:**
- `.ai` (벡터 원본) ✅ 보유
- `.jpg` (래스터) ✅ 보유
- `.svg` ❌ 없음
- 흰색 반전 버전 ❌ 없음

**코드 영향:**
- `components/layout/GNB.tsx` → 로고 표시
- `components/layout/Footer.tsx` → 흰색 반전 로고
- `app/about/ceo/page.tsx` → 대표 소개 섹션

**임시 대응:**
SVG 없는 동안 텍스트 fallback:
```tsx
{/* ⚠️ OPEN B-2: 로고 SVG 준비 전 텍스트 사용 */}
{logoExists
  ? <Image src="/assets/01_logo/2bstory_logo.svg" ... />
  : <span className="font-black text-xl text-brand">2BSTORY</span>
}
```

**확정 후 처리:**
1. 디자이너에게 `.ai → .svg` 변환 의뢰
2. 흰색 반전 버전도 함께 (`2bstory_logo_white.svg`)
3. `public/assets/01_logo/`에 배치
4. GNB, Footer의 fallback 코드 제거

---

### B-3. Formspree Form ID

**현재 상태:**
미발급. `.env.local`의 `NEXT_PUBLIC_FORMSPREE_ID` 빈 값.

**코드 영향:**
- `app/contact/page.tsx` → 문의 폼 제출
- `app/b2b/page.tsx` → 백서 다운로드 폼
- Formspree ID 없으면 폼 제출 시 에러 발생

**임시 대응:**
개발 중에는 폼 제출을 콘솔 로그로 대체:
```tsx
const handleSubmit = async (e) => {
  if (!process.env.NEXT_PUBLIC_FORMSPREE_ID) {
    console.log('[DEV] 폼 데이터:', formData); // ⚠️ OPEN B-3
    alert('개발 환경: 실제 발송 안 됨');
    return;
  }
  // 실제 Formspree 처리
};
```

**확정 후 처리:**
1. formspree.io 가입 → 폼 생성
2. Form ID 복사 → `.env.local`에 입력
3. Vercel 환경변수에도 동일하게 등록
4. fallback 코드 제거

---

## 🟡 Important — 오픈 전 반드시 필요

### I-1. 카카오톡 채널 ID

**현재 상태:** 채널 미개설

**코드 영향:**
```
components/layout/FloatingCTA.tsx → 카카오톡 버튼 href
app/contact/page.tsx → 연락처 카드
```

**임시 대응:**
```tsx
{/* ⚠️ OPEN I-1: 카카오 채널 ID 확정 전 전화 연결로 대체 */}
<a href={process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || 'tel:070-8676-7132'}>
  <KakaoIcon />
</a>
```

**확정 후 처리:**
채널 URL 형식: `https://pf.kakao.com/_[채널ID]`
`.env.local`에 `NEXT_PUBLIC_KAKAO_CHANNEL_URL` 추가 → FloatingCTA.tsx 업데이트

---

### I-2. 사업자등록번호·통신판매업 신고번호

**현재 상태:** 미확인

**코드 영향:**
```
components/layout/Footer.tsx
app/privacy/page.tsx (처리자 정보)
```

**임시 대응:**
```tsx
{/* ⚠️ OPEN I-2 */}
<span>사업자등록번호: [확인 중]</span>
<span>통신판매업신고번호: [확인 중]</span>
```

**확정 후 처리:**
`components/layout/Footer.tsx`에서 텍스트 2줄 수정. 5분 작업.

---

### I-3. 개인정보 보호책임자 이름·직함

**현재 상태:** 미확인

**코드 영향:**
```
app/privacy/page.tsx → 개인정보처리방침 내 책임자 정보 테이블
```

**임시 대응:**
```tsx
{/* ⚠️ OPEN I-3 */}
성명: '[확인 필요]', 직책: '[확인 필요]'
```

**법적 고려:** 개인정보처리방침에 책임자 정보 없으면 개인정보보호법 위반. 오픈 전 필수.

---

### I-4. 오시는 길 — 지하철·버스·주차 정보

**현재 상태:** 미확인. 주소(강남구 역삼로 123)만 있음.

**코드 영향:**
```
app/contact/page.tsx → §05 오시는 길 섹션
```

**임시 대응:**
```tsx
{/* ⚠️ OPEN I-4 */}
지하철: <span className="text-gray-400">[준비 중]</span>
버스: <span className="text-gray-400">[준비 중]</span>
```

**확정 후 처리:**
1. 역삼로 123을 카카오맵에서 검색
2. 가장 가까운 역·출구·도보 시간 확인
3. 인근 버스 정류장·노선 확인
4. `app/contact/page.tsx` 텍스트 업데이트

---

### I-5. 케이스 스터디 수치

**현재 상태:**
`content/cases.json`의 `result` 필드가 전부 `"[수치 보강 필요]"`.

**코드 영향:**
```
app/hospital/page.tsx → 케이스 스터디 섹션
app/b2b/page.tsx
app/franchise/page.tsx
app/education/page.tsx
app/ngo/page.tsx
```

**임시 대응:**
수치가 없는 케이스는 결과 섹션을 "준비 중" UI로 표시:
```tsx
{c.result.includes('보강 필요')
  ? <div className="text-sm text-gray-400 italic">케이스 데이터 준비 중</div>
  : <div className="text-3xl font-black text-brand">{c.result}</div>
}
```

**확정 후 처리:**
익명화된 Before/After 수치를 `content/cases.json`의 `result` 필드에 입력.
예: `"신환 수 43% 증가 / CPA 31% 감소 (3개월, 강남 안과 의원)"`

---

### I-6. 광고주 로고 게재 동의

**현재 상태:**
`content/clients.json`에 20개 샘플 있음. 실제 동의 받은 명단 불명.

**법적 고려:**
로고는 저작권이 있음. 동의 없이 사용하면 법적 문제. 특히 대기업(HP, CJ, GS 등).

**임시 대응:**
동의받은 로고만 `logoSrc` 입력. 미동의 로고는 회사명 텍스트만:
```tsx
{client.logoSrc
  ? <Image src={client.logoSrc} alt={client.name} />
  : <span className="text-sm font-medium text-gray-500">{client.name}</span>
}
```

**확정 후 처리:**
1. `docs/05_발주처_협의자료/02_고객사_로고게재_동의서.docx` 활용
2. 동의받은 회사 목록 → `clients.json` logoSrc 입력
3. 로고 이미지 `public/assets/clients/`에 배치

---

### I-7. GA4 측정 ID

**현재 상태:** 미발급. `NEXT_PUBLIC_GA_ID` 빈 값.

**코드 영향:**
`app/layout.tsx` → GA 스크립트. 없으면 방문자 데이터 수집 안 됨.

**임시 대응:**
개발 중에는 GA 스크립트 비활성화 (빌드 오류 없음):
```tsx
{process.env.NEXT_PUBLIC_GA_ID && (
  <Script src={`https://...${process.env.NEXT_PUBLIC_GA_ID}`} />
)}
```

**확정 후 처리:**
1. analytics.google.com → 속성 생성
2. 측정 ID (G-XXXXXXX) 복사
3. `.env.local` + Vercel 환경변수 등록

---

## 🟢 Nice to have — 나중에 처리

| 항목 | 내용 | 처리 시점 |
|------|------|-----------|
| **대표 영상 YouTube ID** | 1분 영상 촬영 → 업로드 → ID 입력 | Phase 4 |
| **백서 PDF 3개 본문** | B2B KPI 가이드·리드단가 벤치마크·MA 체크리스트 | Phase 3 |
| **칼럼 초기 글 5~10편** | 실제 글 작성 후 `columns.json` 추가 | Phase 4 |
| **Sanity CMS 연동** | 직원이 웹 UI로 칼럼 관리 | Phase 4 |
| **광고주 로고 100개** | 수집 중. 동의받은 것부터 순차 추가 | Phase 2+ |
| **사무실 사진 4~6컷** | 촬영 필요 | Phase 2 |
| **대표 강연 사진** | 매일경제 강연 컷 추가 | Phase 2 |
| **네이버 서치어드바이저** | 사이트 등록 → 인증 코드 | Phase 4 |

---

## 코드 내 OPEN 항목 추적 방법

Claude Code가 작업 중에 미확정 항목을 만나면:
1. `{/* ⚠️ OPEN [코드]: [내용] */}` 주석 달고 진행
2. placeholder 값으로 계속 코딩
3. `/check-content` 커맨드로 전체 OPEN 항목 리포트 확인

```bash
# 전체 OPEN 항목 확인
grep -rn "⚠️ OPEN" app/ components/ --include="*.tsx"
```

---

## 항목별 담당 (확정 시 연락)

| 항목 | 확인 방법 |
|------|-----------|
| 브랜드 오렌지 | 디자이너 → 로고.ai 스포이트 추출 |
| 로고 SVG | 디자이너 → 변환 의뢰 |
| Formspree ID | formspree.io 가입 (대표님 직접) |
| 카카오채널 | 카카오 비즈니스 채널 개설 (대표님) |
| 사업자번호 | 사업자등록증 확인 |
| 케이스 수치 | 대표님 → 익명화 후 전달 |
| 로고 게재 동의 | 동의서 발송 → 회신 취합 |
| GA4 | analytics.google.com (대표님 또는 담당자) |

---

## 추가 항목 (v3 final 갱신 시 추가)

### I-8. 도서 4권의 출간연도 확인

**현재 상태:** `06-4_books_cover/_도서메타정보.csv`의 4개 항목에 `[연도확인필요]` 표시.

| ISBN | 도서명 | 현재 |
|------|--------|------|
| 9791157833306 | 병원 개원 마케팅 이기는 전략 | [연도확인필요] |
| 9791198859907 | 원장님을 위한 자가 진단 KIT | [연도확인필요] |
| 9791198859921 | AI 시대 타깃 광고 이기는 전략 | [연도확인필요] |
| 9791198859976 | 의사를 위한 AI 출판 가이드 | [연도확인필요] |

**코드 영향:**
`content/books.json`의 `year` 필드 (`null`로 진행 중, `yearTodo: "[연도 확인 필요]"` 마킹)

**임시 대응:**
연도 미상인 책은 도서 카드에서 출간연도를 표시하지 않음. 출판사명만 표시.

**확정 후 처리:**
ISBN으로 알라딘·교보문고에서 검색 → CSV 및 books.json 업데이트.

---

### I-9. 출간사례 4권 활용 — 표지만 사용 (확정)

**현재 상태:**
`06-5_출간사례/`의 4권 표지 이미지만 보유. 메타정보(제목·저자·연도·구매링크) 없음.

**활용 방침 확정:**
표지 이미지만으로 갤러리 노출. 클릭해도 상세 페이지 없음.

**코드 영향:**
- `app/hospital/page.tsx` §04 원장님 책 출간 서비스 섹션
- `app/books/page.tsx` §03 출간사례 갤러리 섹션
- `content/books.json`의 `publishingCases.covers` 배열

**구현 예시:**
```tsx
{books.publishingCases.covers.map(cover => (
  <div key={cover.id} className="aspect-[2/3]">
    <Image src={cover.coverSrc} alt="원장님 책 출간 사례" fill />
  </div>
))}
{/* 텍스트·링크 없음. 갤러리 형태로만 표시. */}
```

---

### I-10. 출판사 등록증 활용

**현재 상태:**
`06-6_legal/출판사_등록증.png` 보유. 문화체육관광부 등록 출판사임을 증명.

**활용 방침:**
1. **도서출판 페이지(`/books`) 헤더 영역**에 "문화체육관광부 등록 출판사" 신뢰 배지로 노출
2. 클릭 시 등록증 이미지 lightbox로 확대 보기 (선택사항)
3. **회사소개 페이지(`/about`)** 의 신뢰 배지 영역에 작은 사이즈로 노출 (선택사항)

**구현 예시:**
```tsx
<div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
  <CheckCircle className="text-brand" />
  <span>문화체육관광부 등록 출판사</span>
</div>
```
