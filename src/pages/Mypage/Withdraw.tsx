import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Mypage/PasswordInput";

function Withdraw() {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (pw: string) => {
    setPassword(pw);
    setShowModal(true); // 모달로 분기
  };

  const confirmWithdraw = () => {
    setShowModal(false);
    // 실제 탈퇴 API 호출
    console.log("탈퇴 진행 (비밀번호):", password);
    navigate("/");
  };

  const cancelWithdraw = () => {
    setShowModal(false);
  };

  return (
    <>
      <PasswordInput
        title="회원탈퇴"
        buttonLabel="회원 탈퇴하기"
        onSubmit={handleSubmit}
      />

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-100 p-6 rounded-lg shadow-lg w-full max-w-xs text-center">
            <h3 className="text-lg font-bold mb-4">정말 탈퇴하시겠습니까?</h3>
            <p className="text-sm text-gray-900 mb-6">탈퇴 후 계정은 복구되지 않습니다.</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={cancelWithdraw}
                className="flex-1 py-2 bg-gray-500 rounded hover:bg-gray-900">
                취소
              </button>
              <button
                onClick={confirmWithdraw}
                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Withdraw;



