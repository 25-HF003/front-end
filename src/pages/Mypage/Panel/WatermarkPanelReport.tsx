import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import WatermarkReport from "../../../components/Report/WatermarkSuccessReport";
import { api } from "../../../api";


function WatermarkPanelReport() {
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);
  
  useEffect(() => {
    if (!id || ! isLoggedIn) return;

    //워터마크 개별 조회
    api.watermark
      .getById(Number(id))
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("조회 실패", err);
        alert("개별 디지털 워터마크 정보를 불러오는 데 실패했습니다.");
        navigate("/pages/NotFound");
      });
  }, [id,  isLoggedIn, navigate]);

  if (loading) return <p className="text-white-100 text-center mt-10">불러오는 중...</p>;
  if (!results) return null;

  return (
    <WatermarkReport result={results} confirmMessage={null} />
  )
}
export default WatermarkPanelReport;
