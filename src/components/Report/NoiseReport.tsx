import { Link, useLocation, useNavigate } from "react-router-dom";

type Props={
  data: {
    fileName: string;
    originalFilePath: string;
    processedFilePath: string;
    epsilon: number;
    attackSuccess: boolean;
    originalPrediction: string;
    adversarialPrediction: string;
    mode: string;
    level?: number;
    modeDescription: string;
    createdAt: string;
    originalImageBase64: string;
    processedImageBase64: string;
    originalConfidence: string;
    adversarialConfidence: string;
    confidenceDrop: string;
    styleTransform: string;
  };
  confirmMessage?: string | null;
}

function NoiseReport({ data, confirmMessage }: Props) {

  const navigate = useNavigate();

  const originalImage = data.originalImageBase64;
  const NoisedImage = data.processedImageBase64;

  const handleDownload = async () => {
    try {
      const response = await fetch(NoisedImage, { mode: "cors" });
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);;
      link.download = ``;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.log("다운로드 실패:", error);
      alert("다운로드에 실패했습니다.");
    }
  }
  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  return(
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {/* 이미지 비교 */}
      <div className="w-[1200px] flex justify-center gap-[50px] my-5">

        <div className="bg-gray-300 w-[50%] flex flex-col items-center justify-center rounded-[10px] gap-3 py-3">
          <h3 className="font-bold">🖼️ 원본 이미지</h3>
          <img
            src={data.originalFilePath}
            alt="원본 이미지" />
          <div className="bg-white-100 w-[80%] flex flex-col justify-center items-center rounded-[10px]">
            <p>AI 예측</p>
            <p className="font-bold">{data.originalPrediction}</p>
            <p>신뢰도: {data.originalConfidence}</p>
          </div>
          
        </div>

        <div className="bg-gray-300 w-[50%] flex flex-col items-center justify-center rounded-[10px] gap-3">
          <h3 className="font-bold">⚡ 적대적 노이즈 적용</h3>
          <img
            src={data.processedFilePath}
            alt="노이즈 삽입 완료 이미지" />
          <div className="bg-white-100 w-[80%] flex flex-col justify-center items-center rounded-[10px]">
            <p>AI 예측</p>
            <p className="font-bold">{data.adversarialPrediction}</p>
            <p>신뢰도: {data.adversarialConfidence}</p>
          </div>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className="w-[1200px] flex flex-col items-center justify-center mt-5 p-5 gap-5 rounded-[10px] bg-blue-100">
        <h1 className="font-bold text-2xl">📊 상세 통계</h1>
        <div className="flex justify-center w-[100%] gap-5 text-center">
          <div className="w-[10%] bg-white-100 rounded-[10px] p-5">
            <p>결과</p>
            <p className="font-bold text-[20px] mt-2">{data.attackSuccess ? '공격 성공' : '공격 실패'}</p>
          </div>
          <div className="w-[20%] bg-white-100 rounded-[10px] p-5">
            <p>분류 변화</p>
            <p className="font-bold text-[20px] mt-2">{data.originalPrediction}</p>
            <p className="font-bold text-[20px] ">→{data.adversarialPrediction}</p>
          </div>
          <div className="w-[10%] bg-white-100 rounded-[10px] p-5">
            <p>신뢰도 변화</p>
            <p className="font-bold text-[20px] mt-2">{data.confidenceDrop || '0%'}</p>
          </div>
          <div className="w-[15%] bg-white-100 rounded-[10px] p-5">
            <p>적대적 노이즈 강도</p>
            <p className="font-bold text-[20px] mt-2">{data.modeDescription}</p>
            {(data.mode === 'precision') && <p className="font-bold text-[20px] ">{data.level}</p>}
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="text-white-100 flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold text-[40px]">적대적 노이즈 삽입이 완료되었습니다!</h1>
        <button 
          className="w-[355px] h-[57px] rounded-[50px] bg-green-200 text-[20px]"
          onClick={handleDownload}>
          노이즈 삽입 이미지 다운로드
        </button>
        <p>{confirmMessage}</p>
      </div>
    </div>
  );
}

export default NoiseReport;