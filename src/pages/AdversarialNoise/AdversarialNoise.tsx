import { useEffect, useState } from "react";
import { postNoiseImage } from "../../api/noise_api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DeepfakeFileUpload from "../../components/Upload/deepfake/DeepfakeFileUpload";
import NoiseSetting from "../../components/Upload/AdversarialNoise/NoiseSetting";
import { Mode, NoiseOptions } from "../../components/Upload/deepfake/ModeOptions"
import { v4 as uuidv4 } from 'uuid';
import { failTask, finishTask, startTask } from "../../features/task/taskSlice";

function AdversarialNoise() {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("basic");
  const [options, setOptions] = useState<NoiseOptions>({
    level: 2,
  });

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);

  useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
  }, [isLoggedIn, navigate]);

  const handleNoiseInsert = async () => {
    if (!isLoggedIn) {
      alert("로그인을 해주세요.");
      navigate("/login");
    }
      
    if (!file) return;

    // 모드 및 옵션 설정
    const Nmode = mode === 'basic' ? 'auto' : 'precision';
    const Nlevel = options.level;

    // 진행률
    const taskId = uuidv4();
    dispatch(startTask(taskId));

    navigate("/adversarial-noise/loading", { state: { taskId, successRedirect: "/adversarial-noise/result" } });

    postNoiseImage(file, Nmode, Nlevel, taskId)
      .then((resultInfo) => {
        dispatch(finishTask(resultInfo))
      })
      .catch((error) => {
        console.log(error);
        dispatch(failTask(error))
      })
  }

  return(
    <>
      <DeepfakeFileUpload
        title="이미지"
        file={file}
        setFile={setFile}
        accpet="image/*"
        onDone={handleNoiseInsert}
        settingsNode={<NoiseSetting onChange={(m, o) => { setMode(m); setOptions(o); }} />}
    
      />
    </>)
}

export default AdversarialNoise;