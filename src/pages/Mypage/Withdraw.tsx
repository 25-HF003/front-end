import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Mypage/PasswordInput";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { api } from "../../api";

function Withdraw() {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [social, setSocial] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
      const fetchUser = async () => {
        try {
          const profile = await api.user.getProfile();
          setSocial(profile.socialLoginType);
        } catch (err) {
          console.error("유저 정보 조회 실패", err);
        }
      };
      fetchUser();
    }, [isLoggedIn, navigate]);
  
  const isSocial = social !== "NONE";

    
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


  return (
    <>
      <PasswordInput
        title="회원탈퇴"
        buttonLabel="회원 탈퇴하기"
        onSubmit={handleSubmit}
        isSocial={isSocial}
      />

      {/* 모달 */}
      {showModal && (
        <ConfirmModal
          message={"회원 탈퇴 시 아래의 데이터가 \n영구적으로 삭제되며 복구되지 않습니다. \n\n • 계정정보 및 저장된 모든 데이터 \n• 활동 기록 및 업로드된 이미지/영상"}
          buttonmessage="탈퇴"
          onConfirm={confirmWithdraw}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Withdraw;



