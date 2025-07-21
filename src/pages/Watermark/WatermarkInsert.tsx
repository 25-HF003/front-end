import { useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import InsertFail from "../../components/InsertFail";
import InsertLoading from "../../components/InsertLoading";

function WatermarkInsert() {

  const [file, setFile] = useState<File | null>(null);
  const [isSModal, setIsModal] = useState(false);

  const handleDone = () => {
    setIsModal(true);
  }

  return(
    <>
      {/* <InsertLoading text="삽입중..." /> */}
      {/* <InsertFail title="워터마크" link="watermark-insert" /> */}
      <FileUploadPage 
        title="이미지"
        file={file}
        setFile={setFile}
        accpet="image/*"
        onDone={handleDone}
        isModal={isSModal} 
        setIsModal={setIsModal}
        />
    </>)
}

export default WatermarkInsert;