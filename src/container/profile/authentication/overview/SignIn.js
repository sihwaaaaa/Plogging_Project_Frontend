import React, { useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Auth0Lock } from 'auth0-lock';
import { AuthFormWrap } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import { auth0options } from '../../../../config/auth0';
import socialLogin from '../../../../config/dataService/dataService';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  // // 아이디, 비밀번호
  // const [userId, setUserId] = useState('');
  // const [password, setPassword] = useState('');

  // 아이디, 비밀번호 오류 메세지
  // const [userIdMessage, setUserIdMessage] = useState('');
  // const [passwordMessage, setPasswordMessage] = useState('');
  // const [isUserId, setIsUserId] = useState(false);
  // const [isPassword, setIsPassword] = useState(false);
  // const onChangeUserId = useCallback((e) => {
  //   const userIdExp = /^[a-zA-Z0-9]*$/;
  //   if (e.target.value.length < 4 || e.target.value.length > 12) {
  //     setUserIdMessage('4자리 이상 12자리 이하로 입력해주세요');
  //     setIsUserId(false);
  //   }

  //   if (userIdExp.test(e.target.value)) {
  //     setUserIdMessage('반드시 영소문자 및 숫자로만 사용되어야 합니다.');
  //     setIsUserId(false);
  //   }
  //   setIsUserId(true);
  // }, []);
  // const onChangePassword = useCallback((e) => {
  //   const passwordExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  //   if (e.target.value.length < 8 || e.target.value.length > 20) {
  //     setPasswordMessage('8자리 이상 20자리 이하여야 합니다.');
  //     setIsPassword(false);
  //   }

  //   if (passwordExp.test(e.target.value)) {
  //     setPasswordMessage('대소문자, 특수문자 및 숫자를 포함하여야 합니다.');
  //     setIsPassword(false);
  //   }
  //   setIsPassword(true);
  // }, []);
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const lock = new Auth0Lock(clientId, domain, auth0options);
  const handleSubmit = useCallback(
    (values) => {
      // const data = new FormData(values.target);
      // const userId = data.get('userId');
      // const password = data.get('password');
      dispatch(login(values, () => history('/admin')));
    },
    [history, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }

      handleSubmit();
      socialLogin();
      lock.hide();
    });
  });

  const handleSocialLogin = (provider) => {
    socialLogin(provider);
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">로그인</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form method='POST' name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="userId"
                rules={[
                  {
                    type: 'text',
                    message: '아이디를 입력해주세요',
                  },
                  {
                    max: 12,
                    min: 4,
                    message: '4자리 이상 12자리 영소문자 및 숫자를 입력해주세요',
                    required: true,
                  },
                  {
                    pattern: /^[a-zA-Z0-9]*$/,
                    message: '반드시 영소문자 및 숫자여야만 합니다.',
                  },
                ]}
                // rules={[{ message: userIdMessage, required: true }]}
                initialValue="pkkj"
                label="아이디"
                // onChange={onChangeUserId}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                // rules={[{ message: '대소문자, 특수문자, 숫자 포함 8 ~ 20자리여야 합니다', required: true }]}
                rules={[
                  {
                    type: 'password',
                    message: '비밀번호를 입력하세요',
                  },
                  {
                    min: 8,
                    max: 20,
                    message: '대소문자, 특수문자, 숫자 포함 8 ~ 20자리여야 합니다',
                    required: true,
                  },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message: '대소문자, 특수문자, 숫자로만 이루어져 있어야 합니다.',
                  },
                ]}
                // rules={[{ message: passwordMessage, required: true }]}
                initialValue="wkwjsrj5!"
                label="비밀번호"
                // onChange={onChangePassword}
              >
                <Input.Password placeholder="비밀번호를 입력해주세요." />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  자동 로그인
                </Checkbox>
                <NavLink className="forgot-pass-link" to="/forgotPassword">
                  아이디/비밀번호 찾기
                </NavLink>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? '확인 중...' : '로그인'}
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
              <ul className="ninjadash-social-login">
                <li>
                  <Link onClick={() => handleSocialLogin('google')} itemType="submit">
                    <img src="../../../../static/img/btn_google_dark_normal_ios.png" alt="" />
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleSocialLogin('naver')} itemType="submit">
                    <img src="../../../../static/img/btnG_아이콘원형.png" alt="" />
                  </Link>
                </li>
                <li>
                  <Link onClick={() => handleSocialLogin('kakao')} itemType="submit">
                    <img src="../../../../static/img/btn_google_dark_normal_ios.png" alt="" />
                  </Link>
                </li>
              </ul>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              계정이 없으신가요?<Link to="/member/signup">회원가입</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
