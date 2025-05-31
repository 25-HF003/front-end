import { useState } from "react";

type Props = {
  file: File | null;
};

function UploadProgressBar({ file }: Props) {

  const [progress, setProgress] = useState(72);  // 진행률
  // const [uploaded, setUploaded] = useState(0);  // bytes

  return (
    <div className="w-[50%] flex justify-center items-center">
      {file && (
        <div className="w-[100%] flex">
          <img src="/upload_bar_img.svg" alt="썸네일" />
          {/* <div className="m-1"><img src="/upload_bar_img.svg" alt="썸네일" /></div> */}
          <div className="w-full flex flex-col justify-center gap-1 px-2">
            <span className="truncate max-w-[60%] overflow-hidden whitespace-nowrap ">{file.name}</span>
            {/* 업로드 바 */}
            <div className="w-full h-[4px] bg-gray-900 overflow-hidden">
                <div
                  className="h-full bg-green-200 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">5.7 MB of 7.8MB</span>
              <span>Uploading... {progress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadProgressBar;
