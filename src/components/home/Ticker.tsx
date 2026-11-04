const ITEMS = [
  "교통사고 과실비율 80:20 → 20:80 항소심 승소",
  "상해급수 7급 → 5급 인정",
  "후유장해 12급 → 9급 상향 · 합의금 2.8배",
  "산재 불승인 처분 취소 · 요양 승인",
  "근재보험 초과손해 1.2억 원 추가 청구 인용",
  "일실수입 재산정 · 보험사 제시액 2.1배 합의",
];

/** 승소사례 마퀴 스트립 */
export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="hairline-t hairline-b overflow-hidden bg-canvas-deep py-4">
      <div className="marquee-track flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap font-mono text-[12.5px] text-body">
              {item}
            </span>
            <span className="mx-7 h-1 w-1 rounded-full bg-mute/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
