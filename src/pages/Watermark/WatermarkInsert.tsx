import { useEffect, useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import InsertFail from "../../components/InsertFail";
import InsertLoading from "../../components/InsertLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

function WatermarkInsert() {
  const [file, setFile] = useState<File | null>(null);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)
  console.log("isLoggedIn", isLoggedIn);

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
      {/* <InsertLoading text="삽입중..." /> */}
      {/* <InsertFail title="워터마크" link="watermark-insert" /> */}
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