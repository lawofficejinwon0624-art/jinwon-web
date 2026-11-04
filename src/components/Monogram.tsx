/** 사진이 없는 구성원용 모노그램 포트레이트 — 브랜드 웜다크 + 명조 이니셜 */
export default function Monogram({
  initial,
  className = "",
}: {
  initial: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      // 주의: 여기에 relative를 넣으면 호출부의 absolute를 덮어써 높이가 0으로 붕괴한다.
      // 포지셔닝은 전적으로 호출부 className이 결정한다 (absolute inset-0 / h-full w-full).
      className={`flex items-center justify-center overflow-hidden bg-canvas-deep ${className}`}
      style={{ containerType: "size" }}
    >
      {/* 고스트 이니셜 — 패널 크기에 비례 */}
      <span
        className="pointer-events-none absolute -bottom-[10%] -right-[4%] select-none font-serif font-semibold leading-none text-ink/[0.05]"
        style={{ fontSize: "82cqw" }}
      >
        {initial}
      </span>
      {/* 중앙 이니셜 */}
      <span
        className="serif-accent relative leading-none text-body-strong/85"
        style={{ fontSize: "24cqw" }}
      >
        {initial}
      </span>
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 32%, rgba(217,185,138,0.08), transparent 70%), linear-gradient(to top, rgba(23,20,17,0.55), transparent 45%)",
        }}
      />
    </div>
  );
}
