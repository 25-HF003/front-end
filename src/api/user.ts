import axiosInstance from "./axiosInstance";

export const userAPI = {
  getProfile: async () => {
    const res = await axiosInstance.get("/api/users/profile");
    return res.data.data;
  },
  getMe: async () => {
    const res = await axiosInstance.get("/api/users/me");
    return res.data.data;
  },
};
