import { useState } from "react";
import QuizAnswer from "./QuizAnswer";

type QuizItem = {
  id: number;
  img: string;
  isDeepfake: boolean;
}

const mockData: QuizItem[] = [
  { id: 1, img: "/img/mock/deepfake.png", isDeepfake: true },
  { id: 2, img: "/img/mock/virtual_character.png", isDeepfake: false },
];

function Quiz() {
  const [selectId, setSelectId] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // 이미지 선택
  const handleClick = (id: number) => {
    setSelectId(id);
    console.log(id);
    setResult(null);
  }

  // 정답 제출
  const handleSubmit = () => {
    if (selectId === null) {
      alert("이미지를 선택해주세요!");
      return;
    }

    const selected = mockData.find((item) => item.id === selectId);
    if (!selected) return;

    if (selected.isDeepfake) {
      setResult(true);
    } else {
      setResult(false);
    }
    setOpenModal(true);
  }

  return (
    <div className="flex flex-col min-h-screen px-20 py-10 mx-20">
      <div className="bg-gray-50 rounded-[44px] h-[730px]">

        {/* 퀴즈 헤더 */}
        <div className=" text-[20px] font-bold p-7 flex flex-col gap-5">
          <h1>👀 딥페이크 탐지 퀴즈</h1>
          <p>아래 두 이미지 중에서 딥페이크(조작된 이미지)는 무엇일까요?</p>
        </div>

        {/* 가로선 */}
        <div className="border-[1px] border-black-100" />

        {/* 퀴즈 내용 */}
        <div className="flex justify-evenly items-center mt-10">
          {mockData.map((item) => (
            <div
              key={item.id}
              className={`border-[4px] border-transparent hover:border-[4px] hover:border-green-200 hover:rounded-[20px]
                ${selectId && selectId != item.id ? 'opacity-50' : ''}`}
                onClick={() => handleClick(item.id)}>
                <img
                  src={item.img}
                  alt="퀴즈 이미지" />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="p-4 bg-green-200 rounded-[10px] text-white-200"
            onClick={() => handleSubmit()}>
              제출</button>
        </div>
      </div>

      {/* 결과 */}
      {result !== null && openModal && (
        <QuizAnswer 
          answer={result} 
          openModal={openModal} 
          setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default Quiz;