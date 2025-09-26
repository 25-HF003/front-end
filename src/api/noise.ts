import axiosInstance from "./axiosInstance";

export const noiseAPI = {
    getAllByUser: async (page = 0, size = 15, sort = "createdAt,desc") => {
      const res = await axiosInstance.get("/api/noise", {
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