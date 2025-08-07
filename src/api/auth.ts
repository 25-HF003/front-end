import axiosInstance from "./axiosInstance";

export const authAPI = {
  signup: async (payload: {
    name: string;
    loginId: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    email: string;
  }) => {
    const res = await axiosInstance.post("/api/auth/signup", payload);
    return res.data;
  },
  login: async (loginId: string, password: string) => {
    const res = await axiosInstance.post("/api/auth/login", { loginId, password });
    return res.data;
  },
  refresh: async () => {
    const res = await axiosInstance.post("/api/auth/refresh");
    return res.data.accessToken;
  },
  logout: async (refreshToken: string) => {
    const res = await axiosInstance.post("/api/auth/logout", { refreshToken }, {
      withCredentials: true, // 쿠키 사용 시 필요
    });
    return res.data;
  },
};

