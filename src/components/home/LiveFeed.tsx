"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  liveFeed,
  rolling24hCount,
  type ConsultEntry,
} from "@/data/consultations";

type FeedItem = ConsultEntry & { when: string };

/** 실시간 상담 접수 현황 — 최근 24시간 기준의 현재 상황만 보여준다 (누적 집계 아님) */
export default function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [count, setCount] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const refresh = () => {
      const now = new Date();
      setItems(liveFeed(now, 7));
      setCount(rolling24hCount(now));
      setClock(
        now.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    refresh();
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#ece8df] text-[#191714]">
      <div aria-hidden className="absolute -right-[.04em] -top-[.2em] select-none font-mono text-[clamp(180px,33vw,520px)] font-medium leading-none tracking-[-.1em] text-black/[.035]">24</div>
      <div className="relative mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-16 flex items-center gap-5 md:mb-24">
          <span className="h-2 w-2 rounded-full bg-[#a56a30] shadow-[0_0_0_5px_rgba(165,106,48,.12)]" />
          <p className="font-mono text-[10px] tracking-[0.24em] text-black/55">LIVE INTAKE · UPDATED {clock ? `${clock} KST` : "NOW"}</p>
          <span className="h-px flex-1 bg-black/15" />
        </div>
        <div className="grid gap-20 lg:grid-cols-[.82fr_1.18fr] lg:gap-28">
          <div className="lg:pt-3">
            <p className="font-mono text-[11px] tracking-[0.22em] text-black/45">24-HOUR RESPONSE</p>
            <h2 className="display mt-7 max-w-[10ch] text-[clamp(42px,5.6vw,72px)] leading-[1.04] tracking-[-.055em]">
              시간은<br />흐르고<br />있습니다.
            </h2>
            <p className="mt-9 max-w-[38ch] text-[16px] font-medium leading-[1.7] text-black/70">
              교통사고 · 산재·근재 · 보험분쟁
              <br />
              진원은 지금도 24시간 대응 중입니다.
            </p>
            <div className="mt-12 border-t border-black/20 pt-7">
              <div className="flex items-end gap-4">
                <span className="font-mono text-[58px] leading-[.8] tracking-[-.06em] tabular-nums md:text-[76px]">
                  {count || "—"}
                </span>
                <span className="pb-1 text-[12px] leading-relaxed text-black/45">
                  최근 24시간
                  <br />
                  접수된 상담
                </span>
              </div>
              <p className="mt-4 font-mono text-[12px] tracking-[0.06em] text-[#8b5528]">
                {clock ? `${clock} KST 기준 · 실시간 집계` : "실시간 집계 중"}
              </p>
            </div>
            <Link
              href="/consult"
              className="group mt-12 inline-flex items-center gap-10 border-b border-black pb-2 text-[14px] font-semibold"
            >
              내 사건 상담하기 <span className="transition-transform group-hover:translate-x-1">↗</span>
            </Link>
          </div>

          <div>
            <div className="flex items-end justify-between border-b border-black/35 pb-5">
              <div>
                <p className="font-mono text-[10px] tracking-[.22em] text-black/45">CURRENT MATTERS</p>
                <p className="mt-2 text-[20px] font-medium tracking-[-.03em]">최근 접수 사건</p>
              </div>
              <span className="text-[11px] text-black/40">개인정보 마스킹 적용</span>
            </div>
            <ul aria-live="polite">
              {items.length === 0
                ? Array.from({ length: 7 }).map((_, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 border-b border-black/10 py-6"
                    >
                      <div className="h-3 w-full animate-pulse bg-black/5" />
                    </li>
                  ))
                : items.map((e, i) => (
                    <li
                      key={e.id}
                      className="group flex items-center justify-between gap-4 border-b border-black/12 py-[22px] transition-[padding,background] duration-300 hover:bg-black/[.025] hover:pl-3"
                    >
                      <div className="flex min-w-0 items-center gap-5">
                        <span className="w-5 shrink-0 font-mono text-[10px] text-black/30">{String(i + 1).padStart(2, "0")}</span>
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-medium tracking-[-.015em] text-black/80">
                            {e.name} · {e.detail}
                          </p>
                          <p className="mt-1.5 font-mono text-[10px] tracking-[.04em] text-black/40">
                            {e.topic} · {e.region}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-[10px] text-black/35">{e.when}</p>
                        <p
                          className={`mt-0.5 text-[11px] ${
                            e.status === "진행 중" ? "text-[#8b5528]" : "text-black/50"
                          }`}
                        >
                          {e.status}
                        </p>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
