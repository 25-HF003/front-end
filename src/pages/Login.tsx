import { FaGoogle } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

function Login() {
  return(
    <>

        {/* 로그인 모달 */}
        <div className="flex items-center justify-center min-h-screen bg-black-200">
          <div className="relative bg-white-100 rounded-xl p-20 w-full max-w-lg shadow-xl text-black">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <IoClose size={20} />
            </button>
            <h1 className="text-5xl font-black text-center mb-12">DeepTruth</h1>

            <input
              type="text"
              placeholder="아이디"
              className="w-full px-4 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-black"
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-black"
            />

            <button className="w-full bg-green-100 hover:bg-green-500 text-white font-semibold py-2 rounded-md mb-2">
              로그인
            </button>
            <button className="w-full bg-green-200 hover:bg-green-600 text-black font-semibold py-2 rounded-md mb-4">
              회원가입
            </button>

            {/* 소셜 로그인 */}
            <div className="max-w-sm w-full mx-auto p-4">  
              <div className="w-full h-px bg-gray-300"/>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">소셜 로그인</p>
              <div className="flex justify-center gap-4">
                <button className="bg-white border border-gray-200 rounded-full p-2 shadow-sm">
                  <img src="/google-icon.svg" alt="Google" className="w-8 h-8" />
                </button>
                <button className="bg-white border border-gray-200 rounded-full p-2 shadow-sm">
                  <img src="/naver-icon.svg" alt="Naver" className="w-8 h-8" />
                </button>
                <button className="bg-white border border-gray-200 rounded-full p-2 shadow-sm">
                 <img src="/kakao-icon.svg" alt="Kakao" className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
    </>)
}

export default Login;