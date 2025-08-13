import RecordPage from "../../components/Mypage/RecordPage";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { api } from "../../api";


type DeepfakeRecord = {
  id: number;
  filePath: string;
  createdAt: string;
};


function DeepfakePanel() {
  const [records, setRecords] = useState<DeepfakeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  //const userId = useSelector((state: RootState) => state.auth.user?.userId); // 로그인된 유저 ID 사용
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      setError("로그인이 필요합니다.");
      return;
    }
    (async () => {
      try {
        // userId 없이 전체 조회
        const data = await api.deepfake.getAllByUser(0, 15, "createdAt,desc");
        const arr: DeepfakeRecord[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(data?.content)
          ? data.content
          : [];
        setRecords(arr);
      } catch {
        setError("기록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoggedIn]);

  // 오래된 순으로 정렬 → 번호 붙이기
  const recordsWithIndex = records
  .slice()
  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) // 오래된 → 최신
  .map((record, index) => ({
    ...record,
    displayIndex: index + 1, // 오래된 순서 기준 번호
  }));

  //  RecordPage에 맞게 데이터 변환, 다시 최신순으로 정렬해서 화면에 표시
  const formattedRecords = recordsWithIndex
  .slice()// 원본 배열 수정 방지
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 최신순: 최신 → 오래된 순
  .map((record) => ({
    id: record.id,
    name: `딥페이크 분석 결과 ${record.displayIndex}`,
    date: new Date(record.createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    img: record.filePath,
  }));

  //기록 삭제
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    api.deepfake
      .deleteById(deleteId)
      .then(() => {
        setRecords((prev) => prev.filter((r) => r.id !== deleteId));
      })
      .catch(() => {
        alert("삭제에 실패했습니다.");
      })
      .finally(() => {
        setShowModal(false);
        setDeleteId(null);
      });
    };



  return(
    <div>
      <RecordPage
        title="딥페이크 기록"
        records={formattedRecords}
        onAddClick={() => navigate("/detection")}
        onItemClick={(id) => navigate(`/mypage/detection/${id}`)}
        onDeleteClick={handleDelete}
        showDownloadButton={false}
      />

      {/* 에러/로딩 상태 메시지 (리스트 아래에 보여짐) */}
      {loading && (
        <p className="text-center mt-4 text-gray-900">불러오는 중...</p>
      )}
      {!loading && error && (
        <p className="text-center mt-4 text-red-500">{error}</p>
      )}

      {showModal && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          buttonmessage="삭제"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>    
  )
}
export default DeepfakePanel;