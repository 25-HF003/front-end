import axiosInstance from "./axiosInstance";

export interface UserChangeOption {
  nickname?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

export const userAPI = {
  getProfile: async () => {
    const res = await axiosInstance.get("/api/users/profile");
    return res.data.data;
  },
  getMe: async () => {
    const res = await axiosInstance.get("/api/users/me");
    return res.data.data;
  },
  putChangeUser: async (option: UserChangeOption = {}) => {
    // 1) nickname, email은 값이 있을 때만 포함
    const payload: Record<string, string> = {};
    if (option.nickname) payload.nickname = option.nickname;
    if (option.email) payload.email = option.email;

    // 2) 비밀번호 관련 세트 처리
    const hasPwField =
      option.currentPassword !== undefined ||
      option.newPassword !== undefined ||
      option.newPasswordConfirm !== undefined;

    if (hasPwField) {
      payload.currentPassword = option.currentPassword ?? "";
      payload.newPassword = option.newPassword ?? "";
      payload.newPasswordConfirm = option.newPasswordConfirm ?? "";
    }

    const res = await axiosInstance.put("/api/users", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },
};
