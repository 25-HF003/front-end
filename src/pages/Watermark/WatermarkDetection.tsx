import { useEffect, useState } from "react";
import FileUploadPage from "../../components/Upload/FileUploadPage";
import { useNavigate } from "react-router-dom";
import { postWatermarkDetection } from "../../api/watermark_api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { v4 as uuidv4 } from 'uuid';
import { finishTask, startTask } from "../../features/task/taskSlice";
import SignupModal from "../../components/Modal/SignupModal";

function WatermarkDetection() {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken); 

  useEffect(() => {
      if (!isLoggedIn) {
        navigate("/login");
      }
      setIsModal(true);
    }, [isLoggedIn, navigate]);
  

  const handleDone = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    
    if (!file) return;

    const taskId = uuidv4();
    dispatch(startTask(taskId));

    navigate("/watermark-detection/loading", { state: { taskId, successRedirect: "/watermark-report" } });

    postWatermarkDetection(file, taskId)
      .then((resultInfo) => {
        dispatch(finishTask(resultInfo))
      })
      .catch((error: any) => {
      if (error.response) {
      // 예외 처리
      const { status, message } = error.response.data;

      // 워터마크가 없는 이미지를 탐지했을 때 (임계값 초과)
      if (status === 404 && message?.startsWith("유사도가 임계값을 넘습니다")) {
        alert("워터마크가 삽입된 이미지를 넣어주세요!");
        setFile(null);    // 파일 초기화
        navigate("/watermark-insert");
        return;
      }

      // 다른 에러
      alert(`에러 발생: ${message ?? '알 수 없는 오류'}`);
      console.log("실패", status, message);
      setFile(null);    // 파일 초기화
      } else {
      alert("서버와 연결할 수 없습니다.");
      setFile(null);    // 파일 초기화
      }
    })
  }

  return(
    <>
      <SignupModal 
        isOpen={isModal}
        message="⚠ DeepTruth에서 생성된 워터마크만 \n탐지 가능합니다. \n\n DeepTruth 전용 디지털워터마크를 개발하여\n 사용 중이기에 다른 디지털 워터마크는 탐지 안되는 점 양해 부탁드립니다."
        onClose={() => setIsModal(false)}/>
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