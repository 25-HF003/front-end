import { store } from "../app/store";
import { setAccessToken, logout } from "../features/auth/authSlice";
import { refreshAccessToken } from "../features/auth/authAPI";

/**
 * 공용 리프레시 매니저:
 * - 동시에 여러 군데서 호출돼도 refresh는 딱 1번만 수행
 * - 성공 시 모든 호출자에게 같은 Promise 결과 공유
 * - 실패 시 세션 정리
 */
let refreshing = false;
let inFlight: Promise<string> | null = null;

export async function ensureFreshAccessToken(): Promise<string> {
  // 이미 accessToken이 있으면 우선 반환
  const current = sessionStorage.getItem("accessToken");
  if (current) return current;

  // 누군가 이미 리프레시 중이면 그 Promise를 그대로 기다림
  if (refreshing && inFlight) return inFlight;

  // 내가 리프레시 수행
  refreshing = true;
  inFlight = (async () => {
    try {
      // 서버로 /auth/refresh 호출
      const newAT = await refreshAccessToken(); // string
      // 저장/상태 갱신
      sessionStorage.setItem("accessToken", newAT);
      store.dispatch(setAccessToken(newAT));
      return newAT;
    } finally {
      refreshing = false;
      inFlight = null;
    }
  })();

  try {
    return await inFlight;
  } catch (e) {
    // 실패 → 세션 정리
    store.dispatch(logout());
    sessionStorage.clear();
    throw e;
  }
}

export function isRefreshOngoing() {
  return refreshing;
}
