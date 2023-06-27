import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
import { DataService } from '../../../../config/dataService/dataService';
import logo from '../../../../static/img/logodemo.png';
import '../../../../static/css/memberPageStyle.scss';

function ForgotUserId() {
  const [state, setState] = useState({
    values: null,
  });

  const [userId, setUserId] = useState('');
  const [condition, setCondition] =useState(false);

  const handleSubmit = async (values) => {
    setState({ ...state, values });
    console.log(values);
    await DataService.post("/member/findId", values)
      .then((res) => {
        if (res.data.data !== null) {
          setCondition(true);
          setUserId(res.data.data);
          alert("이메일로 발송되었습니다");
        } else {
          setCondition(false);
        }
      });

  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
            <div className="ninjadash-authentication-top">
              <img src={logo} alt='메인 로고' />
              <h2>아이디 찾기</h2>
            </div>
            <div className="ninjadash-authentication-content">
              <Form.Item
                label="이름"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: '이름을 입력해주세요',
                    type: 'text'
                  }]}
              >
                <Input placeholder="root1234" />
              </Form.Item>
              <Form.Item
                label="이메일"
                name="email"
                rules={[
                {
                    required: true,
                    message: '이메일을 입력해주세요',
                    type: 'email'
                }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-reset" htmlType="submit" type="primary"  size="large">
                  본인 명의로 이메일 발송
                </Button>
              </Form.Item>
              <p className="return-text" style={{ flex: 1, textAlign: 'center', padding: '5px 0'}}>
                비밀번호를 잊으셨나요? <Link to="/member/forgotPassword">비밀번호 찾기</Link>
              </p>
            </div>
            <div className="ninjadash-authentication-bottom">
              <p className="return-text">
                로그인 하러가기 <Link to="/">로그인</Link>
              </p>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ForgotUserId;
