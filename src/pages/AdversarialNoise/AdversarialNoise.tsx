import { useEffect, useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { postNoiseImage } from "../../api/noise_api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DeepfakeFileUpload from "../../components/Upload/deepfake/DeepfakeFileUpload";
import NoiseSetting from "../../components/Upload/AdversarialNoise/NoiseSetting";
import { Mode, NoiseOptions } from "../../components/Upload/deepfake/ModeOptions"

function AdversarialNoise() {

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("basic");
  const [options, setOptions] = useState<NoiseOptions>({
    level: '2',
  });

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);

  useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
  }, [isLoggedIn, navigate]);

  const handleNoiseInsert = async () => {
    try {
      if (!isLoggedIn) {
        alert("로그인을 해주세요.");
        navigate("/login");
      }
      
      if (!file) return;

      const data = await postNoiseImage(file);
      console.log(data);
      navigate('/adversarial-noise/result', { state: data });
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <>
      {/* 
      <FileUploadPage 
        title="이미지"
        file={file}
        setFile={setFile}
        accpet="image/*"
        onDone={handleNoiseInsert}
      />*/}
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