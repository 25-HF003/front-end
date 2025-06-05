import { PieChart, Pie, Cell } from 'recharts';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const COLORS = ['#3D3D42', '#FFFFFF']; // gray, white



export default function DetectionReport() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results;
  console.log(results)

  if (!results) {
    alert("서버 오류로 인해 업로드에 실패했습니다.\n");
    navigate("/pages/NotFound");
    return null;
  }

  const fake = +(results.average_fake_confidence).toFixed(0)
  const real = (100-fake)
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
          <img
            src={`data:image/jpeg;base64,${results.most_suspect_image}`}
            alt="탐지 영역1"
            className="w-[45%] object-cover rounded-md"
          />
          
          {/*<img
            src="/detected_face_2.png"
            alt="탐지 영역2"
            className="w-[45%] object-cover rounded-md"
          />
          <span className="text-xs">03:40 ~ 03:55</span>*/}
        </div>
        <span className="text-xs flex items-center justify-center mt-5">위 영역의 딥페이크 확률 : {(results.max_confidence).toFixed(0)}%</span>
      </div>

      {/* 주의 사항 */}
      <div className="bg-gray-100 text-black p-6 rounded-xl">
        <h3 className="text-lg font-bold text-red-600 mb-4">⚠️ 주의 사항</h3>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>
            해당 영상/이미지는 AI 분석 결과 <strong className="text-red-600">딥페이크</strong>일 가능성이 높습니다.
            이는 원본 영상이 조작되었을 가능성을 의미하며, 신뢰할 수 있는 추가 검증이 필요합니다.
          </li>
          <li>
            잘못된 정보 유포 주의: 딥페이크 기술은 현실과 매우 유사한 가짜 영상을 만들어낼 수 있습니다.
            확인되지 않은 정보를 공유할 경우 허위 사실 유포로 인한 법적 책임이 발생할 수 있습니다.
          </li>
          <li>
            금융 및 사기 관련 위험: 딥페이크는 보이스 피싱, 사기 광고, 신원 도용 등의 악용될 가능성이 있습니다.
          </li>
          <li>
            개인정보 보호: 딥페이크 영상이 개인의 동의 없이 제작되었을 가능성이 있습니다. 본인의 초상권이나 개인정보가 침해되었다면 즉시 신고를 고려하세요.
          </li>
          <li>
            법적 대응 가능성: 일부 국가에서는 딥페이크 제작 및 유포가 불법으로 간주될 수 있습니다.
          </li>
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-4 text-center text-white text-sm">
          <button className="bg-green-200 py-2 rounded-xl">사이버범죄 신고 및 상담<br />전화 1377</button>
          <button className="bg-green-200 py-2 rounded-xl">사이버범죄 신고 및 상담<br />카카오톡 채널</button>
        </div>
      </div>
    </div>
  );
}
