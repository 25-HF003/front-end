type Props={
  result: {
    s3WatermarkedKey: string;
    fileName: string;
    //createdAt: string;
  };
  confirmMessage?: string | null;
}

function WatermarkSuccessReport({ result, confirmMessage }: Props) {

  const image = result?.s3WatermarkedKey ?? null;
  console.log(image);
  const filename = result?.fileName ?? null;
  //s3 image URL -> blob로 다운로드 가능 형태로 변경
  const handleDownload = async () => {
    if (!image) return;

    try{
      const res = await fetch(image, { mode: 'cors' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } 
    catch (err) {
      console.error("다운로드 실패:", err);
    }
  }

  return(
    <div className="w-full h-full flex flex-col justify-center items-center gap-7 text-white-100">
      {image ? (
        <div className="flex mt-8">
          <img
            src={image}
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
      <p>{confirmMessage}</p>
    </div>
  );
}

export default WatermarkSuccessReport;