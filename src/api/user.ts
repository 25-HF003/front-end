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
    const isNonEmpty = (v?: string) => v != null && v.trim() !== "";
    const anyPw = isNonEmpty(option.currentPassword) || isNonEmpty(option.newPassword) || isNonEmpty(option.newPasswordConfirm);

    const payload: Record<string, string> = {
      ...(isNonEmpty(option.nickname) ? { nickname: option.nickname!.trim() } : {}),
      ...(isNonEmpty(option.email) ? { email: option.email!.trim() } : {}),
      ...(anyPw
        ? {
            currentPassword: option.currentPassword ?? "",
            newPassword: option.newPassword ?? "",
            newPasswordConfirm: option.newPasswordConfirm ?? "",
          }
        : {}),
    };

    const res = await axiosInstance.put("/api/users", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },
};
