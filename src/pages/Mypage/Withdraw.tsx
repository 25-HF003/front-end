import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Mypage/PasswordInput";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { api } from "../../api";
import SignupModal from "../../components/Modal/SignupModal";
import { logout } from "../../features/auth/authSlice";

function Withdraw() {
  const [_, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [social, setSocial] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);

  const openModal = (msg: string) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };
  
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

  
  const handleSubmit = async (password: string) => {
    if (isSocial) {
      setPassword(password);
      setShowModal(true);
    }
    try {
      await api.user.putChangeUser({ currentPassword: password });
      console.log("입력된 비밀번호:", password);
    } catch (e: any) {
      const msg = e?.response?.data?.message;
      const status = e?.response?.data?.status;
      if (status === 400){
        setPassword(password);
        setShowModal(true); // 모달로 분기
        console.log("통과");
      } else{
        openModal(msg);
      }
    }
  };

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
    // 혹시 기본 Authorization이 남아있다면 제거
    //delete (axiosInstance.defaults.headers as any)?.common?.Authorization;
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  
  const confirmWithdraw = async () => {
    setShowModal(false);
    // 탈퇴 API 호출
    try {
      const res = await api.user.deleteByUser()
      openModal(res.message);
      await sleep(1200);      
      await handleLogout();
      navigate("/", { replace: true });  
    } catch (e) {
      console.error(e);
      openModal("탈퇴에 실패했습니다.")
    }
  };


  return (
    <>
      <SignupModal isOpen={isModalOpen} message={modalMessage} onClose={handleModalClose} />
      <PasswordInput
        title="회원탈퇴"
        buttonLabel="회원 탈퇴하기"
        onSubmit={handleSubmit}
        isSocial={isSocial}
      />

      {/* 모달 */}
      {showModal && (
        <ConfirmModal
          message={"⚠ 회원 탈퇴 시 아래의 데이터가 \n영구적으로 삭제되며 \n복구되지 않습니다. \n또한, 동일한 계정으로의 회원가입이 30일동안 불가능합니다. \n\n • 계정정보 및 저장된 모든 데이터 \n• 활동 기록 및 업로드된 이미지/영상"}
          buttonmessage="탈퇴"
          onConfirm={confirmWithdraw}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default Withdraw;



