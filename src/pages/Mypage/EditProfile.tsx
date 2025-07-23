import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";

function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("츄잉껌");

  const {
    validateId,
    validatePassword,
    validateNickname,
    idError,
    passwordError,
    nicknameError,
  } = useValidation();


  const passwordMatch = password && confirmPassword && (password === confirmPassword);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validId = validateId(id);
    const validPw = validatePassword(password, id);
    const validNickname = validateNickname(nickname);

    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (validId && validPw && validNickname) {
      console.log("회원 정보 수정 시도");
      // 서버로 제출
      navigate("/mypage");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white-100 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">정보 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium mb-1">아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onBlur={() => validateId(id)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {idError && <p className="text-sm text-red-500 mt-1">{idError}</p>}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validatePassword(password, id)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="************"
            />
            {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="************"
            />
            {confirmPassword && (
              <p className={`text-sm mt-1 ${passwordMatch ? "text-green-200" : "text-red-500"}`}>
                {passwordMatch
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium mb-1">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={() => validateNickname(nickname)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="닉네임 입력"
            />
            {nicknameError && (
              <p className="text-sm mt-1 text-red-500">
                {nicknameError}
              </p>
            )}
          </div>

          {/* 수정 버튼 */}
          <button
            type="submit"
            className="w-full bg-green-200 text-black-100 font-semibold py-2 rounded hover:bg-green-300">
            회원 정보 수정
          </button>

          {/* 탈퇴 */}
          <Link to="/mypage/withdraw" className="text-center text-sm text-gray-900 mt-3 cursor-pointer hover:underline block">
            회원 탈퇴하기
          </Link>
        </form>
      </div>
    </div>
  );
}
export default EditProfile;
