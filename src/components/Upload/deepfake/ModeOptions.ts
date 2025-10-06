export type Mode = 'basic' | 'advanced';

export interface DetectionOptions {
  use_tta: boolean;              // 토글1
  use_illum: boolean;      // 토글2 (조명보정)
  min_face: number;             // 슬라이더2 (얼굴크기)
  sample_count: number;             // 슬라이더3 (샘플 이미지 수)
  detector: 'Auto' | 'Dlib' | 'Dnn' ; // 드롭다운
}

export interface NoiseOptions {
  level : 1 | 2 | 3 | 4 ;
}