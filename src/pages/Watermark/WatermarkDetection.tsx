import { useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { useNavigate } from "react-router-dom";
import { postWatermarkDetection } from "../../api/watermark_api";


function WatermarkDetection() {

  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleDone = async () => {

    if (!file) return;

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