import React, { useEffect, useState } from "react";
import BoardRegisterOrEdit from "./boardRegisterOrEdit";
import { DataService } from "../../../config/dataService/dataService";
import { useLocation, useNavigate } from "react-router-dom";
import { Main } from "../../styled";
import { alertModal } from "../../../components/modals/antd-modals";
import { getItem } from "../../../utility/localStorageControl";


const BoardRegister = () => {

  const location = useLocation();
  const changePage = useNavigate();

  const [title, setTitle] = useState(''); // 제목
  const [content, setContent] = useState(''); // 내용
  const [ploggingNo, setPloggingNo] = useState(null); // 플로깅 번호
  const [bno, setBno] = useState('') // 보드pk
  const [attach, setAttach] = useState({});

  const [isUpdate, setIsUpdate] = useState(false); // 해당 글 생성인지 수정인지
  const [toDetail, setToDetail] = useState(false);
  const [isPlogging, setIsPlogging] = useState(false);

  const article = {title , content , ploggingNo , attach};
  const updateArticle = {bno : bno, title : title, content : content};


  useEffect(() => {
    if(!getItem('memberNo')){
      selfDestroyed()
    }
  },[])

  const selfDestroyed = () => {
    let secondsToGo = 1.5;
    const modal = alertModal.success({
      title: '이용권한이 없습니다',
      content: '',
    });

    setTimeout(() => {
      modal.destroy();
      changePage('/')
    }, secondsToGo * 1000);
  };



  /**
   * @Author 천은경
   * @Date 23.06.23
   * 메인에서 글쓰기버튼으로 온건지 상세페이지에서 수정버튼으로 온건지
   * location 값의 유무를 통해 확인한 후 isUpdate 설정
   */
  useEffect(() => {
    if(!!location.state) {
      if(location.state.isUpdate && location.state.boardDetail.ploggingNo === null) {
        setIsUpdate(true)
      } else if (location.state.isUpdate && location.state.boardDetail.ploggingNo !== null) {
        setIsUpdate(true)
        setIsPlogging(true)
      } else if (!location.state.isUpdate && location.state.boardDetail.ploggingNo !== null) {
        setIsPlogging(true);
      }
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
    } else if (isPlogging) {
      setPloggingNo(location.state.boardDetail.ploggingNo)
    }
  }, [isUpdate, isPlogging])

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 최초시, article 변경시 실행
   * location 값 x : 일상 글작성, 메인페이지로
   * location 값 o & 플로깅값 o & 업데이트값 x : 플로깅 글작성, 메인페이지로
   * location 값 o & 플로깅값 x & 없데이트값 o : 일상 글수정, 상세페이지로
   * location 값 o & 플로깅값 o & 업데이트값 x : 플로깅 글수정, 상세페이지로
   */
  useEffect(() => {
    if(title && title.length > 0) {
      if(!location.state || (location.state.boardDetail.ploggingNo !== null && !location.state.isUpdate)) {
        submitBoard(article)
        toMainPage()
      } else if (toDetail) {
        updateBoard(updateArticle)
        changePage(`/board/${bno}`, {
          state : {
            bno : bno
          },
          replace : true
        })
      }
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
        console.log(response)
      })
  }


  return (
    <Main style={{background:"#FEF9EF"}}>
      <BoardRegisterOrEdit article={article} setToDetail={setToDetail}
                           setAttach={setAttach}
                           title={title} setTitle={setTitle}
                           setContent={setContent} content={content}
                           isUpdate={isUpdate} setIsUpdate={setIsUpdate}
                           toMainPage={toMainPage} />
    </Main>
  );
};

export default BoardRegister;