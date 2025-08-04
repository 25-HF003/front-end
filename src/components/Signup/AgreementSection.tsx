import { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { SignupFields } from "../../pages/Signin";
import AgreementModal from "./AgreementModal";
import { TERMS_OF_SERVICE, PRIVACY_POLICY, AGE_CONFIRMATION } from "./termsText";


function AgreementSection({
  register,
  errors,
  over14,
  terms,
  privacy,
  setValue,
}: {
  register: UseFormRegister<SignupFields>;
  errors: FieldErrors<SignupFields>;
  over14: boolean;
  terms: boolean;
  privacy: boolean;
  setValue: UseFormSetValue<SignupFields>;
}) {
  //약관동의 체크
  const allChecked = over14 && terms && privacy;
  const [modalState, setModalState] = useState<{
    type: "over14" | "terms" | "privacy" | null;
    open: boolean;
  }>({ type: null, open: false });

  const openModal = (type: "over14" | "terms" | "privacy") => {
    setModalState({ type, open: true });
  };
  const closeModal = () => {
    setModalState({ type: null, open: false });
  };

  const handleConfirm = () => {
    if (modalState.type) {
      setValue(modalState.type, true);
    }
  };

  useEffect(() => {
    setValue("allAgree", allChecked); // 가상의 allAgree로 반영
  }, [over14, terms, privacy, setValue]);

  const getModalContent = () => {
    switch (modalState.type) {
      case "over14":
        return { title: "만 14세 이상 확인", content: AGE_CONFIRMATION };
      case "terms":
        return { title: "서비스 이용약관", content: TERMS_OF_SERVICE };
      case "privacy":
        return { title: "개인정보 처리방침", content: PRIVACY_POLICY };
      default:
        return { title: "", content: "" };
    }
  };

  const { title, content } = getModalContent();


  return (
  <>
    <AgreementModal
      isOpen={modalState.open}
      title={title}
      content={content}
      onClose={closeModal}
      onConfirm={handleConfirm}
    />
    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
      {/* 체크박스 */}
      <label className="flex items-center space-x-2 mb-2 cursor-pointer">
        <input
          type="checkbox"
          className="accent-green-100 h-5 w-5"
          checked={allChecked}
          onChange={(e) => {
            setValue("over14", e.target.checked);
            setValue("terms", e.target.checked);
            setValue("privacy", e.target.checked);
          }}
        />
        <span className="font-semibold">전체 동의</span>
      </label>
      <div className="space-y-1 ml-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-green-100 h-4 w-4"
            {...register("over14")} // 개별 상태 변경 시 전체 동의 체크 상태 자동 조정
          />
          <span>만 14세 이상입니다. (필수)</span>
          <button type="button" onClick={() => openModal("over14")} className="text-blue-500 underline text-xs">
            보기
          </button>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-green-100 h-4 w-4"
            {...register("terms")}
          />
          <span>서비스 이용약관 동의 (필수)</span>
          <button type="button" onClick={() => openModal("terms")} className="text-blue-500 underline text-xs">
            보기
          </button>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-green-100 h-4 w-4"
            {...register("privacy")}
          />
          <span>개인정보 수집 및 이용 동의 (필수)</span>
          <button type="button" onClick={() => openModal("privacy")} className="text-blue-500 underline text-xs">
            보기
          </button>
        </label>
      </div>
    </div>
  </>
  );
}
export default AgreementSection;

