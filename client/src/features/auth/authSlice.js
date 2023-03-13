import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogin: (state, { user, token }) => {
      state.user = user;
      state.token = token;
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
