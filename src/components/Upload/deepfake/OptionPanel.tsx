import { useId, useState } from 'react';
import { DetectionOptions } from './DetectionOptions';
import RadixSlider from './RadixSlider';

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
      <span className="text-lg">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onToggle(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-green-100' : 'bg-gray-900'}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white-100 transition ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  const Select = ({ label, value, options, onChange }:{
    label: string; value: string; options: {value:string; label:string}[]; onChange:(v:string)=>void;
  }) => {
    const [openSel, setOpenSel] = useState(false);
    return (
      <div className="py-2">
        <div className="flex items-center justify-between text-lg">
          <span>{label}</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-lg"
            onClick={() => setOpenSel((s) => !s)}>
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
                  className={`w-full text-left px-3 py-2 text-base hover:bg-emerald-50 ${value === opt.value ? 'text-green-200 font-base' : ''}`}
                  role="option"
                  aria-selected={value === opt.value}
                  onClick={() => { onChange(opt.value); setOpenSel(false); }}>
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
    <section className="rounded-xl border bg-white-100 p-4">
      {/* 아코디언 헤더 */}
      <button
        type="button"
        className="w-full flex items-center justify-between"
        aria-expanded={open}
        aria-controls={secId}
        onClick={() => setOpen((s) => !s)}>
          <span className="text-xl font-medium">상세옵션</span>
          <svg width="20" height="20" viewBox="0 0 20 20" className={`transition ${open ? 'rotate-180' : ''}`}>
            <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
      </button>

      {/* 본문 */}
      {open && (
        <div id={secId} className="mt-3 space-y-2 border-t">
          {/* 토글 2개 */}
          <div className='mt-3'/>
            <Toggle label="TTA" checked={value.use_tta} onToggle={(v) => set('use_tta', v)}/>
          <Toggle label="조명보정" checked={value.use_illum} onToggle={(v) => set('use_illum', v)} />
          
          {/* 슬라이더 3개 */}
          <RadixSlider
            label="시각적 스무딩 적용 프레임 수"
            value={value.smooth_window}
            min={0}
            max={10}
            step={1}
            decimals={0}
            onChange={(v) => set('smooth_window', v)}
            className="py-2"
          />

          <RadixSlider
            label="검출할 최소 얼굴 크기"
            value={value.min_face}
            min={64}
            max={256}
            step={1}
            decimals={0}
            onChange={(v) => set('min_face', v)}
            className="py-2"
          />

          <RadixSlider
            label="샘플 이미지 수"
            value={value.sample_count}
            min={5}
            max={30}
            step={1}
            decimals={0}
            onChange={(v) => set('sample_count', v)}
            className="py-2"
          />

          {/* 드롭다운 */}
          <Select
            label="TTA 프리셋"
            value={value.detector}
            options={[
              { value: 'Auto', label: 'Auto' },
              { value: 'Dlib', label: 'Dlib' },
              { value: 'Dnn', label: 'Dnn' },
            ]}
            onChange={(v) => set('detector', v as DetectionOptions['detector'])}
          />
        </div>
      )}
    </section>
  );
}
