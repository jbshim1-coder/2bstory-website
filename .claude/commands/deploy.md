# /deploy — 배포 전 체크 및 Vercel 배포

## 사용법
```
/deploy
/deploy --preview    # 프리뷰 URL만 생성 (main에 merge 안 함)
/deploy --prod       # 프로덕션 배포 (main 브랜치)
```

---

## 이 커맨드가 하는 일

1. 빌드 오류 점검
2. TypeScript 타입 검사
3. ESLint 검사
4. 미완성 TODO 항목 경고
5. Git commit & push
6. Vercel 배포 확인

---

## 실행 프롬프트

다음 순서로 배포 준비를 진행해줘.

### Step 1 — 빌드 검사 (오류 있으면 배포 중단)
```bash
pnpm build
```
오류가 있으면 즉시 알려주고 수정 후 다시 진행.

### Step 2 — TypeScript 검사
```bash
pnpm type-check
```

### Step 3 — 린트 검사
```bash
pnpm lint
```

### Step 4 — TODO 경고 확인
```bash
TODO_COUNT=$(grep -rn "\[TODO\]" app/ components/ --include="*.tsx" --include="*.ts" | wc -l)
echo "⚠️  남은 TODO 항목: ${TODO_COUNT}개"
grep -rn "\[TODO\]" app/ components/ --include="*.tsx" --include="*.ts" | head -10
```
TODO가 10개 이상이면 배포 전 확인 여부를 물어봐줘.

### Step 5 — Git 커밋 및 푸시
```bash
git add .
git status  # 변경 파일 목록 확인
```
커밋 메시지를 제안해줘 (변경된 파일을 보고 적절한 메시지 작성).
```bash
git commit -m "[커밋 메시지]"
git push origin main
```

### Step 6 — 배포 확인 안내
```
✅ 배포가 시작되었습니다.

Vercel 대시보드에서 진행 상황을 확인하세요:
→ https://vercel.com (로그인 후 프로젝트 선택)

배포 완료까지 약 1~2분 소요됩니다.
완료 후 https://www.2bstory.com 에서 확인하세요.
```

---

## 주의사항

- `main` 브랜치에 push하면 즉시 프로덕션 배포
- 큰 변경은 별도 브랜치에서 작업 후 PR → merge
- `.env.local`은 절대 커밋하지 않음 (`.gitignore`에 포함됨)
