import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    handleLogout: (state) => {
      localStorage.removeItem("userData");
      state.user = null;
      state.token = null;
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;
