import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
import { DataService } from '../../../../config/dataService/dataService';

function ForgotPassword() {
  const [state, setState] = useState({
    values: null,
  });
  const handleSubmit = (values) => {
    setState({ ...state, values });
    checkId()
  };

  checkPassword(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }


  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
            <div className="ninjadash-authentication-top">
              <h2 className="ninjadash-authentication-top__title">Forgot Password?</h2>
            </div>
            <div className="ninjadash-authentication-content">
              <Form.Item
                label="이름"
                name="userName"
                rules={[{ required: true, message: '이름을 입력해주세요', type: 'text' }]}
              >
                <Input placeholder="예) 홍길동" />
              </Form.Item>
              <Form.Item
                label="아이디"
                name="userId"
                rules={[{ required: true, message: '아이디를 입력해주세요', type: 'text' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                label="이메일"
                name="email"
                rules={[{ required: true, message: '이메일을 입력해주세요', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                  Send Reset Instructions
                </Button>
              </Form.Item>
            </div>
            <div className="ninjadash-authentication-bottom">
              <p className="return-text">
                로그인 하러 가기 <Link to="/">로그인</Link>
              </p>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
