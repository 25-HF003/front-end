import ImageUploader from "../FileUploader";
import UploadProgressBar from "../UploadProgressBar";
import { Dispatch, SetStateAction, useState, useEffect, ReactNode } from "react";

type Props = {
  title: String;
  onDone: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
  accpet: string; // ex) "image/*, video/*"
  isModal?: boolean;  // 워터마크만 모달을 쓰기 때문에 기본값 false
  settingsNode?: ReactNode;
}

// 딥페이크 -> <ImageUploadPage title="비디오" />
// 노이즈, 워터마크 -> <ImageUploadPage title="이미지" />

function DeepfakeFileUpload({ title, onDone, file, setFile, accpet, isModal = false, settingsNode }: Props) {

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
    <div className="min-h-screen flex justify-center items-center">
      {/* 카드 */}
      <div className="w-[80vw] max-h-[90vh] rounded-[10px] bg-white-100">
        {/* 스크롤 영역 */}
        <div className="overflow-y-auto max-h-[90vh] p-8">
          {/* 정렬 래퍼 (여기서 가운데 정렬) */}
          <div className="flex flex-col items-center gap-7">
            {/* 옵션(있으면 위쪽) */}
            {settingsNode && (
              <div className="w-[60vw] p-4">
              {/*<div className="w-[60vw] rounded-xl border p-4 bg-white-100 shadow-sm">*/}
                {settingsNode}
              </div>
            )}
            <h1 className="font-bold text-[64px]">{title} 업로드</h1>
       
            <ImageUploader onFileSelect={setFile} accpet={accpet} containerClassName="w-[40vw] min-h-[40vh]"/>
            <UploadProgressBar file={file} onProgressDone={handleProgressDone}/>
            <button
              disabled={!file || !uploadDone}
              className={`w-[355px] h-[57px] rounded-[50px] ${file && uploadDone ? 'bg-green-200' : 'bg-gray-500 cursor-not-allowed'} text-white-100 text-[20px]`}
              onClick={onDone}>
                DONE
            </button>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default DeepfakeFileUpload;