import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeepfakeReport from "../../components/Report/DeepfakeReport";
import { useEffect } from "react";



function DetectionReport() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results; 
  console.log(results);

  useEffect(() => {
    if (!results) {
      alert("서버 오류로 인해 업로드에 실패했습니다.\n");
      navigate("/pages/NotFound");
    }
  }, [results, navigate]);

  if (!results) return null;
  console.log("result: " ,results);
  
  return <DeepfakeReport result={results} showDownloadButton={false}/>;
}
export default DetectionReport;
