import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Mypage/PasswordInput";

function PwCheck() {
  const navigate = useNavigate();

  const handleSubmit = (password: string) => {
    // 여기에 실제 인증 로직 추가
    console.log("입력된 비밀번호:", password);
    navigate("/mypage/edit")
  };

  return (
    <PasswordInput
      title="정보 수정"
      buttonLabel="비밀번호 확인"
      onSubmit={handleSubmit}
    />
  );
}
export default PwCheck;
