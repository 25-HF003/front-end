import RecordPage from "../../components/Mypage/RecordPage";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


type DeepfakeRecord = {
  id: number;
  filePath: string;
  createdAt: string;
};


function DeepfakePanel() {
  const [records, setRecords] = useState<DeepfakeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 여기에 userId 정의 (실제로는 로그인된 유저에서 가져와야 함)
  const userId = 1; // 예시로 userId 1번 하드코딩

  useEffect(() => {
    axios
      .get(`http://localhost:8080/deepfake?userId=${userId}`)
      .then((res) => {
        setRecords(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("기록을 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  //  로딩/에러 처리
  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  //  RecordPage에 맞게 데이터 변환
  const formattedRecords = records
  .slice()// 원본 배열 수정 방지
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 최신순: 최신 → 오래된 순
  .map((record) => ({
    id: record.id,
    name: `딥페이크 분석 결과 ${record.id}`,
    date: new Date(record.createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    img: record.filePath,
  }));


  return(
    <div>
      <RecordPage
        title="딥페이크 기록"
        records={formattedRecords}
        onAddClick={() => navigate("/detection")}
        showDownloadButton={false}
      />
    </div>    
  )
}
export default DeepfakePanel;