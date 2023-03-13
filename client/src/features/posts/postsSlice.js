import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { posts }) => {
      state.posts = posts;
    },
    setIsLoading: (state, { isLoading }) => {
      state.isLoading = isLoading;
    },
  },
});

export const { setPosts, setIsLoading } = postsSlice.actions;

export default postsSlice.reducer;
