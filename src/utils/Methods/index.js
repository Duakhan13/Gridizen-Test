import {Dimensions, Platform} from 'react-native';

export const showLog = (indication, message) => {
  if (__DEV__) {
    console.log(indication, message);
  }
};
export const validate = (email, password, name, username) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (name === '') {
    return {name: 'Name is required'};
  }
  if (username === '') {
    return {username: 'Username is required'};
  }

  if (email === '') {
    return {email: 'Email is required'};
  } else if (validRegex.test(email) === false) {
    return {email: 'Email is not valid'};
  } else if (password === '') {
    return {password: 'Password is required'};
  } else if (password?.length < 8) {
    return {password: 'Password should be 8 characters'};
  }
  return true;
};
export const loginvalidate = (email, password) => {
  showLog(password, 'pass');
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) {
    return {email: 'Email is required'};
  } else if (validRegex.test(email) === false) {
    return {email: 'Email is not valid'};
  } else if (!password) {
    return {password: 'Password is required'};
  }
  return true;
};
export const validateInput = text => {
  if (!text) {
    return {Text: 'Text is Required'};
  }
  return true;
};
export const validateEditProfile = (name, username) => {
  if (name === '') {
    return {name: 'Name is required'};
  }
  if (username === '') {
    return {username: 'Username is required'};
  }
  return true;
};

export const validateCodeAndPass = (code, password) => {
  if (code === '') {
    return {code: 'Code is required'};
  } else if (password === '') {
    return {password: 'password is required'};
  } else if (password?.length < 8) {
    return {password: 'Password should be 8 characters'};
  }
  return true;
};

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_WIDTH_WITH_SCREEN = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
