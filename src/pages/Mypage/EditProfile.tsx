import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { api } from "../../api";

type UserProfile = {
  userId: number;
  loginId: string;
  name: string;
  password: string;
  nickname: string;
  email: string;
};


function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState<UserProfile | null>(null);

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
      const fetchUser = async () => {
        try {
          const profile = await api.user.getProfile();
          setUser(profile);
        } catch (err) {
          console.error("유저 정보 조회 실패", err);
        }
      };
      
      fetchUser();
    }, [isLoggedIn, navigate]);
  

  const {
    validateId,
    validatePassword,
    validateNickname,
    validateEmail,
    idError,
    passwordError,
    nicknameError,
    emailError,
  } = useValidation();


  const passwordMatch = password && confirmPassword && (password === confirmPassword);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validId = validateId(id);
    const validPw = validatePassword(password, id);
    const validNickname = validateNickname(nickname);
    const validEmail = validateEmail(email);

    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (validId && validPw && validNickname&&validEmail) {
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
              disabled
              onChange={(e) => setName(e.target.value)}
              placeholder={user?.name}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium mb-1">아이디</label>
            <input
              type="text"
              value={id}
              disabled
              placeholder={user?.loginId}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
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
              placeholder=""
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
              placeholder=""
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
              placeholder={user?.nickname}
            />
            {nicknameError && (
              <p className="text-sm mt-1 text-red-500">
                {nicknameError}
              </p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder={user?.email}
            />
            {emailError && (
              <p className="text-sm mt-1 text-red-500">
                {emailError}
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
