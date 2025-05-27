import React, { useCallback, useEffect, useState } from 'react';

interface UploadFile {
  name: string;
  size: number; // bytes
}

function Detection() {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [progress, setProgress] = useState<number>(0);

  function formatBytes(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1); // MB 단위
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile({
        name: droppedFile.name,
        size: droppedFile.size,
      });
      setProgress(0);
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
  }

  useEffect(function () {
    let interval: NodeJS.Timeout;

    if (file && progress < 100) {
      interval = setInterval(function () {
        setProgress(function (prev) {
          const next = prev + 5;
          return next > 100 ? 100 : next;
        });
      }, 200);
    }

    return function () {
      clearInterval(interval);
    };
  }, [file, progress]);

  return(
    
      <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white-100 rounded-xl w-[900px] py-20 px-12 text-center shadow-xl">
        <h1 className="text-5xl font-bold mb-10">이미지/비디오 업로드</h1>

        <div
          className="bg-gray-100 rounded-md border border-dashed border-gray-400 h-64 flex flex-col items-center justify-center cursor-pointer mb-10"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            src="/img_upload.svg"
            alt="Upload Icon"
            className="w-21 h-21 mb-5 opacity-70"
          />
          <p className="text-gray-500">Drag and Drop your image/video</p>
        </div>

        {file && (
          <div className="flex items-center gap-4 mb-8 px-4">
            <img
              src="image_ex.svg"
              alt="image icon"
              className="w-15 h-15"
            />
            <div className="flex-1">
              <div className="flex justify-between text-sm font-medium">
                <span>{file.name}</span>
                <span className="text-gray-500">Uploading... {progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 mb-1">
                <div
                  className="bg-green-100 h-1.5 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {formatBytes((file.size * progress) / 100)} MB of {formatBytes(file.size)} MB
              </p>
            </div>
          </div>
        )}

        <button className="bg-green-200 hover:bg-green-300 text-white-100 py-2 px-10 rounded-full">
          DONE
        </button>
      </div>
    </div>
    )
}

export default Detection;