import axiosInstance from "./axiosInstance";

export const postWatermarkInsert = async (userId: number, file: File, text: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("message", text);

  const response = await axiosInstance.post("/api/watermark", formData, {
    params: { userId },
  });

  const { s3WatermarkedKey, fileName } = response.data.data ?? response.data;
  console.log(s3WatermarkedKey)

  // base64를 <img src=... />에 쓸 수 있게 data url 생성
  const imageUrl = `${s3WatermarkedKey}`;

  return { imageUrl, fileName };
}

export const postWatermarkDetection = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/api/watermark/detection", formData)

  console.log(response.data);

  return response.data;
}