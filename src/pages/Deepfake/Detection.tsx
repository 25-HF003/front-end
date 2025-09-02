import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { api } from "../../api";
import DeepfakeSetting from "../../components/Upload/deepfake/DeepfakeSetting";
import { Mode, DetectionOptions } from '../../components/Upload/deepfake/ModeOptions'
import DeepfakeFileUpload from "../../components/Upload/deepfake/DeepfakeFileUpload";
import { v4 as uuidv4 } from 'uuid';
import { startTask, finishTask, failTask } from "../../features/task/taskSlice";

function Detection() {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  //const [result, setResult] = useState<DeepfakeResponse | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("basic");
  const [options, setOptions] = useState<DetectionOptions>({
    use_tta: true,
    use_illum: true,
    smooth_window: 5,
    min_face: 64,
    sample_count: 15,
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
      mode: "PRECISION",
      useTta:     options.use_tta,
      useIllum:   options.use_illum,
      detector:   options.detector?.toUpperCase(), // 'Auto' -> 'AUTO'
      smoothWindow: options.smooth_window,
      minFace:      options.min_face,
      sampleCount:  options.sample_count,
    };
    results = await api.deepfake.upload(file, taskId, optionsForApi);
    } else {
      results = await api.deepfake.upload(file, taskId);
    }
    dispatch(finishTask(results));
    } catch (error: any) {
      console.error("업로드/예측 중 오류:", error);
      console.log(error.response?.data?.message || error.message);
      dispatch(failTask(error))
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
        settingsNode={<DeepfakeSetting onChange={(m, o) => { setMode(m); setOptions(o); }} />}
    
      />
    </div> 
  )
}

export default Detection;