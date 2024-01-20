/** @format */

import postReducer from '../features/postSlice';
import {combineReducers} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
const appReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
