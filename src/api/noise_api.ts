import axiosInstance from "./axiosInstance";

export const postNoiseImage = async (
  file: File,
  mode: string,               // "auto" | "precision"
  level: number | undefined,  // 1~4 (precision일 때만), 그 외에는 undefined
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('mode', mode);

  if (mode === 'precision' && level !== undefined) {
    formData.append('level', String(level))
  }

  const response = await axiosInstance.post(`/api/noise`, formData);

  return response.data;
}