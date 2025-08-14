import { Mode } from './DetectionOptions';

interface ModeSelectorProps {
  value: Mode;
  onChange: (m: Mode) => void;
}

function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="mode"
          className="hidden"
          checked={value === 'basic'}
          onChange={() => onChange('basic')}
        />
        <span
          className={`w-4 h-4 rounded-full border-2 ${
            value === 'basic' ? 'border-green-100 bg-green-100' : 'border-gray-900'
          }`}
          aria-hidden
        />
        <span className="text-2xl font-medium">기본모드</span>
        {value === 'basic' ? (
          <span className="ml-1 mr-20 text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-green-200">ON</span>
        ) : (
          <span className="ml-1 mr-20"> </span>
        )}
      </label>

      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="mode"
          className="hidden"
          checked={value === 'advanced'}
          onChange={() => onChange('advanced')}
        />
        <span
          className={`w-4 h-4 rounded-full ml-20 border-2 ${
            value === 'advanced' ? 'border-green-100 bg-green-100' : 'border-gray-900'
          }`}
          aria-hidden
        />
        <span className="text-2xl font-medium">세부모드</span>
        {value === 'advanced' && (
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-green-200">ON</span>
        )}
      </label>
    </div>
  );
}
export default ModeSelector;