# 나만의 번역기

한 번 API 키를 넣어두면, 공유한 링크로 들어온 사람은 **키 입력 없이** 그대로 사용할 수 있습니다.

---

## 배포 방법 (Vercel, 무료)

**넣을 링크는 없습니다.** Vercel에 프로젝트만 올리면 **Vercel이 주소(링크)를 만들어 줍니다.**

### 1단계: GitHub에 코드 올리기

1. [github.com](https://github.com) 로그인 후 **New repository** 로 새 저장소 하나 만듦 (이름 예: `my-translator`).
2. PC에서 **번역기** 폴더를 해당 저장소와 연결해서 푸시합니다.
   - GitHub 데스크톱 쓰면: 해당 폴더를 리포지토리로 추가한 뒤 **Publish**.
   - 터미널 쓰면:
     ```bash
     cd "c:\Users\pjk38\Desktop\번역기"
     git init
     git add .
     git commit -m "first"
     git branch -M main
     git remote add origin https://github.com/내아이디/저장소이름.git
     git push -u origin main
     ```
     (`내아이디/저장소이름` 은 본인 GitHub 주소로 바꾸세요.)

### 2단계: Vercel에서 배포하기

1. [vercel.com](https://vercel.com) 접속 → **Sign Up** (GitHub 계정으로 로그인하면 편함).
2. **Add New…** → **Project**.
3. **Import Git Repository** 에서 방금 만든 GitHub 저장소 선택 → **Import**.
4. **Configure Project** 화면에서:
   - **Root Directory** 는 비워 두거나 `./` 그대로.
   - **Deploy** 클릭.
5. 배포가 끝나면 **"Congratulations"** 화면이 나옵니다.  
   여기 나오는 주소가 **당신 번역기 링크**입니다.  
   예: `https://my-translator-xxxx.vercel.app`  
   → 이 주소를 브라우저 주소창에 넣거나, 휴대폰/친구에게 공유하면 됩니다.

### 3단계: API 키 넣기 (한 번만)

1. Vercel 대시보드에서 방금 만든 **프로젝트** 클릭.
2. 위 메뉴에서 **Settings** → 왼쪽 **Environment Variables**.
3. **Add**:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** OpenAI API 키 (`sk-...` 형태, [platform.openai.com/api-keys](https://platform.openai.com/api-keys) 에서 발급)
4. **Save** 한 뒤, **Deployments** 탭으로 가서 맨 위 배포 오른쪽 **⋯** → **Redeploy** 해 주면 적용됩니다.

이후에는 **2단계에서 나온 그 링크**로 접속해서 쓰면 됩니다. (추가로 넣을 링크는 없음.)

---

## 공유해서 쓰는 방법

- 배포 후 나온 **Vercel 링크**(예: `https://xxx.vercel.app`)를 친구/동료에게 보내면 됩니다.
- 그 링크로 들어온 사람은 API 키 입력 없이 바로 번역·이미지 인식을 쓸 수 있습니다. (당신 OpenAI 사용량으로 동작)

## 로컬에서만 쓰는 경우

- `index.html`을 브라우저로 연 뒤, 상단에 **API 키를 입력하고 [저장]** 하면 해당 PC에서만 사용할 수 있습니다.
- 이 경우에는 **파일을 공유해도** 받는 사람 브라우저에는 API 키가 없으므로, 받는 사람은 각자 자기 API 키를 넣어야 합니다.  
  → 남에게 그대로 쓸 수 있게 하려면 **반드시 Vercel 등에 배포한 링크**를 공유하세요.

## 폴더 구조

- `index.html` — 프론트 페이지
- `api/translate.js` — Vercel 서버리스 API (환경변수 `OPENAI_API_KEY` 사용)
