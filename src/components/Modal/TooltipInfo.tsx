type Props = {
  message: string;
}
export default function TooltipInfo( {message}: Props) {
  return (
    <div className="relative inline-block group">
      {/* 트리거 아이콘 */}
      <span
        role="button"
        className="inline-flex items-center justify-center"
        aria-label="상세옵션 설명">
          <img src="/notice.svg" alt="Notice" className="w-4 h-4 mt-2" />
      </span>

      {/* 말풍선 */}
      <div
        className="pointer-events-none absolute top-full left-0 mt-2 w-[400px] max-w-[500px]
                   whitespace-pre-line break-words
                   rounded-md bg-gray-300 text-black-100 text-sm p-3 shadow-lg z-[9999]
                   opacity-0 invisible transition-opacity duration-150
                   group-hover:opacity-100 group-hover:visible">
        {(message ?? '').replace(/\\n/g, '\n')}
        <div className="absolute -top-2 left-1
                        w-0 h-0 border-l-8 border-r-8 border-b-8
                        border-l-transparent border-r-transparent border-b-gray-300" />
      </div>
    </div>
  );
}
