import React, { useEffect, useState } from "react";
import BoardRegisterOrEdit from "./boardRegisterOrEdit";
import { DataService } from "../../../config/dataService/dataService";
import { useLocation, useNavigate } from "react-router-dom";


const BoardRegister = () => {

  const location = useLocation();
  const changePage = useNavigate();

  const [title, setTitle] = useState(''); // 제목
  const [content, setContent] = useState(''); // 내용
  const [ploggingNo, setPloggingNo] = useState(null); // 플로깅 번호
  const [bno, setBno] = useState('') // 보드pk

  const [isUpdate, setIsUpdate] = useState(false); // 해당 글 생성인지 수정인지
  const [toDetail, setToDetail] = useState(false);

  const article = {title : title, content : content, ploggingNo : ploggingNo};
  const updateArticle = {bno : bno, title : title, content : content};

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 메인에서 글쓰기버튼으로 온건지 상세페이지에서 수정버튼으로 온건지
   * location 값의 유무를 통해 확인한 후 isUpdate 설정
   */
  useEffect(() => {
    if(!!location.state) {
      setIsUpdate(true)
    }
  },[])


  /**
   * @Author 천은경
   * @Date 23.06.23
   * 최초시, isUpdate가 변경시 실행
   * 이때 location에 따라 isUpdate가 true가 된 경우, location으로 넘어온 값들을 재할당
   */
  useEffect(() => {
    if(isUpdate) {
      setBno(location.state.boardDetail.bno)
      setTitle(location.state.boardDetail.title)
      setContent(location.state.boardDetail.content)
    }
  }, [isUpdate])

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 최초시, article 변경시 실행
   * location 값이 존재하는 경우: 글작성, 메인페이지로
   * location 값이 부재하는 경우: 글수정, 상세페이지로
   */
  useEffect(() => {
    if(title && title.length > 0 && !location.state) {
      submitBoard(article)
      toMainPage()
    } else if(title.length > 0 && toDetail && !!location.state) {
      updateBoard(updateArticle)
      changePage(`/board/${bno}`, {
        state : {
          bno : bno
        }
      })
    }
  }, [article])

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 메인페이지로 이동 함수
   */
  function toMainPage() {
    changePage(`/board`, {replace: true})
  }

  /**
   * @Author 천은경
   * @Date 23.06.23
   * @param data
   * 글 작성 메서드
   */
  const submitBoard = (data) => {
    DataService.post('/community/register', { data }, '')
      .then((response) => {
        console.log(response)
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.23
   * @param data
   * 글 수정 메서드
   */
  const updateBoard = (data) => {
    DataService.put(`community/update`, {data})
      .then((response) => {
        console.log("1", response)
        if(response.data){
          console.log("두번", response.data)
        }
      })
  }


  return (
    <div>
      <BoardRegisterOrEdit article={article} setToDetail={setToDetail}
                           title={title} setTitle={setTitle}
                           setContent={setContent} content={content}
                           isUpdate={isUpdate} setIsUpdate={setIsUpdate}
                           toMainPage={toMainPage} />
    </div>
  );
};

export default BoardRegister;