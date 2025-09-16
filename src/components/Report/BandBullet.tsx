import { useMemo } from "react";

type BandTupleWire = [number, number | "NaN"];
type BandsWire = { good: BandTupleWire; warn: BandTupleWire; bad: BandTupleWire };

export type BulletItemWire = {
  key: string;
  label: string;
  value: number;
  bands: BandsWire;
  direction: "higher" | "lower";
  unit: string | null;
};

export type PayloadWire = {
  stabilityBullets: BulletItemWire[];
  speedBullets: BulletItemWire[];
};


//정규화
export type BandTuple = [number, number | null ]; // [min, max]
export type Bands = {
  good: BandTuple;
  warn: BandTuple;
  bad: BandTuple;
};

export type BulletItem = {
  key: string;
  label: string;        // 이름
  value: number;        // 실제 값
  bands: Bands;         // 구간 정의
  direction: "higher" | "lower"; // 높을수록/낮을수록 좋은 지표
  unit?: string | null; // "fps", "ms" 등
};


//정규화 유틸(NaN 문자열 처리)
export const normalizeBands = (b: BandsWire): Bands => {
  const toTuple = (t: BandTupleWire): BandTuple => [t[0], t[1] === "NaN" ? null : t[1]];
  return { good: toTuple(b.good), warn: toTuple(b.warn), bad: toTuple(b.bad) };
};

type Props = {
  item: BulletItem;
  height?: number;      // 막대 높이(px)
  showTicks?: boolean;  // 눈금 표시 여부
};

const COLORS = {
  good: "#4ade80", // green-400
  warn: "#facc15", // yellow-400
  bad:  "#f87171", // red-400
};

function isFiniteNum(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

// bands 정보를 바탕으로 전체 도메인 [min, max] 계산 
function computeDomain(item: BulletItem): [number, number] {
  const mins: number[] = [];
  const maxs: number[] = [];
  for (const [min, max] of Object.values(item.bands)) {
    if (isFiniteNum(min)) mins.push(min);
    if (isFiniteNum(max)) maxs.push(max as number);
  }
  const min = Math.min(...mins);
  // max 가 NaN(무한대)일 수 있으므로 value와 다른 finite max를 고려해서 살짝 여유
  const finiteMax = maxs.length ? Math.max(...maxs) : item.value;
  const maxCandidate = Math.max(finiteMax, item.value);
  const pad = maxCandidate === 0 ? 1 : Math.abs(maxCandidate) * 0.05;
  return [min, maxCandidate + pad];
}

// value → 0~1 비율로 변환 
function ratioFromValue(value: number, domain: [number, number]) {
  const [min, max] = domain;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export default function BandBullet({
  item,
  height = 18,
  showTicks = true,
}: Props) {
  const domain = useMemo(() => computeDomain(item), [item]);
  const [min, max] = domain;

  // 구간을 렌더링 단위(퍼센트 폭)로 변환
  const segments = useMemo(() => {
    const order: Array<keyof Bands> = ["bad", "warn", "good"]; // 시각적 순서는 수치 순서 기준
    const parts: Array<{ label: keyof Bands; start: number; end: number; widthPct: number }> = [];
    order.forEach((k) => {
      const [sMin, sMax] = item.bands[k];
      const start = Math.max(min, isFiniteNum(sMin) ? sMin : min);
      const end = isFiniteNum(sMax) ? Math.min(max, sMax as number) : max;
      const width = Math.max(0, end - start);
      const widthPct = width <= 0 ? 0 : (width / (max - min)) * 100;
      parts.push({ label: k, start, end, widthPct });
    });
    // 수치 순서대로 정렬
    return parts.sort((a, b) => a.start - b.start);
  }, [item, min, max]);

  const valueLeftPct = ratioFromValue(item.value, domain) * 100;

  // 현재 값이 어느 밴드에 있는지 (아이콘 보더 색상 등 강조용)
  const currentBand: keyof Bands | undefined = useMemo(() => {
    for (const bandKey of ["bad", "warn", "good"] as Array<keyof Bands>) {
      const [bMin, bMax] = item.bands[bandKey];
      const lo = isFiniteNum(bMin) ? bMin : min;
      const hi = isFiniteNum(bMax) ? (bMax as number) : max + 1e9;
      if (item.value >= lo && item.value <= hi) return bandKey;
    }
    return undefined;
  }, [item, min, max]);

  return (
    <div className="w-full">
      {/* 헤더 라벨 + 값 */}
      <div className="flex items-end justify-between mb-1">
        <div className="text-base font-medium text-gray-800">{item.label}</div>
        <div className="text-sm text-gray-600">
          {item.value}
          {item.unit ? <span className="ml-1">{item.unit}</span> : null}
        </div>
      </div>

      {/* 막대 */}
      <div className="relative w-full rounded-lg overflow-hidden border border-gray-900"
          style={{ height }}>
        <div className="flex w-full h-full">
          {segments.map((s, i) => (
            <div
              key={i}
              className="h-full"
              title={`${s.label}`}
              style={{
                width: `${s.widthPct}%`,
                flex: i === segments.length - 1 ? "1" : "0 0 auto",
                background: COLORS[s.label],
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* 현재 값 마커 */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${valueLeftPct}%` }}
        >
          <div
            className="w-3 h-3 rounded-full ring-2 ring-white-100 shadow"
            style={{
              background:
                currentBand ? COLORS[currentBand] : "#3b82f6", // 현재 구간 색
              border: "1px solid rgba(0,0,0,0.15)",
            }}
            title={`value=${item.value}`}
          />
        </div>
      </div>

      {/* 하단 눈금 */}
      {showTicks && (
        <div className="flex justify-between text-[12px] text-gray-400 mt-1 relative">
        {(() => {
        // 밴드 경계 수집
        const boundaries: number[] = [];
        Object.values(item.bands).forEach(([lo, hi]) => {
          if (isFiniteNum(lo)) boundaries.push(lo);
          if (isFiniteNum(hi)) boundaries.push(hi as number);
        });
        // min/max 포함해서 정렬 후 중복 제거
        const uniq = Array.from(new Set(boundaries)).sort((a, b) => a - b);

        return uniq.map((val, i) => {
            const leftPct = ratioFromValue(val, domain) * 100;
            return (
            <span
              key={i}
              className="absolute -translate-x-1/2"
              style={{ left: `${leftPct}%` }}
            >
              {val}
            </span>
            );
        });
        })()}
        </div>
      )}
    </div>
  );
}
