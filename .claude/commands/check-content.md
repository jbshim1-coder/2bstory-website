# /check-content — 콘텐츠 미완성 항목 전체 점검

## 사용법
```
/check-content
/check-content --page hospital
/check-content --type todo
/check-content --type data
```

---

## 이 커맨드가 하는 일

사이트 전체에서 아직 채워지지 않은 항목을 찾아 리포트를 출력합니다.

1. 코드의 `[TODO]` 주석 검색
2. `content/cases.json`의 `[수치 보강 필요]` 검색
3. `content/clients.json`의 `logoSrc`가 빈 항목 검색
4. `content/books.json`의 `coverSrc`가 빈 항목 검색
5. Footer의 `[TODO]` 항목 검색
6. 환경변수 미설정 항목 확인

---

## 실행 프롬프트 (Claude Code가 이 내용을 그대로 실행)

아래 작업을 수행해서 미완성 항목 전체를 리포트해줘.

### Step 1 — TODO 주석 검색
```bash
grep -rn "\[TODO\]" app/ components/ content/ --include="*.tsx" --include="*.ts" --include="*.json" --include="*.md"
```

### Step 2 — 케이스 스터디 수치 확인
```bash
grep -n "수치 보강 필요" content/cases.json
```
결과를 보고 industry별로 몇 개가 미완성인지 알려줘.

### Step 3 — JSON 데이터 빈 항목 확인
```bash
node -e "
const cases = require('./content/cases.json');
const clients = require('./content/clients.json');
const books = require('./content/books.json');

console.log('=== Cases (수치 미완성) ===');
cases.cases.filter(c => c.result.includes('보강')).forEach(c =>
  console.log('  ❌', c.id, '—', c.anonymousTitle)
);

console.log('=== Clients (로고 없음) ===');
clients.clients.filter(c => !c.logoSrc || c.logoSrc === '').forEach(c =>
  console.log('  ❌', c.name)
);

console.log('=== Books (표지 없음) ===');
books.books.filter(b => !b.coverSrc || b.coverSrc === '').forEach(b =>
  console.log('  ❌', b.title)
);
"
```

### Step 4 — 환경변수 확인
```bash
# .env.local에서 빈 값 찾기
grep -E "=$" .env.local 2>/dev/null || echo ".env.local 파일 없음"
```

### Step 5 — 리포트 출력
위 결과를 아래 형식으로 정리해줘:

```markdown
# 콘텐츠 점검 리포트
생성일: [날짜]

## 🔴 즉시 처리 필요
- [ ] ...

## 🟠 오픈 전 처리 필요
- [ ] ...

## 🟡 이후 처리 가능
- [ ] ...

## ✅ 완료된 항목
- [x] ...

전체 TODO: N개 / 완료: M개 / 미완료: K개
```

---

## 자동 수정 옵션

`/check-content --fix-placeholders` 를 추가하면:
- `[수치 보강 필요]`가 있는 케이스를 빌드 시 "케이스 데이터 준비 중입니다" 라는 안전한 UI로 자동 렌더링
- 로고 없는 클라이언트는 회사명 텍스트로 fallback 처리

---

## 권장 사용 시점

- Phase 1 오픈 직전 전체 점검
- 매 Phase 완료 시 점검
- 발주처에서 자료를 받았을 때 입력 후 점검
