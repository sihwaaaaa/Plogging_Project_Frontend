import React, { useState } from "react";
import { Form, Input,  message } from "antd";
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import RichTextEditor from 'react-rte';
import WriteActionButton from "../../../components/board/WriteActionButton";

function VerticalForm({ onChange }) {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Form Components',
    },
  ];
  const [state, setState] = useState({
    onChangeValue: null,
    value: RichTextEditor.createEmptyValue(),
  });
  const onSliderChange = (value) => {
    setState({ ...state, onChangeValue: value });
  };

  const onTextInput = (value) => {
    setState({ ...state, value });
    if (onChange) {
      onChange(value.toString('html'));
    }
  };
  const log = () => {
    // console.log(e);
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

  const title = () => {

  }

  return (
    <BasicFormWrapper>
      <VerticalFormStyleWrap>
        <Cards title="게시글 작성">
          <Form name="ninjadash-vertical-form" layout="vertical">
            <Form.Item name="title" initialValue="제목을 입력해주세요" label="Title" value={title}>
              <Input />
            </Form.Item>
            <Form.Item name="content" initialValue="내용을 입력하세요" label="글 내용">
                <div className="ninjadash_editor">
                  <RichTextEditor placeholder="내용을 입력하세요" value={state.value} onChange={onTextInput} />
                </div>
            </Form.Item>
            <Form.Item name="password" initialValue="" label="이미지첨부">
              <Input />
            </Form.Item>
            <div className="ninjadash-form-action">
              <WriteActionButton />
            </div>
          </Form>

        </Cards>
      </VerticalFormStyleWrap>

    </BasicFormWrapper>
  );
}

// VerticalForm.propTypes = {
//   onChange: propTypes.func,
// };

export { VerticalForm };
