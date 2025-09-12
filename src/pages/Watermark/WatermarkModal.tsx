import { useState } from "react";
import InsertFail from "../../components/InsertFail";
import { useNavigate } from "react-router-dom";
import { postWatermarkInsert } from "../../api/watermark_api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { v4 as uuidv4 } from 'uuid';
import { failTask, finishTask, startTask } from "../../features/task/taskSlice";

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  file: File | null;
}

function WatermarkModal({ setIsModal, file }: Props) {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => !!state.auth.accessToken); 
  const navigate = useNavigate();

  // 워터마크 메시지 입력
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const byteLength = new TextEncoder().encode(inputValue).length;

    if (byteLength <= 32) {
      setText(inputValue);
    }
  }

  // 워터마크 등록
  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    if (!file) return;

    if (!text) {
      alert("메시지를 입력해주세요!");
      return;
    }

    const byteLength = new TextEncoder().encode(text).length;

    if (byteLength > 4) {
      alert("메시지는 영문 기준 최대 4자, 한글은 최대 2자까지 입력할 수 있습니다");
      setText("");
      return;
    }

    const taskId = uuidv4();
    dispatch(startTask(taskId));
    setIsLoading(true);

    navigate("/watermark-insert/loading", { state: { taskId, successRedirect: "/watermark-success" } });

    postWatermarkInsert(file, text, taskId)
      .then((resultInfo) => {
        dispatch(finishTask({resultInfo}))
      })
      .catch((error) => {
        console.log(error);
        dispatch(failTask(error))
        setIsError(true);
        setIsLoading(false);
      })
  };

  if (isError) {
    return <InsertFail title="워터마크" link="/watermark-insert" />
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