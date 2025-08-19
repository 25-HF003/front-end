import RecordPage from "../../../components/Mypage/RecordPage";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { api } from "../../../api";


type WatermarkRecord = {
  watermarkId: number;
  s3WatermarkedKey: string;
  createdAt: string;
};

function WatermarkPanel() {
  const [records, setRecords] = useState<WatermarkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      setError("로그인이 필요합니다.");
      return;
    }
      (async () => {
        try {
          // 서버는 토큰으로 유저 식별 → userId를 프론트에서 보낼 필요 X
          const data = await api.watermark.getAllByUser(0, 15, "createdAt,desc");
          // 백엔드 페이지 응답 형태 대비
          // data가 배열이거나 data.content가 배열일 수 있으니 안전하게 처리
          const list: any[] = Array.isArray(data)
            ? data
            : Array.isArray(data?.content)
            ? data.content
            : [];

          const mapped: WatermarkRecord[] = list.map((item: any) => ({
            watermarkId: item.watermarkId,
            s3WatermarkedKey: item.s3WatermarkedKey ?? item.filePath ?? "",
            createdAt: item.createdAt ?? "",
          }));
          setRecords(mapped);
        } catch (e) {
          setError("기록을 불러오지 못했습니다.");
        } finally {
          setLoading(false); //  성공/실패 관계없이 로딩 종료
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
    id: record.watermarkId,
    name: `워터마크 삽입 결과 ${record.displayIndex}`,
    date: new Date(record.createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    img: record.s3WatermarkedKey,
  }));

  //기록 삭제
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    api.watermark
      .deleteById(deleteId)
      .then(() => {
        setRecords((prev) => prev.filter((r) => r.watermarkId !== deleteId));
      })
      .catch(() => {
        alert("삭제에 실패했습니다.");
      })
      .finally(() => {
        setShowModal(false);
        setDeleteId(null);
      });
    };

    
    return (
    <>
      <RecordPage
        title="디지털 워터마킹 기록"
        records={formattedRecords}
        onAddClick={() => navigate("/watermark-detection")}
        onItemClick={(id) => navigate(`/mypage/watermark/${id}`)}
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
          message="기록을 삭제할 경우,\n워터마크 탐지가 불가하고\n복구할 수 없습니다.\n정말 삭제하시겠습니까?"
          buttonmessage="삭제"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
export default WatermarkPanel;