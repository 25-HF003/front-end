import axios from "axios";
import { store } from "../app/store";
import { logout, setAccessToken } from "../features/auth/authSlice";
import { refreshAccessToken } from "../features/auth/authAPI";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 🔁 API 서버 주소
  withCredentials: true,            // 쿠키 기반 인증 필요 시 true
});

// ✅ 요청 인터셉터: accessToken 자동 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: accessToken 만료 시 refresh 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 시 재발급 시도 (401 Unauthorized)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한 루프 방지
    ) {
      originalRequest._retry = true;

      try {
        // 새 accessToken 발급 시도
        const newAccessToken = await refreshAccessToken();
        store.dispatch(setAccessToken(newAccessToken));
        sessionStorage.setItem("accessToken", newAccessToken);

        // 새 토큰으로 헤더 다시 설정
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 → 로그아웃 처리
        store.dispatch(logout());
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
