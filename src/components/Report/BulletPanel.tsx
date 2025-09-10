import React, { useMemo } from "react";
import BandBullet, { BulletItemWire, BulletItem, normalizeBands } from "./BandBullet";


export type PayloadWire = {
  stabilityBullets: BulletItemWire[];
  speedBullets: BulletItemWire[];
};

//정규화 유틸(NaN 문자열 처리)
const normalizePayload = (w: PayloadWire) => {
  const mapItem = (it: BulletItemWire): BulletItem => ({
    ...it,
    bands: normalizeBands(it.bands),
  });
  return {
    stabilityBullets: w.stabilityBullets.map(mapItem),
    speedBullets: w.speedBullets.map(mapItem),
  };
};

const Section: React.FC<{ title: string; items: BulletItem[] }> = ({ title, items }) => (
  <div className="space-y-3">
    <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((it) => (
        <BandBullet key={it.key} item={it} />
      ))}
    </div>
  </div>
);

export default function BulletsPanel({ data }: { data: PayloadWire }) {
  const normalized = useMemo(() => normalizePayload(data), [data]);
  return (
    <div className="w-full max-w-4xl space-y-6">
      <Section title="Stability" items={normalized.stabilityBullets} />
      <Section title="Speed" items={normalized.speedBullets} />
      {/* 범례 */}
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 inline-block rounded-sm" style={{ background: "#4ade80" }} />
          Good
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 inline-block rounded-sm" style={{ background: "#facc15" }} />
          Warn
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="w-3 h-3 inline-block rounded-sm" style={{ background: "#f87171" }} />
          Bad
        </span>
        <span className="inline-flex items-center gap-1 ml-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#4ade80", border: "1px solid rgba(0,0,0,.15)" }} />
          Actual
        </span>
      </div>
    </div>
  );
}
