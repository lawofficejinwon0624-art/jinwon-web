"use client";

import { useEffect, useState } from "react";
import { liveFeed, rolling24hCount, type ConsultEntry } from "@/data/consultations";

type FeedItem = ConsultEntry & { when: string };

/** 상담 페이지용 컴팩트 실시간 피드 */
export default function LiveFeedMini() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const now = new Date();
      setItems(liveFeed(now, 4));
      setCount(rolling24hCount(now));
    };
    refresh();
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-md border border-hairline bg-canvas-soft/50">
      <div className="hairline-b flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          <span className="font-mono text-[11px] tracking-[0.16em] text-body-strong">
            최근 24시간 {count || "—"}건
          </span>
        </div>
      </div>
      <ul>
        {items.map((e, i) => (
          <li
            key={e.id}
            className="hairline-b flex items-center justify-between gap-3 px-6 py-3.5 last:border-b-0"
          >
            <p className="truncate text-[12.5px] text-body">
              {e.name} · {e.topic}
            </p>
            <p className="shrink-0 font-mono text-[11px] text-mute">{e.when}</p>
          </li>
        ))}
        {items.length === 0 &&
          Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="hairline-b px-6 py-3.5 last:border-b-0">
              <div className="h-3 w-full animate-pulse rounded-sm bg-canvas-soft" />
            </li>
          ))}
      </ul>
    </div>
  );
}
