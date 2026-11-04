/** 철학 밴드 — 문제 제기(고딕) → 핵심 선언(거대 명조 + 앰버 언더라인). 정적. */
export default function Philosophy({
  eyebrow,
  lead,
  punch,
  tail,
}: {
  eyebrow: string;
  lead: string;
  punch: string;
  tail?: string;
}) {
  const words = punch.split(" ");
  const last = words.pop();
  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* 現場 고스트 워터마크 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[2vw] top-1/2 hidden -translate-y-1/2 select-none text-right font-serif font-semibold leading-[0.92] text-ink/[0.035] md:block"
        style={{ fontSize: "clamp(200px, 24vw, 380px)" }}
      >
        現<br />場
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
        <div className="mb-12 flex items-center gap-6 md:mb-16">
          <p className="eyebrow shrink-0">{eyebrow}</p>
          <div className="h-px flex-1 bg-hairline" />
          <p className="hidden shrink-0 font-mono text-[10px] tracking-[0.24em] text-mute md:block">
            現場主義 — FIELD FIRST
          </p>
        </div>

        <p className="max-w-[34ch] text-[clamp(19px,2.6vw,30px)] font-medium leading-[1.6] tracking-[-0.02em] text-body-strong">
          {lead}
        </p>

        <p className="serif-accent mt-10 max-w-[15ch] text-[clamp(38px,6.4vw,76px)] font-semibold leading-[1.22] tracking-[-0.02em] text-ink md:mt-14">
          {words.join(" ")}{" "}
          <span
            className="inline-block border-b-[3px] pb-1 md:pb-2"
            style={{ borderColor: "var(--amber)" }}
          >
            {last}
          </span>
        </p>

        {tail && (
          <p className="mt-12 flex items-center gap-4 text-[13.5px] text-mute md:mt-16">
            <span aria-hidden className="h-px w-10 bg-hairline" />
            {tail}
          </p>
        )}
      </div>
    </section>
  );
}
