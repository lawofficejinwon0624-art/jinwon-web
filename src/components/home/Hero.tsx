"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ClockIcon, KakaoIcon, PhoneIcon } from "@/components/ContactIcons";
import { site } from "@/data/site";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 모션 감소 선호 시 배경 영상 정지(포스터 프레임 유지)
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    videoRef.current?.pause();
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-canvas-deep">
      {/* 풀스크린 배경 영상 — 스크롤과 무관하게 자동 재생 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover brightness-[0.66] saturate-[0.85]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* 딥 스크림 — 영상은 은은한 배경으로만 */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(23,20,17,0.94) 0%, rgba(23,20,17,0.78) 42%, rgba(23,20,17,0.5) 75%, rgba(23,20,17,0.62) 100%), linear-gradient(to top, rgba(23,20,17,0.92) 0%, rgba(23,20,17,0.28) 34%, rgba(23,20,17,0.5) 100%)",
        }}
      />

      {/* 眞源 워터마크 — 진실의 근원 (히어로에는 로고 대신 명조 워터마크) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2vw] top-1/2 hidden -translate-y-1/2 select-none text-right font-serif font-semibold leading-[0.94] text-ink/[0.045] lg:block"
        style={{ fontSize: "clamp(220px, 26vw, 400px)" }}
      >
        眞<br />源
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-5 pb-24 pt-28 md:px-8 md:pt-32">
        {/* 첫 화면에서 상담 접수 시간을 바로 확인할 수 있도록 */}
        <div>
          <div className="inline-flex items-center gap-2 border-b border-contact-accent/35 pb-2.5 text-contact-accent">
            <ClockIcon className="h-4 w-4 shrink-0" />
            <span className="text-[12px] font-medium sm:text-[13px]">
              24시간 상담 접수 · 연중무휴
            </span>
          </div>
        </div>

        <h1 className="display mt-8 max-w-[12ch] text-[clamp(40px,6.8vw,78px)]">
          <span className="block">진실의 근원에서,</span>
          <span className="block">
            <span className="serif-accent font-semibold">최선의 결과</span>를 만듭니다
          </span>
        </h1>

        <p className="mt-7 max-w-[48ch] text-[15px] leading-[1.8] text-body md:text-[17px]">
          교통사고 · 산업재해 · 보험금 분쟁 — 사건의 첫 순간이 결과를 결정합니다.
          법률사무소 진원은 서류 검토뿐만 아니라, 현장확인 즉시 대응 절차를
          진행합니다.
        </p>

        <div className="mt-8 w-full max-w-[540px]">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${site.phone}`}
              data-phone-position="hero"
              className="flex min-h-[114px] min-w-0 flex-col items-start justify-center gap-3 rounded-md bg-contact-ivory px-3.5 py-4 text-on-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[96px] sm:flex-row sm:items-center sm:justify-start sm:gap-4 sm:px-6"
            >
              <PhoneIcon className="h-[22px] w-[22px] shrink-0 sm:h-6 sm:w-6" />
              <span>
                <span className="block text-[13px] font-semibold sm:text-[16px]">24시간 전화상담</span>
                <span className="mt-1 block font-mono text-[15px] tracking-[0.02em] text-on-primary/80 sm:text-[17px]">{site.phone}</span>
              </span>
            </a>
            <a
              href={site.kakaoChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[114px] min-w-0 flex-col items-start justify-center gap-3 rounded-md bg-contact-gold px-3.5 py-4 text-on-primary shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)] active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[96px] sm:flex-row sm:items-center sm:justify-start sm:gap-4 sm:px-6"
            >
              <KakaoIcon className="h-[22px] w-[22px] shrink-0 sm:h-6 sm:w-6" />
              <span>
                <span className="block text-[13px] font-semibold sm:text-[16px]">카카오톡 상담</span>
                <span className="mt-1 block text-[11px] leading-relaxed text-on-primary/80 sm:text-[12px]">편하게 내용 남기기</span>
              </span>
            </a>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="hidden text-[11px] text-mute sm:block">전화가 어렵다면 카카오톡으로 남겨주세요.</p>
            <Link href="/consult" className="inline-flex min-h-11 items-center gap-2 text-[12px] text-body transition-colors hover:text-ink">
              상담신청서 작성 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* 핵심 수치 스트립 */}
        <div className="mt-16 grid max-w-[760px] grid-cols-3 border-t border-white/10 md:mt-20">
          {[
            ["24시간", "연중무휴 상담"],
            ["즉시", "현장확인 대응"],
            ["원스톱", "손해사정 → 소송 → 집행"],
          ].map(([v, c]) => (
            <div key={c} className="py-6 pr-4 md:pr-8">
              <p className="font-mono text-[19px] font-medium tracking-[-0.04em] text-ink md:text-[23px]">
                {v}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-mute md:text-[13px]">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 스크롤 큐 */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2.5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-mute">
            SCROLL
          </span>
          <div className="h-10 w-px bg-ink/60" />
        </div>
      </div>
    </section>
  );
}
