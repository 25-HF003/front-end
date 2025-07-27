import { useLocation } from "react-router-dom";
import { getWatermarkImage } from "../../api/watermark_api";

function WatermarkSuccess() {

  const location = useLocation();
  const downloadUrl = location.state?.downloadUrl;
  console.log(downloadUrl);

  const handleDownload = async () => {
    try {
      await getWatermarkImage(downloadUrl);
    } catch (error) {
      alert("다운로드 실패")!
    }
  }

  return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-7 text-white-100">
      {downloadUrl ? (
        <div className="flex mt-8">
          <img
            src={downloadUrl}
            // src={`http://127.0.0.1:5000${downloadUrl}`}
            alt="워터마크 이미지"
            width={ '800px' }/>
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
      <p>마이페이지에서도 확인 가능합니다.</p>
    </div>
  );
}

export default WatermarkSuccess;