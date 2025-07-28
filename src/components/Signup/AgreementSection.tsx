import { useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { SignupFields } from "../../pages/Signin";

interface Props {
  register: UseFormRegister<SignupFields>;
  errors: FieldErrors<SignupFields>;
  over14: boolean;
  terms: boolean;
  privacy: boolean;
  setValue: UseFormSetValue<SignupFields>;
}

function AgreementSection({
  register,
  errors,
  over14,
  terms,
  privacy,
  setValue,
}: Props) {
  const allChecked = over14 && terms && privacy;

  // 개별 상태 변경 시 전체 동의 체크 상태 자동 조정
  useEffect(() => {
    setValue("allAgree", allChecked); // 가상의 allAgree로 반영
  }, [over14, terms, privacy, setValue]);

  const toggleAll = (checked: boolean) => {
    setValue("over14", checked);
    setValue("terms", checked);
    setValue("privacy", checked);
  };

  return (
    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
         {/* 체크박스 */}
      <label className="flex items-center space-x-2 mb-2 cursor-pointer">
        <input
          type="checkbox"
          className="accent-green-100 h-5 w-5"
          checked={allChecked}
          onChange={(e) => toggleAll(e.target.checked)}
        />
        <span className="font-semibold">전체 동의</span>
      </label>
      <div className="space-y-1 ml-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-green-100 h-4 w-4"
            {...register("over14")}
          />
          <span>만 14세 이상입니다. (필수)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-green-100 h-4 w-4"
            {...register("terms")}
          />
          <span>서비스 이용약관 동의 (필수)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="accent-green-100 h-4 w-4"
            {...register("privacy")}
          />
          <span>개인정보 수집 및 이용 동의 (필수)</span>
        </label>
      </div>
    </div>
  );
}
export default AgreementSection;