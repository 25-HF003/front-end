import { Link, useLocation } from "react-router-dom";

function WatermarkSuccess() {

  const location = useLocation();
  const result = location.state?.resultInfo
  const imageUrl = result.s3WatermarkedKey;
  const filename = result.fileName;

const handleDownload = async () => {
  if (!imageUrl) return;

  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Download error:', error);
  }
};

  return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-7 text-white-100">
      {imageUrl ? (
        <div className="flex mt-8">
          <img
            src={imageUrl}
            alt="워터마크 이미지"
            width={ '700px' }/>
        </div>
      ) : (
      <>
        <p>이미지를 불러올 수 없습니다.</p>
      </>
      )}
      <h1 className="text-[40px] ">워터마크가 성공적으로 삽입되었습니다!</h1>
        <button 
          onClick={handleDownload}
          className="w-[355px] h-[57px] rounded-[50px] bg-green-200 text-[20px]">
          다운로드
        </button>
      <p>
        <Link to="/mypage">마이페이지</Link>
        에서도 확인 가능합니다.
      </p>
    </div>
  );
}

export default WatermarkSuccess;