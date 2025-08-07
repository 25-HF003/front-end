import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  userId: number;
  loginId: string;
  nickname: string;
  email: string;
  role: string;
}

interface AuthState {
  accessToken: string | null;
  user: UserInfo | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
    },
  },
});

export const { setAccessToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

