/**
 * 홈 챕터 장면 — 캔버스에 한 번 그리는 정적 프레임.
 * 팔레트는 브랜드 토큰만 사용: 오프화이트 잉크 + 웜 뉴트럴 + 장면 전용 앰버 글로우.
 */

export type SceneId = "insurance";

const AMBER = "217,185,138";

// 데스크톱 판정은 '화면 폭' 기준이다. 세로 화면에서 장면 밴드가 가로로 납작해질 때
// 종횡비(w>h*1.2)로 판정하면 모바일이 데스크톱 레이아웃으로 잘못 걸린다.
const DESKTOP_MIN_W = 900;

// ————— easing —————
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
/** p를 [a,b] 구간의 0..1로 리맵 */
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// ————— 보험분쟁 · 손해사정 (질병 보험금) —————
// 클라이언트 시안 3장(진단서 → 지급 안내문 겹침 → 진단서·약관 대조)을
// 스크롤 진행도에 따라 크로스페이드 + 미세 줌으로 스크럽한다.
// 스테이지 경계(0.3 / 0.55)는 page.tsx의 카피 비트 범위와 같다.
const INSURANCE_STAGES: [number, number][] = [
  [0, 0.3],
  [0.3, 0.55],
  [0.55, 1],
];
const BG = "33,29,26"; // --canvas-deep — 크롭 경계를 배경으로 녹이는 페더 색

function drawInsurance(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number,
  t: number,
  docs?: HTMLImageElement[],
) {
  const wide = w >= DESKTOP_MIN_W;
  // 데스크톱은 우하단 결과 카드(마지막 국면)와 겹치지 않도록 박스를 약간 위로 올린다.
  const boxW = wide ? w * 0.5 : w * 0.94;
  const boxH = wide ? h * 0.74 : h * 0.98;
  const cx = wide ? w * 0.69 : w / 2;
  const cy = wide ? h * 0.46 : h / 2;
  const fade = 0.045;

  // 장면 뒤 은은한 앰버 광원 — 시안의 사선 조명 느낌
  const glow = ctx.createRadialGradient(
    cx - boxW * 0.25,
    cy - boxH * 0.45,
    0,
    cx - boxW * 0.25,
    cy - boxH * 0.45,
    Math.max(boxW, boxH) * 0.9,
  );
  const breathe = 0.06 + 0.02 * Math.sin(t * 0.5);
  glow.addColorStop(0, `rgba(${AMBER},${breathe})`);
  glow.addColorStop(1, `rgba(${AMBER},0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < INSURANCE_STAGES.length; i++) {
    const img = docs?.[i];
    if (!img || !img.complete || !img.naturalWidth) continue;
    const [a, b] = INSURANCE_STAGES[i];
    let alpha = 1;
    if (i > 0) alpha *= easeInOut(seg(p, a - fade, a + fade));
    if (i < INSURANCE_STAGES.length - 1) alpha *= 1 - easeInOut(seg(p, b - fade, b + fade));
    if (i === 0) alpha *= easeOut(seg(p, 0, 0.06));
    if (alpha <= 0.002) continue;

    const ir = img.naturalWidth / img.naturalHeight;
    let dw = boxW;
    let dh = dw / ir;
    if (dh > boxH) {
      dh = boxH;
      dw = dh * ir;
    }
    // 스테이지 내부 진행도로 1.0 → 1.05 미세 줌 + 살짝 떠오르는 드리프트
    const q = seg(p, a, b);
    const sc = 1 + 0.05 * q + 0.004 * Math.sin(t * 0.7 + i);
    const dy = (1 - easeOut(q)) * 14 - 4;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy + dy);
    ctx.scale(sc, sc);
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  }

  // 가장자리 페더 — 크롭된 시안이 캔버스 배경으로 자연스럽게 녹아들게
  const fx0 = cx - boxW * 0.55;
  const fx1 = cx + boxW * 0.55;
  const fy0 = cy - boxH * 0.55;
  const fy1 = cy + boxH * 0.55;
  const fw = boxW * 0.22;
  const fh = boxH * 0.2;
  const edge = (x0: number, y0: number, x1: number, y1: number) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, `rgba(${BG},1)`);
    g.addColorStop(1, `rgba(${BG},0)`);
    return g;
  };
  ctx.fillStyle = edge(fx0, 0, fx0 + fw, 0);
  ctx.fillRect(fx0 - 2, 0, fw + 2, h);
  ctx.fillStyle = edge(fx1, 0, fx1 - fw, 0);
  ctx.fillRect(fx1 - fw, 0, fw + 2, h);
  ctx.fillStyle = edge(0, fy0, 0, fy0 + fh);
  ctx.fillRect(0, fy0 - 2, w, fh + 2);
  ctx.fillStyle = edge(0, fy1, 0, fy1 - fh);
  ctx.fillRect(0, fy1 - fh, w, fh + 2);
  // 박스 바깥은 완전히 배경색으로
  ctx.fillStyle = `rgba(${BG},1)`;
  ctx.fillRect(0, 0, Math.max(0, fx0 - 2), h);
  ctx.fillRect(fx1, 0, Math.max(0, w - fx1), h);
  ctx.fillRect(0, 0, w, Math.max(0, fy0 - 2));
  ctx.fillRect(0, fy1, w, Math.max(0, h - fy1));
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  insuranceDocs?: HTMLImageElement[],
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = `rgba(${BG},1)`;
  ctx.fillRect(0, 0, w, h);
  drawInsurance(ctx, w, h, 1, 0, insuranceDocs); // 최종 국면 정지 프레임
}
