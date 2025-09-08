import RecordPage from "../../../components/Mypage/RecordPage";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { api } from "../../../api";
import Pagination from "../../../components/Mypage/Pagination";


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

  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(15); //15개씩 보이기
  const [totalElements, setTotalElements] = useState(0);

  //const userId = useSelector((state: RootState) => state.auth.user?.userId); // 로그인된 유저 ID 사용
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      //setError("로그인이 필요합니다.");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        // userId 없이 전체 조회
        const data = await api.deepfake.getAllByUser(page, size, "createdAt,desc");
        console.log(data.content);
        setRecords(data.content ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotalElements(data.totalElements ?? 0);
      } catch {
        setError("기록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoggedIn, page, size]);

  const base = totalElements - page * size;
  const formattedRecords = records.map((record, idx) => ({
    id: record.id,
    name: `딥페이크 분석 결과 ${base - idx}`,
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
        setTotalElements((t) => Math.max(0, t - 1));
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
        total={totalElements}
      />
      
      {/* 에러/로딩 상태 메시지 (리스트 아래에 보여짐) */}
      {loading && (
        <p className="text-center mt-4 text-gray-900">불러오는 중...</p>
      )}
      {!loading && records.length === 0 && (
        <p className="text-gray-900 text-center text-lg mt-10">기록이 없습니다.</p>
      )}
      {!loading && error && (
        <p className="text-center mt-4 text-red-500">{error}</p>
      )}

      {/* 번호형 페이지네이션 */}
      <Pagination
        page={page}                 // 0-based
        totalPages={totalPages}     // 스프링 Page에서 받은 값
        onChange={(p) => setPage(p)}
      />

      {showModal && (
        <ConfirmModal
          message={"기록을 삭제할 경우,\n복구가 불가합니다.\n정말 삭제하시겠습니까?"}
          buttonmessage="삭제"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>    
  )
}
export default DeepfakePanel;