import { useId, useState } from 'react';
import { NoiseOptions } from '../deepfake/ModeOptions';
import TooltipInfo from '../../Modal/TooltipInfo';

interface OptionsPanelProps {
  value: NoiseOptions;
  onChange: (next: NoiseOptions) => void;
}

function NoiseOptionPanel({ value, onChange }: OptionsPanelProps) {
  const [open, setOpen] = useState(false);
  const secId = useId();

  const set = <K extends keyof NoiseOptions>(k: K, v: NoiseOptions[K]) =>
    onChange({ ...value, [k]: v });

  const Select = ({ label, value, options, onChange }:{
    label: string; value: number; options: {value:number; label:string; tooltip: string}[]; onChange:(v:number)=>void;
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
              <ul className="mt-2 border rounded-md bg-white-100 shadow-sm divide-y" role="listbox" aria-labelledby={secId + '-select'}>
                {options.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-start gap-1 px-3 py-2 text-base hover:bg-emerald-50 ${value === opt.value ? 'text-green-200 font-base' : ''}`}
                      role="option"
                      aria-selected={value === opt.value}
                      onClick={() => { onChange(opt.value); setOpenSel(false); }}>
                      <span>{opt.label}</span>
                      <TooltipInfo message={opt.tooltip} />
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
            <span className="text-xl font-medium mr-1">상세옵션</span>
            <svg width="20" height="20" viewBox="0 0 20 20" className={`transition ${open ? 'rotate-180' : ''}`}>
              <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
        </button>

        {/* 본문 */}
        {open && (
          <div id={secId} className="mt-3 space-y-2 border-t">
            {/* 드롭다운 */}
            <Select
              label="강도 단계"
              value={value.level}
              options={[
                { value: 1, label: '1 - 약함',  tooltip: '원본과 거의 비슷, 화질 저하가 거의 없습니다.' },
                { value: 2, label: '2 - 보통',  tooltip: '적당한 효과, 약간의 화질 저하가 있습니다.' },
                { value: 3, label: '3 - 강함',  tooltip: '눈에 띄는 변화, 어느 정도 화질 저하가 있습니다.' },
                { value: 4, label: '4 - 매우 강함',  tooltip: '가장 강한 효과, 화질 저하가 있습니다.' },
              ]}
              onChange={(v) => set('level', v as NoiseOptions['level'])}
            />
          </div>
        )}
      </section>
    );
  }
export default NoiseOptionPanel;