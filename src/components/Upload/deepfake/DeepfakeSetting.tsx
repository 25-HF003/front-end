// DeepfakeSettings.tsx
import React, { useEffect, useState } from 'react';
import ModeSelector from './ModeSelector';
import OptionsPanel from './OptionPanel';
import { DetectionOptions, Mode } from './DetectionOptions';

const defaultOptions: DetectionOptions = {
  use_tta: false,
  use_illum: false,
  smooth_window: 60,
  min_face: 80,
  sample_count: 60,
  detector: 'auto',
};

interface DeepfakeSettingsProps {
  onChange?: (mode: Mode, options: DetectionOptions) => void; // 부모(페이지)로 값 전달
}

export default function DeepfakeSettings({ onChange }: DeepfakeSettingsProps) {
  const [mode, setMode] = useState<Mode>('basic');
  const [opts, setOpts] = useState<DetectionOptions>(defaultOptions);

  useEffect(() => {
    onChange?.(mode, opts);
  }, [mode, opts, onChange]);

  return (
    //<div className="h-screen flex flex-col justify-center items-center">
    <div className="rounded-2xl bg-neutral-900/5 p-6">
      {/* 모드 선택 */}
      <div className="mb-4">
        <ModeSelector value={mode} onChange={setMode} />
      </div>

      {/* 세부모드일 때만 옵션 보이기 */}
      {mode === 'advanced' ? (
        <OptionsPanel value={opts} onChange={setOpts} />
      ) : (
        <div className="rounded-xl border border-dashed p-4 text-sm text-gray-500">
          기본모드에서는 추가 옵션이 비활성화됩니다.
        </div>
      )}
    </div>
    //</div>
  );
}
//