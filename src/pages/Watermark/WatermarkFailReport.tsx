type Props = {
  uploaded: string;
}

function WatermarkFailReport({ uploaded }: Props) {
  return(
    <div className="flex flex-col items-center my-10 bg-gray-50 rounded-[44px] h-[730px]">
      <h1 className="p-4 text-[36px] font-bold ">✔️ 탐지한 이미지</h1>
      
      {/* 탐지된 영역*/}
      <div className="flex-1 flex justify-center my-5 w-full">
        <div className="w-[40%] h-[80%] flex flex-col justify-center items-center">
          {/* <p className="text-[30px] text-center">✔️ 탐지한 이미지</p> */}
          <img
            className="h-full object-contain" 
            src={`data:image/png;base64,${uploaded}`}
            alt="업로드된 이미지" 
          />
        </div>
      </div>
    </div>
  );
}

export default WatermarkFailReport;