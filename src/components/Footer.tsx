import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

const MENU = [
  { href: "/members", label: "회사소개" },
  { href: "/practice", label: "업무분야" },
  { href: "/activities", label: "성공사례" },
  { href: "/legal", label: "법률가이드" },
];

const SUPPORT = [
  { href: "/consult", label: "상담신청" },
  { href: "/location", label: "오시는 길" },
];

export default function Footer() {
  return (
    <footer className="hairline-t overflow-hidden bg-canvas-deep">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* 브랜드 */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo-emblem.webp"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-mute">
                {site.nameEn}
              </span>
            </div>
            <p className="serif-accent text-[19px] text-ink">법률사무소 진원</p>
            <p className="mt-4 text-[14px] leading-relaxed text-body">
              진실의 근원에서 최선의 결과
              <br />
              현장확인 즉시 대응 로펌
            </p>
          </div>

          {/* Menu */}
          <div>
            <p className="eyebrow mb-5">Menu</p>
            <ul className="space-y-3">
              {MENU.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-quiet text-[14px] text-body hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="eyebrow mb-5">Support</p>
            <ul className="space-y-3">
              {SUPPORT.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-quiet text-[14px] text-body hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-5">Contact</p>
            <a
              href={`tel:${site.phone}`}
              className="font-mono text-[26px] text-ink transition-opacity hover:opacity-80"
            >
              {site.phone}
            </a>
            <p className="mt-1 text-[12px] text-mute">{site.phoneNote}</p>
            <div className="mt-5 space-y-3">
              {[
                { href: site.kakaoChatUrl, label: "카카오톡 상담" },
                { href: site.instagramUrl, label: "인스타그램" },
                { href: site.naverBlogUrl, label: "네이버 블로그" },
                { href: site.youtubeUrl, label: "유튜브" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet block w-fit text-[14px] text-body hover:text-ink"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="hairline-t mt-14 space-y-2.5 pt-7 text-[12px] leading-relaxed text-mute">
          <p>
            법률사무소 진원
            <span className="mx-2 text-hairline">|</span>대표 {site.representative}
            <span className="mx-2 text-hairline">|</span>사업자등록번호 {site.bizNo}
          </p>
          <p>
            대표번호 {site.mainTel}
            <span className="mx-2 text-hairline">|</span>FAX {site.fax}
            <span className="mx-2 text-hairline">|</span>이메일 {site.email}
          </p>
          <p>
            주소 {site.address} ({site.postcode})
          </p>
          <p className="pt-3">
            © Copyright {new Date().getFullYear()}. 법률사무소 진원. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
