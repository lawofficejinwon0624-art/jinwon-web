import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LiveFeedMini from "@/components/consult/LiveFeedMini";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "24시간 법률상담 — 교통사고 사망·중상해, 산재·근재, 보험분쟁",
  description: `법률사무소 진원 24시간 상담 — 전화 ${site.phone} 또는 카카오톡으로 바로 연결됩니다. 교통사고 사망·중상해, 산재·근재, 보험분쟁 — 골든타임 안에 물어보세요.`,
  alternates: { canonical: "/consult" },
  openGraph: {
    title: "24시간 법률상담 | 법률사무소 진원",
    description: `전화 ${site.phone} 또는 카카오톡으로 바로 연결됩니다. 야간·주말에도 변호사가 받습니다.`,
    url: "/consult",
  },
};

const URGENT = [
  "사고 직후이거나 경찰 조사가 잡힌 경우",
  "투자금 출금이 방금 막힌 경우",
  "음주 적발 후 첫 조사가 72시간 이내인 경우",
  "보험사에서 합의서 서명을 요구하는 경우",
];

const STEPS = [
  ["01", "전화 또는 카카오톡", "번호를 누르거나 카톡 채널로 메시지를 남겨주세요. 24시간·연중무휴로 접수됩니다."],
  ["02", "변호사 직접 확인", "상담 내용을 변호사가 직접 검토하고, 골든타임 여부를 먼저 판단합니다."],
  ["03", "대응 방향 안내", "사건에 맞는 구성원과 다음 단계를 안내드립니다. 고지 전에는 비용이 발생하지 않습니다."],
];

export default function ConsultPage() {
  return (
    <>
      <PageHero
        eyebrow="24H CONSULT"
        title={
          <>
            골든타임 안에,
            <br />
            물어보세요
          </>
        }
        lede="교통사고의 현장 증거, 산재의 재해 경위, 보험사에 제출한 첫 서류 — 전부 시간이 지나면 되돌릴 수 없습니다. 전화 한 통, 카톡 한 줄이면 됩니다."
      />

      <section className="bg-canvas pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          {/* 전화 · 카카오톡 — 두 개의 큰 문 */}
          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-2">
            <div className="bg-canvas">
              <a
                href={`tel:${site.phone}`}
                className="group flex h-full flex-col justify-between bg-canvas-soft/40 p-8 transition-colors duration-300 hover:bg-canvas-soft md:p-12"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    <p className="eyebrow">CALL — 지금 통화</p>
                  </div>
                  <p className="mt-7 font-mono text-[clamp(34px,5vw,52px)] leading-none text-ink">
                    {site.phone}
                  </p>
                  <p className="mt-4 text-[14px] text-body-strong">
                    {site.phoneNote} — 야간·주말에도 변호사가 받습니다
                  </p>
                </div>
                <p className="mt-10 text-[13.5px] font-medium text-body-strong transition-colors group-hover:text-ink">
                  전화 걸기 →
                </p>
              </a>
            </div>

            <div className="bg-canvas">
              <a
                href={site.kakaoChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between bg-canvas-soft/40 p-8 transition-colors duration-300 hover:bg-canvas-soft md:p-12"
              >
                <div>
                  <p className="eyebrow">KAKAO — 카카오톡 상담</p>
                  <p className="mt-7 text-[clamp(26px,3.4vw,38px)] font-medium leading-tight tracking-[-0.03em] text-ink">
                    통화가 어렵다면
                    <br />
                    카톡으로 남겨주세요
                  </p>
                  <p className="mt-4 max-w-[32ch] text-[14px] leading-relaxed text-body-strong">
                    사건 내용을 편하게 적어 보내시면 변호사가 확인 후
                    답변드립니다. 사진·서류도 함께 보낼 수 있습니다.
                  </p>
                </div>
                <p className="mt-10 text-[13.5px] font-medium text-body-strong transition-colors group-hover:text-ink">
                  카카오톡 채널 열기 ↗
                </p>
              </a>
            </div>
          </div>

          {/* 상담 절차 */}
          <div>
            <p className="eyebrow mb-6 mt-20">HOW IT WORKS</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-3">
            {STEPS.map(([n, t, d], i) => (
              <div key={n} className="bg-canvas">
                <div className="h-full bg-canvas-soft/30 p-7 md:p-8">
                  <p className="font-mono text-[12px] text-mute">{n}</p>
                  <p className="mt-5 text-[17px] font-medium text-ink">{t}</p>
                  <p className="mt-3 text-[13.5px] leading-[1.8] text-body">
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 긴급 · 실시간 접수 */}
          <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <div className="h-full rounded-md border border-hairline bg-canvas-soft/40 p-7 md:p-9">
                <p className="eyebrow mb-5">이런 경우, 지금 전화하세요</p>
                <ul className="space-y-4">
                  {URGENT.map((u) => (
                    <li
                      key={u}
                      className="flex items-baseline gap-3 text-[14.5px] leading-relaxed text-body-strong"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber" />
                      {u}
                    </li>
                  ))}
                </ul>
                <a
                  href={`tel:${site.phone}`}
                  className="press mt-8 inline-block rounded-sm bg-ink px-7 py-3.5 font-mono text-[16px] font-medium text-on-primary hover:opacity-85"
                >
                  {site.phone}
                </a>
              </div>
            </div>
            <div>
              <LiveFeedMini />
            </div>
          </div>

          {/* 방문 상담 */}
          <div>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-md border border-hairline bg-canvas-soft/30 p-7 md:p-9">
              <div>
                <p className="text-[16px] font-medium text-ink">
                  방문 상담을 원하시면
                </p>
                <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-body">
                  {site.address} — 봉은사역 2번출구 12m. 예약제로 운영되니
                  방문 전 연락 주시면 대기 없이 상담하실 수 있습니다.
                </p>
              </div>
              <a
                href="/location"
                className="press shrink-0 rounded-sm border border-hairline px-6 py-3.5 text-[14px] font-medium text-ink transition-colors hover:border-mute"
              >
                오시는 길 보기 →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
