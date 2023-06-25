import React, { useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthFormWrap } from './style';
import memberStyle from "../../../../static/css/memberPageStyle.scss";
import { Checkbox } from '../../../../components/checkbox/checkbox';
import socialLogin, { DataService } from '../../../../config/dataService/dataService';
import Cookies from 'js-cookie';
import logodemo from '../../../../static/img/logodemo.png'
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { ReactComponent as CircleShape } from "../../../../static/img/kakao-svgrepo-com.svg";
import naverImg from "../../../../static/img/btnG_아이콘원형.png";
import { ReactComponent as GoogleShape } from "../../../../static/img/Google__G__Logo.svg";
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  // // 아이디, 비밀번호
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  
  // const [userId, setUserId] = useState('');
  // const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  
  // const lock = new Auth0Lock(clientId, domain, auth0options);
  const handleSubmit = useCallback(
    (values) => {
      // const data = new FormData(values.target);
      // const userId = data.get('userId');
      // const password = data.get('password');
      dispatch(login(values, () => history('/')));
    },
    [history, dispatch],
  );

  const login = (values, callback) => {
    return async () => {
        await DataService.login('/member/signin', values)
          .then((res) => {
            if (res.data.error !== null) {
              setIsError(true);
              return false;
            } else {
              Cookies.set('ACCESS_TOKEN', res.data.data.token);
              Cookies.set('logedIn', true);
              Cookies.set('userId', res.data.data.userId);
              Cookies.set('memberNo', res.data.data.memberNo);
              Cookies.set('nickName', res.data.data.nickName);
              Cookies.set('userName', res.data.data.userName);
              Cookies.set('gender', res.data.data.gender);
              Cookies.set('birth', res.data.data.birth);
              Cookies.set('regDate', res.data.data.regDate);
              callback();
              location.reload();
            }
          })
    };
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  const [alertClassName, setAlertClassName] = useState('alert-view')

  const handleSocialLogin = (provider) => {
    socialLogin(provider);
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
          <Link><img src={logodemo} alt="Logo" /></Link>
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
              <div className={isError ? 'alert-view' : 'alert-hidden'}>
                <h5>아이디 및 비밀번호가 일치하지 않습니다.</h5>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large" onSubmit>
                  {isLoading ? '확인 중...' : '로그인'}
                </Button>
              </Form.Item>
              <div className='btn-social-login'>
              <ul>
                <li>
                  <div className='kakao-login'>
                    <Link onClick={() => handleSocialLogin('kakao')} itemType="submit">
                      {/* <div id='svgCircle'> */}
                          <svg className='kakao-circle'>
                              <circle cx={20} cy={20} r={20} fill='yellow'/>
                              <CircleShape width="60" height="60" fill="black" />
                          </svg>
                      {/* </div> */}
                    </Link>
                  </div>
                </li>
                <li>
                  <div className='naver-login'>
                    <Link onClick={() => handleSocialLogin('naver')} itemType="submit">
                      <img src={naverImg} alt='네이버 로그인 아이콘'/>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className='google-login'>
                    <Link onClick={() => handleSocialLogin('google')} itemType="submit">
                      <svg className='google-circle'>
                        <circle cx={20} cy={20} r={20} fill='yellow'/>
                        <GoogleShape width="60" height="60" />
                      </svg>
                    </Link>
                  </div>
                </li>
              </ul>
              </div>
              <div className="ninjadash-authentication-bottom">
                <p>
                  계정이 없으신가요?<Link to="/member/signup">회원가입</Link>
                </p>
              </div>
            </Form>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
