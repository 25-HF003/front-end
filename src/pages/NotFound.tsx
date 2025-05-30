// function NotFound() {
//   return(
//     <div className="w-full h-screen flex flex-col justify-center items-center">
//       <h1 className="text-green-100 text-[124px] font-bold ">404</h1>
//       <p className="text-white-100 text-[20px]">해당 페이지는 존재하지 않거나 위조되었을 수 있습니다.</p>
//     </div>)
// }

import { Link } from "react-router-dom";

// export default NotFound;

function NotFound() {
  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* 스캔 라인 */}
      <div className="scan-lines"></div>

      {/* 에러 텍스트 */}
      <div className="text-center z-20">
        <h1 className="glitch text-5xl md:text-7xl font-bold mb-4">
          404: Page Not Found
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          해당 페이지는 존재하지 않거나 위조되었을 수 있습니다.
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-2 border border-green-200 text-green-200 hover:bg-green-300 hover:text-black transition">
            홈으로 돌아가기
          </button>
        </Link>
        
      </div>
    </div>
  );
}

export default NotFound;