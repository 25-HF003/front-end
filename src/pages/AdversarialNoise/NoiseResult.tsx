import { useLocation } from "react-router-dom";

function NoiseResult() {

  const location = useLocation();
  const data = location.state;

  const handleDownload = () => {
    const base64Data = data.processedFilePath;
    const fileName = "adversarial_image.png"; // 원하는 파일명

    // base64 문자열에서 MIME 타입과 데이터 분리
    const arr = base64Data.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Blob 생성 및 다운로드 링크 생성
    const blob = new Blob([u8arr], { type: mime });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
          <h3 className="font-bold">⚡ 노이즈 적용</h3>
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
      <div className="w-[1200px] flex flex-col items-center justify-center mt-5 p-5 gap-5 rounded-[10px]" style={{ backgroundColor: '#e3f2fd'}}>
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
            <p>처리 상태</p>
            <p className="font-bold text-[20px] ">{data.message}</p>
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
        <p>마이페이지에서도 확인 가능합니다.</p>
      </div>
    </div>
  );
}

export default NoiseResult;