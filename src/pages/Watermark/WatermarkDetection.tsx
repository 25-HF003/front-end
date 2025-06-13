import { useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function WatermarkDetection() {

  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleDone = async () => {

    if (!file) return;
    
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post(`http://127.0.0.1:5000/watermark-detection`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        const data = response.data;
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