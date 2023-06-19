import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Col, Row, DatePicker, message, Checkbox } from "antd";
import propTypes from 'prop-types';
import Dragger from 'antd/lib/upload/Dragger';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import { BasicFormWrapper } from '../styled';
import { DataService } from "../../config/dataService/dataService";
import { Cards } from '../../components/cards/frame/cards-frame';
import { getItem } from "../../utility/localStorageControl";
import { Link } from "react-router-dom";


const { Option } = Select;

function Redirect() {
  return null;
}

function ChallengeCreate({ visible, onCancel }) {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date() )
  const [blind, setBlind] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [challengeCreate, setChallengeCreate] =useState({
    title: "",
    content:"",
    personnel:2,
  })

  const blindCheck = () => {
    if(blind === false){
      setBlind(true)
    }else {
      setBlind(false)
    }
    console.log(blind)
  }
  const changeValue = (e) => {
    console.log(e);
    setChallengeCreate({
      ...challengeCreate,
      [e.target.name] : e.target.value
    })
    console.log(e.target.value)
  }
  const startDateValue = (e,dateString) => {
    console.log("Date e : " + e)
    console.log(dateString)
    setStartDate({
      ...startDate,
      startDate: dateString
    })
  }
  const endDateValue = (e,dateString) => {
    console.log("Date e : " + e)
    console.log(dateString)
    setEndDate({
      ...endDate,
      endDate: dateString
    })
  }
  let obj = Object.assign(challengeCreate,blind,startDate,endDate)
  const submitChallenge = (e) => {
    e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함
    fetch("http://localhost:8080/challenge",{
      method:"POST",
      headers: {
        "Content-type":"application/json; charset=utf-8",Authorization: `Bearer ${getItem('ACCESS_TOKEN')}`
      },
      body: JSON.stringify(obj)
    }).then((res)=>window.location.replace("challenge"));
  }


  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);

  const handleOk = () => {
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
    <Modal
      type={state.modalType}
      title="챌린지 생성"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={submitChallenge} >
            챌린지 만들기
          </Button>
          <Button size="default" type="white" key="back" outlined onClick={handleCancel}>
            취소
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div className="project-modal">
        <BasicFormWrapper>
          <Form form={form} name="createProject" onFinish={handleOk}>
            <Form.Item name="title" label="">
              <Input
                rules={[{ max: 20, min: 5, message: '20자 이내로 적어주세요' }]}
                placeholder="챌린지 이름*"
                onChange={changeValue}
                name="title"
              />
            </Form.Item>
            <Form.Item initialValue="" label="">
              {/*<Select style={{ width: '100%' }} onChange={blindCheck} name="blind">*/}
                <Checkbox onClick={blindCheck} name="blind">비공개 챌린지</Checkbox>
              {/*</Select>*/}
            </Form.Item>
            <Form.Item label="챌린지소개"  >
              <Input.TextArea rows={4} placeholder="챌린지 소개*" onChange={changeValue} name="content" />
            </Form.Item>

            <Form.Item name="personnel" label="챌린지 인원수*">
              <Input placeholder="최소2명에서 10명까지 설정가능합니다" onChange={changeValue} name="personnel" />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12} xs={24}>
                <Form.Item label="챌린지 시작날짜*" name="startDate">
                  <DatePicker  placeholder="yyyy/mm/dd/" onChange={startDateValue} name="startDate" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item label="챌린지 모집 마감날짜*" name="endDate">
                  <DatePicker placeholder="yyyy/mm/dd/" onChange={endDateValue} name="endDate" />
                </Form.Item>
              </Col>
            </Row>
            <Cards title="챌린지 사진" className="mb-25">
              <div className="ninjadash_uploader-list">
                <Dragger {...props}>
                  <p className="ant-upload-text">사진을 업로드 해주세요!</p>
                </Dragger>
              </div>
            </Cards>
          </Form>
        </BasicFormWrapper>
      </div>
    </Modal>
    </>
  );

}

ChallengeCreate.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default ChallengeCreate;
