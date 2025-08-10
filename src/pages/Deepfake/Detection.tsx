import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { DeepfakeResponse } from "../../api/deepfake";
import { api } from "../../api";


function Detection() {

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<DeepfakeResponse | null>(null);
  const navigate = useNavigate();
 
  // Redux에서 로그인된 유저의 userId 가져오기
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  console.log("userId", userId);

  const handleDetectionInsert = async() => {
    if (!file || !userId) {
    navigate("/pages/NotFound")
    return;
  }
  navigate("/detection/loading");
  
  try {
    const results = await api.deepfake.upload(file, userId);
    setResult(results);

    console.log("파일 업로드 완료", results);

    navigate("/detection/report", {state: {results}});
      
    } catch (error: any) {
      console.error("업로드/예측 중 오류:", error);
      alert("서버 오류로 인해 업로드에 실패했습니다.\n" + (error.response?.data?.message || error.message));
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