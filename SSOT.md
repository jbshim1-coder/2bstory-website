# SSoT (Single Source of Truth) — 진실의 단일 출처

> AI가 여러 개이거나, 여러 파일이 있을 때 충돌이 생긴다.
> "어느 파일이 진짜인가"를 미리 정해두면 충돌이 없다.
> 이 파일이 그 기준이다.

---

## 원칙

**어떤 값이든 SSoT 파일에 있는 것이 최종 기준이다.**
- AI가 다른 값을 만들어도 SSoT가 이긴다
- 사람이 수정할 때도 SSoT부터 수정하고, 코드는 그 다음
- SSoT 변경은 사람이 결정 — 자동화 금지

---

## 영역별 SSoT 파일

| 영역 | SSoT 파일 | 설명 |
|------|-----------|------|
| **사이트 텍스트·카피** | `content/*.json` | 원고 docx는 기획 문서. 코드에서 쓰는 실제 텍스트는 JSON이 기준. |
| **브랜드 컬러·폰트** | `tailwind.config.ts` | globals.css의 CSS 변수와 동기화. 값이 다르면 tailwind.config.ts가 우선. |
| **CSS 변수** | `styles/globals.css` | tailwind.config.ts와 값이 일치해야 함. |
| **회사 정보·메뉴** | `CLAUDE.md` (프로젝트 컨텍스트 섹션) | 전화번호, 주소, 메뉴 구조. |
| **미확정 항목** | `OPEN_ITEMS.md` | [TODO] 항목의 현재 상태와 임시 대응. |
| **폴더 구조·아키텍처** | `CLAUDE.md` (폴더 구조 섹션) | |
| **개발 규칙** | `CLAUDE.md` (개발 규칙 섹션) | |
| **작업 순서** | `TASKS.md` | Phase별 태스크 목록. |
| **광고주 목록** | `content/clients.json` | |
| **도서 목록** | `content/books.json` | |
| **케이스 스터디** | `content/cases.json` | |
| **칼럼 목록** | `content/columns.json` | |
| **환경 변수 목록** | `.env.example` | 실제 값은 `.env.local`. 목록은 `.env.example`. |

---

## 자주 헷갈리는 것들

### 원고 docx vs content/*.json — 뭐가 기준인가

```
원고 v3.docx      → 기획 문서. 사람이 읽고 카피를 확인하는 용도.
content/*.json    → 코드가 실제로 읽는 데이터. 코딩 기준.

원고와 JSON이 다르면 → JSON을 원고에 맞게 수정.
JSON과 원고가 다르면 → JSON이 코드 기준이므로 JSON대로 표시됨.
```

### CLAUDE.md vs DEVELOPER_GUIDE.md — 뭐가 기준인가

```
CLAUDE.md           → 프로젝트 컨텍스트. Claude Code가 읽음. 설계 결정의 기준.
DEVELOPER_GUIDE.md  → 새 개발자를 위한 설명서. CLAUDE.md를 쉽게 풀어쓴 것.

두 파일이 다른 말을 하면 → CLAUDE.md가 기준.
DEVELOPER_GUIDE.md는 CLAUDE.md 변경 후 동기화.
```

### tailwind.config.ts vs globals.css — 뭐가 기준인가

```
tailwind.config.ts   → 브랜드 컬러·폰트·사이즈 등록. Tailwind 클래스의 기준.
globals.css (:root)  → CSS 변수 선언. JavaScript에서 getComputedStyle로 읽을 때.

두 파일의 색상 값은 항상 동일해야 함.
다르면 tailwind.config.ts가 기준 → globals.css를 맞춤.
```

---

## AI에게 주는 지침

Claude Code가 이 파일을 읽었을 때 지켜야 할 규칙:

```
1. 새 텍스트를 만들 때
   → content/*.json에 먼저 추가 → 컴포넌트에서 import해서 사용
   → 컴포넌트에 한국어 텍스트를 하드코딩하지 않는다

2. 브랜드 컬러를 쓸 때
   → `bg-brand`, `text-brand` Tailwind 클래스 사용
   → `#D94A0F` 헥스값을 직접 쓰지 않는다 (tailwind.config.ts에 등록된 토큰만)

3. 회사 정보(전화번호, 주소 등)를 쓸 때
   → CLAUDE.md에 있는 값을 그대로 사용
   → 다른 파일에서 다른 값을 봤으면 CLAUDE.md가 기준

4. [TODO] 항목을 만날 때
   → OPEN_ITEMS.md의 "임시 대응" 방법을 따름
   → 임의로 값을 추측해서 넣지 않음
   → 코드에 `{/* ⚠️ OPEN [코드]: 내용 */}` 주석 달고 진행

5. 충돌이 생길 때
   → 위 SSoT 표를 보고 어느 파일이 기준인지 확인
   → 모르면 작업을 멈추고 "어느 파일이 기준입니까?" 질문
```

---

## SSoT 업데이트 절차

값이 확정되면 아래 순서로 업데이트:

```
예시: 브랜드 오렌지가 #D94A0F → #F4751A로 확정됨

1. tailwind.config.ts의 brand.DEFAULT 수정
2. styles/globals.css의 --brand 수정 (동기화)
3. OPEN_ITEMS.md에서 B-1 항목 ✅ 완료 표시
4. CLAUDE.md의 미확정 항목 표에서 제거
5. pnpm build로 빌드 확인
```

```
예시: 케이스 스터디 수치 확정

1. content/cases.json의 해당 항목 result 필드 업데이트
2. OPEN_ITEMS.md에서 I-5 항목 ✅ 완료 표시
3. 자동으로 전체 산업 페이지에 반영됨 (코드 수정 불필요)
```

---

## 추가 SSoT (v3 final)

### 출간사례 4권 — 표지만 사용

| 영역 | SSoT 파일 |
|------|-----------|
| 출간사례 표지 메타 | `content/books.json` → `publishingCases.covers` |
| 출간사례 표지 이미지 | `public/assets/06_books/cases/[ISBN].jpg` |

**규칙:** 출간사례는 표지 이미지만 사용. 제목·저자·연도·구매링크 추가 금지. 사용자가 메타정보를 제공하기 전까지 갤러리 노출만.

### 출판사 등록증

| 영역 | SSoT 파일 |
|------|-----------|
| 등록증 이미지 | `public/assets/legal/출판사_등록증.png` |
| 노출 위치 | 도서출판 페이지(`/books`) 헤더 + 회사소개(`/about`) 신뢰 배지 |
| 표시 텍스트 | "문화체육관광부 등록 출판사" |
