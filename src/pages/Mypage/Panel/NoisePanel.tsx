import RecordPage from "../../../components/Mypage/RecordPage";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { api } from "../../../api";
import Pagination from "../../../components/Mypage/Pagination";

type NoiseRecord = {
  noiseId: number;
  originalFilePath: string;
  createdAt: string;
}

function NoisePanel() {
  const [records, setRecords] = useState<NoiseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken);  // 로그인 여부만 확인(토큰은 axiosInstance 인터셉터가 알아서 처리)

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      setError("로그인이 필요합니다.");
      return;
    }
      (async () => {
        try {
          setLoading(true);
          // 서버는 토큰으로 유저 식별 →  userId를 프론트에서 보낼 필요 X
          const data = await api.noise.getAllByUser(page, size, "createdAt,desc");
          console.log("응답", data.content);
          setRecords(data.content ?? []);
          setTotalPages(data.totalPages ?? 1);
          setTotalElements(data.totalElements ?? 0);
        } catch (e) {
          setError("기록을 불러오지 못했습니다.");
        } finally {
          setLoading(false); //  성공/실패 관계없이 로딩 종료
        }
      })();
    }, [isLoggedIn, page, size]);

  // 오래된 순으로 번호 붙이기
  const base = totalElements - page * size;
  const formattedRecords = records.map((record, idx) => ({
    id: record.noiseId,
    name: `적대적 노이즈 분석 결과 ${base - idx}`,
    date: new Date(record.createdAt).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    img: record.originalFilePath,
  }));


  //기록 삭제
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    api.noise
      .deleteById(deleteId)
      .then(() => {
        setRecords((prev) => prev.filter((r) => r.noiseId !== deleteId));
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
    <>
      <RecordPage
        title="적대적 노이즈 기록"
        records={formattedRecords}
        onAddClick={() => navigate("/adversarial-noise")}
        onItemClick={(id) => navigate(`/mypage/noise/${id}`)}
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
          message="기록을 삭제할 경우,\n복구가 불가합니다.\n정말 삭제하시겠습니까?"
          buttonmessage="삭제"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
    )
}
export default NoisePanel;


