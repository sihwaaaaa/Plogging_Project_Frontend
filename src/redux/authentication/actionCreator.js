/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import Cookies from 'js-cookie';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { setItem } from '../../utility/localStorageControl';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/member/signin', values);
      if (response.data.errors) {
        dispatch(loginErr(response.data.errors));
      } else {
        console.log("actionCreator 반환값 테스트!!!" + response)
        console.log(response.data)
        console.log(response.data.token)
        Cookies.set('ACCESS_TOKEN', response.data.token);
        Cookies.set('logedIn', true);
        Cookies.set('userId', response.data.userId);
        Cookies.set('memberNo', response.data.memberNo);
        Cookies.set('nickName', response.data.nickName);
        Cookies.set('userName', response.data.userName);
        Cookies.set('gender', response.data.gender);
        Cookies.set('birth', response.data.birth);
        Cookies.set('regDate', response.data.regDate);
        
        dispatch(loginSuccess(true));
        callback();
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const emailAuth = (value) => {
  return async (dispatch) => {
    try {
      const response = await DataService.post('/member/signup/emailConfirm', value);
      console.log(response.data);
      // if (response.data.errors) {
        
      // } else {
      // }
    } catch (err) {
      // dispatch(loginErr(err));
    };
  }
}


const register = (values) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/member/signup', values);
      if (response.data.errors) {
        dispatch(loginErr('Registration failed!'));
      } else {
        dispatch(loginSuccess(false));
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      const response = await DataService.post('/member/logout', callback);
      if (response == null) {
        dispatch(logoutErr(true));
      }
      localStorage.removeItem("ACCESS_TOKEN", response.token);
      Cookies.remove('logedIn');
      Cookies.remove('ACCESS_TOKEN');
      dispatch(logoutSuccess(true));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, register, emailAuth };
