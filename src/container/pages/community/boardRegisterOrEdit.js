import React, { useEffect } from "react";
import { Cards } from '../../../components/cards/frame/cards-frame';
import "../../../static/css/boardRegisterStyle.scss";
import { Button } from "antd";


const BoardRegisterOrEdit = (props) => {

  const title = props.title;
  const setTitle = props.setTitle;
  const content = props.content;
  const setContent = props.setContent;
  const isUpdate = props.isUpdate;
  const setToDetail = props.setToDetail;
  const ploggingNo = null;

  const formSubmit = () => {
    event.preventDefault();
    setTitle(document.getElementsByClassName('form-title-input').title.value)
    setContent(document.getElementsByClassName('form-content').content.value)
  }

  const cancelSubmit = () => {
    event.preventDefault();
    props.toMainPage();
  }

  const updateSubmit = () => {
    event.preventDefault();
    setTitle(document.getElementsByClassName('form-title-input').title.value)
    setContent(document.getElementsByClassName('form-content').content.value)
    setToDetail(true);
  }

  return (
    <div className='board-register-wrapper'>
      <Cards className="board-register-container" headless>
        <form action={'/board'}>
          <div className="form-title-wrapper">
            <div className="form-title">
            </div>
            <input className="form-title-input" name="title" type="text" defaultValue={title} placeholder="제목을 입력해 주세요" />
          </div>
          <div className="form-content-wrapper">
            <textarea className="form-content" name="content" defaultValue={content}  placeholder="내용을 입력해 주세요" />
          </div>
          <div className="form-btn">
            {isUpdate ? (
              <Button onClick={updateSubmit}>수정</Button>
              ) : (
              <Button onClick={formSubmit}>등록</Button>
              )}
            <Button onClick={cancelSubmit}>취소</Button>
          </div>
        </form>
      </Cards>
    </div>

  );
};

export default BoardRegisterOrEdit;