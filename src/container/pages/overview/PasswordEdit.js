
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../../../config/dataService/dataService';
import { Button, Col, Form, Input, Row } from 'antd';

const PasswordEdit = () => {


  const memberNo = location.pathname.split('/')[2];

  const [originPass, setOriginPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const handleOrigin = (e) => {
    setOriginPass(e.target.value);
  }
  const handleNew = (e) => {
    setNewPass( e.target.value);
  }
  const handleConfirmNew = (e) => {
    setConfirmPass( e.target.value);
  }

  const validatePassword = async (values) => {

    if (newPass !== confirmPass) {
      alert("새로운 비밀번호가 일치하지 않습니다.");
      return false;
    }

    await DataService.post(`/profile/${memberNo}/passwordEdit`, values)
      .then((res) => {
        console.log(res);
        if (res.data.error != null) {
          setIsMatch(false);
        } else {
          setIsMatch(true);
        }
      })
  }


  return (
    <Row justify="center">
      <Col xxl={8} xl={12} md={12} sm={18} xs={24}>
    <Form name='passwordEdit' onFinish={validatePassword}>
      <Form.Item
        label="기존 비밀번호"
        htmlFor=''
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
            validator: originPass.length === 0,
            validateTrigger: true,
            message: '비어 있습니다.',
          },
        ]}>
        <Input.Password name='ddd' onChange={handleOrigin} placeholder="기존 비밀번호를 입력하세요" />
      </Form.Item>
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
            required: true,
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
      <div>
        <ul>
          <li>
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large">
              재설정
            </Button>
          </Form.Item>
          </li>
          <li>
            <Link to={history.back}></Link>
          </li>
        </ul>
      </div>
        </Form>
        </Col>
      </Row>
  );
};

export default PasswordEdit;