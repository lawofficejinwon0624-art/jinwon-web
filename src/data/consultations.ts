/**
 * 실시간 상담 접수 피드 — 서버 없이 "매일 바뀌는 실시간"을 구현.
 *
 * 원리: 날짜(YYYYMMDD)를 시드로 하는 결정적 PRNG(mulberry32)로
 * 그날의 상담 접수 목록을 생성한다. 같은 날에는 누가 언제 봐도 동일한
 * 목록이지만, 날짜가 바뀌면 목록 전체가 자동으로 바뀐다.
 * 각 항목에는 접수 시각이 있어, 현재 시각 이전 항목만 노출하면
 * 하루 동안 실제로 하나씩 "올라오는" 실시간처럼 보인다.
 */

const SURNAMES = [
  "김", "이", "박", "최", "정", "강", "조", "윤", "장", "임",
  "한", "오", "서", "신", "권", "황", "안", "송", "전", "홍",
];

const REGIONS = [
  "서울 강남구", "서울 송파구", "서울 서초구", "경기 성남시", "경기 수원시",
  "서울 마포구", "인천 연수구", "경기 고양시", "서울 강동구", "경기 용인시",
  "서울 노원구", "경기 화성시", "서울 영등포구", "부산 해운대구", "대전 서구",
];

const TOPICS: { label: string; weight: number; detail: string[] }[] = [
  {
    label: "교통사고",
    weight: 30,
    detail: [
      "신호위반 사고 문의",
      "사망사고 유족 보상 상담",
      "과실비율 이의 상담",
      "후유장해 평가 문의",
      "보험사 제시액 검토",
      "중앙선 침범 사고 문의",
      "뺑소니 피해 보상 상담",
      "사고현장 초기 대응",
    ],
  },
  {
    label: "산재·근재",
    weight: 24,
    detail: [
      "건설현장 일용직 산재 문의",
      "산재 불승인 재심 상담",
      "장해등급 이의 문의",
      "근재보험 초과손해 청구",
      "출퇴근 재해 인정 문의",
      "사업주 손해배상 상담",
    ],
  },
  {
    label: "보험분쟁",
    weight: 20,
    detail: [
      "암 진단금 문의",
      "보험금 부지급 상담",
      "채무부존재 소송 대응",
      "후유장해 보험금 청구",
      "실손보험 지급 거절 상담",
      "고지의무 위반 해지 분쟁",
    ],
  },
  {
    label: "손해사정",
    weight: 10,
    detail: ["손해액 산정 의뢰", "일실수입 산정 문의", "합의금 적정성 검토"],
  },
  {
    label: "형사일반",
    weight: 8,
    detail: ["고소장 작성 상담", "경찰조사 동석 요청", "형사합의 절차 문의"],
  },
  {
    label: "이혼·가사",
    weight: 5,
    detail: ["이혼 재산분할 상담", "양육권 문의"],
  },
  {
    label: "상속",
    weight: 3,
    detail: ["상속재산 분할 상담", "유류분 청구 문의"],
  },
];

const STATUSES = ["상담 완료", "상담 완료", "상담 완료", "변호사 배정", "진행 중"];

