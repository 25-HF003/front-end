export type Mode = 'basic' | 'advanced';

export interface DetectionOptions {
  use_tta: boolean;              // 토글1
  use_illum: boolean;      // 토글2 (조명보정)
  smooth_window: number; // 슬라이더1 (프레임 수)
  min_face: number;             // 슬라이더2 (px 또는 %)
  sample_count: number;             // 슬라이더3 (샘플 이미지 수)
  detector: 'auto' | 'dlib' | 'dnn' ; // 드롭다운
}
