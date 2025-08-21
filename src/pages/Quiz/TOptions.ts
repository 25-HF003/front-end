export type Options = {
  options: {
    id: number;
    img?: string;                     // 이미지 퀴즈용
    text?: string;                    // 객관식 퀴즈용
  }[];
  topic?: string;
  onSelect: (id: number) => void;
  selectId: number | null;
}