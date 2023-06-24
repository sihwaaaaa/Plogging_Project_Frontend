/* eslint-disable no-restricted-globals */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Modal} from 'antd';
import { useDispatch } from 'react-redux';
// import { Option } from 'antd/lib/mentions';
import DaumPostcode from 'react-daum-postcode';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import { AuthFormWrap } from './style';
import signupImg from '../../../../static/img/logodemo.png';
import memberStyle from '../../../../static/css/memberPageStyle.scss';
import { register, emailAuth } from '../../../../redux/authentication/actionCreator';
import { resolve } from 'path';
import { DataService } from '../../../../config/dataService/dataService';
import axios from 'axios';
import { Calendar } from 'react-date-range';
import { useMemo } from 'react';
import SignIn from './SignIn';
// import FormItemLabel from 'antd/es/form/FormItemLabel';

const PopUpDom = ({ children }) => {
  const element1 = document.getElementById('popUpDom');
  return ReactDOM.createPortal(children, element1);
}






function SignUp() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [nickName, setNickName] = useState('');
  // const [userName, setUserName] = useState('');

  const [isUniqueId, setIsUniqueId] = useState(0); // 아이디 중복 여부

  const register = (values, callback) => {
    return async () => {
      try {
        const response = await DataService.register('/member/signup', values);
        if (response.data.data !== null) {
          callback();
        } else {
          alert("다시 확인해주세요");
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  }


  const saveEmailCode = (e) => {
    setEmailCode(e.target.value);
  }

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress);
    setAddress(fullAddress);
    // const changeAddress = () => setAddress(address => address + fullAddress);
    const addressDom = document.getElementById('address');  // ''
    console.log(address);
    addressDom.value = address;
    setIsPopUpOpen(false);
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const popUpOpen = (e) => {
    console.log(e);
    e.preventDefault();
    setIsPopUpOpen(true);
  }

  const popUpClose = () => {
    setIsPopUpOpen(false);
  }

  // 생년월일
  const now = new Date();
  const [birth, setBirth] = useState({
    year: new Date().getFullYear(),
    month: '01',
    day: '01',
  });
  const years = [];
  const months = [];
  const days = [];
  // 년
  for (let y = 1930; y < now.getFullYear(); y += 1) {
    years.push(y);
  }
  // 월
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      months.push(`0${m.toString()}`);
    } else {
      months.push(m.toString());
    }
  }
  // 일
  const date = new Date(birth.year, birth.month, 0).getDate();
  for (let d = 0; d <= date; d += 1) {
    if (d < 10) {
      days.push(`0${d.toString()}`);
    } else {
      days.push(d.toString());
    }
  }
  // 성별
  const [gender, setGender] = useState({
    selectList: ['남자', '여자'],
    selectValue: '남자',
  });
  // 우편번호 검색시 팝업창 띄울 여부
  // const [IsPopUpOpen, setIsPopUpOpen] = useState(false);

  // const handlePopUp = () => {
  //   setIsPopUpOpen(true);
  // }
  const handleGender = (e) => {
    setGender({
      selectValue: e.target.value,
    });
  };

  const saveEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleAuthEmail = async () => {
    alert("인증 번호가 발송되었습니다.");
    document.getElementById("authCode").type = "text"
    await DataService.emailAuth('/member/signup/emailConfirm', { email: email })
      .then((response) => {
        setAuthCode(response.data);
      });

  }

  const saveUserId = (e) => {
    setUserId(e.target.value);
  }

  const validateUserId = (e) => {
    // e.preventDefault();
    if(userId ==='') {
      alert("아이디가 비어 있습니다.");
      return false;
    }
    if(userId.length < 4 || userId.length > 12) {
      alert("4자 이상 12자리 이하여야 합니다.");
      return false;
    }
    DataService.checkId("/member/signup/checkId",{userId: userId})
    .then((response) => {
      if (response.status !== 200) {
        alert("아이디가 중복됩니다.");
        setIsUniqueId(0);
      } else {
        console.log(response);
        alert("사용 가능한 아이디입니다.");
        setIsUniqueId(1);
      }
    });
  }
  // Submit 했을 시에 값 등록
  const handleSubmit = (e) => {
    console.log(e);
    const { userId, password, nickName, userName, email } = e


    if (isUniqueId == 0) {
      alert("아이디 중복 체크를 하셔야 합니다.");
      return false;
    }

    if (authCode !== emailCode) {
      alert("인증 코드가 올바르지 않습니다.");
      return false;
    }



    dispatch(register({
      userId,
      password,
      nickName,
      userName,
      email,
      gender: gender.selectValue,
      birth: birth.year + "-" + birth.month + "-" + birth.day,
      // address
    }));
    
    dispatch(async () => {
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
    }, () => history("/member/signup/complete"))

  }
  return (
    <Row justify="center">
      <Col xxl={8} xl={12} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <img src={signupImg} alt='회원가입 로고'/>
          </div>
          <div className="ninjadash-authentication-content">
            <Form className='signup-form'  name="register" onFinish={handleSubmit} layout="vertical">
              <div className='idform'>
                <Form.Item
                  name="userId"
                  label="아이디"
                  rules={[
                    {
                      required: true,
                      validateTrigger: true,
                      validator: userId.length === 0,
                      message: '비어 있습니다.',
                    },
                    {
                      max: 12,
                      min: 4,
                      validateTrigger: true,
                      message: '4자리 이상 12자리 영소문자 및 숫자를 입력해주세요',
                    },
                    {
                      pattern: /^[a-z0-9]*$/,
                      validateTrigger: true,
                      message: '반드시 영소문자 및 숫자여야만 합니다.',
                    },
                  ]}
                >
                <Input 
                  id="userId" 
                  type='text' 
                  onChange={saveUserId} 
                  placeholder="아이디를 입력하세요" />
                </Form.Item>
                <Form.Item>
                  <Button className="btn-create" onClick={validateUserId} type="primary" size="large">
                    중복 체크
                  </Button>
                </Form.Item>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    validator: password.length === 0,
                    validateTrigger: true,
                    message: '비어 있습니다.',
                  },
                  {
                    min: 8,
                    max: 20,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message: '대소문자, 특수문자, 숫자 포함 8 ~ 20자리여야 합니다',
                  },
                ]}
                label="비밀번호"
              >
                <Input.Password onChange={handlePassword} placeholder="비밀번호를 입력해주세요." />
              </Form.Item>
              <Form.Item
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    validator: password.length === 0,
                    validateTrigger: true,
                    message: '비어 있습니다.',
                  },
                  {
                    min: 8,
                    max: 20,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message: '대소문자, 특수문자, 숫자 포함 8 ~ 20자리여야 합니다',
                  },
                  {
                    validateTrigger: true,
                    validator: password !== passwordConfirm,
                    message: '비밀번호가 일치하지 않습니다.'
                  }
                ]}
                label="비밀번호 확인"
              >
                <Input.Password onChange={handlePasswordConfirm} placeholder="비밀번호를 입력해주세요." />
              </Form.Item>
              <Form.Item label="이름" name="userName" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                <Input placeholder="본인 이름을 입력하세요" />
              </Form.Item>
              <Form.Item label="닉네임" name="nickName" rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}>
                <Input placeholder="닉네임을 입력하세요" />
              </Form.Item>
              <Form.Item label="성별" name="gender" className='gender-form'>
                <div className='male'>
                  <div>
                    <label for="남자" htmlFor="male">남자</label>
                  </div>
                  <div>
                  <Input
                    type='radio'
                    id="male"
                    value="남자"
                    checked={gender.selectValue === '남자'}
                    onClick={handleGender}
                    
                  />
                  </div>
                </div>
                <div className='female'>
                  <div>
                    <label for="여자" htmlFor='female'>여자</label>
                  </div>
                  <div>
                    <Input
                      type='radio'
                      id="female"
                      value="여자"
                      checked={gender.selectValue === '여자'}
                      onClick={handleGender}
                    />
                  </div>
                </div>
              </Form.Item>

              <Form.Item
                label="생년월일"
                className="birth-form"
                name="birth"
                rules={[{ required: false, message: '생년월일을 선택하세요.' }]}
              >
                <select
                  className="birth1"
                  value={birth.year}
                  onChange={(e) => setBirth({ ...birth, year: e.target.value })}
                >
                  {birth &&
                    years.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                </select>
                <span>년</span>
                <select
                  value={birth.month}
                  onChange={(e) =>
                    setBirth({
                      ...birth,
                      month: e.target.value,
                    })
                  }
                >
                  {birth &&
                    months.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                </select>
                <span>월</span>
                <select value={birth.day} onChange={(e) => setBirth({ ...birth, day: e.target.value })}>
                  {days &&
                    days.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                </select>
                <span>일</span>
              </Form.Item>
              <Form.Item className='address-form' label="주소" name="address">
                <div>
                  <Input readOnly id='address' placeholder="주소를 입력해주세요." value={address} />
                </div>
              </Form.Item>
              <div>
                <Button onClick={popUpOpen}>탐색</Button>
              </div>
              <div>
                  {isPopUpOpen && (
                    <Modal 
                      id='popUpDom' 
                      open={isPopUpOpen} 
                      onCancel={popUpClose}
                      footer={[]}>
                          <DaumPostcode className='modal-post' onComplete={handleComplete}/>
                    </Modal>
                    )
                  }
              </div>
              <Form.Item
                label="이메일"
                name="email"
                rules={[
                  {
                    required: true,
                    validateTrigger: true,
                    validator: email.length === 0,
                    message: '비어 있습니다.',
                  },
                  {
                    validateTrigger: true,
                    pattern: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                    message: '올바른 이메일 형식을 입력하세요',
                  },
                ]}
              >
                <Input
                  id='email'
                  name='email'
                  onChange={saveEmail}
                  placeholder="이메일을 입력하세요." />
              </Form.Item>
                <Button onClick={handleAuthEmail}>인증</Button>
              <Form.Item>
                <Input type="hidden" id='authCode' onChange={saveEmailCode} />
              </Form.Item>
              <Form.Item>
                <Button className="btn-create" htmlType="submit" type="primary" size="large">
                  회원 생성
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              이미 계정이 있습니까?<Link to="/member/signin">로그인</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
      </Row>
  );
}

export default SignUp;