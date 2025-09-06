import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { api } from "../../api";
import { useForm } from "react-hook-form";
import SignupModal from "../../components/Modal/SignupModal";
import axios from "axios";

type UserProfile = {
  userId: number;
  loginId: string;
  name: string;
  password: string;
  nickname: string;
  email: string;
  socialLoginType: string;
};

export interface UserChangeFields {
  nickname?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

function EditProfile() {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectAfterModal, setRedirectAfterModal] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<UserChangeFields>({
    defaultValues: {
      nickname: "",
      email: "",
    },
  });

  const isSocial = user?.socialLoginType !== "NONE";
  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");
  const newPasswordConfirm = watch("newPasswordConfirm");

  const isNonEmpty = (s?: string) => (s ?? "").trim() !== "";
  const anyPasswordField = !isSocial &&(
    isNonEmpty(currentPassword) ||
    isNonEmpty(newPassword) ||
    isNonEmpty(newPasswordConfirm)
  );
  // 실제 변경된 필드만 체크
  const profileChanged = !!(dirtyFields.nickname || dirtyFields.email);

  // 최종 제출 가능 여부
  const canSubmit = profileChanged || anyPasswordField;

  const openModal = (msg: string, redirectTo?: string) => {
    setModalMessage(msg);
    setRedirectAfterModal(redirectTo || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalMessage("");
    if (redirectAfterModal) {
      navigate(redirectAfterModal);
    }
  };


  const onSubmit = async (data: UserChangeFields) => {

    try{
      const result = await api.user.putChangeUser(data);

      if(result.success) {
        openModal(result.message || "회원정보 수정 성공!", "/mypage");
      } else {
        openModal(result.message || "회원정보 수정 실패");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)){
        const serverMsg = err.response?.data?.message
        openModal(serverMsg || "회원정보 수정 중 오류가 발생했습니다.");
        console.log(serverMsg);
      } else {
        console.error("error:", err);
        openModal("회원정보 수정 중 오류가 발생했습니다.");
      }
    }
  };

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
      const fetchUser = async () => {
        try {
          const profile = await api.user.getProfile();
          console.log(profile);
          setUser(profile ?? null);
        } catch (err) {
          console.error("유저 정보 조회 실패", err);
        }
      };
      fetchUser();
    }, [isLoggedIn, navigate]);

    // user 값 도착 후 한 번만 reset
    useEffect(() => {
      if (user) {
        reset({
          nickname: user.nickname ?? "",
          email: user.email ?? "",
        });
      }
    }, [user, reset]);
  

  return (
    <>
    <SignupModal isOpen={isModalOpen} message={modalMessage} onClose={handleModalClose} />
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white-100 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">정보 수정</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              disabled
              placeholder={user?.name}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium mb-1">아이디</label>
            <input
              type="text"
              disabled
              placeholder={user?.loginId}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* 현재 비밀번호 */}
          <div>
            <label className="block text-sm font-medium mb-1">현재 비밀번호</label>
            <input 
              type="password" 
              disabled={isSocial}
              {...register("currentPassword", { 
                validate: (v) => {
                  if (isSocial) return true; // 소셜이면 검사하지 않음
                  if (anyPasswordField && !v) return "현재 비밀번호를 입력해주세요.";
                  return true;
                },
                setValueAs: (v) => (v?.trim() ? v : undefined),
              })} 
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.currentPassword && <p className="text-rose-500 text-sm">{errors.currentPassword.message}</p>}
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label className="block text-sm font-medium mb-1">새 비밀번호</label>
            <input
              type="password"
              disabled={isSocial}
              {...register("newPassword", { 
                validate: (v) => {
                  if (isSocial) return true;
                  if (anyPasswordField && !v) return "새 비밀번호를 입력해주세요.";
                  return true;
                },
                setValueAs: (v) => (v?.trim() ? v : undefined),
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.newPassword && <p className="text-rose-500 text-sm">{errors.newPassword.message}</p>}
          </div>

          
          {/* 새 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium mb-1">새 비밀번호 확인</label>
            <input
              type="password"
              disabled={isSocial}
              {...register("newPasswordConfirm", {  
                validate: (v) => {
                  if (isSocial) return true;
                  if (anyPasswordField && !v) return "새 비밀번호 확인을 입력해주세요.";
                  if (anyPasswordField && v !== newPassword) return "비밀번호가 일치하지 않습니다.";
                  return true;
                },
                setValueAs: (v) => (v?.trim() ? v : undefined),
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.newPasswordConfirm && <p className="text-rose-500 text-sm">{errors.newPasswordConfirm.message}</p>}
          </div>

          {/* 닉네임 */}
          <div>
            <label className="block text-sm font-medium mb-1">닉네임</label>
            <input
              type="text"
              {...register("nickname", { required: "닉네임을 입력해주세요."})}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.nickname && <p className="text-rose-500 text-sm">{errors.nickname.message}</p>}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="text"
              disabled={isSocial}
              {...register("email", { 
                required: "이메일을 입력해주세요.",
                pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "유효한 이메일 형식이 아닙니다." },
              })}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                isSocial ? "text-gray-400" : "focus:ring-green-200"
              }`}
            />
            {errors.email && <p className="text-rose-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* 수정 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-green-200 text-black-100 font-semibold py-2 rounded hover:bg-green-300
                      disabled:opacity-50 disabled:cursor-not-allowed"
            title={!canSubmit ? "변경된 항목이 없습니다." : undefined}       
            >
            회원 정보 수정
          </button>

          {/* 탈퇴 */}
          <Link to="/mypage/withdraw" className="text-center text-sm text-gray-900 mt-3 cursor-pointer hover:underline block">
            회원 탈퇴하기
          </Link>
        </form>
      </div>
    </div>
    </>
  );
}
export default EditProfile;
