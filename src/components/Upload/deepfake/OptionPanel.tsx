import { useId, useState } from 'react';
import { DetectionOptions } from './ModeOptions';
import RadixSlider from './RadixSlider';
import TooltipInfo from '../../Modal/TooltipInfo';

interface OptionsPanelProps {
  value: DetectionOptions;
  onChange: (next: DetectionOptions) => void;
}

function OptionsPanel({ value, onChange }: OptionsPanelProps) {
  const [open, setOpen] = useState(false);
  const secId = useId();

  const set = <K extends keyof DetectionOptions>(k: K, v: DetectionOptions[K]) =>
    onChange({ ...value, [k]: v });

  const Toggle = ({ label, checked, onToggle, message }:{
    label: string; checked: boolean; onToggle: (v: boolean)=> void; message: string;
  }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-lg ">{label}</span>
      <div className="mr-auto ml-2"><TooltipInfo message={message}/></div>
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

  const Select = ({ label, value, options, onChange, message }:{
    label: string; value: string; options: {value:string; label:string}[]; onChange:(v:string)=>void; message: string;
  }) => {
    const [openSel, setOpenSel] = useState(false);
    return (
      <div className="py-2">
        <div className="flex items-center justify-between text-lg">
          <span>{label}</span>
          <div className="mr-auto ml-2"><TooltipInfo message={message}/></div>
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
          <span className="text-xl font-medium mr-1">상세옵션</span>
          <svg width="20" height="20" viewBox="0 0 20 20" className={`transition ${open ? 'rotate-180' : ''}`}>
            <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
      </button>

      {/* 본문 */}
      {open && (
        <div id={secId} className="mt-3 space-y-2 border-t">
          {/* 토글 2개 */}
          <div className='mt-3'/>
          <Toggle 
            label="TTA (Test Time Augmentation)" 
            checked={value.use_tta} 
            onToggle={(v) => set('use_tta', v)} 
            message='영상의 일부를 여러 방식으로 변형해 여러 번 검사한 뒤 더 정확한 결과를 내는 방식입니다.'
          />
          <Toggle 
            label="조명보정" 
            checked={value.use_illum} 
            onToggle={(v) => set('use_illum', v)} 
            message='영상 속 얼굴이 어두워지거나 밝아질 때 자동으로 보정을 해서 더 안정적으로 검출할 수 있습니다.'
          />
          
          {/* 슬라이더 2개 */}
          <RadixSlider
            label="검출할 최소 얼굴 크기"
            value={value.min_face}
            min={64}
            max={256}
            step={1}
            decimals={0}
            onChange={(v) => set('min_face', v)}
            className="py-2"
            message='너무 작은 얼굴은 무시하고 설정한 크기 이상의 얼굴만 검출합니다.'
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
            message='영상에서 몇 장의 이미지를 뽑아 분석할지 정합니다. 많이 뽑을수록 정확해지지만 시간이 더 걸립니다.'
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
            message='얼굴 검출 방식을 고르는 옵션입니다.\n
                      · Auto: 먼저 Dlib을 쓰고 실패하면 DNN으로 자동 전환 \n
                      · Dlib: 빠르지만 회전/가림이 심하면 탐지율 저하 \n
                      · DNN: 좀 더 느리지만 다양한 각도/표정/조명에서도 높은 정확도'
          />
        </div>
      )}
    </section>
  );
}
export default OptionsPanel;