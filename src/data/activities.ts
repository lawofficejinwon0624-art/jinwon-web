export type Activity = {
  date: string;
  category: "현장활동" | "협약·공익" | "승소사례" | "언론보도" | "소식";
  title: string;
  summary: string;
  result?: string;
  /** 갤러리 이미지 (있으면 카드가 포토 레이아웃으로 렌더) */
  images?: { src: string; alt: string }[];
  /** 외부 링크 — kind에 따라 아이콘이 달라진다 (기본: youtube) */
  link?: { href: string; label: string; kind?: "youtube" | "blog" | "news" };
  /** 아직 자료 정리 중인 항목 */
  pending?: boolean;
};

export const activities: Activity[] = [
  {
    date: "2026",
    category: "현장활동",
    title: "부산 투자사기 현금 수거책 경찰 공조 현장출동 · 검거",
    summary:
      "신고 접수 즉시 서울에서 부산으로 출동해,\n접선 장소가 보이는 곳에 자리를 잡고\n경찰과 함께\n투자사기일당 및 현금수거책을 검거했습니다.\n\n서류만 검토하지 않고,\n피해금이 사라지기 전에 현장에서 직접 움직입니다.",
    result: "현장 검거",
    link: {
      href: "https://www.livesnews.com/news/article.html?no=65027",
      label: "관련 보도 확인하기",
      kind: "news",
    },
    images: [
      { src: "/images/activities/busan-field-1.webp", alt: "접선지 주변에서 대기중" },
      { src: "/images/activities/busan-field-2.webp", alt: "접선 장소가 보이는 곳에서 대기" },
      { src: "/images/activities/busan-field-3.webp", alt: "접선 장소로 이동" },
      { src: "/images/activities/busan-field-4.webp", alt: "경찰 공조 현금 수거책 검거" },
    ],
  },
  {
    date: "2026",
    category: "협약·공익",
    title: "법률사무소 진원X단골병원 업무협약 체결",
    summary:
      "법률사무소 진원과 단골병원이 법률지원 업무협약을 체결했습니다.\n\n의료진과 환자분들이 겪는 법률 문제, 이제 진원이 가까이에서 함께합니다.",
    images: [
      { src: "/images/activities/dangol-mou-1.webp", alt: "법률사무소 진원 × 단골병원 업무협약 체결" },
      { src: "/images/activities/dangol-mou-2.webp", alt: "상호 업무협력 협약식 서명" },
    ],
  },
  {
    date: "2026",
    category: "현장활동",
    title: "어선원 사망사건 조사 및 선박 재해 예방 교육 실시",
    summary:
      "어선원 사망사건 조사를 위해 항구와 선박 현장에 직접 출동해 사고 발생 지점과 작업 환경, 선내 구조 및 작업 동선 등 사고 경위를 파악하는 데 필요한 요소를 확인했습니다.\n\n현장 조사와 함께 인근 선주 및 선원들을 대상으로 실제 조업 과정에서 발생할 수 있는 추락·실족·끼임·사망·실종 등 선박 재해의 위험요인과 사고 예방을 위한 안전수칙에 대한 교육도 실시했습니다.",
    images: [
      { src: "/images/activities/harbor-field-1.webp", alt: "어선 갑판 위 선내 구조 및 작업 동선 확인" },
      { src: "/images/activities/harbor-field-2.webp", alt: "항구 정박 선박 현장 조사" },
      { src: "/images/activities/harbor-field-3.webp", alt: "부두 계류 로프·작업 환경 점검" },
      { src: "/images/activities/harbor-field-4.webp", alt: "사고 발생 지점 및 주변 환경 확인" },
    ],
  },
  {
    date: "2026",
    category: "현장활동",
    title: "무안 저수지 사망사건 현장 출동",
    summary:
      "무안 사망사건 현장에 직접 출동해 도로 폭과 구조, 이동 동선, 주변 환경 등 사고 당시 상황을 파악할 수 있는 여러 요소를 면밀히 확인했습니다.",
    link: {
      href: "https://blog.naver.com/tele4n/224412689077",
      label: "현장 활동 자세히 보기",
      kind: "blog",
    },
    images: [
      { src: "/images/activities/muan-field-1.webp", alt: "무안 저수지 사고 현장 확인" },
      { src: "/images/activities/muan-field-2.webp", alt: "사고 지점 주변 환경 및 시야 확인" },
      { src: "/images/activities/muan-field-3.webp", alt: "도로 폭·구조 및 이동 동선 점검" },
      { src: "/images/activities/muan-field-4.webp", alt: "현장 실측 및 자료 확보" },
    ],
  },
  {
    date: "2026",
    category: "협약·공익",
    title: "대한민국재향군인회 협약 체결 및 봉사활동",
    summary:
      "대한민국재향군인회와 법률지원 업무협약을 체결하고, 회원과 가족을 위한 법률상담·봉사활동을 이어가고 있습니다. 국가를 위해 헌신한 분들이 법률 문제로 더 어려움을 겪지 않도록 진원이 곁에서 함께합니다.",
    images: [
      { src: "/images/activities/veterans-1.webp", alt: "대한민국재향군인회 업무협약 체결식" },
      { src: "/images/activities/veterans-2.webp", alt: "재향군인회 협약 체결 기념" },
      { src: "/images/activities/veterans-3.webp", alt: "재향군인회 봉사활동 현장" },
      { src: "/images/activities/veterans-4.webp", alt: "재향군인회 회원 법률상담" },
    ],
  },
  {
    date: "2026",
    category: "현장활동",
    title: "투자사기 현금 수거책 경찰 공조 현장출동 · 검거",
    summary:
      "투자사기 피해 신고를 접수한 즉시 현장으로 출동해 경찰과 공조하여 현금 수거책을 검거했습니다. 사무실에서 서류만 검토하는 것이 아니라, 피해금이 사라지기 전에 현장에서 직접 움직입니다.",
    result: "현장 검거",
    images: [
      { src: "/images/activities/fraud-field-1.webp", alt: "투자사기 현금 수거책 현장출동" },
      { src: "/images/activities/fraud-field-2.webp", alt: "경찰 공조 현장활동" },
      { src: "/images/activities/fraud-field-3.webp", alt: "현금 수거책 검거 현장" },
      { src: "/images/activities/fraud-field-4.webp", alt: "투자사기 피해구제 현장 대응" },
    ],
  },
  {
    date: "2026",
    category: "현장활동",
    title: "예산 교통사고 치상 사건 현장 활동",
    summary:
      "충남 예산 교통사고 치상 사건 현장에 직접 출동해 사고 지점과 노면 흔적을 확인하고, 사고 재구성에 필요한 자료를 확보했습니다. 현장 활동 영상으로 진원의 대응 방식을 직접 확인하실 수 있습니다.",
    link: {
      href: "https://www.youtube.com/watch?v=rcRXfTee6zg",
      label: "현장 활동 영상 보기",
    },
    images: [
      { src: "/images/activities/yesan-field-1.webp", alt: "예산 사고 지점 및 주변 시야 확인" },
      { src: "/images/activities/yesan-field-2.webp", alt: "도로 구조와 차량 진행 방향 점검" },
      { src: "/images/activities/yesan-field-3.webp", alt: "사고 지점 노면 및 갓길 상태 확인" },
      { src: "/images/activities/yesan-field-4.webp", alt: "현장 실측 및 자료 확보" },
    ],
  },
  {
    date: "2026",
    category: "현장활동",
    title: "목포 교통사고 치사 사건 현장 활동",
    summary:
      "목포 교통사고 치사 사건 현장에 출동해 교량 구간의 도로 구조와 갓길 폭, 보행 동선과 시야 확보 상태를 직접 확인하고 사고 경위 재구성에 필요한 증거를 확보했습니다.",
    link: {
      href: "https://www.youtube.com/watch?v=tX-knDxi73o",
      label: "현장 활동 영상 보기",
    },
    images: [
      { src: "/images/activities/mokpo-field-1.webp", alt: "목포 사고 현장 교량 구간 확인" },
      { src: "/images/activities/mokpo-field-2.webp", alt: "차로 구조 및 보행 동선 점검" },
      { src: "/images/activities/mokpo-field-3.webp", alt: "사고 지점 주변 환경 및 시야 확인" },
      { src: "/images/activities/mokpo-field-4.webp", alt: "현장 실측 및 자료 확보" },
    ],
  },
];
