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
  getAllByUser: async (userId: number) => {
    const res = await axiosInstance.get("/deepfake", {
      params: { userId },
    });
    return res.data.data;
  },
  upload: async (file: File, userId: number): Promise<DeepfakeResponse> => {
    const formData = new FormData();
    formData.append("userId", String(userId));
    formData.append("file", file);

    const res = await axiosInstance.post("/deepfake", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  },
  getById: async (id: number, userId: number) => {
    const res = await axiosInstance.get(`/deepfake/${id}`, {
      params: { userId },
    });
    return res.data.data;
  },
  deleteById: async (id: number, userId: number) => {
    const res = await axiosInstance.delete(`/deepfake/${id}`, {
      params: { userId },
    });
    return res.data;
  },
};
