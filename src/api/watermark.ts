import axiosInstance from "./axiosInstance";

export interface WatermarkResponse {
    id: number;
    watermarkedFilePath: string;
    fileName: string;
    createdAt: string;
}

export const watermarkAPI = {
  getAllByUser: async (page = 0, size = 15, sort = "createdAt,desc") => {
    const res = await axiosInstance.get("/api/watermark", {
      params: { page, size, sort },
    });
    return res.data.data; 
  },
  getById: async (id: number) => {
    const res = await axiosInstance.get(`/api/watermark/${id}`);
    return res.data.data;
  },
  deleteById: async (id: number) => {
    const res = await axiosInstance.delete(`/api/watermark/${id}`);
    return res.data;
  },
}