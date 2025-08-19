import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DeepfakeResponse } from "../../api/deepfake";
import { api } from "../../api";
import DeepfakeSettings from "../../components/Upload/deepfake/DeepfakeSetting";
import { Mode, DetectionOptions } from '../../components/Upload/deepfake/DetectionOptions'
import DeepfakeFileUpload from "../../components/Upload/deepfake/DeepfakeFileUpload";



function Detection() {

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<DeepfakeResponse | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("basic");
  const [options, setOptions] = useState<DetectionOptions>({
    use_tta: false,
    use_illum: false,
    smooth_window: 60,
    min_face: 80,
    sample_count: 60,
    detector: 'Auto',
  });

    const onDone = () => {
    // file, mode, options 로 API 호출
  };
 
  // Redux에서 로그인된 유저의 userId 가져오기
  //const userId = useSelector((state: RootState) => state.auth.user?.userId);
  //console.log("userId", userId);

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);

  const handleDetectionInsert = async() => {
    if (!file || !isLoggedIn) {
    navigate("/pages/NotFound")
    return;
  }
  navigate("/detection/loading");
  
  try {
    const results = await api.deepfake.upload(file);
    setResult(results);

    console.log("파일 업로드 완료", results);

    navigate("/detection/report", {state: {results}});
      
    } catch (error: any) {
      console.error("업로드/예측 중 오류:", error);
      console.log(error.response?.data?.message || error.message);
      alert("서버 오류로 인해 업로드에 실패했습니다.");
      navigate("/pages/NotFound")
    }
    
  };

  return(
    <div className="max-w-3xl mx-auto space-y-6">
      {/*
      <FileUploadPage 
        title="비디오"
        file={file}
        setFile={setFile}
        accpet="video/*"
        onDone={handleDetectionInsert}
      />*/ }
      <DeepfakeFileUpload
        title="비디오"
        file={file}
        setFile={setFile}
        accpet="video/*"
        onDone={handleDetectionInsert}
        settingsNode={<DeepfakeSettings onChange={(m, o) => { setMode(m); setOptions(o); }} />}
    
      />
    </div> 
  )
}

export default Detection;