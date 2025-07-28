import { useForm } from "react-hook-form";
import { useState } from "react";
import SignupModal from "../components/SignupModal";

interface SignupFields {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  email: string;
  over14: boolean;
  terms: boolean;
  privacy: boolean;
}

function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFields>({
    defaultValues: {
      over14: false,
      terms: false,
      privacy: false,
    },
  });

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = (msg: string) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const onSubmit = async (data: SignupFields) => {
    const payload = {
      name: data.name,
      loginId: data.username,
      password: data.password,
      passwordConfirm: data.confirmPassword,
      nickname: data.nickname,
      email: data.email,
    };

    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        openModal(result.message || "회원가입 성공!");
        // navigate("/login");
      } else {
        //const error = await res.json();
        openModal(result.message || "회원가입 실패");
      }
    } catch (err) {
      alert("서버 연결 오류");
      console.error(err);
    }
  };


  const [over14, terms, privacy] = watch(["over14", "terms", "privacy"]);
  const allChecked = over14 && terms && privacy;

  function toggleAll (checked: boolean) {
    setValue("over14", checked);
    setValue("terms", checked);
    setValue("privacy", checked);
  }

  return (
    <>
     <SignupModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
    <div className="flex min-h-screen items-center justify-center bg-black-200 p-4">
      {/* 회원가입 모달 */}
      <div className="w-full max-w-md overflow-y-auto max-h-[90vh] rounded-2xl bg-white-100 shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        {/* 이름 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name", { required: "이름을 입력해주세요." })} placeholder="이름" className="w-full rounded-lg border p-3" />
          {errors.name && <p className="text-rose-500 text-sm">{errors.name.message}</p>}
        {/* 아이디 */}
          <input {...register("username", { required: "아이디를 입력해주세요." })} placeholder="아이디" className="w-full rounded-lg border p-3" />
          {errors.username && <p className="text-rose-500 text-sm">{errors.username.message}</p>}
        {/* 비밀번호 */}
          <input type="password" {...register("password", { required: "비밀번호를 입력해주세요." })} placeholder="비밀번호" className="w-full rounded-lg border p-3" />
          {errors.password && <p className="text-rose-500 text-sm">{errors.password.message}</p>}

        {/* 비밀번호 확인 */}
          <input
            type="password"
            {...register("confirmPassword", {
              validate: (value: string, formValues: SignupFields) => value === formValues.password || "비밀번호가 일치하지 않습니다.",
            })}
            placeholder="비밀번호 확인"
            className="w-full rounded-lg border p-3"
          />
          {errors.confirmPassword && <p className="text-rose-500 text-sm">{errors.confirmPassword.message}</p>}

        {/* 닉네임 */}
          <input {...register("nickname", { required: "닉네임을 입력해주세요." })} placeholder="닉네임" className="w-full rounded-lg border p-3" />
          {errors.nickname && <p className="text-rose-500 text-sm">{errors.nickname.message}</p>}

        {/* 이메일 */}
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "유효한 이메일 형식이 아닙니다." },
            })}
            placeholder="이메일"
            className="w-full rounded-lg border p-3"
          />
          {errors.email && <p className="text-rose-500 text-sm">{errors.email.message}</p>}

          {/* 약관 */}
          <div className="mt-4 border rounded-lg p-4 bg-gray-50">
            {/* 체크박스스 */}
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
                <input id="over14" type="checkbox" className="accent-green-100 h-4 w-4" {...register("over14", { required: true })} />
                <span>만 14세 이상입니다. (필수)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input id="terms" type="checkbox" className="accent-green-100 h-4 w-4" {...register("terms", { required: true })} />
                <span>서비스 이용약관 동의 (필수)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input id="privacy" type="checkbox" className="accent-green-100 h-4 w-4" {...register("privacy", { required: true })} />
                <span>개인정보 수집 및 이용 동의 (필수)</span>
              </label>
            </div>
          </div>

          <button type="submit" className="w-full py-3 font-semibold bg-green-200 text-white-100 rounded-lg">
            회원가입
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signin;
