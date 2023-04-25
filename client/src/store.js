import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSlice";
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});
