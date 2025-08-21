import { Options } from "./TOptions";

export default function ImageQuiz({ options, onSelect, selectId }: Options) {
  return(
    <div className="flex justify-evenly items-center mt-10">
      {options.map((item) => (
        <div
          className={`border-[4px] border-transparent hover:border-[4px] hover:border-green-200 hover:rounded-[20px]
            ${selectId && selectId != item.id ? 'opacity-50' : ''}`}
            onClick={() => onSelect(item.id)}>
            <img
              src={item.img}
              alt="퀴즈 이미지" />
        </div>
      ))}
    </div>
  );
}