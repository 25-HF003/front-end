import { useEffect, useState } from 'react';
import ModeSelector from '../deepfake/ModeSelector';
import NoiseOptionPanel from './NoiseOptionPanel';
import { Mode, NoiseOptions } from '../deepfake/ModeOptions'

const defaultOptions: NoiseOptions = { //정밀모드 기본세팅
  level: 2,
};

interface NoiseSettingProps {
  onChange?: (mode: Mode, options: NoiseOptions) => void; // 부모(페이지)로 값 전달
}

function NoiseSetting({ onChange }: NoiseSettingProps) {
  const [mode, setMode] = useState<Mode>('basic');
  const [opts, setOpts] = useState<NoiseOptions>(defaultOptions);

  useEffect(() => {
    onChange?.(mode, opts);
  }, [mode, opts, onChange]);

  return (
    <div className="border-b p-2">
      {/* 모드 선택 */}
      <div className="mb-4">
        <ModeSelector value={mode} onChange={setMode} basicname='자동모드'/>
      </div>

      {/* 정밀모드일 때만 옵션 보이기 */}
      {mode === 'advanced' && (
        <NoiseOptionPanel value={opts} onChange={setOpts} />
      )}
    </div>
  );
}
export default NoiseSetting;