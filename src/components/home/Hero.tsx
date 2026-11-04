"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { rolling24hCount } from "@/data/consultations";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [count, setCount] = useState<number | null>(null);

  // 모션 감소 선호 시 배경 영상 정지(포스터 프레임 유지)
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    setCount(rolling24hCount(new Date()));
    const id = setInterval(() => setCount(rolling24hCount(new Date())), 60_000);
    return () => clearInterval(id);
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
        {/* 라이브 배지 */}
        <div>
          <div className="inline-flex items-center gap-2.5 border-b border-white/15 pb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            <span className="font-mono text-[12px] text-body-strong">
              {count === null ? "실시간 상담 접수 중" : `최근 24시간 상담 ${count}건 접수 · 진행 중`}
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

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/consult"
            className="block rounded-sm bg-ink px-7 py-4 text-[14px] font-medium text-on-primary transition-opacity hover:opacity-85"
          >
            빠른 상담신청
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="block rounded-sm border border-hairline px-6 py-4 font-mono text-[14px] text-ink transition-colors hover:border-mute"
          >
            {site.phone}
            <span className="ml-2 text-[12px] text-mute">24시간</span>
          </a>
          <a
            href={site.kakaoChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-sm border border-hairline px-6 py-4 text-[14px] font-medium text-ink transition-colors hover:border-mute"
          >
            카카오톡 상담
            <span aria-hidden className="ml-1.5 text-[12px] text-mute">↗</span>
          </a>
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
