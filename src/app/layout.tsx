import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, DM_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContactDock from "@/components/QuickContactDock";
import { site } from "@/data/site";
import { practices } from "@/data/practices";

// Pretendard 가변 폰트 — 공식 Next.js 권장 방식(자체 호스팅).
// weight 범위를 지정하지 않으면 WebKit에서 굵기가 잘못 렌더링될 수 있다.
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const serifKr = Noto_Serif_KR({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif-kr",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

/**
 * 메타 문구는 목적별로 분리한다.
 * SEARCH_* — 검색 결과용: 실제 검색 키워드 + 지역 + 전화번호(클릭 유도)
 * SOCIAL_* — 카톡/SNS 공유용: 키워드 나열이 아니라 감정적 후킹
 */
const SEARCH_DESCRIPTION =
  "교통사고 사망·중상해, 산재·근재, 보험분쟁 전문 변호사. 사고 직후 72시간이 결과를 바꿉니다 — 현장확인 즉시 대응, 손해사정사·행정사가 한 팀으로. 강남 봉은사역 2번출구, 24시간 상담 1551-4308.";

const SOCIAL_TITLE = `${site.name} — 당신의 목소리에 귀 기울입니다`;
const SOCIAL_DESCRIPTION =
  "사건은 기다려주지 않습니다. 교통사고 사망·중상해, 산재·근재, 보험분쟁 — 현장확인 즉시 대응하는 법률사무소 진원. 24시간 상담 1551-4308.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 교통사고 · 산재 특화 로펌`,
    template: `%s | ${site.name}`,
  },
  description: SEARCH_DESCRIPTION,
  keywords: [
    "법률사무소 진원",
    "민사",
    "형사",
    "교통사고 변호사",
    "교통사고 사망사고",
    "중상해",
    "산재 변호사",
    "근재보험",
    "손해배상",
    "보험금 청구 소송",
    "성범죄",
    "손해사정",
    "보험분쟁",
    "법률상담",
    "강남 변호사",
    "봉은사역 변호사",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "ko_KR",
    url: site.url,
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [
      {
        url: "/og-v7.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — 당신의 목소리에 귀 기울입니다 · 24시간 상담 ${site.phone}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/og-v7.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // 검색엔진 소유 확인 코드 — .env에서 읽음. 값이 비어 있으면 태그를 넣지 않음
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NAVER_SITE_VERIFICATION && {
      other: { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION },
    }),
  },
  formatDetection: { telephone: true, address: true },
  category: "법률 서비스",
  // 로컬 검색용 지역 메타 (네이버·다음이 참고)
  other: {
    "geo.region": "KR-11",
    "geo.placename": "서울특별시 강남구 영동대로 607 랜드마크빌딩 6층",
    "geo.position": "37.5145;127.0605",
    ICBM: "37.5145, 127.0605",
    "apple-mobile-web-app-title": site.name,
  },
};

/** 로펌 구조화 데이터 — 검색 결과에 주소·전화·영업시간이 노출되도록 */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.nameEn,
  url: site.url,
  image: `${site.url}/og-v7.jpg`,
  logo: `${site.url}/icon.png`,
  description: SEARCH_DESCRIPTION,
  slogan: site.slogan,
  telephone: site.phone,
  faxNumber: site.fax,
  email: site.email,
  priceRange: "상담 문의",
  founder: { "@type": "Person", name: site.representative },
  address: {
    "@type": "PostalAddress",
    streetAddress: "영동대로 607 랜드마크빌딩 6층",
    addressLocality: "강남구",
    addressRegion: "서울특별시",
    postalCode: site.postcode,
    addressCountry: "KR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 37.5145, longitude: 127.0605 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  areaServed: { "@type": "Country", name: "대한민국" },
  sameAs: [site.naverBlogUrl],
  // 업무분야는 practices 단일 소스에서 파생 — 목록이 바뀌면 구조화 데이터도 자동으로 따라간다
  knowsAbout: practices.map((p) => p.name),
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  inLanguage: "ko-KR",
  publisher: { "@id": `${site.url}/#organization` },
};

export const viewport: Viewport = {
  themeColor: "#2b2622",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${serifKr.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgJsonLd, siteJsonLd]),
          }}
        />
      </head>
      <body className="grain">
        <a href="#main" className="skip-link">
          본문으로 바로가기
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <QuickContactDock />
      </body>
    </html>
  );
}
