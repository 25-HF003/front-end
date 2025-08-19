type Answer = {
  answer: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QuizAnswer({ answer, openModal, setOpenModal }: Answer) {

  const message = answer ? "정답입니다 ✅" : "오답입니다 ❌";

  return(
    <div className="inset-0 fixed z-30">
      {/* 반투명 배경 */}
      <div className="absolute inset-0 bg-white-200 opacity-50" />
        <div className="relative z-30 flex h-full flex-col">
          {/* 내용 */}
          <div className="flex justify-end mr-4">
            <button
              onClick={() => setOpenModal(false)}
              className="text-[60px] font-bold">X</button>
          </div>
          <div className="flex flex-1 justify-center items-center">
            <h1 className="text-[80px] font-bold">{message}</h1>
          </div>
      </div>
    </div>
  );
}