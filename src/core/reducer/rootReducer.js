/** @format */

import movieReducer from '../features/movieSlice';
import {combineReducers} from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
const appReducer = combineReducers({
  users: userReducer,
  movies: movieReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
