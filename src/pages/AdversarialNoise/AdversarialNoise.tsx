import { useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { postNoiseImage } from "../../api/noise_api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function AdversarialNoise() {

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);

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
      <FileUploadPage 
        title="이미지"
        file={file}
        setFile={setFile}
        accpet="image/*"
        onDone={handleNoiseInsert}
      />
    </>)
}

export default AdversarialNoise;