import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../features/auth/authSlice";
import { scheduleAutoLogout } from "../utils/jwt";
import SignupModal from "../components/Modal/SignupModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

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
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //credentials: "include", // 쿠키 포함 (refreshToken이 쿠키로 온다면 필요)
        body: JSON.stringify({ loginId, password }),
      });

      const result = await response.json();
      if (result.success) {
        const accessToken = result.data;
        // 전역 Redux 상태에 저장
        dispatch(setAccessToken(accessToken));
        // 토큰을 전역 상태나 localStorage에 저장 (sessionStorage)
        sessionStorage.setItem("accessToken", accessToken);
        scheduleAutoLogout(accessToken, dispatch);

        // 메인 페이지로 이동
        navigate("/");
      } else {
        openModal(result.message || "로그인 실패");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("로그인 중 오류 발생");
    }
  };



  return(
    <>
      <SignupModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        <div className="flex items-center justify-center min-h-screen">
          {/* 로그인 모달 */}
          <div className="relative bg-white-100 rounded-xl p-20 w-full max-w-lg shadow-xl text-black-100">
            <button className="absolute top-4 right-4 text-gray-900 hover:text-black-100">
              <IoClose size={20} />
            </button>
            <h1 className="text-5xl font-black text-center mb-12">DeepTruth</h1>

            {/* ID/PW 입력창 */}
            <input
              type="text"
              placeholder="아이디"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring"
            />
            <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring"  />
            <div
              className="absolute top-1/3 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
            </div>

            {/* ID/PW 버튼 */}
            <button 
              onClick={handleLogin}
              className="w-full bg-green-100 hover:bg-green-500 text-black-100 font-semibold py-2 rounded-md mb-2">
                로그인
            </button>
            <Link to="/signin">
              <button className="w-full bg-green-200 hover:bg-green-600 text-black-100 font-semibold py-2 rounded-md mb-4">
                회원가입
              </button>
            </Link>

            {/* 소셜 로그인 */}
            <div className="max-w-sm w-full mx-auto p-4">  
              <div className="w-full h-px bg-gray-300"/>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">소셜 로그인</p>
              <div className="flex justify-center gap-4">
                <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
                  <img src="/google-icon.svg" alt="Google" className="w-8 h-8" />
                </button>
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