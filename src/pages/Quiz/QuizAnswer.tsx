type Answer = {
  answer: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QuizAnswer({ answer, setOpenModal }: Answer) {

  const message = answer ? "정답입니다 ✅" : "오답입니다 ❌";

  return(
    <div className="inset-0 fixed z-30">
      {/* 반투명 배경 */}
      <div className="bg-black-100 bg-opacity-50 absolute inset-0" />
        <div className="relative z-30 flex h-full flex-col items-center justify-center">
          {/* 내용 */}
          <div className="flex justify-center items-center bg-white-100 w-[60%] h-[65%] gap-10 rounded-[50px] relative">
            <h1 className="text-[80px] font-bold">{message}</h1>
            <button
              onClick={() => setOpenModal(false)}
              className="text-[50px] font-bold absolute top-0 right-7">X</button>
          </div>
      </div>
    </div>
  );
}