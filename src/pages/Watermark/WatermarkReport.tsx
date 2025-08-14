import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell } from 'recharts';
import WatermarkFailReport from "./WatermarkFailReport";
import ReportNotice from "../../components/Report/ReportNotice";

function WatermarkReport() {

  const location = useLocation();
  const data = location.state?.data;
  console.log(data);
  // const acc = Number(data.bitAccuracy);
  const acc = parseFloat(data.bitAccuracy);

  const chart = [
    { name: '정상', value: (acc) }, 
    // { name: '정상', value: (data.bitAccuracy) }, 
  ];

  // if (data.bitAccuracy < 100) {
  //   chart.push({ name: '훼손', value: 100 - data.bitAccuracy });
  // }
  if (acc < 100) {
    chart.push({ name: '훼손', value: 100 - acc });
  }

  const COLORS = ['#000000', '#FFFFFF'];

  return(
    <div className="flex flex-col min-h-screen px-20 py-10 mx-20">

      <div className="bg-gray-50 rounded-[44px] h-[730px]">

        {/* 헤더 */}
        <div className="border-b border-black-100 text-[20px] font-bold p-4 flex flex-col gap-3">
          <h1>분석된 파일: <span className="font-medium">"{data.artifactId}"</span> </h1>
          <h1>분석 날짜: <span className="font-medium">{data.detectedAt}</span></h1>
        </div>

        {/* 그래프, 결과 */}
        <div className="bg-white-200 text-black p-6 rounded-xl mb-6 flex gap-6 flex justify-evenly">
          {/* 그래프 */}
          <div className="relative w-[500px] h-[500px] mr-20 flex items-center justify-center">
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
              </Pie>
            </PieChart>

            {/* 차트 중앙 */}
            <div className="absolute text-center">
              <p className="text-[50px] font-bold">{acc}%</p>
              {/* <p className="text-[50px] font-bold">{data.bitAccuracy}%</p> */}
            </div>
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
            <p className="font-bold">🔢 일치율</p>
            <p>{acc}%</p>
            <div className="my-2"></div>
            <p className="font-bold">⚠️ 훼손 여부</p>
            {acc >= 90 ? (
              <p>변조되지 않음</p>
            ) : (
              <p className="text-red-100">훼손된 부분이 감지되었습니다!</p>
            )}
          </div>
        </div>
      </div>

      {acc < 90 && (
        <>
          <WatermarkFailReport 
            uploaded={data.uploadedImageBase64}
            // masked={data.mask_gt}
          />
          <ReportNotice />
        </>
      )}
    </div>
  );
}

export default WatermarkReport;