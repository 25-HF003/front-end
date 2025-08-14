import { useEffect, useState } from 'react';
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
    <div className="border-b p-2">
      {/* 모드 선택 */}
      <div className="mb-4">
        <ModeSelector value={mode} onChange={setMode} />
      </div>

      {/* 세부모드일 때만 옵션 보이기 */}
      {mode === 'advanced' && (
        <OptionsPanel value={opts} onChange={setOpts} />
      )}
    </div>
  );
}
//