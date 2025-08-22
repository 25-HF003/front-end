import { Link, useLocation } from "react-router-dom";
import NoiseReport from "../../components/Report/NoiseReport";

function NoiseResult() {

  const location = useLocation();
  const data = location.state?.data;
  console.log(data);


  return(
    <NoiseReport 
      data={data} 
      confirmMessage={<p><Link to="/mypage">마이페이지</Link>에서도 확인 가능합니다.</p>} 
      showXButton={false} 
    />
  );
}

export default NoiseResult;