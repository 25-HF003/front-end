import { logout, setAccessToken } from "../features/auth/authSlice";
import { ensureFreshAccessToken } from "./RefreshManager";

let timerId: ReturnType<typeof setTimeout> | null = null;

// 토큰을 디코딩하여 만료 시간 추출
export function parseJwt(token: string): { exp: number } | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) base64 += "="; // padding fix
    const json = atob(base64);
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

// accessToken의 만료 시간에 맞춰 refreshToken 호출
/**
 * 만료 5초 전 선제 갱신. (성공 시 새 토큰으로 재예약)
 * 실패 시 세션 정리 + /login?error=session_expired 로 이동
 */
export function scheduleAutoLogout(token: string, dispatch: any) {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return;

  const timeout = decoded.exp * 1000 - Date.now() - 5000; // 5초 여유 줌
  if (timerId) clearTimeout(timerId);

  if (timeout > 0) {
    timerId = setTimeout(async () => {
      try {
        const newAccessToken = await ensureFreshAccessToken(); // 새 토큰 발급 시도
        dispatch(setAccessToken(newAccessToken));
        sessionStorage.setItem("accessToken", newAccessToken);
        scheduleAutoLogout(newAccessToken, dispatch); // 새 토큰으로 재예약
      } catch (e) {
        dispatch(logout());
        //alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        sessionStorage.clear();
        window.location.href = "/login?error=session_expired";
      }
    }, timeout);
  } else {
    // 이미 만료된 경우 바로 로그아웃 처리
    dispatch(logout());
    //alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    sessionStorage.clear();
    window.location.href = "/login?error=session_expired";
  }
}
// 로그아웃 시 타이머 해제용
export function cancelAutoLogout() {
  if (timerId) clearTimeout(timerId);
  timerId = null;
}