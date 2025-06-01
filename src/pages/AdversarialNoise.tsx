import { useState } from "react";
import FileUploadPage from "../components/Upload/FileUploadPage";

function AdversarialNoise() {

  const [file, setFile] = useState<File | null>(null);
  const [isSModal, setIsModal] = useState(false);

  const handleNoiseInsert = () => {

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