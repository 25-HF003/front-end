import { Link } from "react-router-dom";

export default function SocialButtons() {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-500 mb-3">소셜 로그인</p>
        <div className="flex justify-center gap-4">
          <Link to="/login/google">
            <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
              <img src="/google-icon.svg" alt="Google" className="w-8 h-8" />
            </button>
          </Link>
          <Link to="/login/naver">
            <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
              <img src="/naver-icon.svg" alt="Naver" className="w-8 h-8" />
            </button>
          </Link>
          <Link to="/login/kakao">
            <button className="bg-white-100 border border-gray-200 rounded-full p-2 shadow-sm">
              <img src="/kakao-icon.svg" alt="Kakao" className="w-8 h-8" />
            </button>
          </Link>
        </div>
      </div>
  );
}
