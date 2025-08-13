import axiosInstance from "./axiosInstance";

export const postWatermarkInsert = async (userId: number, file: File, text: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("message", text);

  const response = await axiosInstance.post("/watermark", formData, {
    params: { userId },
  });

  // base64 문자열, 파일명 추출
  const { watermarkedFilePath, filename } = response.data.data ?? response.data;

  // base64를 <img src=... />에 쓸 수 있게 data url 생성
  const imageUrl = `${watermarkedFilePath}`;

  return { imageUrl, filename };
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