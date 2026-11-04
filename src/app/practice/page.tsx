import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { corePractices, practices } from "@/data/practices";

export const metadata: Metadata = {
  title: "업무분야 — 교통사고 사망·중상해, 산재·근재, 보험분쟁",
  description:
    "교통사고 사망·중상해, 산재·근재, 보험분쟁·손해사정을 중심으로 성범죄·형사·가사·상속까지 — 법률사무소 진원의 업무분야.",
  alternates: { canonical: "/practice" },
  openGraph: {
    title: "업무분야 | 법률사무소 진원",
    description: "교통사고 사망·중상해, 산재·근재, 보험분쟁·손해사정을 중심으로 성범죄·형사·가사·상속까지 — 법률사무소 진원의 업무분야.",
    url: "/practice",
  },
};

export default function PracticePage() {
  const rest = practices.filter((p) => !p.core);

  return (
    <>
      <PageHero
        eyebrow="PRACTICE AREAS"
        title={
          <>
            깊게 파는 세 개의 축,
            <br />
            넓게 받치는 여섯 분야
          </>
        }
        lede="진원은 모든 사건을 다 잘한다고 말하지 않습니다. 교통사고 사망·중상해, 산재·근재, 보험분쟁·손해사정 — 세 개의 축을 가장 깊이 파고, 그 주변 분야가 유기적으로 받칩니다."
      />

      {/* 핵심 3분야 */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1200px] px-5 pb-20 md:px-8">
          <div className="space-y-px overflow-hidden rounded-md border border-hairline bg-hairline">
            {corePractices.map((p, i) => (
              <div key={p.slug} className="block bg-canvas">
                <article
                  id={p.slug}
                  className="grid gap-8 bg-canvas-soft/40 p-7 md:grid-cols-[80px_1.1fr_1fr] md:gap-12 md:p-12"
                >
                  <p className="font-mono text-[13px] text-mute">
                    0{i + 1}
                  </p>
                  <div>
                    <h2 className="display text-[clamp(24px,3.4vw,36px)]">
                      {p.name}
                    </h2>
                    <p className="serif-accent mt-3 text-[16px] text-body-strong md:text-[18px]">
                      {p.short}
                    </p>
                    <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.85] text-body">
                      {p.desc}
                    </p>
                  </div>
                  <ul className="space-y-3 self-center">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-baseline gap-3 text-[14.5px] text-body-strong"
                      >
                        <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-mute" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 나머지 분야 */}
      <section className="bg-canvas pb-28 md:pb-40">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div>
            <p className="eyebrow mb-8">SUPPORTING PRACTICES</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <div key={p.slug} className="bg-canvas">
                <article id={p.slug} className="h-full bg-canvas-soft/30 p-6 md:p-8">
                  <h3 className="text-[18px] font-medium tracking-[-0.015em] text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium text-body-strong">
                    {p.short}
                  </p>
                  <p className="mt-4 text-[13.5px] leading-[1.75] text-body">
                    {p.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="text-[12.5px] text-mute">
                        — {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-16 rounded-md border border-hairline bg-canvas-soft/40 p-8 text-center md:p-12">
              <p className="display text-[clamp(22px,3vw,32px)]">
                내 사건이 어느 분야인지 모르셔도 됩니다
              </p>
              <p className="mx-auto mt-4 max-w-[44ch] text-[14.5px] leading-relaxed text-body">
                상담을 남겨주시면 변호사가 사건을 검토해 가장 적합한 구성원과
                전략을 먼저 제안드립니다.
              </p>
              <Link
                href="/consult"
                className="mt-8 inline-block rounded-sm bg-ink px-7 py-3.5 text-[15px] font-medium text-on-primary transition-opacity hover:opacity-85"
              >
                빠른 상담신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
