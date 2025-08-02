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

  // console.log(response.data)
  // return response.data;

  // base64 문자열, 파일명, 메시지 추출
  const { image_base64, filename, message } = response.data;

  // base64를 <img src=... />에 쓸 수 있게 data url 생성
  const imageUrl = `data:image/png;base64,${image_base64}`;

  return { imageUrl, filename, message };
}

// export const getWatermarkImage = async (downloadUrl: string) => {
//   const urlParts = downloadUrl.split('/')
//   const originalFileName = urlParts[urlParts.length - 1];

//   const response = await axios.get(`${BASE_URL}/download-image`, {
//     params: {
//       url: downloadUrl,
//       filename: originalFileName,
//     },
//     responseType: 'blob',
//   });

//   const blob = new Blob([response.data]);
//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.download = originalFileName;  
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(link.href);
// }

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