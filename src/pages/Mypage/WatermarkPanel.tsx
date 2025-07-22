import RecordPage from "./RecordPage";
import { useNavigate } from "react-router-dom";

const watermarkRecords = [
  { id: 1, name: '워터마크 삽입 01', date: '2025. 1. 5. 금요일', img: '/img/water1.jpg' },
];

function WatermarkPanel() {
  const navigate = useNavigate();
    return (
    <RecordPage
      title="디지털 워터마킹 기록"
      records={watermarkRecords}
      onAddClick={() => navigate("/watermark-detection")}
      showDownloadButton={true}
    />
  );
}
export default WatermarkPanel;