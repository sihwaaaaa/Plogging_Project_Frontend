import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';
import SocialLogin from '../container/profile/authentication/overview/SocialLogin';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));

const AuthRoot = () => {
  const navigate = useNavigate();

  useEffect(() => navigate('/'));
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route path='signin' element={<Login />} />
      <Route path="socialLogin" element={<SocialLogin />} />
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
