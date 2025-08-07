export const refreshAccessToken = async () => {
  const res = await fetch("http://localhost:8080/api/auth/refresh", {
    method: "POST",
    credentials: "include", // 쿠키에 있는 refreshToken을 보냄
  });

  if (!res.ok) throw new Error("리프레시 실패");

  const result = await res.json();
  return result.data; // 새로운 accessToken
};
