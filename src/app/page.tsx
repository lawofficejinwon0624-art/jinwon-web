import Link from "next/link";
import Hero from "@/components/home/Hero";
import Chapter from "@/components/home/Chapter";
import Ticker from "@/components/home/Ticker";
import LiveFeed from "@/components/home/LiveFeed";
import MembersPreview from "@/components/home/MembersPreview";
import Philosophy from "@/components/home/Philosophy";
import { activities } from "@/data/activities";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />

      {/* 철학 밴드 — 문제 제기 → 핵심 선언 */}
      <Philosophy
        eyebrow="WHY JINWON"
        lead="같은 사건도, 초기 대응에 따라 결과는 달라집니다. 초기 대응의 작은 차이가 수사의 방향을 바꿉니다."
        punch="그래서 진원은 사건의 현장에 있습니다."
        tail="진원이 세 가지 사건을 다루는 방식을 직접 확인하세요."
      />

      {/* ——— 사건 챕터 ——— */}
      <Chapter
        image="/images/traffic-scene.webp"
        index="01"
        label="교통사고 사망 · 중상해"
        href="/practice#traffic"
        beats={[
          {
            eyebrow: "23:41 — 밤의 도로",
            title: "시간은 흐르고 있습니다",
            body: "교통사고는 사고가 난 순간부터 대응이 시작됩니다.",
          },
          {
            title: "현장은 변하고, 증거는 사라집니다",
            body: "이미 한 진술은 기록으로 남습니다. 시간이 지날수록 되돌릴 수 있는 것이 줄어듭니다.",
          },
          {
            title: "진원은 현장을 다시 그립니다",
            body: "현장확인 즉시 대응 — 제동거리와 이격을 다시 재고, 과실비율을 재산정합니다. 80:20이 20:80이 된 것은 우연이 아닙니다.",
          },
        ]}
        result={{
          value: "4.2배",
          caption: "보험사 제시액 대비 확정 배상액",
          note: "2026 항소심 승소사례",
        }}
      />

      <Chapter
        image="/images/industrial-scene.webp"
        imageFade
        index="02"
        label="산재사고 · 근재보험"
        href="/practice#industrial"
        beats={[
          {
            eyebrow: "01 / 멈춰 선 일상",
            title: "일터에서의 사고, 일상까지 멈춰 섭니다.",
            body: "치료와 휴업, 앞으로의 생계까지. 사고 이후의 막막함을 함께 살핍니다.",
          },
          {
            eyebrow: "02 / 산재 승인 그 이후",
            title: "산재 승인, 보상은 충분한가요?",
            body: "산재급여와 실제 손해의 차이, 후유장해와 위자료까지 검토가 필요합니다.",
          },
          {
            eyebrow: "03 / 진원의 대응",
            title: "재해 경위부터, 보상의 범위까지 짚습니다.",
            body: "현장 자료와 의무기록으로 재해 경위를 확인합니다. 사업주 책임과 근재보험 가입 여부·약관을 살펴 추가 청구 가능성을 검토합니다.",
          },
        ]}
        result={{
          value: "산재 · 근재",
          caption: "산재 신청부터 추가 손해 검토까지",
          note: "산재 · 근재 대응 자세히 보기",
        }}
      />

      <Chapter
        scene="insurance"
        index="03"
        label="보험분쟁 · 손해사정"
        href="/practice#insurance"
        beats={[
          {
            eyebrow: "01 / 진단 이후",
            title: "진단 이후, 보험금 문제까지 마주했습니다.",
            body: "하나의 진단이, 또 다른 시작이 될 수 있습니다.",
          },
          {
            eyebrow: "02 / 지급 거절",
            title: "보험사의 설명, 그대로 받아들여야 할까요?",
            body: "같은 진단이라도, 보험사의 해석은 달라질 수 있습니다.",
          },
          {
            eyebrow: "03 / 진단 약관 재검토",
            title: "진단 근거와 약관을 함께 검토합니다.",
            body: "진단의 의미와 약관의 기준을 연결해 당신의 권리를 지켜냅니다.",
          },
        ]}
        result={{
          value: "전액 지급",
          caption: "지급 거절 → 약관 재검토 후 보험금 전액 인정",
          note: "2026 보험금 분쟁 사례",
        }}
      />

      <LiveFeed />
      <MembersPreview />

      {/* 프로세스 */}
      <section className="hairline-t bg-canvas-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
          <div>
            <p className="eyebrow mb-5">PROCESS</p>
            <h2 className="display text-[clamp(28px,4vw,44px)]">
              접수부터 회수까지, 한 팀이 끝까지
            </h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-4">
            {[
              ["01", "즉시 상담", "24시간 접수 — 변호사가 직접 사건성을 검토하고 골든타임을 판단합니다."],
              ["02", "현장 · 증거 확보", "현장확인, 블랙박스·CCTV·계좌 등 사라지기 전에 증거를 보전합니다."],
              ["03", "전략 설계", "21년 경력 손해사정사와 변호사가 손해액·과실·절차를 정밀 산정합니다."],
              ["04", "실행 · 회수", "형사·민사·행정을 병행 실행하고, 판결이 아닌 실제 회수까지 책임집니다."],
            ].map(([n, t, b], i) => (
              <div key={n} className="bg-canvas-deep">
                <div className="h-full bg-canvas-soft/30 p-6 md:p-7">
                  <p className="font-mono text-[12px] text-mute">{n}</p>
                  <p className="mt-4 text-[17px] font-medium text-ink">{t}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-body">
                    {b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최근 활동 프리뷰 */}
      <section className="hairline-t bg-canvas">
        <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-5">RECENT</p>
                <h2 className="display text-[clamp(28px,4vw,44px)]">
                  진원의 최근 활동
                </h2>
              </div>
              <Link
                href="/activities"
                className="link-quiet mb-1 text-[14px] font-medium text-body-strong hover:text-ink"
              >
                전체 보기 →
              </Link>
            </div>
          </div>
          <div className="mt-12">
            {activities.slice(0, 4).map((a, i) => (
              <div key={a.title}>
                <Link
                  href="/activities"
                  className="group hairline-b flex flex-col gap-2 py-6 transition-colors md:flex-row md:items-baseline md:gap-8"
                >
                  <span className="font-mono text-[12px] text-mute md:w-20 md:shrink-0">
                    {a.date}
                  </span>
                  <span className="w-20 shrink-0 font-mono text-[11px] tracking-wider text-body-strong">
                    {a.category}
                  </span>
                  <span className="flex-1 text-[16px] font-medium text-body-strong transition-colors group-hover:text-ink md:text-[17px]">
                    {a.title}
                  </span>
                  {a.result && (
                    <span className="shrink-0 rounded-sm border border-hairline px-2.5 py-1 font-mono text-[11px] text-ink">
                      {a.result}
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-t bg-canvas">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-8 md:py-28">
          <div><p className="eyebrow mb-6">JINWON JOURNAL</p><h2 className="text-[clamp(28px,3.5vw,42px)] leading-[1.5] tracking-[-0.045em]">당신의 질문에서,<br/><span className="serif-accent">진원의 이야기</span>가 시작됩니다.</h2></div>
          <div><p className="mb-7 text-[14px] leading-[1.9] text-body">교통사고, 산재사고, 질병·진단금.<br/>꼭 필요한 법률 이야기를 차분히 전합니다.</p><div className="flex flex-col items-start gap-5"><Link href="/columns" className="inline-flex gap-12 border-b border-mute pb-3 text-[14px]">진원 칼럼 읽어보기 <span>↗</span></Link><Link href="/ai" className="inline-flex gap-8 text-[13px] text-body">AI 진원에서 공개 문답 찾기 <span>↗</span></Link></div></div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="hairline-t bg-canvas-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-28 text-center md:px-8 md:py-40">
          <div>
            <p className="eyebrow mb-7">CONSULT</p>
            <h2 className="display mx-auto max-w-[20ch] text-[clamp(32px,5.4vw,60px)]">
              사건은 기다려주지 않습니다.
              <br />
              <span className="serif-accent font-semibold">지금</span> 물어보세요.
            </h2>
          </div>
          <div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/consult"
                className="rounded-sm bg-ink px-8 py-4 text-[15px] font-medium text-on-primary transition-opacity hover:opacity-85"
              >
                빠른 상담신청
              </Link>
              <a
                href={`tel:${site.phone}`}
                data-phone-position="bottom-cta"
                className="rounded-sm border border-hairline px-8 py-4 font-mono text-[15px] text-ink transition-colors hover:border-mute"
              >
                {site.phone} <span className="ml-2 text-[12px] text-mute">24시간 · 연중무휴</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
