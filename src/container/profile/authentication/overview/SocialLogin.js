import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import actions from '../../../../redux/authentication/actions';

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
  console.log(`토큰 파싱: ${token}`);
  if (token) {
    console.log(`로컬 스토리지에 토큰 저장${token}`);
    localStorage.setItem('ACCESS_TOKEN', token);
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
