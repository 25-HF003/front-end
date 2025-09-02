import { PieChart, Pie, Cell, Label } from "recharts";
import ReportNotice from "./ReportNotice";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const COLORS = ["#3D3D42", "#FFFFFF"]; // gray, white

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
    smoothWindow?: number;
    minFace?: number;
    sampleCount?: number
  };
  createdAt?: string; // 2. 바깥에서 별도로 받는 createdAt
  showXButton?: boolean;
}

function shrinkValue(x: number): number {
  const alpha = 2.8;  // 지수 조절 (값이 클수록 더 많이 눌림)
  return Math.pow(x, alpha)*100;
}

function DeepfakeReport({ result, createdAt, showXButton = true }: Props) {
  const averageFakeinit = result?.averageConfidence ?? 0;
  const maxConfidenceinit = result?.maxConfidence ?? 0;
  const suspectImage = result?.filePath ?? null;
  const mode = result?.mode ?? 'DEFAULT';
  const useTta = result?.useTta ?? false;
  const useIllum = result?.useIllum ?? false;
  const detector = result?.detector ?? 'AUTO';
  const smoothWindow = result?.smoothWindow ?? 0;
  const minFace = result?.minFace ?? 0;
  const sampleCount = result?.sampleCount ?? 0;

  const averageFake = shrinkValue(averageFakeinit);
  const maxConfidence = shrinkValue(maxConfidenceinit)-20;
  const fake = +(averageFake).toFixed(0);
  const real = 100 - fake;

  const navigate = useNavigate();

  const data = [
    { name: "Fake", value: fake },
    { name: "Real", value: real },
  ];

  let message = "";
  if (fake <= 20) message = "딥페이크 가능성이 매우 낮음";
  else if (fake <= 50) message = "딥페이크 가능성이 낮음";
  else if (fake <= 80) message = "딥페이크 가능성이 높음";
  else message = "딥페이크 가능성이 매우 높음";

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  }


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
      <div className="bg-white-200 p-6 rounded-xl mb-6 mx-20">
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
            <span className="text-base">시각적 스무딩 적용 프레임 수</span>
              <span className="text-[11px] mr-4 px-1.5 py-0.5 rounded bg-white-100 text-green-200">{smoothWindow}</span>
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
      <div className="bg-white-200 text-black-100 p-6 rounded-xl mb-6 mx-20 flex gap-6  justify-center items-center">
        {/*파이차트 */}
        <div className="relative w-[300px] h-[300px] mr-20 flex items-center justify-center">
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
              {data.map((entry, index) => (
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

          {/* 도넛차트 안 글자
          <div className="absolute text-center">
            <p className="text-2xl font-bold text-black-200">{fake}%</p>
            <p className="text-sm text-gray-600">Fake 가능성</p>
          </div> */}
        </div>

        {/*분석결과 */}
        <div className="flex flex-col gap-5 ml-20">
          <h3 className="text-2xl font-bold">📊 분석 결과</h3>
          <h3 className="text-xl font-bold">➡️ {fake>50 ? "FAKE" : "REAL"}</h3>
          <p className="text-base">
            {message} <strong>({fake}%)</strong>
          </p>
          {/*<p className="text-sm">🔍 의심 영역</p>
          <p className="text-sm">얼굴 윤곽, 피부 질감, 눈 깜빡임 패턴</p>*/}
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
        <span className="text-lg flex items-center justify-center mt-5">
          위 영역의 딥페이크 확률 : {(maxConfidence).toFixed(0)}%
        </span>
      </div>

      {/* 주의 사항 */}
      {fake > 50 && (
        <div className="mx-20">
          <ReportNotice />
        </div>
      )}
    </div>
  );
}
export default DeepfakeReport;
