import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Mypage/PasswordInput";
import { api } from "../../api";
import SignupModal from "../../components/Modal/SignupModal";
import { useState } from "react";

function PwCheck() {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (msg: string) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleSubmit = async (password: string) => {
    try {
      await api.user.putChangeUser({ currentPassword: password });
      console.log("입력된 비밀번호:", password);
    } catch (e: any) {
      const msg = e?.response?.data?.message;
      const status = e?.response?.data?.status;
      if (status === 400){
        navigate("/mypage/edit")
      } else{
        openModal(msg);
      }
    }
  };

  return (
    <>
    <SignupModal isOpen={isModalOpen} message={modalMessage} onClose={handleModalClose} />
    <PasswordInput
      title="정보 수정"
      buttonLabel="비밀번호 확인"
      onSubmit={handleSubmit}
    />
    </>
  );
}
export default PwCheck;
