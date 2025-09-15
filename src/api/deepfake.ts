import axiosInstance from "./axiosInstance";

export interface DeepfakeResponse {
  id: number;
  filePath: string; //이미지
  result: string; //fake or real
  averageConfidence: number; //영상평균딥페이크 확률
  maxConfidence: number; //이미지 딥페이크 확률
  createdAt: string; //생성시간

  temporalDeltaMean: number;
  temporalDeltaStd: number;
  ttaMean: number;
  ttaStd: number;
  timeseriesJson: string;
  stabilityBullets: number[];
  speedBullets: number[];
  fpsProcessed: number;
  msPerSample: number;
  stabilityScore: number;


  // 서버가 함께 돌려줄 수 있는 옵션(있으면 받기)
  mode?: 'PRECISION' | 'DEFAULT' | string;
  useTta?: boolean;
  useIllum?: boolean;
  detector?: 'AUTO' | 'DLIB' | 'DNN' | string;
  smoothWindow?: number;
  minFace?: number;
  sampleCount?: number
}

// 업로드 시 프론트에서 넘길 수 있는 옵션 (모두 선택적)
export interface DeepfakeUploadOptions {
  mode?: 'PRECISION' | 'DEFAULT' | string;
  use_tta?: boolean;
  use_illum?: boolean;
  detector?: 'AUTO' | 'DLIB' | 'DNN' | string;
  smooth_window?: number;
  min_face?: number;
  sample_count?: number;
}
// 불리언/숫자도 문자열로
function appendIfDefined(fd: FormData, key: string, v: unknown) {
  if (v !== undefined && v !== null) fd.append(key, String(v));
}

export const deepfakeAPI = {
  getAllByUser: async (page = 0, size = 15, sort = "createdAt,desc") => {
    const res = await axiosInstance.get("/api/deepfake", {
      params: { page, size, sort },
    });
    return res.data.data;
  },
  upload: async (file: File, taskId: string, options?: DeepfakeUploadOptions): Promise<DeepfakeResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("taskId", taskId);

    if (options) {
      appendIfDefined(formData, "mode", options.mode);
      appendIfDefined(formData, "use_tta", options.use_tta);
      appendIfDefined(formData, "use_illum", options.use_illum);
      appendIfDefined(formData, "detector", options.detector);
      appendIfDefined(formData, "smooth_window", options.smooth_window);
      appendIfDefined(formData, "min_face", options.min_face);
      appendIfDefined(formData, "sample_count", options.sample_count);
    }

    const res = await axiosInstance.post("/api/deepfake", formData, {
      signal: undefined,  
    });
    return res.data.data;
  },
  getById: async (id: number) => {
    const res = await axiosInstance.get(`/api/deepfake/${id}`);
    return res.data.data;
  },
  deleteById: async (id: number) => {
    const res = await axiosInstance.delete(`/api/deepfake/${id}`);
    return res.data;
  },
};
