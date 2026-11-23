"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiIcon, ClockIcon, FormIcon, KakaoIcon, PhoneIcon } from "@/components/ContactIcons";
import { site } from "@/data/site";

/** 모든 페이지에서 전화·카카오톡 상담과 모바일 AI 진원에 바로 연결한다. */
export default function QuickContactDock() {
  const pathname = usePathname();
  const aiActive = pathname === "/ai" || pathname.startsWith("/ai/");

  return (
    <>
      {/* PC: 기존 우측 상담 위치에서 전화와 카카오톡을 강조 */}
      <aside aria-label="빠른 상담" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="w-[80px] overflow-hidden rounded-md border border-hairline bg-canvas/95 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="flex flex-col items-center gap-1.5 px-2 py-3 text-contact-accent">
            <ClockIcon className="h-4 w-4" />
            <p className="text-center text-[11px] leading-[1.5]">
              24시간<br />상담 접수
            </p>
          </div>
          <a
            href={`tel:${site.phone}`}
            data-phone-position="desktop-floating"
            aria-label={`24시간 전화상담 ${site.phone}`}
            className="flex min-h-[68px] flex-col items-center justify-center gap-1.5 bg-contact-ivory px-2 py-3 text-on-primary transition-colors hover:bg-ink"
          >
            <PhoneIcon />
            <span className="text-[11px] font-semibold">전화상담</span>
          </a>
          <a
            href={site.kakaoChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[68px] flex-col items-center justify-center gap-1.5 bg-contact-gold px-2 py-3 text-on-primary transition-colors hover:bg-contact-ivory"
          >
            <KakaoIcon />
            <span className="text-[11px] font-semibold">카카오톡</span>
          </a>
          <Link href="/consult" className="flex min-h-[60px] flex-col items-center justify-center gap-1.5 px-2 py-3 text-body-strong transition-colors hover:bg-canvas-soft hover:text-ink">
            <FormIcon className="h-[18px] w-[18px]" />
            <span className="text-[11px] font-medium">상담신청</span>
          </Link>
        </div>
        <p className="mt-2 text-center font-mono text-[10px] tracking-[0.04em] text-mute">{site.phone}</p>
      </aside>

      {/* 높이 113px + safe area — globals.css의 콘텐츠 여백과 함께 유지 */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-contact-accent/25 bg-canvas-deep/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(0,0,0,0.16)] backdrop-blur-md lg:hidden">
        <p className="flex h-8 items-center justify-center gap-1.5 border-b border-contact-accent/15 text-[11px] text-contact-accent">
          <ClockIcon className="h-3.5 w-3.5" />
          24시간 상담 접수 · 연중무휴
        </p>
        <nav aria-label="모바일 빠른 메뉴" className="mx-auto grid max-w-[640px] grid-cols-3 gap-2 px-3 pb-3 pt-2">
          <a
            href={`tel:${site.phone}`}
            data-phone-position="mobile-bottom"
            aria-label={`24시간 전화상담 ${site.phone}`}
            className="flex min-h-[60px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-md bg-contact-ivory px-1 py-1.5 text-on-primary transition-colors active:bg-ink"
          >
            <PhoneIcon />
            <span className="text-[12px] font-semibold">전화상담</span>
          </a>
          <a
            href={site.kakaoChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오톡 상담"
            className="flex min-h-[60px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-md bg-contact-gold px-1 py-1.5 text-on-primary transition-colors active:bg-contact-ivory"
          >
            <KakaoIcon />
            <span className="text-[12px] font-semibold">카카오톡</span>
          </a>
          <Link
            href="/ai"
            aria-current={aiActive ? "page" : undefined}
            className={`flex min-h-[60px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-md border px-1 py-1.5 text-contact-accent transition-colors active:bg-canvas-soft ${aiActive ? "border-contact-accent bg-canvas-soft" : "border-contact-accent/45"}`}
          >
            <AiIcon />
            <span className="text-[12px] font-semibold">AI 진원</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
