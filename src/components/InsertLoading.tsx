import { useLocation, useNavigate } from "react-router-dom";
import { useProgressWebSocket } from "../websocket/useWebSocket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updatedProgress } from "../features/task/taskSlice";
import MoonLoader from "react-spinners/MoonLoader";

function InsertLoading() {

  const { state } = useLocation();
  console.log(state);
  const successRedirect = state?.successRedirect || "/";
  const taskIdFromState = state?.taskId;
  const taskIdFromStore = useSelector((state: RootState) => state.task.taskId);
  const taskId = taskIdFromState || taskIdFromStore;

  const dispatch = useDispatch();
  const { progress, ready } = useProgressWebSocket(taskId);
  const taskState = useSelector((state: RootState) => state.task);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof progress === "number") {
      dispatch(updatedProgress(progress));
    }
  }, [progress, dispatch]);

  useEffect(() => {
    if (taskState.progress === 100 && taskState.resultInfo) {
      navigate(successRedirect, { state: taskState.resultInfo })
    }
  }, [taskState.progress, taskState.resultInfo])

  return(
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <div className="w-[80vw] h-[60vh] rounded-[10px] flex flex-col justify-center items-center bg-white-100 gap-7">
        <h1 className="text-[64px] font-semibold">{progress == 100 ? "조금만 더 기다려주세요 !" : "AI 기능이 적용되고 있어요 !"}</h1>
        {/* 퍼센티지 */}
        {/*
        <div className="relative w-28 h-28 rounded-full border-4 border-green-200 flex justify-center items-center">
          <p className="absolute text-[36px] font-bold">{progress}%</p>
        </div> */}
        <div className="relative flex justify-center items-center">
          <MoonLoader
            color="#0AA689"
            size={130}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="absolute text-[36px] font-bold">{progress}%</p>
        </div>
          
        {/* 로딩바 */}
        <div className="w-[80%] h-10 border-2 border-green-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-200 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}/>
        </div>
      </div>
    </div>
  );
}

export default InsertLoading;