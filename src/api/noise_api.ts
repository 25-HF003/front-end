import axios from "axios";

const BASE_URL = "http://localhost:5001";

export const postNoiseImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

  return response.data;
}