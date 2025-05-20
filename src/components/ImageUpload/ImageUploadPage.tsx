import ImageUploader from "./ImageUploader";

function ImageUploadPage() {
  return(
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-[80vw] h-[75vh] rounded-[10px] flex flex-col justify-center items-center bg-white-100">
        <h1 className="font-bold text-[64px] ">이미지 업로드</h1>
        <ImageUploader />
        <button className="w-[355px] h-[57px] rounded-[50px] bg-green-200 text-white-100">DONE</button>
      </div>
    </div>
  );
}

export default ImageUploadPage;