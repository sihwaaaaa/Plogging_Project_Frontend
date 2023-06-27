import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../static/css/boardStyle.scss";
import { DataService } from "../../../config/dataService/dataService";
import BoardDetailLayout from "./BoardDetailLayout";
import { UilHome } from "@iconscout/react-unicons";
import { Main } from "../../styled";
import { alertModal } from "../../../components/modals/antd-modals";

const BoardDetail = () => {

  const location = useLocation();
  const bno = location.state ? location.state.bno : '';
  const [boardDetail, setBoardDetail] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [replyContent, setReplyContent] = useState('');

  const [currentReplys, setCurrentReplys] = useState([]);

  const changePage = useNavigate();

  useEffect(() => {
    if(!location.state) {
      selfDestroyed()
    } else {
      getBoard()
      getReply()
    }
  }, [])

  const selfDestroyed = () => {
    let secondsToGo = 1.2;
    const modal = alertModal.success({
      title: '잘못된 접근입니다',
      content: '',
    });
    setTimeout(() => {
      modal.destroy();
      changePage('/')
    }, secondsToGo * 1000);
  };


  const getReply = () => {
    DataService.get(`/reply/${bno}`)
      .then((response) => {
        setReplyList(response.data.data)
        // currentReplys.unshift(...response.data.data.content)
      })
  }

  /**
   * @Athor 천은경
   * @Date 23.06.24
   * backend 글 단일 조회 get 메서드
   */
  const getBoard = () => {
    DataService.get(`community/board/${bno}`)
      .then((response) => {
        setBoardDetail(response.data.data)
      })
  }

  /**
   * @Athor 천은경
   * @Date 23.06.24
   * backend 댓글 삭제 delete 메서드
   */
  const deleteBoard = () => {
    DataService.delete(`community/delete/${bno}`)
      .then((response) => {
        console.log(response)
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 글 삭제
   */
  const clickDeleteBoard = () => {
    toMainPage()
    deleteBoard()
  }

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 메인페이지 이동
   */
  function toMainPage() {
    changePage(`/board`, {
      replace: true
    })
  }

  /**
   * @Author 천은경
   * @Date 23.06.23
   * 수정페이지 이동
   */
  function toEditPage() {
    changePage('/board/register', {
      state : {
        isUpdate : true,
        boardDetail : boardDetail,
      }
    })
  }

  return (
    <Main style={{background: "white"}}>
      <div className="boardDetailTitle">
        <div className="homeBtnWrapper">
          <Link to={"/board"} className="homeBtn">
            <UilHome size={20} />
            <span>커뮤니티홈</span>
          </Link>
        </div>
      </div>
      <div className="boardDetailWrapper" >
        <div className="boardDetail detailPage" >
          <BoardDetailLayout board={boardDetail} reply={replyList}
                             currentReplys={currentReplys} setCurrentReplys={setCurrentReplys}
                             changePage={changePage}
                             replyContent={replyContent} setReplyContent={setReplyContent}
                             updateBoard={() => toEditPage()} deleteBoard={clickDeleteBoard}
          />
        </div>
      </div>
    </Main>
  )
}

export default React.memo(BoardDetail);