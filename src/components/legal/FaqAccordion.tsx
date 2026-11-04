"use client";

import { useState } from "react";
import type { Faq } from "@/data/legal";

/** FAQ 아코디언 — 부드러운 높이 전환, 모노 넘버링 */
export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-md border border-hairline">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={i > 0 ? "hairline-t" : ""}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-baseline gap-5 px-6 py-6 text-left transition-colors duration-300 md:gap-8 md:px-9 md:py-7 ${
                isOpen ? "bg-canvas-soft/50" : "hover:bg-canvas-soft/25"
              }`}
            >
              <span className="shrink-0 font-mono text-[12px] text-mute">
                Q{String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 text-[16px] font-medium tracking-[-0.015em] transition-colors duration-300 md:text-[18px] ${
                  isOpen ? "text-ink" : "text-body-strong"
                }`}
              >
                {f.q}
              </span>
              <span
                className={`shrink-0 font-mono text-[16px] text-mute transition-transform duration-400 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 px-6 pb-8 pl-[4.2rem] pr-8 md:px-9 md:pl-[5.6rem]">
                  {f.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 16)}
                      className="max-w-[64ch] text-[14.5px] leading-[1.85] text-body"
                    >
                      {p}
                    </p>
                  ))}

                  {f.table && (
                    <div className="max-w-[560px] overflow-hidden rounded-sm border border-hairline">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="hairline-b bg-canvas-soft/60">
                            {f.table.head.map((h) => (
                              <th
                                key={h}
                                className="px-4 py-3 font-mono text-[11px] font-normal tracking-[0.12em] text-mute"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {f.table.rows.map(([a, b], ri) => (
                            <tr
                              key={a}
                              className={ri > 0 ? "hairline-t" : ""}
                            >
                              <td className="whitespace-nowrap px-4 py-3 font-mono text-[13px] text-ink">
                                {a}
                              </td>
                              <td className="px-4 py-3 text-[13.5px] text-body-strong">
                                {b}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {f.note && (
                    <p className="max-w-[64ch] border-l border-hairline pl-4 text-[13px] leading-relaxed text-mute">
                      {f.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
