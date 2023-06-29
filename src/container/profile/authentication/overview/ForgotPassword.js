import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
import { DataService } from '../../../../config/dataService/dataService';
import logo from '../../../../static/img/logodemo.png';
import { useForm } from 'antd/lib/form/Form';
import '../../../../static/css/memberPageStyle.scss';

function ForgotPassword() {

  const [isSend, setIsSend] = useState(false);

  const [state, setState] = useState({
    values: null
  });
  const handleSubmit = async (values) => {
    console.log(values);
    setState(values);
    await DataService.checkPassword("/member/resetPassword", values)
      .then(res => {
        if (res.status == 200) {
          setIsSend(true);
          console.log(res);
        } else {
          console.log("응답 에러 ");
        }
      })
  };

  useEffect(() => {
    setIsSend(false);
  }, [])

  const ForgotPass = () => {
    return (
      <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
    <AuthFormWrap>
      <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
      <div className="ninjadash-authentication-top">
        <img src={logo} alt='메인 로고' />
        <h2>비밀번호 찾기</h2>
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
            이메일로 비밀번호 찾기
          </Button>
        </Form.Item>
      </div>
      <div className="ninjadash-authentication-bottom">
        <p className="return-text">
          로그인 하러 가기 <Link to="/member/signin">로그인</Link>
        </p>
      </div>
        </Form>
          </AuthFormWrap>
          </Col>
      </Row>
    )
  }
  
  const SuccessSend = () => {
    return (
      <Row justify="center">
        <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
          <AuthFormWrap>
            <div className="ninjadash-authentication-content">
              <h4>{state.email}로 성공적으로 이메일을 발송했습니다. 본인 이메일을 통해서 비밀번호를 재설정해주세요</h4>
            </div>
        </AuthFormWrap>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      {isSend === false ? <ForgotPass /> : <SuccessSend />}
    </div>
  );
}

export default ForgotPassword;
