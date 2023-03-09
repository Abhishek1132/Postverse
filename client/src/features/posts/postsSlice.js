const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      console.log(payload);
      state.posts = payload.posts;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload.isLoading;
    },
  },
});

export const { setPosts, setIsLoading } = postsSlice.actions;

export default postsSlice.reducer;
