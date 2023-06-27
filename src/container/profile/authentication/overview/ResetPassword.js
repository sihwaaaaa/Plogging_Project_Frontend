import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
import { DataService } from '../../../../config/dataService/dataService';
import logo from '../../../../static/img/logodemo.png';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import '../../../../static/css/memberPageStyle.scss';

function ResetPassword() {
  
  const dispatch = useDispatch();
  const history = useNavigate();

  const location = useLocation();
  const memberNo = location.pathname.split("/")[3]
  
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSubmit = async () => {
    
    const obj = { password: newPass };
    await DataService.resetPassword(`/member/resetPassword/${memberNo}/passwordEdit`, obj)
      .then(res => {
        if (res.data.data !== null) {
          alert("비밀번호 재설정을 완료하였습니다.");
          dispatch(() => history("/member/signin"));
        } else {
          console.log("응답 에러 ");
        }
      })
  };


  const handleNew = (e) => {
    setNewPass( e.target.value);
  }
  const handleConfirmNew = (e) => {
    setConfirmPass( e.target.value);
  }

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
            <div className="ninjadash-authentication-top">
              <img src={logo} alt='메인 로고'/>
            </div>
            <div className="ninjadash-authentication-content">
            <Form.Item
        label="새로운 비밀번호"
        name="password"
        rules={[
          {
            validateTrigger: true,
            required: true,
            min: 8,
            max: 20,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            message: '대소문자, 특수문자, 숫자 포함 8 ~ 20자리여야 합니다',
          },
          {
            required: true,
            validator: newPass.length === 0,
            validateTrigger: true,
            message: '비어 있습니다.',
          },
        ]}>
        <Input.Password onChange={handleNew} placeholder="비밀번호를 입력하세요" />
      </Form.Item>
      <Form.Item
        label="비밀번호 재확인"
        rules={[
          {
            required: true,
            min: 8,
            max: 20,
            validateTrigger: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            message: '대소문자, 특수문자, 숫자 포함 8 ~ 20자리여야 합니다',
          },
          {
            validator: confirmPass.length === 0,
            validateTrigger: true,
            message: '비어 있습니다.',
          },
          {
            validator: newPass != confirmPass,
            validateTrigger: true,
            message: '새로운 비밀번호와 일치하지 않습니다.',
          }
        ]}>
        <Input.Password onChange={handleConfirmNew} placeholder="비밀번호를 재입력하세요." />
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

export default ResetPassword;
