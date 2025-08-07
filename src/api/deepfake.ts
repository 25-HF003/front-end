import axiosInstance from "./axiosInstance";

export const deepfakeAPI = {
  getAllByUser: async (userId: number) => {
    const res = await axiosInstance.get("/deepfake", {
      params: { userId },
    });
    return res.data.data;
  },
  upload: async (formData: FormData) => {
    const res = await axiosInstance.post("/deepfake", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  getById: async (id: number, userId: number) => {
    const res = await axiosInstance.get(`/deepfake/${id}`, {
      params: { userId },
    });
    return res.data;
  },
  deleteById: async (id: number, userId: number) => {
    const res = await axiosInstance.delete(`/deepfake/${id}`, {
      params: { userId },
    });
    return res.data;
  },
};
