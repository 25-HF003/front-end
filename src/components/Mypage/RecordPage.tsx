type Record = {
  id: number;
  name: string;
  date: string;
  img: string;
};

type RecordListProps = {
  title: string;
  records: Record[];
  onAddClick: () => void;
  showDownloadButton?: boolean;
  onItemClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
};


function RecordPage({ title, records, onAddClick, showDownloadButton = true, onItemClick, onDeleteClick} :RecordListProps) {
  return (
      <div className="flex-1 bg-white-100 text-black-100 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
          onClick={onAddClick}
          className="bg-green-200 text-white-100 px-4 py-1 rounded">
          + ADD
          </button>
        </div>

    {/* List */}
        <ul className="space-y-10">
          {records.map((record) => (
            <li key={record.id} className="flex items-center space-x-4">
              <img src={record.img}   alt={record.name} className="w-20 h-20 rounded-full object-cover" />
              <div className="flex-1">
                <button 
                  onClick={() => onItemClick?.(record.id)}
                  className="font-bold text-xl">{record.name}</button>
                <p className="text-sm text-gray-900">{record.date}</p>
              </div>
              <div className="space-x-2 text-xl text-gray-900">
                <button title="삭제" onClick={() => onDeleteClick?.(record.id)}>
                  <img src="/delete.svg" alt="Delete" className="w-7 h-7" />
                </button>
                {showDownloadButton &&(
                  <button title="다운로드">
                    <img src="/download.svg" alt="Download" className="w-7 h-7" />
                  </button>)}
              </div>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default RecordPage;