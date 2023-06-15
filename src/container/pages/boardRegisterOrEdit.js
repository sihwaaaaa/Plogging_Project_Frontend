import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Input, message, Select } from "antd";
import { Cards } from '../../components/cards/frame/cards-frame';
import RichTextEditor from 'react-rte';
import Dragger from "antd/lib/upload/Dragger";
const { TextArea } = Input;


function BoardRegisterOrEdit({onChange}) {

  const goBack = useNavigate();
  const [state, setState] = useState({
    onChangeValue: null,
    value: RichTextEditor.createEmptyValue(),
  });
  const onTextInput = (value) => {
    setState({ ...state, value });
    if (onChange) {
      onChange(value.toString('html'));
    }
  };
  const onSliderChange = (value) => {
    setState({ ...state, onChangeValue: value });
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
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <Cards title="게시글 작성">
        <Form name="ninjadash-vertical-form" layout="vertical">
          <Form.Item name="title" initialValue="제목을 입력해주세요" label="제목">
            <Input onChange={props.handleTitleChange} defaultValue={props.title} type="text" name="title" />
          </Form.Item>
          <hr></hr>
          <Form.Item name="category" initialValue="" label="">
            <Select style={{ width: '100%' }} >
              <Option value="">공개</Option>
              <Option value="one">비공개</Option>
            </Select>
          </Form.Item>
          <hr></hr>
          <Form.Item name="content" initialValue="내용을 입력하세요" label="내용">
            <div className="ninjadash_editor">
              <RichTextEditor placeholder="내용을 입력하세요" value={state.value} onChange={onTextInput} />
            </div>
          </Form.Item>
          <hr></hr>
          <Form.Item name="password" initialValue="" label="이미지첨부">
            <div className="ninjadash_uploader-list">
              <Dragger {...props}>
                <p className="ant-upload-text">사진을 업로드 해주세요!</p>
              </Dragger>
            </div>
          </Form.Item>

          <div className="ninjadash-form-action">
            <Button  className="btn-signin" onClick={() => goBack(-1)} htmlType="submit" type="light" size="large">
              취소
            </Button>
            <Button className="btn-signin" type="primary" size="large" onClick={props.handleSubmit}>
              {props.updateRequest ? "수정" : "등록"}
            </Button>
          </div>
        </Form>
      </Cards>
    </div>

  );
};

export default BoardRegisterOrEdit;