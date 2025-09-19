type Props = {
  data: number[];           // 각 프레임의 fake confidence (0~1)
  title?: string;           // 상단 제목
  width?: number;           // 전체 너비
  height?: number;          // 전체 높이
  barHeight?: number;       // 메인 히트맵 바 높이
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function viridis(t: number) {
  const stops = [
    [68, 1, 84],     // 0.00
    [72, 35, 116],   // 0.15
    [64, 67, 135],   // 0.30
    [52, 94, 141],   // 0.45
    [41, 120, 142],  // 0.60
    [32, 144, 140],  // 0.70
    [53, 183, 121],  // 0.80
    [110, 206, 88],  // 0.90
    [181, 222, 43],  // 1.00
  ];
  const x = clamp01(t) * (stops.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  const r = Math.round(a[0] + (b[0] - a[0]) * f);
  const g = Math.round(a[1] + (b[1] - a[1]) * f);
  const bch = Math.round(a[2] + (b[2] - a[2]) * f);
  return `rgb(${r},${g},${bch})`;
}

export default function DfFrameHeatmap({
  data,
  title = "Per-frame Fake Confidence Heatmap",
  width = 1500,
  height = 260,
  barHeight = 90,
}: Props) {
  const baseW = width;
  const baseH = height;
  const margin = { top: 36, right: 90, bottom: 50, left: 30 };
  const w = baseW - margin.left - margin.right;
  const h = baseH - margin.top - margin.bottom;

  const N = data.length || 1;
  const cellW = w / N;

  // 컬러바 설정
  const legendW = 16;
  const legendH = h; // 세로 꽉 차게
  const legendSteps = 64;

  // x축 눈금 (0, 2, 4 … or N<10이면 모두 표시)
  const tickEvery = N >= 20 ? 2 : 1;
  const ticks = Array.from({ length: N }, (_, i) => i).filter(
    (i) => i % tickEvery === 0
  );

  return (
    <svg 
    viewBox={`0 0 ${baseW} ${baseH}`}
    preserveAspectRatio="xMidYMid meet"
    style={{ width: "100%", height: "auto", display: "block" }}>
      {/* 제목 */}
      <text
        x={width / 2}
        y={margin.top * 0.9}
        textAnchor="middle"
        fontSize={24}
        fontWeight={700}
        fill="#111"
      >
        {title}
      </text>

      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* 히트맵 바 외곽 박스 */}
        <rect
          x={0}
          y={(h - barHeight) / 2}
          width={w}
          height={barHeight}
          fill="#fff"
          stroke="#ddd"
          rx={6}
        />
        {/* 셀들 */}
        {data.map((v, i) => (
          <rect
            key={i}
            x={i * cellW}
            y={(h - barHeight) / 2}
            width={Math.ceil(cellW)}
            height={barHeight}
            fill={viridis(clamp01(v))}
          />
        ))}

        {/* x축 눈금 */}
        <g transform={`translate(0, ${h - 6})`}>
          {ticks.map((i) => (
            <text
              key={i}
              x={(i + 0.5) * cellW}
              y={0}
              textAnchor="middle"
              fontSize={12}
              fill="#222"
            >
              {i}
            </text>
          ))}
        </g>

        {/* x축 라벨 */}
        <text
          x={w / 2}
          y={h + 22}
          textAnchor="middle"
          fontSize={18}
          fill="#222"
        >
          Frame index
        </text>

        {/* 오른쪽 컬러바 */}
        <g transform={`translate(${w + 24}, 0)`}>
          <rect
            x={0}
            y={(h - legendH) / 2}
            width={legendW}
            height={legendH}
            rx={4}
            stroke="#ddd"
            fill="none"
          />
          {/* gradient steps */}
          {[...Array(legendSteps)].map((_, s) => {
            const t = 1 - s / (legendSteps - 1);
            const y = (h - legendH) / 2 + (s * legendH) / legendSteps;
            return (
              <rect
                key={s}
                x={0}
                y={y}
                width={legendW}
                height={legendH / legendSteps + 1}
                fill={viridis(t)}
              />
            );
          })}

          {/* 컬러바 눈금 (0, 0.5, 1.0) */}
          {[
            { v: 1.0, y: (h - legendH) / 2 },
            { v: 0.5, y: (h - legendH) / 2 + legendH / 2 },
            { v: 0.0, y: (h - legendH) / 2 + legendH },
          ].map((t, idx) => (
            <g key={idx}>
              <line
                x1={legendW + 4}
                x2={legendW + 10}
                y1={t.y}
                y2={t.y}
                stroke="#666"
              />
              <text
                x={legendW + 14}
                y={t.y + 4}
                fontSize={12}
                fill="#333"
              >
                {t.v.toFixed(1)}
              </text>
            </g>
          ))}

          {/* 세로 축 제목 회전 */}
          <text
            x={legendW + 48}
            y={h / 2 + 3}
            fontSize={12}
            fill="#222"
            textAnchor="middle"
            transform={`rotate(-90, ${legendW + 48}, ${h / 2 + 3})`}
          >
            Fake confidence (0–1)
          </text>
        </g>
      </g>
    </svg>
  );
}
