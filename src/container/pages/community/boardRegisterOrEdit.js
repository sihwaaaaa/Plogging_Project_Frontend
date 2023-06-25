import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cards } from '../../../components/cards/frame/cards-frame';
import "../../../static/css/boardRegisterStyle.scss";
import { Button } from "../../../components/buttons/buttons";
import { axiosFileUploder } from "../../../redux/crud/axios/actionCreator";
import { DataService } from "../../../config/dataService/dataService";


const BoardRegisterOrEdit = (props) => {

  const title = props.title;
  const setTitle = props.setTitle;
  const content = props.content;
  const setContent = props.setContent;
  const isUpdate = props.isUpdate;
  const setToDetail = props.setToDetail;
  const [ploggingNo, setPloggingNo] = useState('');

  // const fileData = new FormData();
  // const [fileData, setFileData] = useState([]);
  const data = new FormData();
  const fileInputRef = useRef();
  const priviewImg = useRef();


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

  const selectFile = () => {
    event.preventDefault();
    const selectedFile = fileInputRef.current.files[0];
    const fileData = new FormData();
    fileData.append("files", fileInputRef.current.files[0])
    data.append("files", fileInputRef.current.files[0])

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);

    fileReader.onload = function () {
      priviewImg.current.src = fileReader.result;
    }

    submitFile(fileData)
  }

  const submitFile = (data) => {
    event.preventDefault();
    DataService.post(`/file/upload3`, {data}, {"Content-Type" : "multipart/form-data"})
      .then((response) => {
        console.log("response", response)
      })
  }


  return (
    <div className='board-register-wrapper'>
      <Cards className="board-register-container" headless>
        <form action={'/board'} encType="multipart/form-data" >
          <div className="form-attach-wrapper">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={selectFile} />
            <button onClick={submitFile}>클릭</button>
            <img style={{maxHeight:150}} ref={priviewImg} alt="미리보기"></img>
          </div>
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
              <Button size="small" transparented type="warning" onClick={updateSubmit}>수정</Button>
              ) : (
              <Button size="small" transparented  type="success" onClick={formSubmit}>등록</Button>
              )}
            <Button size="small" transparented type="danger" onClick={cancelSubmit}>취소</Button>
          </div>
        </form>
      </Cards>
    </div>

  );
};

export default BoardRegisterOrEdit;