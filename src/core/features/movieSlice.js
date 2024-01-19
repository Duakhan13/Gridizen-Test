/** @format */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showLog} from '../../utils/Methods';
import {categoryURL, contentURL} from '../../ApiBaseUrl';
import axios from 'axios';

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
    builder.addCase(getContent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contentList = action.payload;
    });
    builder.addCase(getContent.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
    builder.addCase(findContent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(findContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleContent = action.payload;
    });
    builder.addCase(findContent.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
    builder.addCase(createContent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newCreatedContent = action.payload;
    });
    builder.addCase(createContent.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
    builder.addCase(homeListingOne.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(homeListingOne.fulfilled, (state, action) => {
      state.isLoading = false;
      state.homeListOne = action.payload;
    });
    builder.addCase(homeListingOne.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
    builder.addCase(homeListingTwo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(homeListingTwo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.homeListTwo = action.payload;
    });
    builder.addCase(homeListingTwo.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
    builder.addCase(getfeaturedContent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getfeaturedContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.featuredContent = action.payload;
    });
    builder.addCase(getfeaturedContent.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
    builder.addCase(getViewsCount.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getViewsCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contentViews = action.payload;
    });
    builder.addCase(getViewsCount.rejected, (state, action) => {
      state.isLoading = false;
      state.contentError = action.payload;
    });
  },
});

export const getContent = createAsyncThunk(
  'content//getContent',
  async (data, thunkAPI) => {
    const url = `${contentURL}?page=${data?.page}&categoryId=${data?.categoryId}`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const findContent = createAsyncThunk(
  'content//findContent',
  async (data, thunkAPI) => {
    const url = `${contentURL}/${data?._id}`;

    let config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${data?.token}`,
      },
    };
    try {
      const resp = await axios.request(config);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);
export const homeListingOne = createAsyncThunk(
  'content//homeContentOne',
  async (data, thunkAPI) => {
    const url = `${contentURL}/${data?._id}/new`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);
export const homeListingTwo = createAsyncThunk(
  'content//homeContentTwo',
  async (data, thunkAPI) => {
    const url = `${contentURL}/${data?._id}/new`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);
export const getfeaturedContent = createAsyncThunk(
  'content//getfeaturedContent',
  async (data, thunkAPI) => {
    const url = `${contentURL}/featured`;
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const createContent = createAsyncThunk(
  'content//createContent',
  async (data, thunkAPI) => {
    showLog(data, 'DATA IN API');
    const url = `${contentURL}`;
    let config = {
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
      data: {
        user: data?.id,
        category: data?.category,
        prompt: data?.prompt,
        content: data?.content,
        status: data?.status,
      },
    };
    try {
      const resp = await axios.request(config);
      showLog(resp.data, 'res data of create content');
      return resp.data;
    } catch (error) {
      showLog('IN CONTENT CREATE API', error);
      showLog('IN CONTENT CREATE API', error.message);

      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);
export const getViewsCount = createAsyncThunk(
  'users//ViewsCount',
  async (data, thunkAPI) => {
    const url = `${contentURL}/profile-views`;
    let config = {
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${data}`,
      },
    };
    try {
      const resp = await axios.request(config);
      showLog(resp.data, 'res data of content views');
      return resp.data;
    } catch (error) {
      showLog('IN CONTENT CREATE API', error.message);

      return thunkAPI.rejectWithValue('Something went wrong');
    }
  },
);

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
