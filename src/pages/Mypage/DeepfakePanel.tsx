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

  useEffect(() => {
    axios
      .get("http://localhost:8080/deepfake")
      .then((res) => {
        setRecords(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("기록을 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  // ✅ 로딩/에러 처리
  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // ✅ RecordPage에 맞게 데이터 변환
  const formattedRecords = records.map((record) => ({
    id: record.id,
    name: `딥페이크 분석 결과 ${record.id}`,
    date: new Date(record.createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
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