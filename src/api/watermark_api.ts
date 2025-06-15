import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const postWatermarkInsert = async (file: File, text: string) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("message", text);

  const response = await axios.post(`${BASE_URL}/watermark-insert`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const getWatermarkImage = async (downloadUrl: string) => {
  const urlParts = downloadUrl.split('/')
  const originalFileName = urlParts[urlParts.length - 1];

  // 확장자 분리
  const dotIndex = originalFileName.lastIndexOf('.');
  const name = originalFileName.substring(0, dotIndex);
  const ext = originalFileName.substring(dotIndex);

  // 새로운 파일명 생성
  const downloadFileName = `${name}${ext}`;

  const response = await axios.get(`${BASE_URL}${downloadUrl}`, {
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export const postWatermarkDetection = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(`${BASE_URL}/watermark-detection`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}