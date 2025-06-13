import axios from "axios";
import { useLocation } from "react-router-dom";

function WatermarkSuccess() {

  const location = useLocation();
  const downloadUrl = location.state?.downloadUrl;

  const handleDownload = async () => {
    try {
      // 파일명 추출
      const urlParts = downloadUrl.split('/');
      const originalFileName = urlParts[urlParts.length - 1];

      // 확장자 분리
      const dotIndex = originalFileName.lastIndexOf('.');
      const name = originalFileName.substring(0, dotIndex);
      const ext = originalFileName.substring(dotIndex);

      // 새로운 파일명 생성
      const downloadFileName = `${name}${ext}`;

      const response = await axios.get(`http://127.0.0.1:5000${downloadUrl}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("다운로드 실패")!
    }
  }

  return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-7 text-white-100">
      {downloadUrl ? (
        <div className="flex mt-8">
          <img
            src={`http://127.0.0.1:5000${downloadUrl}`}
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