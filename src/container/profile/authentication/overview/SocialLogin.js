import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import actions from '../../../../redux/authentication/actions';
import Cookies from 'js-cookie';

function SocialLogin(props) {
  // const history = useNavigate();
  const dispatch = useDispatch();
  const getUrlParameter = (name) => {
    // eslint-disable-next-line prefer-destructuring, prefer-const
    let search = window.location.search;
    // eslint-disable-next-line prefer-const
    let params = new URLSearchParams(search);
    return params.get(name);
  };
  const token = getUrlParameter('token');
  const memberNo = getUrlParameter('memberNo');
  const userId = getUrlParameter('userId');
  const nickName = getUrlParameter('nickName');
  const userName = getUrlParameter('userName');
  const gender = getUrlParameter('gender');
  const regDate = getUrlParameter('regDate');
  console.log(`토큰 파싱: ${token}`);

  if (token) {
    alert("소셜 로그인을 완료하였습니다.");
    console.log(`로컬 스토리지에 토큰 저장${token}`);
    localStorage.setItem('ACCESS_TOKEN', token);
    Cookies.set('ACCESS_TOKEN', token);
    Cookies.set('logedIn', true);
    Cookies.set('userId', userId);
    Cookies.set('memberNo', memberNo);
    Cookies.set('nickName', nickName);
    Cookies.set('userName', userName);
    Cookies.set('gender', gender);
    // Cookies.set('birth', res.data.data.birth);
    Cookies.set('regDate', regDate);
    dispatch(actions.loginSuccess(true));
    return (
      <Navigate
        to={{
          pathname: '/',
          // eslint-disable-next-line react/destructuring-assignment, react/prop-types
          state: { from: props.location },
        }}
      />
    );
  }
  return (
    <Navigate
      to={{
        pathname: '/member/signin',
        // eslint-disable-next-line react/destructuring-assignment, react/prop-types
        state: { from: props.location },
      }}
    />
  );
}

export default SocialLogin;
