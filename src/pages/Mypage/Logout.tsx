import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { api } from "../../api";


function Logout({ onLogoutComplete }: { onLogoutComplete: () => void }) {
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    try {
      // 백엔드에 로그아웃 요청 
      if (refreshToken) {
        await api.auth.logout(refreshToken);
        console.log("서버 로그아웃 성공");
      }
    } catch (err) {
      console.error("서버 로그아웃 실패", err);
      // 실패해도 클라이언트에서 로그아웃은 계속 진행
    }

    // 클라이언트 상태 정리
    dispatch(logout());
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    onLogoutComplete();
  };


  return (
    <>
      <button className="text-sm text-gray-400 mt-auto" onClick={() => setShowConfirmModal(true)}>
        로그아웃
      </button>

      {showConfirmModal && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          buttonmessage="로그아웃"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}

export default Logout;
