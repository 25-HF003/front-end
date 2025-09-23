type TPHash = {
  pHash: number;
}

function HammingDistanceBar({ pHash }: TPHash) {

  // 바의 최대값
  const MAX_HAMMING = 30;

  // 마커의 위치 계산
  const marker = (pHash / MAX_HAMMING) * 100;

  // 각 구간의 너비
  const segmentWidth = 100 / 3;

  const getComment = (distance: number) => {
    if (distance <= 10) {
      return "높은 유사도 — 이미지 변형이 거의 없습니다.";
    } else if (distance <= 20) {
      return "중간 유사도 — 약간의 변형 또는 편집이 있을 수 있습니다.";
    } else if (distance <= 30) {
      return "낮은 유사도 — 이미지 변형이 다소 큽니다.";
      // return "낮은 유사도 — 이미지가 원본과 크게 다릅니다. 원본 이미지와 비교해 보세요.";
    }
  };

  // pHash 값에 따라 마커의 색상을 반환하는 함수
  const getMarkerColor = (distance: number) => {
    if (distance <= 10) {
      return "bg-green-500";
    } else if (distance <= 20) {
      return "bg-orange-400";
    } else {
      return "bg-red-500";
    }
  };

  return(
    <>
      <div className="relative w-full max-w-xl mx-auto mb-8 h-16 rounded-full overflow-hidden shadow-inner">
        {/* 매우 높은 유사도 구간 (0-10) */}
        <div 
          className="absolute top-0 left-0 h-full bg-green-500" 
          style={{ width: `${segmentWidth}%` }}
        ></div>
        {/* 높은 유사도 구간 (10-20) */}
        <div 
          className="absolute top-0 left-[33.33%] h-full bg-orange-400" 
          style={{ width: `${segmentWidth}%` }}
        ></div>
        {/* 낮은 유사도 구간 (20-30) */}
        <div 
          className="absolute top-0 left-[66.66%] h-full bg-red-500" 
          style={{ width: `${segmentWidth}%` }}
        ></div>

        {/* 현재 pHash 값 마커 */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" 
          style={{ left: `calc(${marker}% - 25px)` }}
        >
          <div className={`${getMarkerColor(pHash)} font-bold text-[20px] rounded-full w-14 h-14 flex items-center justify-center relative z-10`}
          style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}>
            {pHash}
          </div>
        </div>
      </div>

      {/* 구간별 */}
      <div className="flex justify-between w-full max-w-xl mx-auto text-[18px] text-gray-600 mt-[-20px] mb-4">
        <span className="w-[33.33%] text-left pl-2">0-10</span>
        <span className="w-[33.33%] text-center">10-20</span>
        <span className="w-[33.33%] text-right pr-2">20-30</span>
      </div>

      {/* 유사도 */}
      <div className="flex justify-between w-full max-w-xl mx-auto text-center text-[24px] font-bold mb-6">
        <p className="w-[33.33%] text-green-500">높은 유사도</p>
        <p className="w-[33.33%] text-orange-400">중간 유사도</p>
        <p className="w-[33.33%] text-red-500">낮은 유사도</p>
      </div>

      {/* 현재 해밍 거리에 따른 상세 코멘트 */}
      <div className="text-center mt-6 text-[20px] font-medium text-gray-800">
        <p className="mb-2">⚠️ <span className="font-bold">탐지 결과:</span> {getComment(pHash)}</p>
        <p className="text-[14px] text-gray-900">
          *해밍 거리는 원본 이미지와의 비트 차이를 나타내는 지표입니다. 값이 낮을수록 유사도가 높습니다.
        </p>
      </div>
    </>
  );
}

export default HammingDistanceBar;