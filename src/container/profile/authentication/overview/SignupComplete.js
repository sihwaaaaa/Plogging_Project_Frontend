import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { AuthFormWrap } from './style';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import memberPageStyle from '../../../../static/css/memberPageStyle.scss';
import Cookies from 'js-cookie';
import { getItem } from "../../../../utility/localStorageControl";

const SignupComplete = () => {
    const [state, setState] = useState({
      values: null,
    });
    const handleSubmit = (values) => {
      setState({ ...state, values });
    };

    const memberNo = getItem('memberNo');
 

    return (
      <Row justify="center">
        <Col xxl={15} xl={12} md={12} sm={18} xs={24}>
          <div>
            <div>
              <h1 style={{fontSize: "50px", textAlign: "center"}}>회원가입이 완료되었습니다.</h1>
              <h1 style={{fontSize: "50px", textAlign: "center"}}>환경 지킴이 운동 줍깅 사이트에 오신 것을 환영합니다!</h1>
            </div>

            <div className='home-mypage'>
              <ul>
                <li>
                  <Button size='large'>
                    <NavLink to="/">
                      <h1>홈으로</h1>
                    </NavLink>
                  </Button>
                </li>
                <li>
                  <Button size='large'>
                    <NavLink to={`/profile/${memberNo}`} state={{memberNo : memberNo}}>
                      <h1>마이페이지</h1>
                    </NavLink>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

export default SignupComplete;