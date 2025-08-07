import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
