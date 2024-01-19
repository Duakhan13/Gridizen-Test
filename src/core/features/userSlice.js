/** @format */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showLog} from '../../utils/Methods';
// import {authURL, baseURL} from '../../ApiBaseUrl';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {showToast} from './toastSlice';

const initialState = {
  user: '',
  signupdetails: '',
  forgotMessage: '',
  updatedMessage: '',
  deleteMessage: '',
  isLoading: false,
  userError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeSignUp: (state, action) => {
      state.signupdetails = '';
    },
    removeError: (state, action) => {
      state.userError = null;
    },
    removeMessage: (state, action) => {
      state.forgotMessage = '';
      state.deleteMessage = '';
    },
    removeUpdateMessage: (state, action) => {
      state.updatedMessage = '';
    },
    logout: (state, action) => {
      state.isLoading = false;
      state.signupdetails = '';
      state.user = '';
      state.userError = '';
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(signUp.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(signUp.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.signupdetails = action.payload;
  //   });
  //   builder.addCase(signUp.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.userError = action.payload;
  //   });
  //   builder.addCase(login.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.user = action.payload;
  //   });
  //   builder.addCase(login.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.userError = action.payload;
  //   });
  //   builder.addCase(editUserProfile.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(editUserProfile.fulfilled, (state, action) => {
  //     showLog(action.payload, 'payload');
  //     const newData = [state.user];
  //     const data = newData.map(item => {
  //       const username = action.payload.username;
  //       if (item.username) {
  //         return {...item, username};
  //       }
  //       return item;
  //     });
  //     const temp = data.map(item => {
  //       const name = action.payload.name;
  //       if (item.name) {
  //         return {...item, name};
  //       }
  //       return item;
  //     });
  //     state.user = temp[0];
  //     state.updatedMessage = 'Updated Successfully';
  //     state.isLoading = false;
  //   });
  //   builder.addCase(editUserProfile.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.userError = action.payload;
  //   });
  //   builder.addCase(forgotPassword.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(forgotPassword.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.forgotMessage = action.payload?.msg;
  //   });
  //   builder.addCase(forgotPassword.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.userError = action.payload;
  //   });
  //   builder.addCase(resetPassword.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(resetPassword.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.forgotMessage = action.payload?.msg;
  //   });
  //   builder.addCase(resetPassword.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.userError = action.payload;
  //   });
  //   builder.addCase(deleteProfile.pending, (state, action) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(deleteProfile.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.deleteMessage = action.payload?.msg;
  //   });
  //   builder.addCase(deleteProfile.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.userError = action.payload;
  //   });
  // },
});

// export const editUserProfile = createAsyncThunk(
//   'user//editUserProfile',
//   async (data, thunkAPI) => {
//     const url = `${authURL}user/${data.userId}`;

//     let send = JSON.stringify({
//       name: data.name,
//       username: data.username,
//     });

//     let config = {
//       method: 'put',
//       maxBodyLength: Infinity,
//       url: url,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${data.token}`,
//       },
//       data: send,
//     };

//     try {
//       const resp = await axios.request(config);

//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message);
//     }
//   },
// );
// export const deleteProfile = createAsyncThunk(
//   'user//deleteProfile',
//   async (data, thunkAPI) => {
//     const url = `${authURL}user`;
//     let config = {
//       method: 'delete',
//       url: url,
//       headers: {
//         Authorization: `Bearer ${data.token}`,
//       },
//     };
//     try {
//       const resp = await axios.request(config);
//       showLog(resp.data, 'delete profile data');
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message);
//     }
//   },
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async function (_payload, thunkAPI) {
//     thunkAPI.dispatch({type: 'logout/LOGOUT'});
//   },
// );
// er
export const {
  removeSignUp,
  removeError,
  logout,
  removeMessage,
  removeUpdateMessage,
} = userSlice.actions;
export default userSlice.reducer;
