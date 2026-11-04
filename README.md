# 법률사무소 진원 — 웹사이트

법률사무소 진원 홈페이지 (https://www.jinwonlaw.co.kr).
Next.js 16 (App Router) + Tailwind CSS v4. 모든 페이지를 정적으로 생성하며 서버와 DB는 없습니다.

```bash
npm install
npm run dev    # 개발 서버 http://localhost:3000
npm run build  # 프로덕션 빌드
```

Node.js 20 이상.

## 환경 변수

`.env.example`을 `.env`로 복사해 값을 채웁니다.

| 이름 | 용도 | 비어 있으면 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | 사이트 주소 (sitemap · robots · OG · 구조화 데이터) | `https://www.jinwonlaw.co.kr` |
| `NAVER_SITE_VERIFICATION` | 네이버 서치어드바이저 소유 확인 메타 태그 | 태그 생략 |
| `GOOGLE_SITE_VERIFICATION` | 구글 서치 콘솔 소유 확인 메타 태그 | 태그 생략 |

## 페이지

| 경로 | 내용 |
|---|---|
| `/` | 홈 — 히어로 영상, 승소사례 티커, 사건 챕터 2개(교통사고 · 보험분쟁), 실시간 상담 피드, 구성원 미리보기 |
| `/members` | 구성원 소개 |
| `/members/[slug]` | 구성원 개별 프로필 |
| `/activities` | 진원의 활동 (사진 슬라이더) |
| `/practice` | 업무분야 |
| `/legal` | 법률가이드 (FAQ) |
| `/location` | 찾아오시는 길 |
| `/consult` | 상담 안내 (전화 · 카카오톡) |

## 구조

```
src/
├─ app/          페이지, 메타데이터(layout.tsx), sitemap · robots, 폰트, 디자인 토큰(globals.css)
├─ components/   공통 컴포넌트와 페이지별 컴포넌트 (home · activities · consult · legal · members)
└─ data/         사이트 내용 — 연락처, 구성원, 활동, 업무분야, FAQ, 상담 피드
public/
├─ images/       로고, 구성원 사진(members/), 활동 사진(activities/), 장면 이미지
├─ videos/       히어로 배경 영상
└─ og-v*.jpg     공유용 OG 이미지
```

| 내용 | 파일 |
|---|---|
| 전화번호 · 이메일 · 주소 · 사업자정보 · SNS · 지도 링크 | `src/data/site.ts` |
| 구성원 (배열 순서 = 화면 순서) | `src/data/members.ts` |
| 진원의 활동 | `src/data/activities.ts` |
| 업무분야 | `src/data/practices.ts` |
| 법률가이드 FAQ | `src/data/legal.ts` |
| 실시간 상담 피드 | `src/data/consultations.ts` |
| 승소사례 티커 | `src/components/home/Ticker.tsx` |
| 검색 결과 제목 · 설명 · OG 이미지 | `src/app/layout.tsx` |

- **실시간 상담 피드**는 날짜를 시드로 한 난수로 그날의 목록을 만들고, 현재 시각 이전 항목만 보여줍니다. 실제 접수 데이터와 연결되어 있지 않습니다.
- **상담 신청 폼은 없고** 전화와 카카오톡 채널로만 받습니다.
- 폰트: Pretendard(자체 호스팅, `src/app/fonts/`), Noto Serif KR · DM Mono(`next/font/google`).
