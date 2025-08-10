import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import DeepfakeReport from "../../components/DeepfakeReport";
import { api } from "../../api";


function DeepfakePanelReport() {
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  
  useEffect(() => {
    if (!id || !userId) return;

    //딥페이크 개별 조회
    api.deepfake
      .getById(Number(id), userId)
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("조회 실패", err);
        alert("개별 딥페이크 정보를 불러오는 데 실패했습니다.");
        navigate("/pages/NotFound");
      });
  }, [id, userId, navigate]);

  if (loading) return <p className="text-white-100 text-center mt-10">불러오는 중...</p>;
  if (!results) return null;

  return (
    <DeepfakeReport result={results} createdAt={results.createdAt} />
  )
}
export default DeepfakePanelReport;
