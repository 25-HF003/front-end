import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskSlice<T = any> {
  taskId: string | null;
  progress: number;
  loading: boolean;
  error: string | null;
  resultInfo: T | null;
}

const initialState: TaskSlice = {
  taskId: null,
  progress: 0,
  loading: false,
  error: null,
  resultInfo: null,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    startTask(state, action: PayloadAction<string>) {
      state.taskId = action.payload;
      state.progress = 0;
      state.loading = true;
      state.error = null;
      state.resultInfo = null;
    },
    updatedProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    finishTask(state, action: PayloadAction<any>) {
      state.progress = 100;
      state.loading = false;
      state.resultInfo = action.payload;
    },
    failTask(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const { startTask, updatedProgress, finishTask, failTask }
= taskSlice.actions;

export default taskSlice.reducer;