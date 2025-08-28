import axiosInstance from "./axiosInstance";

export const postWatermarkInsert = async (file: File, text: string, taskId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("message", text);
  formData.append("taskId", taskId);

  const response = await axiosInstance.post("/api/watermark", formData);

  return response.data.data;
}

export const postWatermarkDetection = async (file: File, taskId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("taskId", taskId);

  const response = await axiosInstance.post("/api/watermark/detection", formData)

  console.log(response.data);

  return response.data;
}