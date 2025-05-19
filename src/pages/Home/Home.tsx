import SecondHome from "./SecondHome";

function Home() {

  return(
    <div className="relative grid justify-items-center py-6">
      {/* 회색 반투명 배경 */}
      <div className="absolute h-screen inset-0 bg-gray-300 z-10 opacity-25"></div>

      {/* 로고 */}
      <div className="absolute h-[80vh] inset-0 flex text-black-100 text-8xl z-50 justify-center items-center font-bold">
        <p>Detect Deepfakes</p>
        <img src="/lock.svg" alt="로고"/>
        <p>Defend the Truth</p>
      </div>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-4 gap-2">
        <div className="img1 justify-self-end pr-4 pt-6">
          <img src="/img/IMG1.png" alt="이미지1" />
        </div>
        <div className="img2 pl-4">
          <img src="/img/IMG2.png" alt="이미지2" />
        </div>
        <div className="img3 content-center">
          <img src="/img/IMG3.png" alt="이미지3" />
        </div>
        <div className="img4 justify-items-center">
          <img src="/img/IMG4.png" alt="이미지4" />
        </div>
        <div className="img5 -mt-4">
          <img src="/img/IMG5.png" alt="이미지5" />
        </div>
        <div className="img6 justify-items-center pt-10">
          <img src="/img/IMG6.png" alt="이미지6" />
        </div>
        <div className="img7 justify-items-center">
          <img src="/img/IMG7.png" alt="이미지7" />
        </div>
        <div className="img8 pt-10">
          <img src="/img/IMG8.png" alt="이미지8" />
        </div>
      </div>

      {/* 여백 */}
      <div className="h-[100vh]"></div>

      <SecondHome />
    </div>
  )
}

export default Home;