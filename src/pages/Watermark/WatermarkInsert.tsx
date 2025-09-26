import { useEffect, useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

function WatermarkInsert() {
  const [file, setFile] = useState<File | null>(null);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleDone = () => {
    setIsModal(true);
  }

  return(
    <>
      <FileUploadPage 
        title="이미지"
        file={file}
        setFile={setFile}
        accpet="image/*"
        onDone={handleDone}
        isModal={isModal} 
        setIsModal={setIsModal}
        />
    </>)
}

export default WatermarkInsert;