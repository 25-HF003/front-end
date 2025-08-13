import { useState } from "react";
import InsertLoading from "../../components/InsertLoading";
import InsertFail from "../../components/InsertFail";
import { useNavigate } from "react-router-dom";
import { postWatermarkInsert } from "../../api/watermark_api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  file: File | null;
}

function WatermarkModal({ setIsModal, file }: Props) {

  // userId 가져오기
  const userId = useSelector((state: RootState) => state.auth.user?.userId);
  // console.log("userId", userId);

  const [text, setText] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const byteLength = new TextEncoder().encode(inputValue).length;

    if (byteLength <= 32) {
      setText(inputValue);
    }
  }

  const handleSubmit = async () => {
    if (!file || !text || !userId) return;

    try {
      const { imageUrl, fileName } = await postWatermarkInsert(userId, file, text);
      <InsertLoading text="삽입중..." />
      navigate("/watermark-success", { state: { downloadUrl: imageUrl, fileName } });
    } catch (error) {
      <InsertFail title="워터마크" link="/watermark-insert" />
      console.log(error);
    }
  }

  return(
    <div className="fixed inset-0 bg-black-100 bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white-100 w-[50%] h-[50%] gap-10 rounded-[50px]">
        <h1 className="text-[40px]">워터마크 메세지를 입력해주세요.</h1>
        <input 
          type="text" 
          placeholder="ETNL" 
          value={text}
          onChange={handleChange}
          className="w-[50%] h-[15%] border border-black-100 py-3 rounded-[10px] px-2 text-[30px] " 
        />
        <div className="w-[50%] flex justify-between">
          <button 
            className="w-[200px] h-[57px] rounded-[20px] bg-gray-500 text-black-100 text-[20px] "
            onClick={() => setIsModal(false)}>
              취소</button>
          <button 
            className="w-[200px] h-[57px] rounded-[20px] bg-green-200 text-white-100 text-[20px] "
            onClick={handleSubmit}
            >
              입력
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatermarkModal;