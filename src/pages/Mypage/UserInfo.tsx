import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Logout from "./Logout";
import SignupModal from "../../components/Modal/SignupModal";


function UserInfo() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();
  const [logoutCompleteModal, setLogoutCompleteModal] = useState(false); // 로그아웃 완료 모달 상태


  return (
    <div className="bg-white-100 text-black-100 w-72 p-6 rounded-xl flex flex-col items-center shadow-lg">
      {/* 프로필 */}
      <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
        <h2 className="text-lg font-bold">nickname</h2>
        <p className="text-sm text-green-100"> 감별사</p>
        <hr className="my-4 w-full border-t" />
        <div className="text-sm w-full space-y-2">
          <div>
            <strong>이름</strong>
            <p className="text-gray-900 mb-4 mt-2">서지혜</p>
          </div>
          <div>
            <strong>아이디</strong>
            <p className="text-gray-900 mb-4 mt-2">jh2025eternal</p>
          </div>
          <div>
            <strong>이메일</strong>
            <p className="text-gray-900 mb-4 mt-2">jh2025eternal@gmail.com</p>
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