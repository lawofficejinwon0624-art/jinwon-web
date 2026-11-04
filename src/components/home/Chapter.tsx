"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { drawScene, type SceneId } from "./scenes";

export type ChapterBeat = {
  eyebrow?: string;
  title: string;
  body: string;
};

export type ChapterProps = {
  /** 캔버스 장면 (image가 없을 때) */
  scene?: SceneId;
  index: string; // "01"
  label: string; // "교통사고 · 산재"
  beats: ChapterBeat[];
  result: { value: string; caption: string; note: string };
  href: string;
  /** 이미지 경로. 주어지면 캔버스 대신 이 이미지를 쓴다 (4:5) */
  image?: string;
};

/**
 * 정적 챕터 섹션 — 좌측에 장면 최종 프레임(캔버스 1회 렌더),
 * 우측에 3단계 카피와 결과 카드. 스크롤 연동 없음.
 */
export default function Chapter({
  scene,
  index,
  label,
  beats,
  result,
  href,
  image,
}: ChapterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scene) return; // image 모드에서는 캔버스가 없다
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const load = (src: string) => {
      const im = new Image();
      im.src = src;
      im.onload = draw;
      return im;
    };
    const insuranceDocs = [1, 2, 3].map((i) => load(`/images/insurance-doc-${i}.webp`));

    function draw() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawScene(ctx, rect.width, rect.height, insuranceDocs);
    }
    draw();

    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 2) return;
      lastW = window.innerWidth;
      draw();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [scene, image]);

  return (
    <section className="hairline-t bg-canvas-deep">
      <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
        <p className="eyebrow mb-10 md:mb-14">
          {index} / {label}
        </p>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          {/* 장면 — 이미지 또는 캔버스 최종 프레임 */}
          <div className="relative aspect-[4/5] overflow-hidden">
            {image ? (
              <>
                {/* 바닥 조명 — 충돌 지점 쪽에 은은한 앰버 광원 */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 55% 40%, rgba(217,185,138,0.10), transparent 70%)",
                  }}
                />
                {/* 감식 그리드 — 가장자리로 갈수록 사라져 경계가 생기지 않음 */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(247,245,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,240,0.06) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                      "radial-gradient(70% 65% at 50% 50%, black 30%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(70% 65% at 50% 50%, black 30%, transparent 100%)",
                  }}
                />
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </>
            ) : (
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
            )}
          </div>

          <div className="flex flex-col">
            <ol className="flex flex-col gap-8 md:gap-10">
              {beats.map((b, i) => (
                <li key={i} className="border-l border-amber/40 pl-5 md:pl-6">
                  <p className="eyebrow mb-3">
                    {b.eyebrow ?? `0${i + 1}`}
                  </p>
                  <h3 className="display max-w-[16ch] text-[24px] leading-[1.2] md:text-[30px]">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.7] text-body md:text-[15.5px]">
                    {b.body}
                  </p>
                </li>
              ))}
            </ol>

            {/* 결과 카드 */}
            <Link
              href={href}
              className="group mt-12 block w-full border-t border-white/30 bg-[#151515]/88 px-5 py-5 transition-colors hover:border-white/60 md:w-[280px]"
            >
              <p className="font-mono text-[30px] leading-none tracking-[-0.06em] text-ink md:text-[42px]">
                {result.value}
              </p>
              <p className="mt-2 text-[13px] font-medium text-body-strong">
                {result.caption}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-mute">
                {result.note} <span className="inline-block">↗</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
