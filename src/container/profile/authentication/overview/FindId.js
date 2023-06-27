import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { AuthFormWrap } from './style';
import { DataService } from '../../../../config/dataService/dataService';
import memberPageStyle from '../../../../static/css/memberPageStyle.scss';

function FindId() {


  const memberNo = location.pathname.split("/")[3];
  const [userId, setUserId] = useState('');
  useEffect(() => {
    DataService.get(`/member/findId/${memberNo}`)
      .then((res) => {
        console.log(res.data.data);
        const resultId = new String(res.data.data.userId);
        const encodedId = resultId.replace(resultId.substring(3, resultId.length), "****");
        if (res.data !== null) {
          setUserId(encodedId);
        }
      })
  }, [])

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <Form name="forgotPass" layout="vertical">
            <div className="ninjadash-authentication-top">
              <div>
                <h2 className="ninjadash-authentication-top__title">Forgot Password?</h2>
              </div>
            </div>
            <div className="ninjadash-authentication-content">
              <p className="forgot-text">
               <h2>당신의 아이디는 {userId} 입니다.</h2>
              </p>
              <Form.Item>
                <Button className="btn-reset" htmlType="submit" type="primary" size="large">
                  로그인 하러 가기
                </Button>
              </Form.Item>
            </div>
            <div className="ninjadash-authentication-bottom">
              <p className="return-text">
                비밀번호를 잊으셨나요? <Link to="/member/forgotPassword">비밀번호 찾기</Link>
              </p>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default FindId;
