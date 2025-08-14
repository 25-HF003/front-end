import axiosInstance from "./axiosInstance";

export interface DeepfakeResponse {
  id: number;
  filePath: string; //이미지
  result: string; //fake or real
  averageConfidence: number; //영상평균딥페이크 확률
  maxConfidence: number; //이미지 딥페이크 확률
  createdAt: string; //생성시간
}

export const deepfakeAPI = {
  getAllByUser: async (page = 0, size = 15, sort = "createdAt,desc") => {
    const res = await axiosInstance.get("/api/deepfake", {
      params: { page, size, sort },
    });
    return res.data.data;
  },
  upload: async (file: File): Promise<DeepfakeResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosInstance.post("/api/deepfake", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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
