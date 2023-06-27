import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';
import SocialLogin from '../container/profile/authentication/overview/SocialLogin';
import ForgotPassword from '../container/profile/authentication/overview/ForgotPassword';
import ForgotUserId from '../container/profile/authentication/overview/ForgotUserId';
import SignupComplete from '../container/profile/authentication/overview/SignupComplete';
import FindId from '../container/profile/authentication/overview/FindId';
import FindPassword from '../container/profile/authentication/overview/ResetPassword';
import ResetPassword from '../container/profile/authentication/overview/ResetPassword';

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
      <Route path="findId/:memberNo" element={<FindId />} />
      <Route path="resetPassword/:memberNo/passwordEdit" element={<ResetPassword />} />
      <Route path="socialLogin" element={<SocialLogin />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="forgotUserId" element={<ForgotUserId />} />
      <Route path="complete" element={<SignupComplete />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
