import { Options } from "./TOptions";

export default function MultipleChoiceQuiz({ options, topic, onSelect, selectId } : Options) {
  return(
    <div className="flex flex-col justify-center items-center gap-4">
      {/* 학습 내용 */}
      <div className="flex flex-col justify-center items-center mt-5 gap-2">
        <p className="font-bold">🔍 학습 내용</p>
        <p className="bg-blue-100 whitespace-pre-line p-3 rounded-[10px]">{topic}</p>
      </div>
      {options.map((item) => (
        <div
          className={`flex justify-start items-center p-2 gap-1 w-full max-w-md`}>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 bg-black-100 text-white-100 font-bold
                ${selectId && selectId == item.id ? 'opacity-50' : ''}`}
              onClick={() => onSelect(item.id)}>
                {item.id}</button>
            <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}