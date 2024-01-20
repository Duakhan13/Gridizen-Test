/** @format */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showLog} from '../../utils/Methods';
// import {categoryURL, contentURL} from '../../ApiBaseUrl';
import axios from 'axios';
import {siteURL} from '../../ApiBaseURL';

const initialState = {
  isLoading: false,
  postsData: null,
  postsDataError: null,
};

const postSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    removeError: (state, action) => {
      state.postsDataError = null;
    },
    addPostData: (state, action) => {
      state.postsData = [action.payload, ...state.postsData];
    },
  },
  extraReducers: builder => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postsData = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.postsDataError = action.payload;
    });
  },
});

export const getPosts = createAsyncThunk(
  'content//getPosts',
  async (data, thunkAPI) => {
    const url = `${siteURL}posts`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const {removeError, addPostData} = postSlice.actions;
export default postSlice.reducer;
