import axiosInstance from "./axiosInstance";

export const postWatermarkInsert = async (userId: number, file: File, text: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("message", text);

  const response = await axiosInstance.post("/api/watermark", formData, {
    params: { userId },
  });

  const { watermarkedFilePath, fileName } = response.data.data ?? response.data;

  // base64를 <img src=... />에 쓸 수 있게 data url 생성
  const imageUrl = `${watermarkedFilePath}`;

  return { imageUrl, fileName };
}

export const postWatermarkDetection = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post("/watermark-detection", formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data;
}