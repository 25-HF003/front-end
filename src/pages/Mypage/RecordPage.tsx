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
};


function RecordPage({ title, records, onAddClick } :RecordListProps) {
  return (
      <div className="flex-1 bg-white-100 text-black-100 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-lg font-bold">{title}</h2>
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
              <img src={record.img}   alt={record.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-bold">{record.name}</p>
                <p className="text-sm text-gray-900">{record.date}</p>
              </div>
              <div className="space-x-2 text-xl text-gray-900">
                <button title="삭제">🗑️</button>
                <button title="다운로드">⬇️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default RecordPage;