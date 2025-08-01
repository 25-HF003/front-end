import { Link } from "react-router-dom";

function Features() {
  return(
    <div className="flex flex-col items-center justify-center text-[28px] text-black-200">
      <div className="w-full max-w-7xl bg-gray-50 p-10 md:p-10 mx-auto my-10 flex flex-col items-center justify-center rounded-[10px]">
        {/* 서비스 설명 */}
        <div className="w-full">

          {/* 타이틀 */}
          <div className="flex items-center">
            <h1 className="text-[64px] font-poppins font-bold">DeepTruth -</h1>
            <span className="text-[40px] font-poppins font-bold mx-3">Detect Deepfakes, Defend the Truth</span>
          </div>

          {/* 내용 */}
          <div className="border-2 border-black-200 p-3 my-5 space-y-2 leading-relaxed">
            <p>딥페이크 기술의 발전은 혁신적인 가능성을 열었지만, 동시에 거짓된 영상과 이미지가 사회적 혼란을 초래하는 심각한 문제로 떠오르고 있습니다.</p>
            <p>DeepTruth는 이러한 위협에 맞서, 진실을 지키고(Defend the Truth), 조작된 미디어를 탐지하는(Detect Deepfakes) AI 기반 솔루션을 제공합니다.</p>
            <p>저희 DeepTruth는 AI 기반 딥페이크 탐지 시스템을 개발하여, 영상 속 조작 여부를 판별하는 솔루션을 제공합니다.</p>
            <p>또한, 단순히 탐지하는 것에 그치지 않고, 불법적인 딥페이크 생성을 어렵게 만드는 기술도 함께 제공합니다.</p>
            <p>우리는 단순한 기술을 넘어, 신뢰할 수 있는 디지털 환경을 구축하는 것을 목표로 하고 있습니다. DeepTruth가 여러분과 함께 진실을 지켜나가겠습니다.</p>
          </div>

          {/* 가로선 */}
          <hr className="border-[3px] border-black-200 my-10" />
        </div>

        {/* 딥페이크 탐지 설명 */}
        <div className="w-full">
          {/* 타이틀 */}
          <h1 className="text-[64px] font-poppins font-bold">딥페이크 탐지</h1>

          {/* 내용 */}
          <div className="border-2 border-black-200 p-3 my-5 space-y-2 leading-relaxed">
            <p>AI 기반 딥페이크 탐지 기술을 활용해 이미지와 영상의 조작 여부를 빠르고 정확하게 분석합니다.</p>
            <p>어떻게 사용하나요?</p>
            <p>DeepTruth는 간단한 3단계 과정으로 딥페이크 여부를 판별합니다.</p>
            <p>1. 이미지, 영상 또는 YouTube URL 업로드</p>
            <p>2. AI 모델을 활용한 정밀 분석</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>업로드된 파일을 서버에서 처리한 후, 딥페이크 탐지 모델을 사용해 분석합니다.</li>
              <li>얼굴의 미세한 픽셀 왜곡, 블러링, 깜빡임 패턴 등을 정밀하게 검사합니다.</li>
            </ul>
            <p>3. 탐지 보고서 제공</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>분석 결과를 보고서 형태로 제공, 딥페이크 여부와 신뢰도를 한눈에 확인할 수 있습니다.</li>
            </ul>
            <p>어떤 기술이 사용되었나요?</p>
            <p>DeepTruth는 최첨단 AI 기술을 활용하여 높은 정확도의 딥페이크 탐지를 제공합니다.</p>
            <p>
              AI 프레임워크: TensorFlow, PyTorch<br/>
              딥러닝 모델: CNN 기반 탐지 모델(XceptionNet)<br/>
              학습 데이터: FaceForensics++, Celeb-DF 등의 대규모 데이터셋
            </p>
            <p>지금 바로 사용해 보고, 진실을 확인하세요!</p>
          </div>

          {/* 화살표 */}
          <div className="flex items-center justify-between my-10">
            <img src="/feature-arrow.svg" alt="화살표" />
            <Link to="/detection" className="text-[30px]">
              Now
            </Link>
          </div>
        </div>

        {/* 적대적 노이즈 설명 */}
        <div>
          {/* 타이틀 */}
          <h1 className="text-[64px] font-poppins font-bold">적대적 노이즈 삽입</h1>

          {/* 내용 */}
          <div className="border-2 border-black-200 p-3 my-5 space-y-2 leading-relaxed">
            <p>AI에게만 보이는 적대적 노이즈를 삽입하여 무단 학습을 방지하고 딥페이크 생성을 차단하는 기능을 제공합니다.</p>
            <p>어떻게 사용하나요?</p>
            <p>DeepTruth는 다음의 간단한 3단계 과정을 통해 이미지를 보호합니다.</p>
            <p>1. 이미지 업로드</p>
            <p>2. AI 기반 적대적 노이즈 생성</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>적대적 공격 기법(FGSM)을 활용해 AI가 학습하거나 변조하기 어렵도록 하는 보안 노이즈를 삽입합니다.</li>
            </ul>
            <p>3. 보호된 이미지 제공</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>노이즈가 적용된 이미지를 다운로드할 수 있습니다.</li>
              <li>업로드한 모든 보호 이미지는 마이페이지에서 다시 확인할 수 있습니다.</li>
            </ul>
            <p>어떤 기술이 사용되었나요?</p>
            <ul className="list-disc ml-10 space-y-1">
              <li>AI 프레임워크: PyTorch</li>
              <li>적대적 노이즈 기법: FGSM(Fast Gradient Sign Method), Gaussian Blur</li>
            </ul>
          </div>

          {/* 화살표 */}
          <div className="flex items-center justify-between my-10">
            <img src="/feature-arrow.svg" alt="화살표" />
            <Link to="/adversarial-noise" className="text-[30px]">
              Now
            </Link>
          </div>
        </div>

        {/* 디지털 워터마크 설명 */}
        <div>
          {/* 타이틀 */}
          <h1 className="text-[64px] font-poppins font-bold">디지털 워터마크 삽입</h1>

          {/* 내용 */}
          <div className="border-2 border-black-200 p-3 my-5 space-y-2 leading-relaxed">
            <p>DeepTruth는 AI의 무단 학습을 방지하고, 콘텐츠의 원본성을 보호하기 위해 특정 패턴의 보이지 않는 디지털 워터마크를 삽입하는 기능을 제공합니다.</p>
            <p>사용자는 개인 서명을 생성하여 등록할 수 있으며, 이후 업로드한 이미지와 영상에 해당 서명이 삽입됩니다. 또한, 추후 변조 여부를 탐지하여 원본성을 검증할 수 있습니다.</p>
            <p>어떻게 사용하나요?</p>
            <p>DeepTruth는 다음의 두 가지 기능을 제공합니다.</p>
            <p>1. 디지털 워터마크 적용</p>
            <p>사용자가 등록한 개인 서명을 기반으로 보이지 않는 디지털 워터마크를 삽입합니다.</p>
            <div className="ml-3">
              <p>1. 이미지 및 영상 업로드</p>
              <p>2. 사용자 서명 확인</p>
              <p>3. 디지털 워터마크 삽입</p>
              <p>4. 워터마킹된 파일 제공</p>
            </div>
            <ul className="list-disc ml-12 space-y-1">
              <li>워터마크가 적용된 이미지를 다운로드할 수 있습니다.</li>
              <li>마이페이지에서 언제든지 확인 가능합니다.</li>
            </ul>
            <p>2. 디지털 워터마크 탐지</p>
            <p>DeepTruth에서 삽입한 워터마킹이 변조되었는지 확인할 수 있습니다.</p>
            <div className="ml-3">
              <p>1. 이미지 및 영상 업로드</p>
              <p>2. 서명 탐지 진행</p>
            </div>
            <ul className="list-disc ml-12 space-y-1">
              <li>AI가 사용자의 등록된 서명을 기반으로 워터마크를 탐지합니다.</li>
            </ul>
            <p className="ml-3">3. 탐지 결과 보고서 제공</p>
            <ul className="list-disc ml-12 space-y-1">
              <li>탐지 결과를 보고서 형태로 확인할 수 있습니다.</li>
            </ul>
            <p>결과 보고서 제공</p>
            <ul className="list-disc ml-12 space-y-1">
              <li>워터마크 탐지 여부 (Y/N)</li>
              <li>원본 워터마크와의 일치율 (%)</li>
              <li>변조가 감지된 경우, 신고 페이지로 이동할 수 있는 링크 제공</li>
            </ul>
            <p>어떤 기술이 사용되었나요?</p>
            <ul className="list-disc ml-12 space-y-1">
              <li>AI 프레임워크: PyTorch, TensorFlow</li>
              <li>디지털 워터마킹 기법: Watermark Anything</li>
            </ul>
            <p>DeepTruth는 사용자의 디지털 자산을 보호하고, AI가 무단으로 콘텐츠를 학습하는 것을 막기 위한 강력한 보안 솔루션을 제공합니다.</p>
            <p>이제, 당신의 콘텐츠에 보이지 않는 서명을 남기고, 원본성을 지키세요.</p>
          </div>

          {/* 화살표 */}
          <div className="flex items-center justify-between my-10">
            <img src="/feature-arrow.svg" alt="화살표" />
            <Link to="/watermark-insert" className="text-[30px]">
              Now
            </Link>
          </div>
          
        </div>
      </div>
    </div>)
}

export default Features;