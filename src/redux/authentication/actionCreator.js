/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import Cookies from 'js-cookie';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { setItem } from '../../utility/localStorageControl';
import SignUp from '../../container/profile/authentication/overview/Signup';
import { useCallback, useEffect, useState } from 'react';
import { async } from 'q';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.login('/member/signin', values);
      if (response.data.errors) {
        dispatch(loginErr(response.data.errors));
      } else {
        Cookies.set('ACCESS_TOKEN', response.data.token);
        Cookies.set('logedIn', true);
        Cookies.set('userId', response.data.userId);
        Cookies.set('memberNo', response.data.memberNo);
        Cookies.set('nickName', response.data.nickName);
        Cookies.set('userName', response.data.userName);
        Cookies.set('gender', response.data.gender);
        Cookies.set('birth', response.data.birth);
        Cookies.set('regDate', response.data.regDate);
        Cookies.set('authList', response.data.authList);
        dispatch(loginSuccess(true));
        callback();
        location.reload();


      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};



const register = (values, callback) => {
  return async () => {
    try {
      const response = await DataService.register('/member/signup', values);
      if (response.errors) {
        throw new Error("에러!")
      } else {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const logOut = (callback) => {
    return async (dispatch) => {
      dispatch(logoutBegin());
      try {
        const response = await DataService.get('/member/logout');
      
        if (response === null) {
          dispatch(logoutErr(true));
        }
        
        localStorage.removeItem("ACCESS_TOKEN");
        Cookies.remove("ACCESS_TOKEN");
        Cookies.remove('logedIn');
        Cookies.remove('userId');
        Cookies.remove('memberNo');
        Cookies.remove('nickName');
        Cookies.remove('userName');
        Cookies.remove('gender');
        Cookies.remove('birth');
        Cookies.remove('regDate');
        Cookies.remove('authList');
        location.reload();
        dispatch(logoutSuccess(true));
        callback();




      } catch (err) {
        dispatch(logoutErr(err));
      }
    };
};

export { login, logOut, register };
