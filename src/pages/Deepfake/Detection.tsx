import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import {uploadDeepfakeVideo, DeepfakeResponse } from "../../api/deepfake_api";


function Detection() {

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<DeepfakeResponse | null>(null);
  const navigate = useNavigate();
 
  // 실제 구현에선 로그인된 유저 ID를 가져와야 함
  const userId = 1; // 예시용 하드코딩된 userId

  const handleDetectionInsert = async() => {
      if (!file) {
      navigate("/pages/NotFound")
      return;
  }
  navigate("/detection/loading");
  
  try {
    const results = await uploadDeepfakeVideo(file, userId);
    setResult(results);

    console.log("파일 업로드 완료", results);

    navigate("/detection/report", {state: {results}});
      
    } catch (error) {
      console.error("업로드/예측 중 오류:", error);
      alert("서버 오류로 인해 업로드에 실패했습니다.\n" + (error as Error).message);
      navigate("/pages/NotFound")
    }
    
  };

  return(
    
      <FileUploadPage 
        title="비디오"
        file={file}
        setFile={setFile}
        accpet="video/*"
        onDone={handleDetectionInsert}
      />
      
    )
}

export default Detection;