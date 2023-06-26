import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cards } from '../../../components/cards/frame/cards-frame';
import "../../../static/css/boardRegisterStyle.scss";
import { Button } from "../../../components/buttons/buttons";
import { DataService } from "../../../config/dataService/dataService";
import { UilScenery } from "@iconscout/react-unicons";
import { alertModal } from "../../../components/modals/antd-modals";
import axios from "axios";


const BoardRegisterOrEdit = (props) => {

  const title = props.title;
  const setTitle = props.setTitle;
  const content = props.content;
  const setContent = props.setContent;
  const isUpdate = props.isUpdate;
  const setToDetail = props.setToDetail;
  const setAttach = props.setAttach;
  const [ploggingNo, setPloggingNo] = useState('');

  const data = new FormData();
  const fileInputRef = useRef();
  const priviewImg = useRef();
  const inputFilebtn = useRef();

  const formSubmit = (submit) => {
    event.preventDefault();
    if(document.getElementsByClassName('form-title-input').title.value === null
      || document.getElementsByClassName('form-title-input').title.value === ''){
      warning("title");
    } else if (fileInputRef.current.files.length === 0){
      warning("file");
    } else {
      selfDestroyed();
      setTitle(document.getElementsByClassName('form-title-input').title.value)
      setContent(document.getElementsByClassName('form-content').content.value)
      if(submit === "update") {
        setToDetail(true);
      }
    }
  }

  const selectFile = async () => {
    event.preventDefault();
    const selectedFile = fileInputRef.current.files[0];
    const fileData = new FormData();
    fileData.append("files", fileInputRef.current.files[0])

    inputFilebtn.current.style.display = "none"
    priviewImg.current.style.display = "flex"

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = function () {
      priviewImg.current.src = fileReader.result;
    }

    await axios.post('http://localhost:8080/attach/upload', fileData, {
      headers : {
        "Content-Type" : "multipart/form-data",
      }
    }).then((response) => {
      console.log(response)
      setAttach(response.data)
    })

  }

  const showCancelConfirm = () => {
    alertModal.confirm({
      title: '취소하시겠습니까?',
      content: '작성 중인 글이 저장되지 않습니다.',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 200);
        }).then(props.toMainPage()).catch(() => {});
      },
      onCancel() {},
    });
  };

  const warning = (text) => {
    alertModal.warning({
      title: text === "title" ? '제목을 입력해 주세요' : '사진을 첨부해 주세요',
      content: '',
    });
  };

  const selfDestroyed = () => {
    let secondsToGo = 1.2;
    const modal = alertModal.success({
      title: '성공적으로 저장되었습니다',
      content: '',
    });

    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  };


  return (
    <div className='board-register-wrapper'>
      <Cards className="board-register-container" headless>
        <form action={'/board'} encType="multipart/form-data" >
          <div className="form-wrapper">
            <div className="form-title-wrapper">
              <div className="form-title">
              </div>
              <input className="form-title-input" name="title" type="text" defaultValue={title} placeholder="제목을 입력해 주세요" />
            </div>
            <div className="form-content-wrapper">
              <textarea className="form-content" name="content" defaultValue={content}  placeholder="내용을 입력해 주세요" />
            </div>
            <div className="attach-wrapper">
              <label htmlFor="fileInput" className="display-file-input">
                <div ref={inputFilebtn}>
                  <UilScenery size={30} />
                  <span>파일 첨부</span>
                </div>
                <img ref={priviewImg} alt="미리보기"></img>
              </label>
              <input type="file" id="fileInput" accept="image/*" ref={fileInputRef} onChange={selectFile} />
              {/*<button onClick={submitFile}>클릭</button>*/}
            </div>
            <div className="form-btn">
              {isUpdate ? (
                <Button size="small" transparented type="warning" onClick={() => formSubmit("update")}>수정</Button>
              ) : (
                <Button size="small" transparented  type="success" onClick={() => formSubmit("")}>등록</Button>
              )}
              <Button size="small" transparented type="danger" onClick={showCancelConfirm}>취소</Button>
            </div>
          </div>
        </form>
      </Cards>
    </div>

  );
};

export default BoardRegisterOrEdit;