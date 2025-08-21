import { useEffect, useState } from 'react';
import ModeSelector from './ModeSelector';
import OptionPanel from './OptionPanel';
import { DetectionOptions, Mode } from './ModeOptions';

const defaultOptions: DetectionOptions = { //정밀모드 기존 기본세팅
  use_tta: true,
  use_illum: true,
  smooth_window: 5,
  min_face: 64,
  sample_count: 15,
  detector: 'Auto',
};

interface DeepfakeSettingProps {
  onChange?: (mode: Mode, options: DetectionOptions) => void; // 부모(페이지)로 값 전달
}

function DeepfakeSetting({ onChange }: DeepfakeSettingProps) {
  const [mode, setMode] = useState<Mode>('basic');
  const [opts, setOpts] = useState<DetectionOptions>(defaultOptions);

  useEffect(() => {
    onChange?.(mode, opts);
  }, [mode, opts, onChange]);

  return (
    <div className="border-b p-2">
      {/* 모드 선택 */}
      <div className="mb-4">
        <ModeSelector value={mode} onChange={setMode} basicname='기본모드'/>
      </div>

      {/* 정밀모드일 때만 옵션 보이기 */}
      {mode === 'advanced' && (
        <OptionPanel value={opts} onChange={setOpts} />
      )}
    </div>
  );
}
export default DeepfakeSetting;