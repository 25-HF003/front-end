import axiosInstance from "./axiosInstance";

export const postNoiseImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post(`/api/noise`, formData);

  return response.data;
}