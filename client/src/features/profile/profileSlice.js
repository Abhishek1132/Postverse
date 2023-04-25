import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileUser: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileUser: (state, { payload }) => {
      state.profileUser = payload.user;
    },
  },
});

export const { setProfileUser } = profileSlice.actions;

export default profileSlice.reducer;
