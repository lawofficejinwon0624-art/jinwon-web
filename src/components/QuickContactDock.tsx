"use client";

import Link from "next/link";
import { site } from "@/data/site";

/**
 * 상시 상담 동선 — 전화·카톡 유입이 주력이므로 어느 페이지·어느 스크롤 위치에서도
 * 한 번의 탭으로 연결되게 한다.
 * PC: 우측 세로 플로팅 독 / 모바일: 하단 고정 바. 공통 라벨 "24시간 상담 가능".
 */

const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const KakaoIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden>
    <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65l-.95 3.53c-.08.31.27.56.54.38l4.21-2.79c.5.06 1.02.1 1.54.1 5.52 0 10-3.55 10-7.87S17.52 3 12 3z" />
  </svg>
);

const FormIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]" aria-hidden>
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function QuickContactDock() {
  return (
    <>
      {/* ——— PC: 우측 플로팅 독 ——— */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="w-[76px] overflow-hidden rounded-md border border-hairline bg-canvas/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="hairline-b flex flex-col items-center gap-1.5 px-2 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            <p className="text-center font-mono text-[9px] leading-[1.5] tracking-[0.12em] text-body-strong">
              24시간
              <br />
              상담가능
            </p>
          </div>
          <a
            href={`tel:${site.phone}`}
            data-phone-position="desktop-floating"
            className="group flex flex-col items-center gap-1.5 px-2 py-3.5 text-body-strong transition-colors hover:bg-canvas-soft hover:text-ink"
          >
            {PhoneIcon}
            <span className="text-[10.5px] font-medium">전화상담</span>
          </a>
          <a
            href={site.kakaoChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hairline-t flex flex-col items-center gap-1.5 px-2 py-3.5 text-body-strong transition-colors hover:bg-canvas-soft hover:text-ink"
          >
            {KakaoIcon}
            <span className="text-[10.5px] font-medium">카톡상담</span>
          </a>
          <Link
            href="/consult"
            className="hairline-t flex flex-col items-center gap-1.5 bg-ink px-2 py-3.5 text-on-primary transition-opacity hover:opacity-90"
          >
            {FormIcon}
            <span className="text-[10.5px] font-medium">상담신청</span>
          </Link>
        </div>
        <p className="mt-2 text-center font-mono text-[10px] tracking-[0.04em] text-mute">
          {site.phone}
        </p>
      </div>

      {/* ——— 모바일: 하단 고정 바 ——— */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div className="border-t border-hairline bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
          <div className="grid grid-cols-3">
            <a
              href={`tel:${site.phone}`}
              data-phone-position="mobile-bottom"
              className="flex min-h-[58px] flex-col items-center justify-center gap-1 text-body-strong active:bg-canvas-soft"
            >
              {PhoneIcon}
              <span className="text-[11px] font-medium">전화상담</span>
            </a>
            <a
              href={site.kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[58px] flex-col items-center justify-center gap-1 border-x border-hairline text-body-strong active:bg-canvas-soft"
            >
              {KakaoIcon}
              <span className="text-[11px] font-medium">카톡상담</span>
            </a>
            <Link
              href="/consult"
              className="flex min-h-[58px] flex-col items-center justify-center gap-1 bg-ink text-on-primary"
            >
              {FormIcon}
              <span className="text-[11px] font-medium">상담신청</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
