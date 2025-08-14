import WatermarkModal from "../../pages/Watermark/WatermarkModal";
import ImageUploader from "./FileUploader";
import UploadProgressBar from "./UploadProgressBar";
import { Dispatch, SetStateAction, useState, useEffect, ReactNode } from "react";

type Props = {
  title: String;
  onDone: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
  accpet: string; // ex) "image/*, video/*"
  isModal?: boolean;  // 워터마크만 모달을 쓰기 때문에 기본값 false
  setIsModal?: Dispatch<SetStateAction<boolean>>;
  containerClassName?: string; //카드 크기/여백 오버라이드
  settingsNode?: ReactNode; //카드 안 상단에 표시할 모드/옵션 영역
}

// 딥페이크 -> <ImageUploadPage title="비디오" />
// 노이즈, 워터마크 -> <ImageUploadPage title="이미지" />

function FileUploadPage({ title, onDone, file, setFile, accpet, isModal = false, setIsModal, containerClassName, settingsNode }: Props) {

  //upload 100 => 버튼 활성화
  const [uploadDone, setUploadDone] = useState(false);

  useEffect(() => {
    if (file) {
      setUploadDone(false);
      //console.log("useEffect: 파일 변경 감지 → uploadDone 초기화");
    }
  }, [file]);

  const handleProgressDone = () => {
    setUploadDone(true);
  };


  return(
    <div className="h-screen flex flex-col justify-center items-center">
      <div className={`rounded-[10px] flex flex-col justify-center items-center bg-white-100 gap-7
                    ${containerClassName ?? "w-[80vw] h-[75vh] p-8"}`
      }>
        <h1 className="font-bold text-[64px] ">{title} 업로드</h1>
         {/* 옵션이 있으면 위쪽에 표시 */}
        {settingsNode && (
          <div className="w-full border rounded-lg p-4 bg-white-100 shadow-sm">
            {settingsNode}
          </div>
        )}
        <div className="flex flex-col items-center gap-6 flex-1">
        <ImageUploader onFileSelect={setFile} accpet={accpet} />
        <UploadProgressBar file={file} onProgressDone={handleProgressDone}/>
        <button
          disabled={!file || !uploadDone}
          className={`w-[355px] h-[57px] rounded-[50px] ${file && uploadDone ? 'bg-green-200' : 'bg-gray-500 cursor-not-allowed'} text-white-100 text-[20px]`}
          onClick={onDone}>
            DONE</button>
      </div> 
      </div>
      {isModal && setIsModal && <WatermarkModal setIsModal={setIsModal} file={file} />}
    </div>
    
  );
}

export default FileUploadPage;