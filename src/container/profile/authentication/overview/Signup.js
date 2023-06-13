/* eslint-disable import/named */
/* eslint-disable no-restricted-globals */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Input, Button} from 'antd';
import { useDispatch } from 'react-redux';
// import { Option } from 'antd/lib/mentions';
import DaumPostcode from 'react-daum-postcode';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import { AuthFormWrap } from './style';
import { register, emailAuth } from '../../../../redux/authentication/actionCreator';
// import FormItemLabel from 'antd/es/form/FormItemLabel';


/**
 * 
 * @param {*} param0 
 * @returns 
 */
const PopUpDom = ({children}) => {
  const element1 = document.getElementById("popUpDom");
  return ReactDOM.createPortal(children, element1);
}





function SignUp() {
  const dispatch = useDispatch();

  // 주소 state
  // const [openPostCode, setOpenPostCode] = React.useState<boolean>(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  // const [text, setText] = useState('');

  const handleAuthEmail = () => {
    const emailVal = document.getElementById('email').value;
    document.getElementById('authCode').type = "text";
    emailAuth(emailVal);
    // console.log(codeInput.getAttribute);
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
    const addressDom = document.getElementById('address');
    addressDom.value = fullAddress;
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
 
  const popUpOpen = (e) => {
    console.log(e);
    setIsPopUpOpen(true);
  }

  const popUpClose = () => {
    setIsPopUpOpen(false);
  }

  // 지금 있는 값 또는 체크를 한번에 관리하겠다는 의도
  // 성별 관리
  // const [isGender, setIsGender] = useState({
  //   male: false,
  //   female: false,
  // });
  // // 회원 아이디
  // const [userId, setUserId] = useState('');
  // // 비밀번호
  // const [password, setPassword] = useState('');
  // // 닉네임
  // const [nickName, setNickName] = useState('');
  // // 이름
  // const [userName, setUserName] = useState('');

  // 생년월일
  const now = new Date();
  const [birth, setBirth] = useState({
    year: '2022',
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
    console.log(e.target.value);
    setGender({
      selectValue: e.target.value,
    });
  };

  const handleAuthEmail = () => {
    const emailVal = document.getElementById("email").value;
    if (emailVal !== null) {
      document.getElementById("authCode").type = "text";
      emailAuth(emailVal);
    }
    
  }
  
  // Submit 했을 시에 값 등록
  const handleSubmit = (e) => {
    const { userId, password, nickName, userName, email, address} = e
    // const objValue = useState({
    //   userId, password, nickName, userName, email, gender, birth
    // });
    dispatch(register({
      userId,
      password,
      nickName,
      userName,
      email,
      gender: gender.selectValue,
      birth: birth.year + birth.month + birth.day,
      address
    }));
  };

  // const onChange = (checked) => {
  //   setState({ ...state, checked });
  // };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">회원가입</h2>
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
                <Input placeholder="아이디를 입력하세요" />
              </Form.Item>
              <Form.Item
                name="password"
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
                label="비밀번호"
                // onChange={onChangePassword}
              >
                <Input.Password placeholder="비밀번호를 입력해주세요." />
              </Form.Item>
              <Form.Item label="이름" name="userName" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                <Input placeholder="본인 이름을 입력하세요" />
              </Form.Item>
              <Form.Item label="닉네임" name="nickName" rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}>
                <Input placeholder="닉네임을 입력하세요" />
              </Form.Item>
              <Form.Item label="성별" name="gender">
                <FormItemLabel htmlFor="male">남자</FormItemLabel>
                <Input
                    type='radio'
                    id="male"
                    value="남자"
                    checked={gender.selectValue === '남자'}
                    onChange={handleGender}
                />
                <FormItemLabel htmlFor='female'>여자</FormItemLabel>
                  <Input
                    type='radio'
                    id="female"
                    value="여자"
                    checked={gender.selectValue === '여자'}
                    onChange={handleGender}
                  />
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
                년
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
                월
                <select value={birth.day} onChange={(e) => setBirth({ ...birth, day: e.target.value })}>
                  {days &&
                    days.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                </select>
                일
              </Form.Item>
              {/* <Form.Item label="우편번호" rules={[{ required: true, message: '주소를 입력해주세요.' }]}>
                <Input placeholder="주소를 입력해주세요." />
                <Button type='button' onClick={handlePopUp}></Button>
              </Form.Item> */}
              <Form.Item className='address-form' label="주소" name="address" rules={[{ required: true, message: '주소를 입력해주세요.' }]}>
                  <Input readOnly id='address' placeholder="주소를 입력해주세요." />
                  <Button onClick={popUpOpen}>버튼</Button>
                  <div id='popUpDom'>
                  {isPopUpOpen && 
                    <PopUpDom onClose={popUpClose}>
                      <DaumPostcode className='modal-post' onComplete={handleComplete} />
                    </PopUpDom>
                  }
                </div>
              </Form.Item>

              {/* <DaumPostcode 
                        onComplete={handlePostCode.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                        defaultQuery='판교역로' // 팝업을 열때 기본적으로 입력되는 검색어 
                      /> */}
              <Form.Item
                label="이메일"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: '이메일을 입력하세요',
                    required: true,
                  },
                  {
                    pattern: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                    message: '올바른 이메일 형식을 입력하세요',
                  },
                ]}
              >
                <Input
                  id='email'
                  name='email'
                  placeholder="이메일을 입력하세요." />
                <Button onClick={handleAuthEmail}>인증</Button>
                <Input type='hidden' id='authCode' />
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
              이미 계정이 있습니까?<Link to="/">로그인</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignUp;
