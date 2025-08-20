import { Link, useLocation } from "react-router-dom";

function NoiseResult() {

  const location = useLocation();
  const data = location.state?.data;
  console.log(data);

  const originalImage = data.originalImageBase64;
  const NoisedImage = data.processedImageBase64;

  const handleDownload = async () => {
    try {
      const response = await fetch(originalImage, { mode: "cors" });
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

  return(
    <div className="w-full flex flex-col items-center justify-center gap-3">
      {/* 이미지 비교 */}
      <div className="w-[1200px] flex justify-center gap-[50px] my-5">

        <div className="bg-gray-300 w-[50%] flex flex-col items-center justify-center rounded-[10px] gap-3 py-3">
          <h3 className="font-bold">🖼️ 원본 이미지</h3>
          <img
            src={originalImage}
            alt="원본 이미지" />
          <div className="bg-white-100 w-[80%] flex flex-col justify-center items-center rounded-[10px]">
            <p>AI 예측</p>
            <p className="font-bold">{data.originalPrediction}</p>
            <p>신뢰도: {data.originalConfidence}</p>
          </div>
          
        </div>

        <div className="bg-gray-300 w-[50%] flex flex-col items-center justify-center rounded-[10px] gap-3">
          <h3 className="font-bold">⚡ 노이즈 적용</h3>
          <img
            src={NoisedImage}
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
        <h1 className="font-bold">📊 상세 통계</h1>
        <div className="flex justify-center w-[100%] gap-5">
          <div className="w-[10%] bg-white-100 rounded-[10px] p-5 ">
            <p>신뢰도 감소</p>
            <p className="font-bold text-[20px] ">{data.confidenceDrop || '0%'}</p>
          </div>
          <div className="w-[10%] bg-white-100 rounded-[10px] p-5">
            <p>엡실론</p>
            <p className="font-bold text-[20px] ">{data.epsilon}</p>
          </div>
          <div className="w-[10%] bg-white-100 rounded-[10px] p-5">
            <p>공격 결과</p>
            <p className="font-bold text-[20px] ">{data.attackSuccess ? '공격 성공' : '공격 실패'}</p>
          </div>
          <div className="w-[10%] bg-white-100 rounded-[10px] p-5">
            <p>공격 성공률</p>
            <p className="font-bold text-[20px] ">{data.attackSuccess ? '100%' : '0%'}</p>
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
        <p>
          <Link to="/mypage">마이페이지</Link>
          에서도 확인 가능합니다.</p>
      </div>
    </div>
  );
}

export default NoiseResult;