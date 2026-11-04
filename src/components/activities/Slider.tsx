"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Img = { src: string; alt: string };

/**
 * 사진 슬라이더 — CSS scroll-snap. 스와이프 · 좌우 버튼 · 점 표시.
 * 데스크톱(md+)은 한 화면에 2장, 모바일은 1장. 전부 들어가면 컨트롤을 숨긴다.
 */
export default function Slider({ images }: { images: Img[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(2);
  const n = images.length;
  const pages = Math.max(1, Math.ceil(n / perView));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerView(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const go = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const next = (k + pages) % pages;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = ref.current;
    if (el) setPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative mx-auto mt-8 max-w-[880px]">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto md:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
      >
        {images.map((img, k) => (
          <figure
            key={img.src}
            className="relative aspect-square w-full shrink-0 snap-start overflow-hidden rounded-sm border border-hairline bg-canvas-deep md:w-[calc(50%-6px)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 440px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-2.5">
              <span className="font-mono text-[10px] tracking-[0.18em] text-body-strong/90">
                {String(k + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <span className="max-w-[78%] text-right text-[11px] leading-tight text-body-strong/90">
                {img.alt}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {pages > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(page - 1)}
            aria-label="이전 사진"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-canvas/70 text-ink backdrop-blur-sm transition-colors hover:bg-canvas"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(page + 1)}
            aria-label="다음 사진"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-canvas/70 text-ink backdrop-blur-sm transition-colors hover:bg-canvas"
          >
            ›
          </button>
          <div className="mt-3 flex justify-center gap-2" aria-hidden>
            {Array.from({ length: pages }, (_, k) => (
              <button
                key={k}
                type="button"
                tabIndex={-1}
                onClick={() => go(k)}
                className={`h-1.5 rounded-full transition-[width,background-color] ${
                  k === page ? "w-6 bg-ink" : "w-1.5 bg-mute/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
