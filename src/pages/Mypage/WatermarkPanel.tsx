import RecordPage from "./RecordPage";

const watermarkRecords = [
  { id: 1, name: '워터마크 삽입 01', date: '2025. 1. 5. 금요일', img: '/img/water1.jpg' },
];

function WatermarkPanel() {
    return (
    <RecordPage
      title="디지털 워터마킹 기록"
      records={watermarkRecords}
      onAddClick={() => console.log('워터마크 ADD')}
    />
  );
}
export default WatermarkPanel;