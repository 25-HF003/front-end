import {  useState, useEffect } from "react";


type Props = {
  file: File | null;
};

function UploadProgressBar({ file }: Props) {

  const [progress, setProgress] = useState(0);// 진행률
  // const [uploaded, setUploaded] = useState(0);  // bytes

  useEffect(function () {
    let interval: NodeJS.Timeout;

    if (file) {
      setProgress(0); // 새 파일이면 초기화

      interval = setInterval(function () {
        setProgress((prev) => {
          const next = prev + 20;
          return next > 100 ? 100 : next;
        });
      }, 200);
    }

    return function () {
      clearInterval(interval);
    };
  }, [file]);

  function formatBytes(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"; // MB 단위
  }



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
              <span className="text-gray-900">  {formatBytes((file.size * progress) / 100)} of {formatBytes(file.size)}</span>
              <span>Uploading... {progress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadProgressBar;
