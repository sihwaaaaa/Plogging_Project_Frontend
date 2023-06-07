import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Row, Col, Form, Input, Button } from 'antd';
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
import UilGithub from '@iconscout/react-unicons/icons/uil-github';

import { useDispatch } from 'react-redux';
import { AuthFormWrap } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import { register } from '../../../../redux/authentication/actionCreator';

function SignUp() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Sign Up HexaDash</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="userId"
                label="아이디."
                rules={[
                  {
                    required: true,
                    message: '아이디를 입력해주세요',
                    type: 'userId',
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
              >
                <Input placeholder="root" />
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
                initialValue="123456"
                label="비밀번호"
                // onChange={onChangePassword}
              >
                <Input.Password placeholder="비밀번호를 입력해주세요." />
              </Form.Item>
              <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item label="닉네임" name="nickName" rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}>
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                label="성별"
                name="gender"
                rules={[{ required: true, message: 'Please input your Full name!' }]}
              >
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                label="생년월일"
                name="birth"
                rules={[{ required: true, message: 'Please input your Full name!' }]}
              >
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                label="이메일"
                name="email"
                rules={[{ required: true, message: 'Please input your Full name!' }]}
              >
                <Input placeholder="Full name" />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Creating an account means you’re okay with our Terms of Service and Privacy Policy
                </Checkbox>
              </div>
              <Form.Item>
                <Button className="btn-create" htmlType="submit" type="primary" size="large">
                  Create Account
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
              <ul className="ninjadash-social-login">
                <li>
                  <Link className="google-social" to="#">
                    <ReactSVG src={require(`../../../../static/img/icon/google-plus.svg`).default} />
                  </Link>
                </li>
                <li>
                  <Link className="facebook-social" to="#">
                    <UilFacebook />
                  </Link>
                </li>
                <li>
                  <Link className="twitter-social" to="#">
                    <UilTwitter />
                  </Link>
                </li>
                <li>
                  <Link className="github-social" to="#">
                    <UilGithub />
                  </Link>
                </li>
              </ul>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              이미 계정이 있습니까?<Link to="/">로그인</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignUp;
