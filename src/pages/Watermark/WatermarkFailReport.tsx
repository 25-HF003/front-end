type Props = {
  uploaded: string;
  masked: string;
}

function WatermarkFailReport({ uploaded, masked }: Props) {
  return(
    <div className="my-10 bg-gray-50 rounded-[44px] h-[730px]">
      <h1 className="p-4 text-[36px] font-bold ">✔️ 탐지된 영역</h1>
      
      {/* 탐지된 영역*/}
      <div className="flex justify-around my-5">
        <div className="w-[40%] flex flex-col gap-5">
          <p className="text-[30px] text-center">원본 워터마크 이미지</p>
          <img
            src={`http://127.0.0.1:5000${uploaded}`}
            alt="업로드된 이미지" 
          />
        </div>
        <div className="w-[40%] flex flex-col gap-5">
          <h1 className="text-[30px] text-center my-1">훼손된 워터마크 위치</h1>
          <img
            src={`http://127.0.0.1:5000${masked}`}
            alt="훼손된 이미지"
          />
        </div>
      </div>
    </div>
  );
}

export default WatermarkFailReport;