type PaginationProps = {
  /** 0-based 현재 페이지 */
  page: number;
  /** 전체 페이지 수(0이면 숨김) */
  totalPages: number;
  /** 페이지 변경 핸들러 (0-based) */
  onChange: (page: number) => void;
  /** 한 번에 표시할 페이지 버튼 개수 */
  maxButtons?: number; // default 5
};

export default function Pagination({
  page,
  totalPages,
  onChange,
  maxButtons = 10,
}: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
  const half = Math.floor((maxButtons - 1) / 2);

  // 시작/끝 계산 (0-based, [start, end))
  const start = clamp(
    page - half,
    0,
    Math.max(0, totalPages - maxButtons)
  );
  const end = Math.min(totalPages, start + maxButtons);

  const baseBtn = "w-9 h-9 grid place-items-center rounded-full border shadow-sm text-sm transition";
  const numBtn = "bg-white-100 text-gray-800 hover:bg-gray-50 active:scale-[0.98]";
  const activeBtn = "bg-green-200 text-white-100 border-green-200";
  const arrowBtn = "bg-white-100 text-gray-800 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav className="flex justify-center mt-6">
      <ul className="flex items-center gap-2">
        {/* Prev */}
        <li>
          <button
            aria-label="이전 페이지"
            className={`${baseBtn} ${arrowBtn}`}
            disabled={page === 0}
            onClick={() => onChange(page - 1)}
          >
            &lt;
          </button>
        </li>

        {/* Numbers */}
        {Array.from({ length: end - start }, (_, i) => start + i).map((p) => (
          <li key={p}>
            <button
              type="button" 
              aria-current={p === page ? "page" : undefined}
              className={`${baseBtn} ${p === page ? activeBtn : numBtn}`}
              onClick={() => onChange(p)}
            >
              {p + 1}
            </button>
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            aria-label="다음 페이지"
            className={`${baseBtn} ${arrowBtn}`}
            disabled={page >= totalPages - 1}
            onClick={() => onChange(page + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}
