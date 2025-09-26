import axios from "axios";

export const refreshAccessToken = async (): Promise<string> => {
  const res = await axios.post("http://localhost:8080/api/auth/refresh", {}, {
    withCredentials: true, // 쿠키 포함
  });

  if (res.status !== 200) throw new Error("리프레시 실패");

  return res.data.data; // 새로운 accessToken
};
