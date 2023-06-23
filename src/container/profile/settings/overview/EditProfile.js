import React, { useState } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Tag } from '../../../../components/tags/tags';
import FormItemLabel from 'antd/es/form/FormItemLabel';
import img1 from '../../../../../src/static/img/profile/post/70.png';
import editProfileStyle from '../../../../static/css/editProfileStyle.scss';

const { Option } = Select;
function EditProfile() {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });

  const handleSubmit = (values) => {
    setState({ ...state, values: { ...values, tags: state.tags } });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    form.resetFields();
  };

  const checked = (checke) => {
    setState({ tags: checke });
  };

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
      selectValue: e.target.value,
    });
  };
  
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
            <Form name="editProfile" onFinish={handleSubmit}>
              <div className='image-intro'>
                <div className="card-image">
                  <img src={img1} alt='뱃지 이미지'/>
                </div>
                <div>
                  <Form.Item
                    name="intro"
                    initialValue="Nam malesuada dolor tellus pretium amet was hendrerit facilisi id vitae enim sed ornare there suspendisse sed orci neque ac sed aliquet risus faucibus in pretium molestee."
                  >
                    <Input.TextArea rows={3} placeholder='자기소개를 입력하세요' />
                  </Form.Item>
                </div>
              </div>
              <div className='essential-form'>
                <Form.Item label="이름" name="userName" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                  <Input placeholder="본인 이름을 입력하세요" />
                </Form.Item>
                <Form.Item label="닉네임" name="nickName" rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}>
                  <Input placeholder="닉네임을 입력하세요" />
                </Form.Item>
              </div>
              <div className='gender-selection'>
                <Form.Item label="성별" name="gender" className='' htmlFor='male'>
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

export default EditProfile;