export type ConsultEntry = {
  id: number;
  minuteOfDay: number; // 0..1439 접수 시각
  name: string; // "김○○"
  region: string;
  topic: string;
  detail: string;
  status: string;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted(rand: () => number) {
  const total = TOPICS.reduce((s, t) => s + t.weight, 0);
  let r = rand() * total;
  for (const t of TOPICS) {
    r -= t.weight;
    if (r <= 0) return t;
  }
  return TOPICS[0];
}

export function dateSeed(d: Date) {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

/** 그날 하루치 상담 접수 목록 (결정적) */
export function generateDay(d: Date): ConsultEntry[] {
  const seed = dateSeed(d);
  const rand = mulberry32(seed * 2654435761);
  const count = 14 + Math.floor(rand() * 9); // 하루 14~22건
  const entries: ConsultEntry[] = [];
  for (let i = 0; i < count; i++) {
    // 접수 시각: 이른 아침~자정에 분포, 주간(9~21시)에 밀도 집중
    const bucket = rand();
    let minute: number;
    if (bucket < 0.12) minute = Math.floor(rand() * 9 * 60); // 00~09시
    else if (bucket < 0.88) minute = 9 * 60 + Math.floor(rand() * 12 * 60); // 09~21시
    else minute = 21 * 60 + Math.floor(rand() * 3 * 60); // 21~24시
    const topic = pickWeighted(rand);
    entries.push({
      id: seed * 100 + i,
      minuteOfDay: minute,
      name: SURNAMES[Math.floor(rand() * SURNAMES.length)] + "○○",
      region: REGIONS[Math.floor(rand() * REGIONS.length)],
      topic: topic.label,
      detail: topic.detail[Math.floor(rand() * topic.detail.length)],
      status: STATUSES[Math.floor(rand() * STATUSES.length)],
    });
  }
  return entries.sort((a, b) => a.minuteOfDay - b.minuteOfDay);
}

/**
 * 경과 시간 라벨 — 의도적으로 굵은 버킷만 사용한다.
 * 분 단위("30분 전")는 너무 빠르게 흘러 실시간처럼 안 보이므로 금지,
 * 최소 "2시간 전"부터 시작해 최대 "이틀 전"을 넘지 않는다.
 */
function coarseWhen(agoMin: number): string {
  const h = agoMin / 60;
  if (h < 3) return "2시간 전";
  if (h < 4.5) return "3시간 전";
  if (h < 7.5) return "6시간 전";
  if (h < 10.5) return "9시간 전";
  if (h < 16) return "12시간 전";
  if (h < 30) return "하루 전";
  return "이틀 전";
}

/**
 * 최근 48시간 접수 항목 — 최신순.
 * 오늘 + 어제 + 그제 3일치에서 48시간 창 안의 항목을 모아,
 * 하루가 지날수록 라벨이 2시간 → … → 이틀 전으로 자연스럽게 밀려난다.
 */
export function liveFeed(now: Date, limit = 8): (ConsultEntry & { when: string })[] {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const pool: (ConsultEntry & { agoMin: number })[] = [];

  for (const dayOffset of [0, 1, 2]) {
    const d = new Date(now);
    d.setDate(now.getDate() - dayOffset);
    for (const e of generateDay(d)) {
      const agoMin = nowMin - e.minuteOfDay + dayOffset * 1440;
      if (agoMin >= 0 && agoMin <= 2880) pool.push({ ...e, agoMin });
    }
  }

  pool.sort((a, b) => a.agoMin - b.agoMin);

  // 최신 몇 건 + 48시간 창에 고르게 퍼진 대표 항목들을 섞어,
  // 2시간 전 → … → 하루 전 → 이틀 전까지 쌓여 온 흐름이 한눈에 보이게 한다.
  const picked = new Map<number, (typeof pool)[number]>();
  for (const e of pool.slice(0, Math.max(2, limit - 4))) picked.set(e.id, e);
  for (const targetMin of [360, 720, 1440, 2400]) {
    if (picked.size >= limit) break;
    let best: (typeof pool)[number] | null = null;
    for (const e of pool) {
      if (picked.has(e.id)) continue;
      if (!best || Math.abs(e.agoMin - targetMin) < Math.abs(best.agoMin - targetMin))
        best = e;
    }
    if (best) picked.set(best.id, best);
  }
  for (const e of pool) {
    if (picked.size >= limit) break;
    picked.set(e.id, e);
  }

  return [...picked.values()]
    .sort((a, b) => a.agoMin - b.agoMin)
    .slice(0, limit)
    .map(({ agoMin, ...e }) => ({ ...e, when: coarseWhen(agoMin) }));
}

/** 오늘 0시부터 현재 시각까지의 접수 건수 */
export function todayCount(now: Date) {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return generateDay(now).filter((e) => e.minuteOfDay <= nowMin).length;
}

/** 최근 24시간 접수 건수 — 새벽에도 항상 하루치 규모가 보이도록 */
export function rolling24hCount(now: Date) {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const prev = generateDay(yesterday).filter((e) => e.minuteOfDay > nowMin).length;
  return todayCount(now) + prev;
}
