import RecordPage from "../../../components/Mypage/RecordPage";
import { useNavigate } from "react-router-dom";

const noiseRecords = [
    { id: 4, name: '적대적 노이즈 04', date: '2025. 3. 21. 금요일', img: '/img/user4.jpg' },
    { id: 3, name: '적대적 노이즈 03', date: '2025. 3. 21. 금요일', img: '/img/user3.jpg' },
    { id: 2, name: '적대적 노이즈 02', date: '2025. 3. 21. 금요일', img: '/img/user2.jpg' },
    { id: 1, name: '적대적 노이즈 01', date: '2025. 3. 21. 금요일', img: '/img/user1.jpg' },
];

function NoisePanel() {
  const navigate = useNavigate();
    return(
    <RecordPage
        title="적대적 노이즈 기록"
        records={noiseRecords}
        onAddClick={() => navigate("/adversarial-noise")}
        showDownloadButton={true}
    />
    )
}
export default NoisePanel;