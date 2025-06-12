export interface DeepfakeResponse {
  result: string;
  average_fake_confidence: number;
  max_confidence: number;
  most_suspect_image: string | null;
}

export const uploadDeepfakeVideo = async (file: File): Promise<DeepfakeResponse> => {
    const formData = new FormData();
    formData.append("file", file);
  
  const response = await fetch("http://localhost:5000/predict", {
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