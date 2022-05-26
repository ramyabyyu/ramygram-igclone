import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
import { errorMessage } from "../../helper/errorMessage";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new post
export const createPost = createAsyncThunk(
  "post/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await postService.createPost(postData, token);
    } catch (error) {
      errorMessage(error, thunkAPI);
    }
  }
);

// get user's following post
export const getFollowingPosts = createAsyncThunk(
  "post/getFollowing",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await postService.getFollowingPosts(token);
    } catch (error) {
      errorMessage(error, thunkAPI);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get following posts
      .addCase(getFollowingPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getFollowingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
