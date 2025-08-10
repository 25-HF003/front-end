import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../../features/auth/authSlice";
import { scheduleAutoLogout } from "../../utils/jwt";
import { api } from "../../api";

function OAuthRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login", { 
        replace: true,
        state: { errorMessage: "소셜 로그인에 실패했습니다. 다시 시도해주세요."},
      });
      return;
    }

    // 1) 토큰 저장 
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    dispatch(setAccessToken(accessToken));
    scheduleAutoLogout(accessToken, dispatch);

    // 2) URL에서 토큰 제거 (노출 최소화)
    window.history.replaceState({}, "", "/oauth2/redirect");

    // 3) 유저 프로필 호출 → 상태 저장
    (async () => {
      try {
        const userInfo = await api.user.getProfile(); // Authorization 헤더는 axios 인터셉터에서 주입
        dispatch(setUser(userInfo));
        sessionStorage.setItem("user", JSON.stringify(userInfo));
        navigate("/", { replace: true });
      } catch (e) {
        console.error("Failed to load profile:", e);
        navigate("/login", { replace: true });
      }
    })();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">로그인 처리 중…</h2>
        <p className="text-gray-900">계정 정보를 불러오고 있습니다.</p>
      </div>
    </div>
  );
}
export default OAuthRedirect;
