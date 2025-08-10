import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../features/auth/authSlice";
import { scheduleAutoLogout } from "../utils/jwt";
import SignupModal from "../components/Modal/SignupModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import { api } from "../api";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch

  
  const openModal = (msg: string) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

    const handleLogin = async () => {
    try {
      const result = await api.auth.login(loginId, password);

      if (result.success) {
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
        openModal(result.message || "로그인 실패");
      }
    } catch (err) {
      console.error("Login error:", err);
      openModal("로그인 중 오류가 발생했습니다.");
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

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">소셜 로그인</p>
              <div className="flex justify-center gap-4">
                <Link to="/login/google">
                <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
                  <img src="/google-icon.svg" alt="Google" className="w-8 h-8" />
                </button>
                </Link>
                <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
                  <img src="/naver-icon.svg" alt="Naver" className="w-8 h-8" />
                </button>
                <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
                  <img src="/kakao-icon.svg" alt="Kakao" className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Login;