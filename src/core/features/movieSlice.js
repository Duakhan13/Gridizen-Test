/** @format */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showLog} from '../../utils/Methods';
// import {categoryURL, contentURL} from '../../ApiBaseUrl';
import axios from 'axios';
import {siteURL} from '../../ApiBaseURL';

const initialState = {
  id: '',
  title: '',
};

const movieSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    removeContentError: (state, action) => {
      state.contentError = '';
    },
    addId: (state, action) => {
      state.idParam = action.payload;
    },
    removeId: (state, action) => {
      state.idParam = '';
    },
    removeCountViews: (state, action) => {
      state.contentViews = '';
    },
    removeSingleContent: (state, action) => {
      state.singleContent = '';
    },
    removeNewCreatedContent: (state, action) => {
      state.newCreatedContent = '';
    },
    saveContentBeforeLogin: (state, action) => {
      console.log(
        'saveContentBeforeLogin action.payload  ===> ',
        action.payload,
      );
      state.contentBeforeLogin = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contentList = action.payload;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });

    // builder.addCase(createContent.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(createContent.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.newCreatedContent = action.payload;
    // });
    // builder.addCase(createContent.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.contentError = action.payload;
    // });
  },
});

export const getMovies = createAsyncThunk(
  'content//getMovies',
  async (data, thunkAPI) => {
    const url = `${siteURL}movies`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

// export const findContent = createAsyncThunk(
//   'content//findContent',
//   async (data, thunkAPI) => {
//     const url = `${contentURL}/${data?._id}`;

//     let config = {
//       method: 'get',
//       url: url,
//       headers: {
//         Authorization: `Bearer ${data?.token}`,
//       },
//     };
//     try {
//       const resp = await axios.request(config);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message);
//     }
//   },
// );
// export const homeListingOne = createAsyncThunk(
//   'content//homeContentOne',
//   async (data, thunkAPI) => {
//     const url = `${contentURL}/${data?._id}/new`;
//     try {
//       const resp = await axios.get(url);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message);
//     }
//   },
// );
// export const homeListingTwo = createAsyncThunk(
//   'content//homeContentTwo',
//   async (data, thunkAPI) => {
//     const url = `${contentURL}/${data?._id}/new`;
//     try {
//       const resp = await axios.get(url);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message);
//     }
//   },
// );
// export const getfeaturedContent = createAsyncThunk(
//   'content//getfeaturedContent',
//   async (data, thunkAPI) => {
//     const url = `${contentURL}/featured`;
//     try {
//       const resp = await axios.get(url);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message);
//     }
//   },
// );

// export const createContent = createAsyncThunk(
//   'content//createContent',
//   async (data, thunkAPI) => {
//     showLog(data, 'DATA IN API');
//     const url = `${contentURL}`;
//     let config = {
//       method: 'post',
//       url,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${data.token}`,
//       },
//       data: {
//         user: data?.id,
//         category: data?.category,
//         prompt: data?.prompt,
//         content: data?.content,
//         status: data?.status,
//       },
//     };
//     try {
//       const resp = await axios.request(config);
//       showLog(resp.data, 'res data of create content');
//       return resp.data;
//     } catch (error) {
//       showLog('IN CONTENT CREATE API', error);
//       showLog('IN CONTENT CREATE API', error.message);

//       return thunkAPI.rejectWithValue('Something went wrong');
//     }
//   },
// );
// export const getViewsCount = createAsyncThunk(
//   'users//ViewsCount',
//   async (data, thunkAPI) => {
//     const url = `${contentURL}/profile-views`;
//     let config = {
//       method: 'get',
//       url,
//       headers: {
//         Authorization: `Bearer ${data}`,
//       },
//     };
//     try {
//       const resp = await axios.request(config);
//       showLog(resp.data, 'res data of content views');
//       return resp.data;
//     } catch (error) {
//       showLog('IN CONTENT CREATE API', error.message);

//       return thunkAPI.rejectWithValue('Something went wrong');
//     }
//   },
// );

export const {
  removeContentError,
  removeSingleContent,
  addId,
  removeId,
  saveContentBeforeLogin,
  removeNewCreatedContent,
  removeCountViews,
} = movieSlice.actions;
export default movieSlice.reducer;
