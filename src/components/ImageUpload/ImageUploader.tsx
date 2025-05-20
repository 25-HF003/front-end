// import { useState } from "react";

function ImageUploader() {

  // const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  return(
    <div className="w-[50%] h-[40%] flex flex-col justify-center items-center bg-gray-300 ">
    {/* <div className="w-[836px] h-[302px] flex flex-col justify-center items-center bg-gray-300 "> */}
      <div
        className="w-[100%] h-[100%] flex flex-col justify-center items-center"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input id="fileInput" type="file" className="hidden" accept="image/*" />
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

export default ImageUploader;