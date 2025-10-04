import { PieChart, Pie, Cell, Label } from "recharts";
import ReportNotice from "./ReportNotice";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DfFrameHeatmap from "./DfFrameHeatmap";
import BulletsPanel, { PayloadWire } from "./BulletPanel";
import { BulletItemWire } from "./BandBullet";
import TooltipInfo from "../Modal/TooltipInfo";

const COLORS = ["#3D3D42", "#FFFFFF"];  // gray, white

interface Props {
  result: {
    averageConfidence: number;
    maxConfidence: number;
    filePath: string;
    result: string;
    createdAt?: string; // 1. result 안에 있는 createdAt
    mode?: 'PRECISION' | 'DEFAULT' | string;
    useTta?: boolean;
    useIllum?: boolean;
    detector?: 'AUTO' | 'DLIB' | 'DNN' | string;
    minFace?: number;
    sampleCount?: number
    temporalDeltaMean: number;
    temporalDeltaStd: number;
    ttaMean: number;
    ttaStd: number;
    timeseriesJson: string;
    stabilityBullets: BulletItemWire[];
    speedBullets: BulletItemWire[];
    fpsProcessed: number;
    msPerSample: number;
    stabilityScore: number;
  };
  createdAt?: string; // 2. 바깥에서 별도로 받는 createdAt
  showXButton?: boolean;
}

type Timeseries = {
  per_frame_conf: number[];
  vmin: number;
  vmax: number;
};

function shrinkValue(x: number): number {
  const alpha =1.6;  // 지수 조절 (값이 클수록 더 많이 눌림)
  return Math.pow(x, alpha);
}


function bandchartres(name: number, minnum: number, maxnum: number): string {
  let text;
  {(name <= minnum) ? text = "🟢우수" 
  : (name <= maxnum) ? text = "🟡보통" 
  : text = "🔴위험"}
  return text;
}

