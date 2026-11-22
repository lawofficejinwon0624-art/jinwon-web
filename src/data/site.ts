export const site = {
  /** 사이트 주소 — .env의 NEXT_PUBLIC_SITE_URL (끝에 / 없이) */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jinwonlaw.co.kr",
  name: "법률사무소 진원",
  nameEn: "JINWON LAW FIRM",
  slogan: "진실의 근원에서, 최선의 결과",
  phone: "1551-4308",
  phoneNote: "24시간 · 연중무휴",
  fax: "02-512-4329",
  /** 홈페이지 전체에서 사용하는 대표번호 */
  mainTel: "1551-4308",
  email: "djbfgood@gmail.com",
  address: "서울특별시 강남구 영동대로 607, 랜드마크빌딩 6층",
  postcode: "06087",
  bizNo: "267-70-00756",
  representative: "권진원",
  subway: "봉은사역 2번출구 12m",
  naverMapUrl:
    "https://map.naver.com/p/search/서울특별시%20강남구%20영동대로%20607",
  kakaoMapUrl: "https://map.kakao.com/link/search/서울 강남구 영동대로 607",
  kakaoChatUrl: "http://pf.kakao.com/_ZzpxnX/chat",
  naverBlogUrl: "https://blog.naver.com/tele4n",
  instagramUrl: "https://www.instagram.com/jinwon_lawfirm/",
  youtubeUrl: "https://www.youtube.com/@법률사무소진원",
  googleMapUrl:
    "https://www.google.com/maps/search/?api=1&query=서울특별시+강남구+영동대로+607",
  googleMapEmbed:
    "https://www.google.com/maps?q=서울특별시+강남구+영동대로+607&z=17&hl=ko&output=embed",
  // 티맵은 모바일 앱 딥링크 (좌표: 영동대로 607 랜드마크빌딩)
  tmapUrl:
    "tmap://route?goalname=법률사무소 진원(랜드마크빌딩)&goalx=127.0605&goaly=37.5145",
} as const;

export const navLinks = [
  { href: "/", label: "홈" },
  { href: "/members", label: "구성원 소개" },
  { href: "/activities", label: "진원의 활동" },
  { href: "/practice", label: "업무분야" },
  { href: "/legal", label: "법률가이드" },
  { href: "/columns", label: "진원 칼럼" },
  { href: "/location", label: "찾아오시는 길" },
] as const;
