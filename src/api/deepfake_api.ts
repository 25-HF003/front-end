export interface DeepfakeResponse {
  id: number;
  filePath: string;
  result: string;
  averageConfidence: number;
  maxConfidence: number;
  createdAt: string;
}

export interface DeepfakeResponseWrapper {
  status: number;
  success: boolean;
  message: string;
  data: DeepfakeResponse;
}

export const uploadDeepfakeVideo = async (file: File, userId: number): Promise<DeepfakeResponse> => {
    const formData = new FormData();
    formData.append("userId", String(userId));
    formData.append("file", file);
  
  const response = await fetch("http://localhost:8080/deepfake", {
    method: "POST",
    body: formData,
  });

  
  if (!response.ok) {
    const text = await response.text(); 
    throw new Error(`서버 응답 오류: ${response.status}\n${text}`);
  }
  

  const data: DeepfakeResponse = await response.json();
  console.log(data)
  return data;
};