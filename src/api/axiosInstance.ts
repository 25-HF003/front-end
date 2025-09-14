import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { ensureFreshAccessToken } from "../utils/RefreshManager";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // API 서버 주소
  withCredentials: true,            // 쿠키 기반 인증 필요 시 true
});

// 요청 인터셉터: accessToken 자동 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken") ?? store.getState().auth.accessToken;
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 → 공용 리프레시 매니저로 갱신 후 1회 재시도
//  응답 인터셉터: accessToken 만료 시 refresh 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 네트워크 에러면 바로 리젝트
    if (!error?.response) return Promise.reject(error);

    const originalRequest = error.config;
    const status = error?.response?.status;

    // 리프레시 요청 자체가 실패했으면 바로 종료
    if (originalRequest?.url?.includes("/auth/refresh")) {
      store.dispatch(logout());
      sessionStorage.clear();
      window.location.href = "/login?error=session_expired";
      return Promise.reject(error);
    }

    // accessToken 만료 시 재발급 시도 (401 Unauthorized)
    if (
      status === 401 &&
      !originalRequest._retry // 무한 루프 방지
    ) {
      originalRequest._retry = true;
      try {
        // 새 accessToken 발급 시도
        const newAccessToken = await ensureFreshAccessToken(); // 공용 매니저
        // 새 토큰으로 헤더 다시 설정
        //axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers = originalRequest.headers ?? {};
        (originalRequest.headers as any).Authorization = `Bearer ${newAccessToken}`;
        // 원래 요청 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 매니저에서 세션 정리됨
        //alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login?error=session_expired";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;