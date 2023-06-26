import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
import { DataService } from '../../../../config/dataService/dataService';

function FindId() {


  const memberNo = location.pathname.split("/")[3];
  const [userId, setUserId] = useState('');
  useEffect(() => {
    DataService.get(`/member/findId/${memberNo}`)
      .then((res) => {
        console.log(res.data.data);
        if (res.data !== null) {
          setUserId(res.data.data.userId);
        }
      })
  }, [])

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <h1>당신의 아이디는 {userId} 입니다.</h1>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default FindId;
