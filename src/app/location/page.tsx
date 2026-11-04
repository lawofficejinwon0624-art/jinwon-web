import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "오시는 길 — 강남 봉은사역 2번출구",
  description: `법률사무소 진원 — ${site.address} (${site.postcode}). 봉은사역 2번출구 12m. 상담 ${site.phone}, 24시간 연중무휴.`,
  alternates: { canonical: "/location" },
  openGraph: {
    title: "오시는 길 | 법률사무소 진원",
    description: `법률사무소 진원 — ${site.address} (${site.postcode}). 봉은사역 2번출구 12m. 상담 ${site.phone}, 24시간 연중무휴.`,
    url: "/location",
  },
};

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="LOCATION"
        title="오시는 길"
        lede={`${site.address} — 봉은사역 2번출구에서 12m, 나오시면 바로입니다. 방문 전 전화 주시면 주차를 안내해 드립니다.`}
      />

      <section className="bg-canvas pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline lg:grid-cols-[1.35fr_1fr]">
            {/* 구글맵 임베드 — 브랜드 프레임 */}
            <div className="bg-canvas">
              <div className="flex h-full flex-col bg-canvas-deep">
                {/* 캡션 바 */}
                <div className="hairline-b flex items-center justify-between px-5 py-4 md:px-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-body-strong">
                    MAP — 랜드마크빌딩 6F
                  </p>
                  <p className="hidden font-mono text-[10px] tracking-[0.12em] text-mute sm:block">
                    37.5145°N · 127.0605°E
                  </p>
                </div>

                {/* 맵 프레임 */}
                <div className="relative min-h-[360px] flex-1 md:min-h-[460px]">
                  <iframe
                    src={site.googleMapEmbed}
                    title="법률사무소 진원 위치 — 서울특별시 강남구 영동대로 607 랜드마크빌딩 (봉은사역 2번출구 12m)"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0 grayscale-[0.55] sepia-[0.14] contrast-[0.97]"
                  />
                  {/* 프레임 비네트 + 코너 틱 (지도 조작을 막지 않음) */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_54px_rgba(23,20,17,0.5)]"
                  />
                  <div aria-hidden className="frame-ticks pointer-events-none absolute inset-0">
                    <i /><i /><i /><i />
                  </div>
                </div>

                {/* 지도 앱 바로가기 */}
                <div className="hairline-t grid grid-cols-2 sm:grid-cols-4">
                  <a
                    href={site.kakaoMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] items-center justify-center gap-1.5 bg-ink text-[13px] font-medium text-on-primary transition-opacity hover:opacity-90"
                  >
                    카카오맵 <span aria-hidden className="text-[11px] opacity-70">↗</span>
                  </a>
                  <a
                    href={site.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] items-center justify-center gap-1.5 border-l border-hairline text-[13px] font-medium text-body-strong transition-colors hover:bg-canvas-soft hover:text-ink"
                  >
                    네이버 지도 <span aria-hidden className="text-[11px] text-mute">↗</span>
                  </a>
                  <a
                    href={site.tmapUrl}
                    className="flex min-h-[52px] items-center justify-center gap-1.5 border-t border-hairline text-[13px] font-medium text-body-strong transition-colors hover:bg-canvas-soft hover:text-ink sm:border-l sm:border-t-0"
                  >
                    티맵 안내 <span aria-hidden className="text-[11px] text-mute">↗</span>
                  </a>
                  <a
                    href={site.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[52px] items-center justify-center gap-1.5 border-l border-t border-hairline text-[13px] font-medium text-body-strong transition-colors hover:bg-canvas-soft hover:text-ink sm:border-t-0"
                  >
                    구글맵 크게 보기 <span aria-hidden className="text-[11px] text-mute">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 정보 패널 */}
            <div className="flex flex-col gap-px bg-hairline">
              <div className="flex-1 bg-canvas">
                <div className="h-full bg-canvas-soft/40 p-7 md:p-9">
                  <p className="eyebrow mb-4">주소</p>
                  <p className="text-[17px] leading-relaxed text-ink">
                    서울특별시 강남구
                    <br />
                    영동대로 607
                    <br />
                    랜드마크빌딩 6층 ({site.postcode})
                  </p>
                </div>
              </div>
              <div className="flex-1 bg-canvas">
                <div className="h-full bg-canvas-soft/40 p-7 md:p-9">
                  <p className="eyebrow mb-4">대중교통</p>
                  <p className="text-[17px] font-medium text-ink">
                    봉은사역 2번출구{" "}
                    <span className="font-mono text-[15px] text-body-strong">
                      12m
                    </span>
                  </p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body">
                    9호선 봉은사역 2번출구로 나오시면 바로 랜드마크빌딩입니다.
                  </p>
                </div>
              </div>
              <div className="flex-1 bg-canvas">
                <div className="h-full bg-canvas-soft/40 p-7 md:p-9">
                  <p className="eyebrow mb-4">연락처</p>
                  <a
                    href={`tel:${site.phone}`}
                    className="font-mono text-[30px] text-ink transition-opacity hover:opacity-80"
                  >
                    {site.phone}
                  </a>
                  <div className="mt-5 space-y-1.5 font-mono text-[12px] text-body">
                    <p>FAX — {site.fax}</p>
                    <p>MAIL — {site.email}</p>
                    <p>운영시간 — {site.phoneNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 방문이 어려운 분들을 위한 상담 안내 */}
      <section className="bg-canvas pb-28 md:pb-40">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div>
            <div className="rounded-md border border-hairline bg-canvas-soft/40 p-8 text-center md:p-14">
              <p className="display text-[clamp(24px,3.4vw,36px)]">
                방문 상담이 어려우신가요?
              </p>
              <p className="mx-auto mt-4 max-w-[42ch] text-[15px] leading-relaxed text-body">
                전화, 카카오톡, 온라인으로도 편하게 상담하실 수 있습니다.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${site.phone}`}
                  className="rounded-sm bg-ink px-7 py-3.5 font-mono text-[16px] font-medium text-on-primary transition-opacity hover:opacity-85"
                >
                  {site.phone}
                </a>
                <a
                  href={site.kakaoChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-hairline px-7 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-mute"
                >
                  카카오톡 상담 ↗
                </a>
                <Link
                  href="/consult"
                  className="rounded-sm border border-hairline px-7 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-mute"
                >
                  온라인 상담 신청
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
