import RecordPage from "./RecordPage";

const deepfakeRecords = [
  { id: 1, name: '딥페이크 적용 01', date: '2025. 2. 10. 월요일', img: '/img/deep1.jpg' },
];

function DeepfakePanel() {
  return(
    <div>
      <RecordPage
        title="딥페이크 기록"
        records={deepfakeRecords}
        onAddClick={() => console.log('딥페이크 ADD')}
    />
    </div>    
    )
}
export default DeepfakePanel;