import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/legal/FaqAccordion";
import {
  faqs,
  legalProcess,
  legalTips,
  legalUpdates,
  newsItems,
} from "@/data/legal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "법률가이드 — 교통사고 합의·산재 근재·보험금 지급거절",
  description:
    "생활 속 꼭 알아야 할 법률 상식부터 최신 판례까지 — 교통사고·산재·근재·보험분쟁·성범죄·부동산, 법률사무소 진원이 전하는 믿을 수 있는 법률 정보.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "법률가이드 | 법률사무소 진원",
    description:
      "생활 속 꼭 알아야 할 법률 상식부터 최신 판례까지, 진원이 전하는 믿을 수 있는 법률 정보",
    url: "/legal",
  },
};

// FAQ 구조화 데이터 — 검색 결과에 질문·답변이 노출되도록
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: [
        ...f.paragraphs,
        ...(f.table
          ? f.table.rows.map(([a, b]) => `${a}: ${b}`)
          : []),
        ...(f.note ? [f.note] : []),
      ].join(" "),
    },
  })),
};

export default function LegalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="NEWS & LEGAL GUIDE"
        title={
          <>
            알고 있는 만큼,
            <br />
            지킬 수 있습니다
          </>
        }
        lede="생활 속 꼭 알아야 할 법률 상식부터 최신 판례까지 — 진원이 전하는 믿을 수 있는 법률 정보입니다."
      />

      {/* ——— LEGAL PROCESS ——— */}
      <section className="bg-canvas pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div>
            <div className="hairline-b flex flex-wrap items-baseline justify-between gap-4 pb-6">
              <p className="eyebrow">LEGAL PROCESS</p>
              <h2 className="display text-[clamp(22px,2.8vw,30px)]">
                법률 사건은 이렇게 진행됩니다
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-5">
            {legalProcess.map((s, i) => (
              <div key={s.step} className="bg-canvas">
                <div className="group relative h-full bg-canvas-soft/30 p-6 transition-colors duration-300 hover:bg-canvas-soft/60 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[13px] text-mute transition-colors duration-300 group-hover:text-ink">
                      {s.step}
                    </span>
                    {i < legalProcess.length - 1 && (
                      <span className="hidden font-mono text-[13px] text-mute/50 md:inline" aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                  <p className="mt-9 text-[16px] font-medium leading-snug tracking-[-0.015em] text-ink">
                    {s.title}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.75] text-body">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— MUST-KNOW LEGAL TIPS ——— */}
      <section className="hairline-t bg-canvas-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
          <div>
            <p className="eyebrow mb-5">MUST-KNOW LEGAL TIPS</p>
            <h2 className="display max-w-[22ch] text-[clamp(28px,4vw,44px)]">
              꼭 알아야 할{" "}
              <span className="serif-accent font-semibold">법률 상식</span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.8] text-body">
              사건이 벌어진 직후의 몇 시간이 결과를 바꿉니다. 여섯 가지만
              기억해 두세요.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {legalTips.map((tip, i) => (
              <div key={tip.title} className="bg-canvas-deep">
                <Link
                  href={tip.href}
                  className="group relative flex h-full flex-col bg-canvas-soft/25 p-7 transition-colors duration-300 hover:bg-canvas-soft/60 md:p-8"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-4 select-none font-serif text-[64px] font-semibold leading-none text-ink/[0.05] transition-colors duration-300 group-hover:text-ink/[0.09]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-fit rounded-sm border border-hairline px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-body-strong">
                    {tip.category}
                  </span>
                  <h3 className="mt-6 max-w-[16ch] text-[19px] font-medium leading-[1.4] tracking-[-0.02em] text-ink md:text-[21px]">
                    {tip.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[13.5px] leading-[1.8] text-body">
                    {tip.body}
                  </p>
                  <p className="mt-7 text-[13px] font-medium text-body-strong opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    관련 업무분야 보기 →
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— LATEST LEGAL UPDATES ——— */}
      <section className="hairline-t bg-canvas">
        <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-5">LATEST LEGAL UPDATES</p>
                <h2 className="display text-[clamp(26px,3.6vw,40px)]">
                  최신 법률 동향
                </h2>
              </div>
              <p className="mb-1 font-mono text-[11px] tracking-[0.16em] text-mute">
                UPDATED 2026.07
              </p>
            </div>
          </div>

          <div className="mt-10">
            {legalUpdates.map((u, i) => (
              <div key={u.title}>
                <article className="hairline-b grid gap-3 py-7 md:grid-cols-[110px_100px_1fr_auto] md:items-baseline md:gap-8">
                  <p className="font-mono text-[12px] text-mute">{u.date}</p>
                  <p className="font-mono text-[11px] tracking-wider text-body-strong">
                    {u.category}
                  </p>
                  <h3 className="max-w-[62ch] text-[15.5px] font-medium leading-[1.65] tracking-[-0.01em] text-body-strong md:text-[16.5px]">
                    {u.title}
                  </h3>
                  <span className="w-fit rounded-sm border border-hairline px-2.5 py-1 font-mono text-[11px] text-mute">
                    {u.tag}
                  </span>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— JINWON IN THE NEWS ——— */}
      <section className="hairline-t bg-canvas-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
          <div>
            <p className="eyebrow mb-5">JINWON IN THE NEWS</p>
            <h2 className="display text-[clamp(26px,3.6vw,40px)]">
              언론이 전하는 진원
            </h2>
          </div>

          <div className="mt-10">
            {newsItems.map((n, i) => {
              const inner = (
                <>
                  <p className="font-mono text-[12px] text-mute">
                    2026.{n.date}
                  </p>
                  <p className="font-mono text-[11px] tracking-wider text-body-strong">
                    {n.type}
                  </p>
                  <p className="font-mono text-[12px] text-mute">{n.source}</p>
                  <h3 className="flex-1 text-[15.5px] font-medium leading-[1.6] tracking-[-0.01em] text-body-strong transition-colors duration-300 group-hover:text-ink md:text-[16.5px]">
                    {n.title}
                  </h3>
                  <span
                    className={`font-mono text-[14px] ${
                      n.href
                        ? "text-mute transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
                        : "text-hairline"
                    }`}
                    aria-hidden
                  >
                    {n.href ? "↗" : "—"}
                  </span>
                </>
              );
              const cls =
                "hairline-b grid gap-2 py-6 md:grid-cols-[90px_80px_120px_1fr_auto] md:items-baseline md:gap-8";
              return (
                <div key={n.title}>
                  {n.href ? (
                    <a
                      href={n.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group ${cls}`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section className="hairline-t bg-canvas">
        <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
            <div>
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow mb-5">FAQ</p>
                <h2 className="display text-[clamp(28px,3.8vw,42px)]">
                  자주 묻는
                  <br />
                  질문
                </h2>
                <p className="mt-6 max-w-[32ch] text-[14.5px] leading-[1.8] text-body">
                  상담 전에 가장 많이 받는 질문을 정리했습니다. 내 사건에 대한
                  정확한 답은 상담에서 드립니다.
                </p>
                <Link
                  href="/consult"
                  className="mt-8 inline-block rounded-sm bg-ink px-6 py-3.5 text-[14px] font-medium text-on-primary transition-opacity hover:opacity-85"
                >
                  빠른 상담신청
                </Link>
              </div>
            </div>
            <div>
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="hairline-t bg-canvas-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-24 text-center md:px-8 md:py-32">
          <div>
            <p className="display mx-auto max-w-[24ch] text-[clamp(24px,3.6vw,40px)]">
              읽는 것만으로 해결되지 않는 문제라면,
              <br />
              <span className="serif-accent font-semibold">지금</span>{" "}
              물어보세요
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${site.phone}`}
                className="rounded-sm bg-ink px-7 py-3.5 font-mono text-[15px] font-medium text-on-primary transition-opacity hover:opacity-85"
              >
                {site.phone}
              </a>
              <a
                href={site.kakaoChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-hairline px-7 py-3.5 text-[14px] font-medium text-ink transition-colors hover:border-mute"
              >
                카카오톡 상담 ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
