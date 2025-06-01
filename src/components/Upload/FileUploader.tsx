import { useState } from "react";

type Props = {
  onFileSelect: (file: File) => void;
  accpet: string; // ex) "image/*, video/*"
}

function FileUploader({ onFileSelect, accpet }: Props) {

  const [dragActive, setDragActive] = useState(false);

  // 박스 위에 파일을 끌어올 때
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // 새 탭에서 파일 열기를 막음

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true); // 박스 강조
    } else if (e.type === "dragleave") {
      setDragActive(false); // 강조 해제
    }
  };

  // 파일을 drop 했을 때
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      console.log("업로드된 파일: ", file);
      setDragActive(false);
    }
  };

  // 파일 선택 input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      onFileSelect(file);
      console.log("선택된 파일: ", file);
    }
  };

  return(
    <div className="w-[50%] h-[50%] flex flex-col justify-center items-center bg-gray-300 ">
      <div
        className={`w-[100%] h-[100%] flex flex-col justify-center items-center gap-7 
          ${dragActive ? 'bg-gray-500' : 'bg-gray-300'}`}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDragEnter={handleDrag}
        onDrop={handleDrop}
      >
        <img src="/img_upload.svg" alt="이미지 업로드" />
        <input 
          id="fileInput" 
          type="file" 
          className="hidden" 
          accept={accpet}
          onChange={handleFileChange} 
        />
        <div className="text-[20px] text-gray-900">
          <span>Drag and Drop or </span>
          <label htmlFor="fileInput" className="text-green-200 cursor-pointer">
            browse
          </label>
          <span> your image/video</span>
        </div>
      </div>
    </div>
  );
}

export default FileUploader;