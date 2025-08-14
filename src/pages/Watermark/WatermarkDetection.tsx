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
  console.log("isLoggedIn", isLoggedIn);

  const handleDone = async () => {

    if (!file || !isLoggedIn) return;

    try {
      const data = await postWatermarkDetection(file);
      navigate("/watermark-report", { state: data });
    } catch (error) {
      console.log("실패", error)
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