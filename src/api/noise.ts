import axiosInstance from "./axiosInstance";

export interface NoiseResponse {
    noiseId: number;
    fileName: string;
    originalFilePath: string;
    processedFilePath: string;
    epsilon: number;
    attackSuccess: boolean;
    originalPrediction: string;
    adversarialPrediction: string;
    mode: string;
    level?: number;
    modeDescription: string;
    createdAt: string;
    originalImageBase64: string;
    processedImageBase64: string;
    originalConfidence: string;
    adversarialConfidence: string;
    confidenceDrop: string;
    styleTransform: string;
}

export const noiseAPI = {
    getAllByUser: async (page = 0, size = 15, sort = "createdAt,desc") => {
      const res = await axiosInstance.get("/api/noise/history", {
        params: { page, size, sort },
      });
      return res.data.data;
    },
    getById: async (id: number) => {
      const res = await axiosInstance.get(`/api/noise/${id}`);
      return res.data.data;
    },
    deleteById: async (id: number) => {
    const res = await axiosInstance.delete(`/api/noise/${id}`);
    return res.data;
    }
}