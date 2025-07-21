import { useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { postNoiseImage } from "../../api/noise_api";
import { useNavigate } from "react-router-dom";

function AdversarialNoise() {

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleNoiseInsert = async () => {
    try {
      if (!file) return;
      const data = await postNoiseImage(file);
      console.log(data);
      navigate('/adversarial-noise/result', { state: data });
      // navigate('/adversarial-noise/result', { state: { ...data, fileName: file.name } });
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