function DeepfakeReport({ result, createdAt, showXButton = true }: Props) {
  let averageFake = result?.averageConfidence ?? 0;
  let maxConfidence= result?.maxConfidence ?? 0;
  const suspectImage = result?.filePath ?? null;
  const mode = result?.mode ?? 'DEFAULT';
  const useTta = result?.useTta ?? false;
  const useIllum = result?.useIllum ?? false;
  const detector = result?.detector ?? 'AUTO';
  const minFace = result?.minFace ?? 0;
  const sampleCount = result?.sampleCount ?? 0;
  const bulletData: PayloadWire ={
    stabilityBullets: result.stabilityBullets, 
    speedBullets: result.speedBullets,
  }

  if (result.result === "REAL") {
    averageFake=shrinkValue(averageFake)
    maxConfidence=shrinkValue(maxConfidence)
  }
  const fake = +(averageFake*100).toFixed(0);
  const real = 100 - fake;

  const navigate = useNavigate();

  const data = [
    { name: "Fake", value: fake },
    { name: "Real", value: real },
  ];

  let message = "";
  if (fake <= 30) message = "딥페이크 가능성이 매우 낮음";
  else if (fake <= 60) message = "딥페이크 가능성이 낮음";
  else if (fake <= 80) message = "딥페이크 가능성이 높음";
  else message = "딥페이크 가능성이 매우 높음";

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  const raw = result.timeseriesJson;
  const parsed: Timeseries = JSON.parse(raw);
  const heatmapnum = parsed.per_frame_conf
  console.log(heatmapnum);


  return (
    <div className="relative min-h-screen px-20 py-10">
      {showXButton && (
        <button 
          onClick={handleClose}
          className="absolute top-10 left-3 text-white-100 hover:text-gray-50">
            <IoArrowBack size={60} />
        </button>
      )}
      {/* 헤더 */}
      <div className="bg-gray-100 p-6 rounded-xl mb-6 mx-20">
        <h2 className="text-3xl font-semibold mb-3">딥페이크 탐지</h2>
        <p className="text-sm">
          분석 날짜: {createdAt ? new Date(createdAt).toLocaleString("ko-KR") : new Date().toLocaleString("ko-KR")} | 영상 분석
        </p>
        <div className="w-full my-[1%] border-t border-black-100"></div>
        <p className="text-base mb-1">
          {(mode === 'DEFAULT') ? "기본모드" : "정밀모드"}
        </p>
        <div className="flex w-full">
          <label className="inline-flex items-center gap-1 cursor-pointer">
            <span className="text-base">TTA</span>
            {useTta === true ? (
              <span className="text-[10px] mr-4 px-1.5 py-0.5 rounded bg-emerald-100 text-green-200">ON</span>
            ) : (
              <span className="text-[10px] mr-4 px-1.5 py-0.5 rounded bg-gray-900 text-gray-50">OFF</span>
            )}
          </label>

          <label className="inline-flex items-center gap-1 cursor-pointer">
            <span className="text-base">조명보정</span>
            {useIllum === true ? (
              <span className="text-[10px] mr-4 px-1.5 py-0.5 rounded bg-emerald-100 text-green-200">ON</span>
            ) : (
              <span className="text-[10px] mr-4 px-1.5 py-0.5 rounded bg-gray-900 text-gray-50">OFF</span>
            )}
          </label>

          <label className="inline-flex items-center gap-1 cursor-pointer">
            <span className="text-base">검출할 최소 얼굴 크기</span>
              <span className="text-[11px] mr-4 px-1.5 py-0.5 rounded bg-white-100 text-green-200">{minFace}</span>
          </label>

          <label className="inline-flex items-center gap-1 cursor-pointer">
            <span className="text-base">샘플 이미지 수</span>
              <span className="text-[11px] mr-4 px-1.5 py-0.5 rounded bg-white-100 text-green-200">{sampleCount}</span>
          </label>

          <label className="inline-flex items-center gap-1 cursor-pointer">
            <span className="text-base">TTA 프리셋</span>
              <span className="text-[10px] mr-4 px-1.5 py-0.5 rounded bg-white-100 text-green-200">{detector}</span>
          </label>
        </div>
      </div>

      {/* 그래프+결과 */}
      <div className="flex flex-row">
        <div className="bg-gray-100 text-black-100 w-[46%] p-6 rounded-xl mb-6 ml-20 mr-3">
          <h3 className="text-2xl font-bold mb-10">📝 분석 결과</h3>
          <div className="flex gap-6 justify-center items-center">
            {/*분석결과 */}
            <div className="flex flex-col w-[65%] justify-center items-center gap-5 mt-12">
              <h1 className="text-7xl font-bold mb-10">{result.result=="REAL"? "✅":"🚨"}{result.result}</h1>
              <div className="w-[100%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2">
                <div className="flex items-center justify-center">
                  <p className="text-[25px] mb-5">{result.result=="REAL"? "이 영상은 딥페이크로 탐지되지 않았습니다.":"이 영상은 딥페이크로 판별되었습니다."}</p>
                </div>
                  <p className="text-[18px] mt-2 text-gray-600">
                    {result.result=="REAL"? 
                    <>현재 분석 기준으로는 영상에 뚜렷한 변조 흔적이 <br/>발견되지 않아 신뢰할 수 있는 콘텐츠로 판정됩니다.</>
                    :<>영상 내 변조 흔적이 뚜렷하게 확인되어 <br/> 신뢰할 수 없는 콘텐츠일 수 있습니다. <br/> 시청 시 각별한 주의가 필요합니다.</>
                  }
                  </p>
              </div>
              {/* 
              <div className="flex">
                <h3 className="text-xl font-bold mt-5">✅ 탐지 신뢰도 지표</h3>
                <div className="ml-2 mt-5">
                  <TooltipInfo message="탐지 결과가 영상 전반에서 얼마나 일관되고 안정적으로 유지되는지를 평가한 결과로 Δ Mean, Δ Std, TTA Std, TTA Mean 4가지 핵심 안정성 지표를 종합해 계산한 점수입니다. \n각 지표의 세부적인 값은 하단의 딥페이크 탐지 성능 분석 리포트에서 확인하실 수 있습니다."/>
                </div>
              </div>
            
              <p>{result.stabilityScore>70 ? "🟢 우수"
                  : result.stabilityScore>30 ? "🟡 양호"
                  : "🟠 보통"}</p>  */}
              {/*<p className="text-sm">🔍 의심 영역</p>
              <p className="text-sm">얼굴 윤곽, 피부 질감, 눈 깜빡임 패턴</p>*/}
            </div>
          </div>
        </div>
        {/*파이차트 */}
        <div className="bg-gray-100 text-black-100 w-[45%] p-6 rounded-xl mb-6 mr-20 ml-3">
          <h3 className="text-2xl font-bold mb-4">📊 영상의 평균 딥페이크 확률</h3>
          <div className="w-[100%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2 mb-5">
            <div className="flex items-center justify-center">
              <p className="text-[20x] mb-3">ℹ️표시된 확률은 영상 전체 프레임에서 산출된 평균값입니다.</p>
            </div>
            <p className="text-[14px] text-gray-600">
              <>화면에 제시된 수치는 영상 전체의 평균적인 확률로, 전반적인 경향을 참고하기 위한 지표일 뿐 모든 프레임을 단정하기는 어렵습니다. 따라서 숫자 자체보다는 분석 결과에 더 비중을 두어 해석하시길 권장합니다.</>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="relative w-[300px] h-[300px]">
              <PieChart width={300} height={300}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={130}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                {/* 차트 중앙 퍼센트 값 */}
                <Label
                  position="center"
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox){
                        const { cx, cy } = viewBox;
                        return (
                          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan fontSize="24" fontWeight="bold" fill="#00060D">
                              {fake}%
                            </tspan>
                            <tspan x={cx} dy="1.4em" fontSize="14" fill="#757575">
                              Fake 가능성
                            </tspan>
                          </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
            </div>
            <p className="text-xl mb-2">{message} <strong>({fake}%)</strong></p>
          </div>
        </div>
      </div>

      {/* 탐지된 영역 */}
      <div className="bg-gray-100 text-black p-6 rounded-xl mb-6 mx-20">
        <h3 className="text-2xl font-bold mb-4">✔️ 가장 높게 탐지된 영역</h3>
        <div className="flex items-center justify-center">
          {suspectImage ? (
            <img
              src={suspectImage}
              alt="탐지 영역"
              className="w-[45%] object-cover rounded-md"
            />
          ) : (
            <p className="text-sm text-gray-600">탐지된 이미지가 없습니다.</p>
          )}
          {/*<img
            src="/detected_face_2.png"
            alt="탐지 영역2"
            className="w-[45%] object-cover rounded-md"
          />
          <span className="text-xs">03:40 ~ 03:55</span>*/}
        </div>
        <span className="text-xl flex items-center justify-center mt-5">
          위 영역의 딥페이크 확률 : {(maxConfidence*100).toFixed(0)}%
        </span>
      </div>

      {/*히트맵 */}
      <div className="bg-gray-100 text-black-100 p-6 rounded-xl mb-6 mx-20">
        <h3 className="text-2xl font-bold mb-4">📊영상의 프레임별 딥페이크 확률</h3>
        <div className="flex items-center justify-center">
          <DfFrameHeatmap data={heatmapnum}/>
        </div>
        <h2 className="text-xl font-bold text-center mb-4 mt-5">📄히트맵 해석 가이드</h2>
        <div className="flex gap-4 mt-2 items-center justify-center">
          <div className="w-[80%] bg-white-100 rounded-[10px] font-bold p-5 text-center">
            <p>이 그래프는 영상의 각 프레임마다 딥페이크로 판단된 확률을 색으로 표현한 히트맵입니다.<br/> 
              빨간색에 가까울수록 딥페이크일 가능성이 높고, 초록색에 가까울수록 가능성이 낮습니다. 
              특정 구간이 빨간색인 부분은 해당 프레임에서 딥페이크 징후가 강하게 드러난 지점입니다.<br/> 
              프레임별 확률이 뚜렷하게 달라지고 색상분포가 다양할수록 영상 속 미세한 패턴 차이를 더 명확하게 감지한 것입니다.
            </p>
          </div>
        </div>
      </div>

      {/*밴드차트 */}
      <div className="bg-gray-100 text-black-100 p-6 rounded-xl mb-6 mx-20">
        <h3 className="text-2xl font-bold mb-10">📊딥페이크 탐지 성능 분석 리포트</h3>
        <div className="flex items-center justify-center">
          <BulletsPanel data={bulletData}/>
        </div>
        <h2 className="text-xl font-bold text-center mb-4 mt-5">📋상세 지표</h2>
        <div className="flex gap-4 mt-2 items-center justify-center">
          <div className="w-[15%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2">
            <div className="flex items-center justify-center">
              <p className="text-[18px]">Δ Mean</p>
              <div className="ml-1"><TooltipInfo message="프레임 간 예측 값의 평균 출렁임 정도를 나타냅니다. \n값이 낮을수록 영상 내 예측이 안정적입니다."/></div>
            </div>
              <p className="text-[15px] mt-2">
                {result.temporalDeltaMean}
              </p>
              <p className="text-[15px] mt-1">
                {bandchartres(result.temporalDeltaMean, 0.03, 0.06)}
              </p>
          </div>
         <div className="w-[15%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2">
            <div className="flex items-center justify-center">
              <p className="text-[18px]">Δ Std</p>
              <div className="ml-1"><TooltipInfo message="출렁임의 변동성(일관성)을 의미합니다.\n 값이 낮을수록 모델의 판단이 균일합니다."/></div>
            </div>
              <p className="text-[15px] mt-2">
                {result.temporalDeltaStd}
              </p>
              <p className="text-[15px] mt-1">
                {bandchartres(result.temporalDeltaStd, 0.02, 0.05)}
              </p>
          </div>
          <div className="w-[15%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2">
            <div className="flex items-center justify-center">
              <p className="text-[18px]">TTA Std</p>
              <div className="ml-1"><TooltipInfo message="TTA(Test-Time Augmentation)를 여러 번 적용했을 때 결과의 표준편차입니다. 값이 낮으면 모델이 데이터 변형에도 안정적으로 작동함을 의미합니다."/></div>
            </div>
              <p className="text-[15px] mt-2">
                {result.ttaStd}
              </p>
              <p className="text-[15px] mt-1">
                {bandchartres(result.ttaStd, 0.03, 0.05)}
              </p>
          </div>
          <div className="w-[15%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2">
            <div className="flex items-center justify-center">
              <p className="text-[18px]">Throughput</p>
              <div className="ml-1"><TooltipInfo message="초당 처리 가능한 프레임 수입니다. \n값이 높을수록 빠른 탐지가 가능합니다."/></div>
            </div>
              <p className="text-[15px] mt-2">
                {result.fpsProcessed}
              </p>
              <p className="text-[15px] mt-1">
                {(result.fpsProcessed >= 0.27) ? "🟢우수" 
                : (result.fpsProcessed >= 0.135) ? "🟡보통"
                : "🔴위험"}
              </p>
          </div>
          <div className="w-[15%] bg-white-100 rounded-[10px] font-bold p-5 text-center border-gray-100 border-2">
            <div className="flex items-center justify-center">
              <p className="text-[18px]">Latency</p>
              <div className="ml-1"><TooltipInfo message="프레임 하나를 처리하는 데 \n걸리는 시간(ms)입니다. \n낮을수록 빠른 응답성을 의미합니다."/></div>
            </div>
              <p className="text-[15px] mt-2">
                {result.msPerSample}
              </p>
              <p className="text-[15px] mt-1">
                {bandchartres(result.fpsProcessed, 4000, 8000)}
              </p>
          </div>
        </div>
      </div>

      {/* 주의 사항 */}
      {result.result == "FAKE" && (
        <div className="mx-20">
          <ReportNotice />
        </div>
      )}
    </div>
  );
}
export default DeepfakeReport;
