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

export { logOut };
