import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store"; 
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";
import ConfirmModal from "../../components/Modal/ConfirmModal";


function UserInfo() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    try {
      // 백엔드에 로그아웃 요청 (쿠키 삭제 등)
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함
        body: JSON.stringify({
          refreshToken, // sessionStorage에서 꺼낸 값
        }),
      });
    } catch (error) {
      console.error("서버 로그아웃 실패:", error);
      // 실패해도 클라이언트에서 로그아웃은 계속 진행
    }
    console.log("로그아웃");
    // 클라이언트 상태 정리
    dispatch(logout());
    sessionStorage.removeItem("accessToken");
    navigate("/"); // 홈 또는 로그인 화면으로 이동
  };

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
        {accessToken && (
          <button className="text-sm text-gray-400 mt-5" onClick={() => setShowModal(true)}>로그아웃</button>
        )}
        {showModal && (
        <ConfirmModal
          message=" 로그아웃 하시겠습니까?"
          buttonmessage="로그아웃"
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
        
    </div>
  )
}

export default UserInfo;