import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeepfakeReport from "../../components/DeepfakeReport";



function DetectionReport() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results?.data; //데이터구조 result > data
  console.log(results);

  if (!results) {
    alert("서버 오류로 인해 업로드에 실패했습니다.\n");
    navigate("/pages/NotFound");
    return null;
  }

  return <DeepfakeReport result={results} />;
}
export default DetectionReport;
