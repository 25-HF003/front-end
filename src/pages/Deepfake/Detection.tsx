import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { api } from "../../api";
import DeepfakeSetting from "../../components/Upload/deepfake/DeepfakeSetting";
import { Mode, DetectionOptions } from '../../components/Upload/deepfake/ModeOptions'
import DeepfakeFileUpload from "../../components/Upload/deepfake/DeepfakeFileUpload";
import { v4 as uuidv4 } from 'uuid';
import { startTask, finishTask } from "../../features/task/taskSlice";
import axios from "axios";

function Detection() {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  //const [result, setResult] = useState<DeepfakeResponse | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("basic");
  const [options, setOptions] = useState<DetectionOptions>({
    use_tta: true,
    use_illum: true,
    min_face: 64,
    sample_count: 20,
    detector: 'Auto',
  });

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleDetectionInsert = async() => {
    if (!file || !isLoggedIn) {
    navigate("/pages/NotFound")
    return;
  }

  const taskId = uuidv4();
  dispatch(startTask(taskId));

  navigate("/detection/loading", { state: { taskId, successRedirect: "/detection/report" }});

  try {
    let results;
    // UI 상태 → API 옵션 매핑
    if (mode === "advanced") {
      const optionsForApi: any = {
      mode: "precision",
      use_tta:     options.use_tta,
      use_illum:   options.use_illum,
      detector:   options.detector?.toUpperCase(), // 'Auto' -> 'AUTO'
      min_face:      options.min_face,
      sample_count:  options.sample_count,
    };
    console.log(optionsForApi);
    results = await api.deepfake.upload(file, taskId, optionsForApi);
    } else {
      results = await api.deepfake.upload(file, taskId);
    }
    dispatch(finishTask(results));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const data = err.response?.data; // 서버가 보낸 JSON/문자열
        console.groupCollapsed("❌ Upload/Detect failed");
        console.log("status:", status);
        console.log("response.data:", data);
        console.log("request url:", err.config?.url);
        console.log("request headers:", err.config?.headers);
        console.groupEnd();
        const msg =
          (typeof data === "string" ? data :
          data?.message) || err.message || "서버 내부 오류가 발생했습니다.";
        alert(msg);
        navigate("/detection")
      }
      /*
      console.error("업로드/예측 중 오류:", error);
      console.log(error.response?.data?.message || error.message);
      const message =error.response?.data?.message || error.message || "알 수 없는 오류";
      dispatch(failTask(message));
      alert("서버 오류로 인해 업로드에 실패했습니다.");
      navigate("/pages/NotFound")*/
    }
  };


  return(
    <>
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
        settingsNode={<DeepfakeSetting onChange={(m, o) => { setMode(m); setOptions(o); }} />}
      />
    </>
  )
}

export default Detection;