import { clearAccessToken } from '../features/auth/authSlice';

export function parseJwt(token: string): { exp: number } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function scheduleAutoLogout(token: string, dispatch: any) {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return;

  const timeout = decoded.exp * 1000 - Date.now();

  if (timeout > 0) { // 토근이 아직 유효함
    setTimeout(() => { //예약: 시간이 지나면 로그아웃 ex)토큰 10분 남았으면 10분 뒤 자동로그아웃 예약
      dispatch(clearAccessToken());
      sessionStorage.removeItem('accessToken');
      alert('세션이 만료되었습니다.');
      window.location.href = '/login';
    }, timeout);
  } else {
    // 토큰이 이미 만료됨
    dispatch(clearAccessToken());
    sessionStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
}
