import { useState } from "react";

function checkId(id: string): string | null {
  if (!/^[a-z0-9]{6,20}$/.test(id)) {
    return "아이디는 6~20자 영문 소문자와 숫자만 사용할 수 있습니다.";
  }
  return null;
}

function checkPassword(password: string, id: string): string | null {
  if (password === id) return "아이디와 동일한 비밀번호는 사용할 수 없습니다.";
  if (!/^.{8,30}$/.test(password)) return "비밀번호는 8~30자여야 합니다.";
  if (!/[A-Z]/.test(password)) return "대문자를 최소 1개 포함해야 합니다.";
  if (!/[a-z]/.test(password)) return "소문자를 최소 1개 포함해야 합니다.";
  if (!/[0-9]/.test(password)) return "숫자를 최소 1개 포함해야 합니다.";
  if (!/[!@#$%^&*(),.?":{}|<>[\]\\\/_\-+=~`';]/.test(password)) {
    return "특수문자를 최소 1개 포함해야 합니다.";
  }
  return null;
}

function checkNickname(nickname: string): string | null {
  if (!/^[가-힣a-zA-Z0-9]{2,15}$/.test(nickname)) {
    return "닉네임은 2~15자 한글, 영어, 숫자만 사용할 수 있으며 공백과 특수문자는 사용할 수 없습니다.";
  }
  return null;
}

// useValidation 훅 정의
export function useValidation() {
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const validateId = (id: string) => {
    const error = checkId(id);
    setIdError(error || "");
    return !error;
  };

  const validatePassword = (pw: string, id: string) => {
    const error = checkPassword(pw, id);
    setPasswordError(error || "");
    return !error;
  };

  const validateNickname = (nickname: string) => {
    const error = checkNickname(nickname);
    setNicknameError(error || "");
    return !error;
  };

  return {
    validateId,
    validatePassword,
    validateNickname,
    idError,
    passwordError,
    nicknameError,
  };
}
