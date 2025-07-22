import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
    setShowModal(true); // 모달 열기
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.value.trim()) {
      setPasswordError(false); // 입력되면 에러 제거
    }
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white-100 p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-6">회원 탈퇴</h2>
        <form onSubmit={handleWithdraw} className="space-y-6">
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="비밀번호 입력"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">비밀번호를 입력해주세요.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-200 text-black-100 font-semibold py-2 rounded hover:bg-green-300"
          >
            회원 탈퇴하기
          </button>
        </form>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-100 p-6 rounded-lg shadow-lg w-full max-w-xs text-center">
            <h3 className="text-lg font-bold mb-4">정말 탈퇴하시겠습니까?</h3>
            <p className="text-sm text-gray-900 mb-6">탈퇴 후 계정은 복구되지 않습니다.</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={cancelWithdraw}
                className="flex-1 py-2 bg-gray-500 rounded hover:bg-gray-900"
              >
                취소
              </button>
              <button
                onClick={confirmWithdraw}
                className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdraw;



