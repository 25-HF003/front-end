import axiosInstance from "./axiosInstance";

export interface WatermarkResponse {
    id: number;
    watermarkedFilePath: string;
    createdAt: string;
}

export const watermarkAPI = {
     // 전체 조회
    getAllByUser: async (page = 0, size = 15, sort = "createdAt,desc") => {
    const res = await axiosInstance.get("/api/watermark", {
      params: { page, size, sort },
    });
    return res.data.data; // ResponseDTO.data(Page<WatermarkDTO>)
  },

}