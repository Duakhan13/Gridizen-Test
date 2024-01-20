/** @format */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showLog} from '../../utils/Methods';
// import {authURL, baseURL} from '../../ApiBaseUrl';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {showToast} from './toastSlice';

const initialState = {
  user: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
