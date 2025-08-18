import * as Slider from '@radix-ui/react-slider';

type Props = {
  label?: string;
  value: number;           // 단일 값
  min: number;
  max: number;
  step?: number;           // ex) 0.1 (미지정 시 1)
  unit?: string;           // ex) 'px'
  onChange: (v: number) => void;
  className?: string;      // 바깥 여백 등 Tailwind 오버라이드
  decimals?: number;       // 표기 소수 자릿수 (기본 1)
};

export default function RadixSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
  className,
  decimals = 0,
}: Props) {
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between text-lg mb-1">
          <span>{label}</span>
          <span className="tabular-nums">
            {value.toFixed(decimals)}{unit ?? ''}
          </span>
        </div>
      )}

      <Slider.Root
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="relative flex items-center select-none w-full h-5">
        {/* 트랙 */}
        <Slider.Track className="bg-neutral-700/30 relative grow rounded-full h-2">
          {/* 채워진 구간 */}
          <Slider.Range className="absolute h-full rounded-full bg-green-100" />
        </Slider.Track>

        {/* 엄지(동그라미) */}
        <Slider.Thumb
          className="block h-5 w-5 rounded-full bg-green-100 border-2 border-white-100 shadow
                    focus:outline-none focus:ring-2 focus:ring-green-100 data-[disabled]:opacity-50"/>
      </Slider.Root>
    </div>
  );
}
