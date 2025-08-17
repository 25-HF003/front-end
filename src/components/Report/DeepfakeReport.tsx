import { PieChart, Pie, Cell, Label } from "recharts";
import ReportNotice from "./ReportNotice";

const COLORS = ["#3D3D42", "#FFFFFF"]; // gray, white

interface Props {
  result: {
    averageConfidence: number;
    maxConfidence: number;
    filePath: string;
    result: string;
    createdAt?: string; // 1. result 안에 있는 createdAt
  };
  createdAt?: string; // 2. 바깥에서 별도로 받는 createdAt
}

function DeepfakeReport({ result, createdAt }: Props) {
  const averageFake = result?.averageConfidence ?? 0;
  const fake = +averageFake.toFixed(0);
  const real = 100 - fake;
  const maxConfidence = result?.maxConfidence ?? 0;
  const suspectImage = result?.filePath ?? null;

  const data = [
    { name: "Fake", value: fake },
    { name: "Real", value: real },
  ];

  let message = "";
  if (fake <= 20) message = "딥페이크 가능성이 매우 낮음";
  else if (fake <= 50) message = "딥페이크 가능성이 낮음";
  else if (fake <= 80) message = "딥페이크 가능성이 높음";
  else message = "딥페이크 가능성이 매우 높음";

  return (
    <div className="min-h-screen px-20 py-10 mx-20">
      {/* 헤더 */}
      <div className="bg-white-200 p-6 rounded-xl mb-6">
        <h2 className="text-3xl font-semibold mb-3">딥페이크 탐지</h2>
        <p className="text-sm">
          분석 날짜: {createdAt ? new Date(createdAt).toLocaleString("ko-KR") : new Date().toLocaleString("ko-KR")} | 영상 분석
        </p>
      </div>

      {/* 그래프+결과 */}
      <div className="bg-white-200 text-black-100 p-6 rounded-xl mb-6 flex gap-6  justify-center items-center">
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
          <h3 className="text-xl font-bold">➡️ {result.result}</h3>
          <p className="text-base">
            {message} <strong>({fake}%)</strong>
          </p>
          {/*<p className="text-sm">🔍 의심 영역</p>
          <p className="text-sm">얼굴 윤곽, 피부 질감, 눈 깜빡임 패턴</p>*/}
        </div>
      </div>

      {/* 탐지된 영역 */}
      <div className="bg-gray-100 text-black p-6 rounded-xl mb-6">
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
          위 영역의 딥페이크 확률 : {maxConfidence.toFixed(0)}%
        </span>
      </div>

      {/* 주의 사항 */}
      {fake > 50 && (
        <ReportNotice />
      )}
    </div>
  );
}
export default DeepfakeReport;
