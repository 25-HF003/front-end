import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadPage from "../components/Upload/FileUploadPage";
//import InsertLoading from "../components/InsertLoading";

function Detection() {

  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = useState(false);

  const handleDetectionInsert = () => {
    navigate("/detection/loading");
    //setIsLoading(true); // InsertLoading 컴포넌트
  }

  return(
    <>
      {/*{isLoading ? (
        <InsertLoading text="탐지 중..."/>
      ): ( */}
      <FileUploadPage 
        title="비디오"
        file={file}
        setFile={setFile}
        accpet="video/*"
        onDone={handleDetectionInsert}
      />
      {/*)}*/}
    </>)
}

export default Detection;