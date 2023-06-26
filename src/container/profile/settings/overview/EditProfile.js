import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Modal } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Tag } from '../../../../components/tags/tags';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import img1 from '../../../../../src/static/img/profile/post/70.png';
import DaumPostcode from 'react-daum-postcode';
import editProfileStyle from '../../../../static/css/editProfileStyle.scss';
import { DataService } from '../../../../config/dataService/dataService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

const { Option } = Select;
function EditProfile() {
  const [form] = Form.useForm();




  // const checked = (checke) => {
  //   setState({ tags: checke });
  // };
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
  const handleGender = (e) => {
    setGender({
     ...gender, selectValue: e.target.value,
    });
  };

  const onIntroChange = (e) => {
    setState({
     ...state, intro: e.target.value
    })
  }
  const onUserNameChange = (e) => {
    setState({
     ...state, userName: e.target.value
    })
  }
  const onAddressChange = (e) => {
    setAddress(...address, e.target.value);
  }
  const onAddressDetailChange = (e) => {
    setState({
     ...state, addressDetail: e.target.value
    })
  }
  const onNickNameChange = (e) => {
    setState({
     ...state, nickName: e.target.value
    })
  }

  const [memberNo, setMemberNo] = useState(0);
  const [userId, setUserId] = useState('');
  const [nickName, setNickName] = useState('');
  const [userName, setUserName] = useState('');
  const [intro, setIntro] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [genderStr, setGenderStr] = useState(false);
  const [birthStr, setBirthStr] = useState('');

  
  const [state, setState] = useState({
    memberNo: 0,
    userId: '',
    nickName: '',
    userName: '',
    intro: '',
    addressDetail: '',
    gender: '',
    birth: '',
  });

  // 주소 팝업창 제어
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    const no = location.pathname.split("/")[2];
    DataService.get(`/profile/${no}/edit`)
      .then((res) => {
        console.log(res.data.data.address);
        console.log(res.data.data.nickName);
        const dateArr = res.data.data.birth.split("-");
        setGender({
          selectValue: res.data.data.gender
        });
        setBirth({
          year: dateArr[0],
          month: dateArr[1],
          day: dateArr[2]
        });

        setAddress(res.data.data.address);
        setState({
          memberNo: res.data.data.memberNo,
          userId: res.data.data.userId,
          nickName: res.data.data.nickName,
          userName: res.data.data.userName,
          intro: res.data.data.intro,
          addressDetail: res.data.data.addressDetail,
          birth: birth.year + '-' + birth.month + '-' + birth.day,
          gender: gender.selectValue
        });
        
        
      })
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    Cookies.set('nickName', values.nickName);
    Cookies.set('userName', values.userName);
    Cookies.set('address', values.address);
    Cookies.set('addressDetail', values.addressDetail);
    Cookies.set('gender', values.gender);
    Cookies.set('birth', values.birth);

    await DataService.put("/profile/edit", values)
      .then(() => {
        alert("프로필 수정이 완료되었습니다.");
        location.reload();
    })      

    
  }



  const history = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    form.resetFields();
    history(`/profile/${state.memberNo}`)
  };

  const fields = [
    {name: ['memberNo'], value: state.memberNo},
    {name: ['password'], value: state.password},
    {name: ['userId'], value: state.userId},
    {name: ['userName'], value: state.userName},
    {name: ['nickName'], value: state.nickName},
    {name: ['gender'], value: gender.selectValue},
    {name: ['address'], value: address},
    {name: ['addressDetail'], value: state.addressDetail},
    {name: ['intro'], value: state.intro},
    {name: ['birth'], value: birth.year + "-" + birth.month + "-" + birth.day}
  ]
  return (
    <Cards
    title={
      <div className="setting-card-title">
          <Heading as="h4">프로필 편집</Heading>
          {/* <span>Set Up Your Personal Information</span> */}
        </div>
      }
      >
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            <Form fields={fields} name="editProfile" onFinish={handleSubmit}>
              <Form.Item
                    name="memberNo"
                    initialValue={state.memberNo} >
                <Input type='hidden' />
              </Form.Item>
              <Form.Item
                    name="userId"
                    initialValue={state.userId} >
                <Input type='hidden' />
              </Form.Item>
              <div className='image-intro'>
                <div className="card-image">
                  <img src={img1} alt='뱃지 이미지'/>
                </div>
                <div>
                  
                  <Form.Item
                    name="intro"
                     >
                    <Input.TextArea onChange={onIntroChange} rows={3} defaultValue={state.intro}  placeholder='자기소개를 입력하세요' />
                  </Form.Item>
                </div>
              </div>
              <div className='essential-form'>
                <Form.Item label="이름" name="userName" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                  <Input onChange={onUserNameChange} defaultValue={state.userName}  placeholder="본인 이름을 입력하세요" />
                </Form.Item>
                <Form.Item label="닉네임" name="nickName" rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}>
                  <Input onChange={onNickNameChange} defaultChecked={state.nickName}  placeholder="닉네임을 입력하세요" />
                </Form.Item>
              </div>
              <Form.Item className='address-form' label="주소"  name="address">
                <div>
                  <Input readOnly id='address' value={address} placeholder="주소를 입력해주세요."/>
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
              <div className='address-detail'>
                <Form.Item initialValue={state.addressDetail} label="상세주소" name="addressDetail"  htmlFor='male'>
                  <Input onChange={onAddressDetailChange}  name='addressDetail' id="addressDetail"/>
                </Form.Item>
              </div>
              <div className='gender-selection'>
                <Form.Item initialValue={state.gender} label="성별" name="gender" className='' htmlFor='male'>
                  <div>
                    <div>
                      <FormItemLabel label="남자" htmlFor="male">남자</FormItemLabel>
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
                  <div>
                    <div>
                      <FormItemLabel label="여자" htmlFor='female'>여자</FormItemLabel>
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
              </div>
              <div className='birth-form'>
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
              </div>
              <div className="setting-form-actions">
                <div>
                  <Button size="default" htmlType="submit" type="primary">
                    프로필 수정
                  </Button>
                  &nbsp; &nbsp;
                  <Button size="default" onClick={handleCancel} type="light">
                    취소
                  </Button>
                </div>
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
}

export default React.memo(EditProfile);
