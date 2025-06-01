import { useState } from "react";
import FileUploadPage from "../components/Upload/FileUploadPage";

function Detection() {

  const [file, setFile] = useState<File | null>(null);
  const [isSModal, setIsModal] = useState(false);

  const handleNoiseInsert = () => {

  }

  return(
    <>
      <FileUploadPage 
        title="비디오"
        file={file}
        setFile={setFile}
        accpet="video/*"
        onDone={handleNoiseInsert}
      />
    </>)
}

export default Detection;