import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../features/auth/authSlice";
import { scheduleAutoLogout } from "../utils/jwt";
import SignupModal from "../components/Modal/SignupModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import { api } from "../api";
import SocialButtons from "./SocialLogin/SocialButtons";
import axios from "axios";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch
  const location = useLocation();

  
  // 에러 메시지 소스: (A) location.state.errorMessage (소셜 실패) (B) ?error=... (세션만료 등)
  const incomingErrorMessage = useMemo(() => {
    const stateMsg = (location.state as any)?.errorMessage as string | undefined;
    const params = new URLSearchParams(location.search);
    const error = params.get("error"); // e.g. session_expired
    if (stateMsg) return stateMsg;

    if (error === "session_expired") return "세션이 만료되었습니다. 다시 로그인해주세요.";
    //if (error === "missing_token") return "소셜 로그인에 실패했습니다. 다시 시도해주세요.";
    if (error) return "로그인 도중 문제가 발생했습니다. 다시 시도해주세요.";
    return undefined;
  }, [location.state, location.search]);

  // 에러 메시지 모달 표시 + URL 정리(쿼리/상태 제거)
  useEffect(() => {
    if (!incomingErrorMessage) return;
    openModal(incomingErrorMessage);

    // 쿼리/상태를 제거해 새로고침 시 모달이 또 뜨지 않도록 처리
    navigate("/login", { replace: true, state: null });
  }, [incomingErrorMessage, navigate]);

  
  const openModal = (msg: string) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleLogin = async () => {
    // 1) 프론트 선검증 (즉시 리턴)
    if (!loginId.trim()) {
      openModal("아이디를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      openModal("비밀번호를 입력해주세요.");
      return;
    }
    try {
      const result = await api.auth.login(loginId, password);

      if (result?.success) {
        const accessToken = result.data.accessToken;
        const refreshToken = result.data.refreshToken;
        // 전역 Redux 상태에 저장
        dispatch(setAccessToken(accessToken));
        // 토큰을 전역 상태나 localStorage에 저장 (sessionStorage)
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        scheduleAutoLogout(accessToken, dispatch); //자동 만료 예약

        // 유저 정보 가져오기
        const userInfo = await api.user.getProfile();
        console.log("userInfo from /profile: ", userInfo);
        dispatch(setUser(userInfo)); // Redux에 저장
        sessionStorage.setItem("user", JSON.stringify(userInfo));

        // 메인 페이지로 이동
        navigate("/");
      } else {
        openModal(result?.message || "로그인 실패");
      }
    } catch (err: unknown) {
        if (axios.isAxiosError(err)){
          const serverMsg = 
            err.response?.data?.message
          openModal(serverMsg || "로그인 중 오류가 발생했습니다.");
        } else {
          console.error("Login error:", err);
          openModal("로그인 중 오류가 발생했습니다.");
        }
     
    }
  };
  


  return(
    <>
      <SignupModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        <div className="flex items-center justify-center min-h-screen">
          {/* 로그인 모달 */}
          <div className=" bg-white-100 rounded-xl p-20 w-full max-w-lg shadow-xl text-black-100">
            <h1 className="text-5xl font-black text-center mb-12">DeepTruth</h1>

            {/* ID/PW 입력창 */}
            {/* enter키로 로그인 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
              <input
                type="text"
                placeholder="아이디"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring"
              />
              <div className="w-full flex items-center border rounded-md mb-4 px-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="flex-1 py-2 focus:outline-none focus:ring" />
                <div
                  className="top-1/3 right-3 transform-translate-y-1/5 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </div>
              </div>

              {/* ID/PW 버튼 */}
              <button 
                type="submit"
                className="w-full bg-green-100 hover:bg-green-500 text-black-100 font-semibold py-2 rounded-md mb-2">
                  로그인
              </button>
              <Link to="/signin">
                <button className="w-full bg-green-200 hover:bg-green-600 text-black-100 font-semibold py-2 rounded-md mb-4">
                  회원가입
                </button>
              </Link>
            </form>

            {/* 소셜 로그인 */}
            <div className="max-w-sm w-full mx-auto p-4">  
              <div className="w-full h-px bg-gray-300"/>
            </div>
            <SocialButtons />
          </div>
        </div>
      </>
  )
}

export default Login;