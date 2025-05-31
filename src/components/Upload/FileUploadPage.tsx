import WatermarkModal from "../../pages/Watermark/WatermarkModal";
import ImageUploader from "./FileUploader";
import UploadProgressBar from "./UploadProgressBar";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: String;
  onDone: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
  accpet: string; // ex) "image/*, video/*"
  isModal?: boolean;  // 워터마크만 모달을 쓰기 때문에 기본값 false
  setIsModal?: Dispatch<SetStateAction<boolean>>;
}

// 딥페이크 -> <ImageUploadPage title="비디오" />
// 노이즈, 워터마크 -> <ImageUploadPage title="이미지" />

function FileUploadPage({ title, onDone, file, setFile, accpet, isModal = false, setIsModal }: Props) {

  return(
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-[80vw] h-[75vh] rounded-[10px] flex flex-col justify-center items-center bg-white-100 gap-7">
        <h1 className="font-bold text-[64px] ">{title} 업로드</h1>
        <ImageUploader onFileSelect={setFile} accpet={accpet} />
        <UploadProgressBar file={file} />
        <button
          disabled={!file}
          className={`w-[355px] h-[57px] rounded-[50px] ${file ? 'bg-green-200' : 'bg-gray-500'} text-white-100 text-[20px]`}
          onClick={onDone}>
            DONE</button>
      </div> 
      {isModal && setIsModal && <WatermarkModal setIsModal={setIsModal} file={file} />}
    </div>
  );
}

export default FileUploadPage;