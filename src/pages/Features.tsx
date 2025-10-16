import { Link } from "react-router-dom";

function Features() {
  return(
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white-100 px-7 py-12">
        {/* 타이틀 */}
          <div className="flex flex-col justify-center md:col-span-2">
            <h1 className="flex items-center text-[12px] font-poppins font-bold text-green-300">DeepTruth - Detect Deepfakes, Defend the Truth</h1>
            <h1 className="font-bold text-[52px]">
              클릭 한 번으로 영상의 진실을 찾고<br/> 
              콘텐츠를 지키는 통합 보안 솔루션</h1>
          {/* 내용 */}
            <div className="my-3 space-y-1 leading-relaxed text-lg text-gray-700 pr-4">
              <p>딥페이크 기술의 발전은 혁신적인 가능성을 열었지만, 동시에 거짓된 영상과 이미지가 사회적 혼란을 초래하는 심각한 문제로 떠오르고 있습니다.</p>
              <p>DeepTruth는 이러한 위협에 맞서, 진실을 지키고(Defend the Truth), 조작된 미디어를 탐지하는(Detect Deepfakes) AI 기반 솔루션을 제공합니다.</p>
              <p>저희 DeepTruth는 AI 기반 딥페이크 탐지 시스템을 개발하여, 영상 속 조작 여부를 판별하는 솔루션을 제공합니다.</p>
              <p>또한, 단순히 탐지하는 것에 그치지 않고, 불법적인 딥페이크 생성을 어렵게 만들며 AI 무단 학습을 방지하는 기능을 함께 제공합니다.</p>
              <p>우리는 단순한 기술을 넘어, 신뢰할 수 있는 디지털 환경을 구축하는 것을 목표로 하고 있습니다. DeepTruth가 여러분과 함께 진실을 지켜나가겠습니다.</p>
            </div>
          </div>
      </div>

      <div className="py-12 w-full bg-green-200 px-7 flex flex-col justify-center items-center">
        <h1 className="text-white-200 font-bold text-[36px] py-10 ">어떤 서비스인가요?</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-10 px-10">

          {/* 딥페이크 */}
          <div className="w-[360px] h-[400px] bg-white-200 p-8 flex flex-col justify-center items-center text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
            <h5 className="justify-start text-[28px] py-2 mb-4">딥페이크 탐지</h5>
            <div className="h-[200px] py-7 flex flex-col">
              AI 기반 딥페이크 탐지 기술을 활용해 이미지와 영상의 조작 여부를 빠르고 정확하게 분석합니다.
              <Link to="/detection" className="pt-10 text-blue-500">
              바로가기
            </Link>
            </div>
          </div>
          {/* 적대적 노이즈 */}
          <div className="w-[360px] h-[400px] bg-white-200 p-8 flex flex-col justify-center items-center text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
            <h5 className="justify-start text-[28px] py-2 mb-4">적대적 노이즈 삽입</h5>
            <div className="h-[200px] py-7 flex flex-col">
              적대적 노이즈를 삽입하여 AI 모델의 무단 학습을 방해하고, 창작자의 고유한 예술 스타일을 보호하는 기능을 제공합니다.
              <Link to="/adversarial-noise" className="pt-10 text-blue-500">
              바로가기
            </Link>
              </div>
          </div>
          {/* 워터마크 삽입 */}
          <div className="w-[360px] h-[400px] bg-white-200 p-8 flex flex-col justify-center items-center text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
            <h5 className="justify-start text-[28px] py-2 mb-4">워터마크 삽입</h5>
            <div className="h-[200px] py-7 flex flex-col">
              AI의 무단 학습을 방지하기 위해 특정 패턴의 보이지 않는 디지털 워터마크를 삽입하는 기능을 제공합니다.
              <Link to="/watermark-insert" className="pt-10 text-blue-500">
              바로가기
            </Link>
            </div>
          </div>
          {/* 워터마크 탐지 */}
          <div className="w-[360px] h-[400px] bg-white-200 p-8 flex flex-col justify-center items-center text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
            <h5 className="justify-start text-[28px] py-2 mb-4">워터마크 탐지</h5>
            <div className="h-[200px] py-7 flex flex-col">
              사용자가 업로드한 이미지를 AI 모델로 분석해 워터마크의 존재 여부와 일치율을 계산해 보고서 형태로 제공합니다.
              <Link to="/watermark-detection" className="pt-10 text-blue-500">
              바로가기
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features;