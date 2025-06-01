import { useNavigate } from "react-router-dom";

type InsertFailProps = {
  title: string;
  link: string;
}

function InsertFail({ title, link }: InsertFailProps) {

  const navigate = useNavigate();

  return(
    <div className="w-full h-screen flex flex-col justify-center items-center text-white-100 gap-4">
      <h1 className="text-[40px]">{title} 삽입에 실패하였습니다.</h1>
      <button 
        className="w-[20vw] h-[7vh] rounded-[20px] bg-green-200 text-[32px]"
        onClick={() => navigate(`/${link}`)}>
          처음으로 돌아가기
      </button>
      <h5 className="text-[20px]">잠시 후에 다시 시도해 주세요.</h5>
    </div>
  );
}

export default InsertFail;