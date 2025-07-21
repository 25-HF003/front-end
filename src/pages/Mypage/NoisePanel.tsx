import RecordPage from "./RecordPage";
const noiseRecords = [
    { id: 4, name: '적대적 노이즈 04', date: '2025. 3. 21. 금요일', img: '/img/user4.jpg' },
    { id: 3, name: '적대적 노이즈 03', date: '2025. 3. 21. 금요일', img: '/img/user3.jpg' },
    { id: 2, name: '적대적 노이즈 02', date: '2025. 3. 21. 금요일', img: '/img/user2.jpg' },
    { id: 1, name: '적대적 노이즈 01', date: '2025. 3. 21. 금요일', img: '/img/user1.jpg' },
];

function NoisePanel() {
    return(
    <RecordPage
        title="적대적 노이즈 적용"
        records={noiseRecords}
        onAddClick={() => console.log('노이즈 ADD')}
    />
    )
}
export default NoisePanel;