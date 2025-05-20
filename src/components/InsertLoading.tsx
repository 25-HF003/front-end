type InsertLoadingProps = {
  text: string;
}

function InsertLoading({ text }: InsertLoadingProps) {
  return(
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      {/* 로딩 원 */}
      <div className="flex gap-10 justify-center items-center">
        <div className="w-[35px] h-[35px] rounded-full bg-green-100"></div>
        <div className="w-[35px] h-[35px] rounded-full bg-green-100"></div>
        <div className="w-[35px] h-[35px] rounded-full bg-green-100"></div>
      </div>
      <h1 className="text-white-100 text-[32px] ">{text}</h1>
    </div>
  );
}

export default InsertLoading;