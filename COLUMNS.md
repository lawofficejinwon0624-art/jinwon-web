# 진원 칼럼 운영

- 공식 칼럼: https://www.jinwonlaw.co.kr/columns
- 원고/승인/예약/검색 상태: https://jinwon-marketing-hq.vercel.app → 칼럼 관리
- 발행 원본은 HQ PostgreSQL에 저장합니다. 이 저장소에는 공개 화면과 이미지 자산을 보관합니다.

## 채팅에서 키워드를 받았을 때

1. 기존 칼럼/예약 목록을 먼저 확인해 중복 주제를 피합니다.
2. 현행 법령, 공공기관 등 1차 자료를 확인하고 출처 링크를 남깁니다. 다른 로펌 글을 복제하지 않으며 실제 확인하지 않은 사건·성과·변호사 검토를 주장하지 않습니다.
3. 제목, 요약, H2/H3 본문, 검색 제목/설명, 짧은 카드 제목/설명, 주제에 맞는 사진과 alt를 작성합니다.
4. HQ의 `scripts/publish-column.ts`에서 검토 기록과 함께 저장 → 검토 → 승인 → 예약/발행합니다. 기존 글 수정은 최신 버전을 읽고 저장한 뒤 다시 승인합니다.
5. 기본 예약은 한국 시각 09:00·16:00, 하루 최대 신규 3편입니다. 신규 글 자동 생성용 외부 AI API는 연결하지 않습니다. 서버는 준비된 예약 글을 공개하고 검색 작업만 처리합니다.
6. 공개 HTML·카드·사이트맵·RSS를 확인하고 IndexNow 접수와 Google 검사 결과를 확인합니다. 접수와 색인 완료, 검색 순위를 구분해 설명합니다.
7. 텔레그램 칼럼 알림은 사용하지 않습니다.

## 이미지와 본문

- 카드 PNG는 `/columns/[slug]/card.png?v=[modifiedAt]`에서 공개된 원고만 사용해 생성합니다. 목록과 OG에 같은 이미지를 씁니다.
- 사진 원본은 `public/images/columns/*.webp`, 카드용 JPEG는 같은 폴더에 둡니다. WebP를 추가/수정하면 `node scripts/prepare-column-cards.mjs`를 실행해 JPEG와 로고 PNG를 다시 만듭니다.
- 생성 이미지는 실제 사건 현장 사진으로 소개하지 않습니다. 이미지 제작 프롬프트와 라이선스는 원본 작업 기록에 보관합니다.
- 기본 사진은 분야와 소제목에 맞춰 안정적으로 선택됩니다. HQ에서 사진, 소제목 번호, alt, 설명을 개별 지정할 수 있습니다.
- 임의 외부 사진 URL과 HTML은 허용하지 않습니다. 신규 이미지 자산은 저장소에 추가한 후 배포합니다.
- 한글 카드 글꼴은 Nanum Gothic Bold이며 `assets/OFL.txt` 라이선스를 함께 배포합니다.

## SEO와 검증

- 본문/목차/이미지/링크는 서버 HTML로 제공됩니다. 고유 title/description/canonical, H1 1개, Article/Breadcrumb JSON-LD, OG 카드가 포함됩니다.
- `/sitemap.xml`과 `/columns/feed.xml`은 공개 시각이 지난 글만 제공합니다. RSS는 안전하게 변환한 본문과 이미지 URL을 포함합니다.
- 네이버 IndexNow는 발행/수정/공개중단을 알립니다. Google은 조회 전용 Search Console API로 상태를 확인합니다. 실제 색인 및 노출 순위는 검색엔진이 결정합니다.
- `npm run build` 후 공개 페이지의 HTTP 상태, canonical/H1/JSON-LD, 카드 PNG, 모바일 폭, sitemap/RSS를 확인합니다.
