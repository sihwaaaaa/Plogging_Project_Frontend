import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../static/css/boardStyle.scss";
import { DataService } from "../../../config/dataService/dataService";
import BoardDetailLayout from "./BoardDetailLayout";
import { UilHome } from "@iconscout/react-unicons";

const BoardDetail = () => {

  const location = useLocation();
  const bno = location.state.bno;
  const [boardDetail, setBoardDetail] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [replyContent, setReplyContent] = useState('');

  const changePage = useNavigate();
  
  useEffect(() => {
    console.log("댓글 변경")
  }, [replyList])
  

  useEffect(() => {
    DataService.get(`/reply/${bno}`)
      .then((response) => {
        setReplyList(response.data.data)
      })
  }, [replyContent])


  /**
   * @Athor 천은경
   * @Date 23.06.24
   * backend 댓글 단일 조회 get 메서드
   * (location 변경시마다)
   */
  useEffect(() => {
    DataService.get(`community/board/${bno}`)
      .then((response) => {
        setBoardDetail(response.data.data)
      })
  }, [location])

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
    console.log('삭제')
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
        boardDetail : boardDetail
      }
    })
  }


  return (
    <>
      <div className="boardDetailTitle">
        <div className="homeBtnWrapper">
          <Link to={"/board"} className="homeBtn">
            <UilHome size={20} />
            <span>커뮤니티</span>
          </Link>
        </div>
      </div>
      <div className="boardDetailWrapper" >
        <div className="boardDetail detailPage" >
          <BoardDetailLayout board={boardDetail} reply={replyList}
                             changePage={changePage}
                             replyContent={replyContent} setReplyContent={setReplyContent}
                             updateBoard={() => toEditPage()} deleteBoard={clickDeleteBoard}
          />
        </div>
      </div>
    </>
  )
}

export default React.memo(BoardDetail);