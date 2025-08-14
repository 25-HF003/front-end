import React, { useId, useState } from 'react';
import { DetectionOptions } from './DetectionOptions';

interface OptionsPanelProps {
  value: DetectionOptions;
  onChange: (next: DetectionOptions) => void;
}

export default function OptionsPanel({ value, onChange }: OptionsPanelProps) {
  const [open, setOpen] = useState(false);
  const secId = useId();

  const set = <K extends keyof DetectionOptions>(k: K, v: DetectionOptions[K]) =>
    onChange({ ...value, [k]: v });

  const Toggle = ({ label, checked, onToggle }:{
    label: string; checked: boolean; onToggle: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onToggle(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-emerald-500' : 'bg-gray-300'}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  const Slider = ({ label, value, min, max, step = 1, unit, onChange }:{
    label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v:number)=>void;
  }) => (
    <div className="py-2">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="tabular-nums">{value}{unit ?? ''}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-500"
      />
    </div>
  );

  const Select = ({ label, value, options, onChange }:{
    label: string; value: string; options: {value:string; label:string}[]; onChange:(v:string)=>void;
  }) => {
    const [openSel, setOpenSel] = useState(false);
    return (
      <div className="py-2">
        <div className="flex items-center justify-between text-sm">
          <span>{label}</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-xs"
            onClick={() => setOpenSel((s) => !s)}
          >
            <span className="font-medium">{value}</span>
            <svg width="12" height="12" viewBox="0 0 20 20" className={`transition ${openSel ? 'rotate-180' : ''}`}>
              <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        {openSel && (
          <ul className="mt-2 border rounded-md bg-white shadow-sm divide-y" role="listbox" aria-labelledby={secId + '-select'}>
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 ${value === opt.value ? 'text-emerald-700 font-medium' : ''}`}
                  role="option"
                  aria-selected={value === opt.value}
                  onClick={() => { onChange(opt.value); setOpenSel(false); }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <section className="rounded-xl border bg-white p-4">
      {/* 아코디언 헤더 */}
      <button
        type="button"
        className="w-full flex items-center justify-between"
        aria-expanded={open}
        aria-controls={secId}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="text-sm font-semibold">상세옵션</span>
        <svg width="16" height="16" viewBox="0 0 20 20" className={`transition ${open ? 'rotate-180' : ''}`}>
          <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {/* 본문 */}
      {open && (
        <div id={secId} className="mt-3 space-y-2">
          {/* 토글 2개 */}
          <Toggle label="TTA" checked={value.use_tta} onToggle={(v) => set('use_tta', v)} />
          <Toggle label="조명보정" checked={value.use_illum} onToggle={(v) => set('use_illum', v)} />

          {/* 슬라이더 3개 */}
          <Slider
            label="시간적 스무딩 적용 프레임 수"
            value={value.smooth_window}
            min={0} max={120} step={1}
            onChange={(v) => set('smooth_window', v)}
          />
          <Slider
            label="검출할 최소 얼굴 크기"
            value={value.min_face}
            min={16} max={256} step={1} unit="px"
            onChange={(v) => set('min_face', v)}
          />
          <Slider
            label="샘플 이미지 수"
            value={value.sample_count}
            min={1} max={120} step={1}
            onChange={(v) => set('sample_count', v)}
          />

          {/* 드롭다운 */}
          <Select
            label="TTA 프리셋"
            value={value.detector}
            options={[
              { value: 'auto', label: 'auto' },
              { value: 'dlib', label: 'dlib' },
              { value: 'ddn', label: 'ddn' },
            ]}
            onChange={(v) => set('detector', v as DetectionOptions['detector'])}
          />
        </div>
      )}
    </section>
  );
}
