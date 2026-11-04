import type { Metadata } from "next";
import Image from "next/image";
import Slider from "@/components/activities/Slider";
import PageHero from "@/components/PageHero";
import { activities } from "@/data/activities";

export const metadata: Metadata = {
  title: "진원의 활동 — 현장활동·협약·공익",
  description:
    "법률사무소 진원의 현장활동 기록 — 투자사기 현금 수거책 경찰 공조 검거, 교통사고 현장 출동, 대한민국재향군인회 협약 및 봉사활동.",
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "진원의 활동 | 법률사무소 진원",
    description:
      "서류 검토를 넘어 현장으로 — 투자사기 현장 검거, 교통사고 현장 출동, 재향군인회 협약까지 진원의 활동 기록.",
    url: "/activities",
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="ACTIVITIES"
        title={
          <>
            서류가 아니라,
            <br />
            현장에 있었습니다
          </>
        }
        lede="진원의 활동은 사무실에서 끝나지 않습니다. 현장 출동과 공조, 협약과 봉사 — 진원이 실제로 움직인 기록입니다."
      />

      <section className="bg-canvas pb-28 md:pb-40">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="space-y-px overflow-hidden rounded-md border border-hairline bg-hairline">
            {activities.map((a, i) => (
              <div key={a.title} className="block bg-canvas">
                <article className="bg-canvas-soft/30 p-7 md:p-10">
                  {/* 헤더 */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="font-mono text-[12px] text-mute">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-sm border border-hairline px-2.5 py-1 font-mono text-[10.5px] tracking-[0.12em] text-body-strong">
                      {a.category}
                    </span>
                    <span className="font-mono text-[12px] text-mute">{a.date}</span>
                    {a.result && (
                      <span className="rounded-sm bg-ink px-2.5 py-1 font-mono text-[11px] text-on-primary">
                        {a.result}
                      </span>
                    )}
                    {a.pending && (
                      <span className="font-mono text-[11px] text-mute">
                        자료 추가 예정
                      </span>
                    )}
                  </div>

                  {/* 본문 */}
                  <h2 className="display mt-6 max-w-[30ch] text-[clamp(22px,3vw,32px)]">
                    {a.title}
                  </h2>
                  <p className="mt-5 max-w-[70ch] whitespace-pre-line text-[15px] leading-[1.85] text-body">
                    {a.summary}
                  </p>

                  {/* 외부 링크 — 영상 또는 블로그 */}
                  {a.link && (
                    <a
                      href={a.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press mt-7 inline-flex items-center gap-2.5 rounded-sm border border-hairline px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-mute"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                        className="h-[15px] w-[15px] text-amber"
                      >
                        {a.link.kind === "blog" ? (
                          /* 네이버 블로그 — 문서/펜 */
                          <path d="M6 2h8.2L20 7.8V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7.5 1.9V8h4.1l-4.1-4.1zM7.6 12.3h8.8v1.5H7.6v-1.5zm0 3.4h6.1v1.5H7.6v-1.5z" />
                        ) : a.link.kind === "news" ? (
                          /* 언론 기사 — 신문 */
                          <path d="M4 4h13a1 1 0 0 1 1 1v11.5a1.5 1.5 0 0 0 3 0V8h1v8.5A2.5 2.5 0 0 1 19.5 19H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1zm2 3v4h5V7H6zm7 0v1.5h4V7h-4zm0 2.5V11h4V9.5h-4zM6 13v1.5h11V13H6zm0 3v1.5h11V16H6z" />
                        ) : (
                          <path d="M23.5 6.2s-.23-1.65-.94-2.38c-.9-.94-1.9-.95-2.36-1C17.66 2.65 12 2.65 12 2.65h-.01s-5.65 0-8.19.17c-.46.05-1.46.06-2.36 1C.73 4.55.5 6.2.5 6.2S.26 8.14.26 10.08v1.82C.26 13.84.5 15.78.5 15.78s.23 1.65.94 2.38c.9.94 2.08.91 2.6 1.01 1.45.14 6.17.18 7.96.18 0 0 5.66-.01 8.2-.18.46-.06 1.46-.07 2.36-1.01.71-.73.94-2.38.94-2.38s.24-1.94.24-3.88v-1.82c0-1.94-.24-3.88-.24-3.88zM9.52 14.42V7.65l7.28 3.4-7.28 3.37z" />
                        )}
                      </svg>
                      {a.link.label}
                      <span aria-hidden className="text-[12px] text-mute">↗</span>
                    </a>
                  )}

                  {/* 사진 갤러리 — 균일 타일로 빈칸 없이 정렬 */}
                  {a.images && a.images.length <= 2 && <Slider images={a.images} />}
                  {a.images && a.images.length > 2 && (
                    <div className="mt-8 grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-4">
                      {a.images.map((img, k) => (
                        <figure
                          key={img.src}
                          className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-hairline bg-canvas-deep"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          />
                          {/* 하단 그라데이션 + 번호 */}
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent"
                          />
                          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-2.5">
                            <span className="font-mono text-[9.5px] tracking-[0.18em] text-body-strong/90">
                              {String(k + 1).padStart(2, "0")}
                            </span>
                            <span className="max-w-[78%] text-right text-[10.5px] leading-tight text-body-strong/0 transition-colors duration-300 group-hover:text-body-strong/90">
                              {img.alt}
                            </span>
                          </figcaption>
                          {/* 호버 프레임 */}
                          <div
                            aria-hidden
                            className="absolute inset-2 rounded-[2px] border border-ink/0 transition-colors duration-500 group-hover:border-ink/25"
                          />
                        </figure>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>

          <div>
            <p className="mt-10 font-mono text-[11px] leading-relaxed text-mute">
              * 현장 활동 사진은 의뢰인 및 관계자의 개인정보 보호를 위해 일부
              편집되었으며, 사건 결과는 개별 사안의 사실관계에 따른 것으로
              동일한 결과를 보장하지 않습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
