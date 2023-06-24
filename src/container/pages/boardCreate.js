import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Col, Row, DatePicker, message } from 'antd';
import propTypes from 'prop-types';
import Dragger from 'antd/lib/upload/Dragger';
import { Button } from '../../components/buttons/buttons';
import { Modal } from '../../components/modals/antd-modals';
import { BasicFormWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { DataService } from "../../config/dataService/dataService";

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

function boardCreate({ visible, onCancel }) {
  const [form] = Form.useForm();

  const [state, setState] = useState({
    visible,
    modalType: 'primary',
    checked: [],
  });



  const boardCreate = (data) => {
    DataService.post('/board', { data })
      .then((response) => {
        // setchallenges(response.data.data);
        console.log(response.data.data);
        console.log(response.status);
        console.log(response.config.headers.Author);
      });
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
    <Modal
      type={state.modalType}
      title="게시물 생성"
      visible={state.visible}
      footer={[
        <div key="1" className="project-modal-footer">
          <Button size="default" type="primary" key="submit" onClick={boardCreate}>
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
            <Form.Item name="project" label="">
              <Input
                rules={[{ max: 20, min: 5, message: '20자 이내로 적어주세요' }]}
                placeholder="챌린지 이름*"
              />
            </Form.Item>
            <Form.Item name="category" initialValue="" label="">
              <Select style={{ width: '100%' }} >
                <Option value="">공개 챌린지</Option>
                <Option value="one">비공개 챌린지</Option>
              </Select>
            </Form.Item>
            <Form.Item label="">
              <Input.TextArea rows={4} placeholder="챌린지 소개*"  />
            </Form.Item>

            <Form.Item name="personnel" label="챌린지 인원수*">
              <Input placeholder="최소2명에서 10명까지 설정가능합니다" />
            </Form.Item>
            <Row gutter={15}>
              <Col md={12} xs={24}>
                <Form.Item name="startDate" label="챌린지 시작날짜*">
                  <DatePicker placeholder="mm/dd/yyyy" format={dateFormat} />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item name="endDate" label="챌린지 모집 마감날짜*">
                  <DatePicker placeholder="mm/dd/yyyy" format={dateFormat} />
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
  );
}

boardCreate.propTypes = {
  visible: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
};

export default boardCreate;