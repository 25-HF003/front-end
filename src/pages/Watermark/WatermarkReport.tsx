import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Label } from 'recharts';
import WatermarkFailReport from "./WatermarkFailReport";
import ReportNotice from "../../components/Report/ReportNotice";
import HammingDistanceBar from "./HammingDistanceBar";

function WatermarkReport() {

  const location = useLocation();
  const data = location.state?.data;
  const acc = parseFloat(data.bitAccuracy);
  const pHash = data.phashDistance;
  console.log(data);

  const chart = [
    { name: '정상', value: (acc) }, 
  ];

  if (acc < 100) {
    chart.push({ name: '훼손', value: 100 - acc });
  }

  const COLORS = ['#000000', '#FFFFFF'];

  return(
    <div className="flex flex-col min-h-screen gap-10 px-20 py-10 mx-20">

      <div className="bg-gray-50 rounded-[44px] h-[730px]">

        {/* 헤더 */}
        <div className="border-b border-black-100 text-[20px] font-bold p-4 flex flex-col gap-3">
          <h1>분석된 파일: <span className="font-medium">"{data.basename}"</span> </h1>
          <h1>분석 날짜: <span className="font-medium">{data.detectedAt}</span></h1>
        </div>

        {/* 그래프, 결과 */}
        <div className="bg-white-200 text-black p-6 rounded-xl mb-6 flex gap-6 flex justify-evenly">
          {/* 그래프 */}
          <div className="w-[500px] h-[500px] mr-20 flex items-center justify-center">
            <PieChart width={500} height={500}>
              <Pie
                data={chart}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={160}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
              {chart.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              {/* 차트 중앙 퍼센트 값 */}
              <Label 
                value={`${acc}%`}
                position="center"
                fontSize={50}
                fontWeight="bold"
                fill="#00060D" />
              </Pie>
            </PieChart>
          </div>

          {/* 1번째 결과 */}
          <div className="flex flex-col justify-center text-[30px]">
            <p className="font-bold">🔍 탐지 결과</p>
            {acc >= 90 ? (
              <p>✔️ 워터마크 확인됨</p>
            ) : (
              <p>❌ 워터마크 훼손됨</p>
            )}
            <div className="my-2"></div>
            <p className="font-bold">🔢 워터마크 일치율</p>
            <p>{acc}%</p>
            <div className="my-2"></div>
            <p className="font-bold">⚠️ 워터마크 훼손 여부</p>
            {acc >= 90 ? (
              <p>훼손되지 않음</p>
            ) : (
              <p className="text-red-100">훼손된 부분이 감지되었습니다!</p>
            )}
          </div>
        </div>
      </div>

      {acc >= 90 && (
        <>
        {/* 해밍거리 */}
        <div className="p-7 bg-gray-50 rounded-[44px]">
          <h1 className="flex mb-7 justify-center text-[30px] font-bold">📊 pHash 분석 결과</h1>
          <HammingDistanceBar pHash={pHash} />
        </div>
        </>
      )}

      {acc < 90 && (
        <>
          <WatermarkFailReport 
            uploaded={data.uploadedImageBase64}
          />
          <ReportNotice />
        </>
      )}
    </div>
  );
}

export default WatermarkReport;