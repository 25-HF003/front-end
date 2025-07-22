import { useState } from "react";
import { useNavigate } from "react-router-dom";


function PwCheck() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("입력한 비밀번호:", password);
    // 여기에 실제 인증 로직 추가
    navigate("/mypage/edit")
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white-100 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-bold mb-6">정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="비밀번호 입력"
          />
          <button
            type="submit"
            className="w-full bg-green-200 text-white-100 font-semibold py-2 rounded hover:bg-green-300"
          >
            비밀번호 확인
          </button>
        </form>
      </div>
    </div>
  );
}
export default PwCheck;
