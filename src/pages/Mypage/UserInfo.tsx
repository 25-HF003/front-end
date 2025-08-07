import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Logout from "./Logout";
import SignupModal from "../../components/Modal/SignupModal";
import { api } from "../../api";


type UserProfile = {
  userId: number;
  loginId: string;
  nickname: string;
  email: string;
  role: "USER" | "ADMIN";
};

function UserInfo() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();
  const [logoutCompleteModal, setLogoutCompleteModal] = useState(false); // 로그아웃 완료 모달 상태
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!accessToken) return; // 로그인 안 되어 있으면 요청 X

    const fetchUser = async () => {
      try {
        const profile = await api.user.getProfile();
        setUser(profile);
      } catch (err) {
        console.error("유저 정보 조회 실패", err);
      }
    };

    fetchUser();
  }, [accessToken]);

  if (!user) {
    return <p className="text-center text-gray-400">유저 정보를 불러오는 중...</p>;
  }



  return (
    <div className="bg-white-100 text-black-100 w-72 p-6 rounded-xl flex flex-col items-center shadow-lg">
      {/* 프로필 */}
      <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
        <h2 className="text-lg font-bold">{user.nickname}</h2>
        <p className="text-sm text-green-100">{user.role === "ADMIN" ? "관리자" : "감별사"}</p>
        <hr className="my-4 w-full border-t" />
        <div className="text-sm w-full space-y-2">
          <div>
            <strong>이름</strong>
            <p className="text-gray-900 mb-4 mt-2">{user.userId}</p>
          </div>
          <div>
            <strong>아이디</strong>
            <p className="text-gray-900 mb-4 mt-2">{user.loginId}</p>
          </div>
          <div>
            <strong>이메일</strong>
            <p className="text-gray-900 mb-4 mt-2">{user.email}</p>
          </div>
          <div>
            <strong>포인트</strong>
            <p className="text-gray-900 mb-4 mt-2">230점</p>
          </div>
        </div>
        <Link to="/mypage/check" className="mt-auto pt-10">
          <button className="text-sm text-gray-400">회원정보 수정</button>
        </Link>
        {/*로그아웃 */}
        {accessToken && <Logout onLogoutComplete={() => setLogoutCompleteModal(true)}/>}
          <SignupModal
            isOpen={logoutCompleteModal}
            message="로그아웃이 완료되었습니다."
            onClose={() => {
              setLogoutCompleteModal(false);
              navigate("/");
            }}
          />
    </div>
  )
}

export default UserInfo;