import { useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { useNavigate } from "react-router-dom";
import { postWatermarkDetection } from "../../api/watermark_api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";


function WatermarkDetection() {

  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken); 

  const handleDone = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    
    if (!file) return;

    try {
      const data = await postWatermarkDetection(file);
      navigate("/watermark-report", { state: data });
    } catch (error: any) {
      if (error.response) {
      // 예외 처리
      const { status, message } = error.response.data;

      // 워터마크가 없는 이미지를 탐지했을 때 (임계값 초과)
      if (status === 404 && message?.startsWith("유사도가 임계값을 넘습니다")) {
        alert("워터마크가 삽입된 이미지를 넣어주세요!");
        setFile(null);    // 파일 초기화
        return;
      }

      // 다른 에러
      alert(`에러 발생: ${message ?? '알 수 없는 오류'}`);
      console.log("실패", status, message);
      setFile(null);    // 파일 초기화
      } else {
      alert("서버와 연결할 수 없습니다.");
      setFile(null);    // 파일 초기화
      }
    } 
  }

  return(
    <>
      <FileUploadPage
        title="이미지"
        file={file}
        setFile={setFile}
        onDone={handleDone}
        accpet="image/*"
      />
    </>)
}

export default WatermarkDetection;