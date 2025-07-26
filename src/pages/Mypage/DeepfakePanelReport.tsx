import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeepfakeReport from "../../components/DeepfakeReport";


function DeepfakePanelReport() {
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8080/deepfake/${id}`,{
        params: {
          userId: 1  // 하드코딩 예시 (실제 로그인 값으로 교체 가능)
        }
      })
      .then((res) => {
        setResults(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("조회 실패", err);
        alert("개별 딥페이크 정보를 불러오는 데 실패했습니다.");
        navigate("/pages/NotFound");
      });
  }, [id]);

  if (loading) return <p className="text-white-100 text-center mt-10">불러오는 중...</p>;
  if (!results) return null;

  return <DeepfakeReport result={results} createdAt={results.createdAt} />;
}
export default DeepfakePanelReport;
