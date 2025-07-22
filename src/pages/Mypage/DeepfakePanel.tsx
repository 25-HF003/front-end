import RecordPage from "./RecordPage";
import { useNavigate } from "react-router-dom";

const deepfakeRecords = [
  { id: 1, name: '딥페이크 적용 01', date: '2025. 2. 10. 월요일', img: '/img/deep1.jpg' },
];


function DeepfakePanel() {
  const navigate = useNavigate();
  return(
    <div>
      <RecordPage
        title="딥페이크 기록"
        records={deepfakeRecords}
        onAddClick={() => navigate("/detection")}
    />
    </div>    
    )
}
export default DeepfakePanel;