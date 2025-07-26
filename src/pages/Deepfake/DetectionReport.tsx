import { PieChart, Pie, Cell } from 'recharts';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReportNotice from '../../components/ReportNotice';


const COLORS = ['#3D3D42', '#FFFFFF']; // gray, white



export default function DetectionReport() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results?.data;
  console.log(results)

  if (!results) {
    alert("서버 오류로 인해 업로드에 실패했습니다.\n");
    navigate("/pages/NotFound");
    return null;
  }

  const averageFake = results?.averageConfidence ?? 0;
  const fake = +averageFake.toFixed(0);
  const real = (100-fake)
  const maxConfidence = results?.maxConfidence ?? 0;
  const suspectImage = results?.filePath ?? null;

  const data = [{ name: 'Fake', value: fake }, { name: 'Real', value: real }];

  let message = '';
  if (fake <= 20) {
    message = '딥페이크 가능성이 매우 낮음';
  } else if (fake <= 50) {
    message = '딥페이크 가능성이 낮음';
  } else if (fake <= 80) {
    message = '딥페이크 가능성이 높음';
  } else {
    message = '딥페이크 가능성이 매우 높음';
  }
  

  return (
    <div className="min-h-screen text-white px-20 py-10 mx-20">
      {/* 헤더 */}
      <div className="bg-white-200 text-black p-6 rounded-xl mb-6">
        <h2 className="text-3xl font-semibold mb-3">딥페이크 탐지</h2>
        <p className="text-sm">분석 날짜: {new Date().toLocaleString()} | 영상 분석</p>
      </div>

      {/* 그래프+결과 */}
      <div className="bg-white-200 text-black p-6 rounded-xl mb-6 flex gap-6  justify-center items-center">
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
            </Pie>
          </PieChart>

          {/*도넛차트 안 글자 */}
          <div className="absolute text-center">
            <p className="text-2xl font-bold text-black-200">{fake}%</p>
            <p className="text-sm text-gray-600">Fake 가능성</p>
          </div>
        </div>

        {/*분석결과 */}
        <div className="flex flex-col gap-5 ml-20">
          <h3 className="text-2xl font-bold">📊 분석 결과</h3>
          <h3 className='text-xl font-bold'>➡️{results.result}</h3>
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
          위 영역의 딥페이크 확률 : {maxConfidence.toFixed(0)}%</span>
      </div>

      {/* 주의 사항 */}
      <ReportNotice />
    </div>
  );
}
