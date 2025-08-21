import { useState } from "react";
import QuizAnswer from "./QuizAnswer";
import ImageQuiz from "./ImageQuiz";
import MultipleChoiceQuiz from "./MultipleChoiceQuiz";

type QuizItem = {
  id: number;
  type: 'image' | 'multiple-choice';  // 문제 유형
  title: string;                      // 문제
  topic?: string;                   // 학습 내용
  options: {
    id: number;
    img?: string;                     // 이미지 퀴즈용
    text?: string;                    // 객관식 퀴즈용
    isCorrect?: boolean;              // 객관식 퀴즈용
  }[]
}

const mockData: QuizItem[] = [
  {
    id: 1,
    type: 'image',
    title: '아래 두 이미지 중에서 딥페이크(조작된 이미지)는 무엇일까요?',
    options: [
      { id: 1, img: "/img/mock/deepfake.png", isCorrect: true },
      { id: 2, img: "/img/mock/virtual_character.png", isCorrect: false },
    ]
  },
  {
    id: 2,
    type: 'multiple-choice',
    title: '딥페이크가 사회적으로 위험한 이유로 가장 적절한 것은 무엇인가요?',
    topic: '딥페이크 기술은 악용될 경우 사회적 혼란을 일으킬 수 있습니다.\n특히 정치적 영상 조작이나 금융 사기 등에 사용될 가능성이 높습니다.',
    options: [
      { id: 1, text: '재미있는 밈(meme)으로 사용될 수 있음', isCorrect: false },
      { id: 2, text: '유명인의 영상을 쉽게 만들 수 있음', isCorrect: false },
      { id: 3, text: '가짜 뉴스나 금융 사기에 악용될 수 있음', isCorrect: true },
      { id: 4, text: '영화 특수효과로 활용될 수 있음', isCorrect: false },
    ]
  },
  {
    id: 3,
    type: 'multiple-choice',
    title: '어떤 특징이 딥페이크에서 자주 발견되는 문제점일까요?',
    topic: '딥페이크는 종종 눈 깜빡임이 비정상적으로 적거나, 피부 질감이 부자연스러운 특징을 보입니다.\n최신 AI 모델은 이를 보완하려 하지만, 조명 반사나 그림자 처리가 어색한 경우가 많습니다.',
    options: [
      { id: 1, text: '과도한 눈 깜빡임', isCorrect: false },
      { id: 2, text: '피부 질감이 부자연스러움', isCorrect: true },
      { id: 3, text: '그림자와 조명이 일관됨', isCorrect: false },
      { id: 4, text: '자연스러운 표정 변화', isCorrect: false },
    ]
  },
];

function Quiz() {
  const [selectId, setSelectId] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentQuestion = mockData[currentQuestionIndex];   // 현재 문제

  // 이전 버튼
  const moveToPrevPage = () => {
    setCurrentQuestionIndex(prev => prev - 1);
    setSelectId(null);
  }

  // 다음 버튼
  const moveToNextPage = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectId(null);
  }

  // 정답 제출
  const handleSubmit = () => {
    if (selectId === null) {
      alert("정답을 선택해주세요!");
      return;
    }

    const selectedOption = currentQuestion.options.find((option) => option.id === selectId);
    if (!selectedOption) return;

    if (selectedOption.isCorrect) {
      setResult(true);
    } else {
      setResult(false);
    }
    setOpenModal(true);
  }

  return (
    <div className="flex flex-col min-h-screen px-20 py-10 mx-20">
      <div className="bg-gray-50 rounded-[44px] h-[730px]">
        {/* {mockData.map((item) => ( */}
          <div >
            {/* 퀴즈 헤더 */}
            <div className=" text-[20px] font-bold p-7 flex flex-col gap-5">
              <h1>👀 딥페이크 탐지 퀴즈</h1>
              <p>{currentQuestion.title}</p>
            </div>

            {/* 가로선 */}
            <div className="border-[1px] border-black-100" />

            {/* 퀴즈 내용 */}
            {currentQuestion.type === 'image' 
              ? <ImageQuiz 
                options={currentQuestion.options}
                selectId={selectId}
                topic={currentQuestion.topic}
                onSelect={setSelectId}/> 
              : <MultipleChoiceQuiz
                  options={currentQuestion.options}
                  topic={currentQuestion.topic}
                  selectId={selectId}
                  onSelect={setSelectId}/>}

            {/* 버튼 */}
            <div className="flex justify-center mt-10 gap-4">
              <button
                className={`p-4 rounded-[10px] text-white-200
                ${currentQuestion.id === 1 ? 'bg-gray-500' : 'bg-green-200'}`}
                disabled={currentQuestion.id === 1}
                onClick={() => moveToPrevPage()}>
                  이전</button>
              <button
                className="p-4 bg-green-200 rounded-[10px] text-white-200"
                onClick={() => handleSubmit()}>
                  제출</button>
              <button
                className={`p-4 rounded-[10px] text-white-200
                ${currentQuestion.id === mockData.length ? 'bg-gray-500' : 'bg-green-200'}`}
                disabled={currentQuestion.id === mockData.length}
                onClick={() => moveToNextPage()}>
                  다음</button>
            </div>
          </div>
        {/* ))} */}
      </div>

      {/* 결과 */}
      {result !== null && openModal && (
        <QuizAnswer 
          answer={result}
          setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default Quiz;