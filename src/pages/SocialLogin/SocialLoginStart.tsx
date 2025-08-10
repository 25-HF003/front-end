import { useEffect } from "react";

type Provider = "google" | "naver" | "kakao";

interface Props {
  provider: Provider;
  backendBaseUrl?: string; // 기본값 localhost:8080
}

/**
 * 마운트 시 해당 provider의 /oauth2/authorization/{provider}로 즉시 리다이렉트
 * 필요하면 버튼 클릭형으로 바꿔도 됨.
 */
export default function SocialLoginStart({
  provider,
  backendBaseUrl = "http://localhost:8080",
}: Props) {
  useEffect(() => {
    // state 값 붙이고 싶으면 여기서 생성해서 쿼리에 추가 가능
    window.location.href = `${backendBaseUrl}/oauth2/authorization/${provider}`;
  }, [provider, backendBaseUrl]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">소셜 로그인 진행 중…</h2>
        <p className="text-gray-500">잠시만 기다려주세요. {provider}로 이동합니다.</p>
      </div>
    </div>
  );
}
