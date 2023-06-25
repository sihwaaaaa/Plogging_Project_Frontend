import React, { useEffect } from "react";
import { BlogCardStyleWrap } from "../../../components/cards/Style";
import image from "../../../static/img/boardEx.jpg";
import badge from "../../../static/img/logodemo.png";
import { getItem } from "../../../utility/localStorageControl";
import { UilComment, UilMultiply } from "@iconscout/react-unicons";
import { DataService } from "../../../config/dataService/dataService";
import { Button } from "../../../components/buttons/buttons";

const BoardDetailLayout = (data) => {

  const currentUserId = getItem('userId');
  const boardNo = data.board.bno;
  const category = data.board.category;
  const writerNo = data.board.memberNo;
  const writerId = data.board.userId;
  const title = data.board.title;
  const content = data.board.content;
  const regDate = data.board.regDate;
  const updateDate = data.board.updateDate;
  const plogging = data.board.ploggingNo;
  const replyCnt = data.board.replyCount;

  const replys = data.reply;
  const currentReplys = data.currentReplys;
  const setCurrentReplys = data.setCurrentReplys;

  const replyContent = data.replyContent;
  const setReplyContent = data.setReplyContent;

  const replyInput = {reply : replyContent, bno: boardNo};

  const deleteBoard = data.deleteBoard;
  const updateBoard = data.updateBoard;

  console.log(replys)
  console.log("재할당", currentReplys)


  /**
   * @Author 천은경
   * @Date 23.06.23
   * @param data
   * input 태그에 입력한 값을 엔터 또는 버튼 클릭시에 replyContent에 저장
   */
  const submitReply = (data) => {
    event.preventDefault();
    setReplyContent(data.target[0].value);
  }
  function clickSubmitReply(data) {
    event.preventDefault();
    setReplyContent(data[0].value)
  }

  /**
   * @Author 천은경
   * @Date 23.06.23
   * replyContent가 변경될때마다 즉 댓글 엔터 또는 버튼클릭시마다
   * 각 값을 json형태로 변환한 replyInput으로 backend에 post
   */
  useEffect(() => {
    if(replyContent.length > 0){
      registerReply(replyInput);
    }
  }, [replyContent])

  /**
   * @Author 천은경
   * @Date 23.06.23
   * @param data
   * backend 댓글 post 메서드
   */
  const registerReply = (data) => {
    DataService.post('/reply/write', {data},'')
      .then((response) => {
        console.log(response)
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.24
   * 댓글 삭제
   */
  const clickRemoveReply = (rno) => {
    console.log(rno)
    removeReply(rno)
  }

  /**
   * @Author 천은경
   * @Date 23.06.24
   * backend 댓글 삭제 delete 메서드 호출
   */
  const removeReply = (rno) => {
    DataService.delete(`/reply/delete/${rno}`)
      .then((response) => {
        console.log(response.data)
        currentReplys.filter(r => r.rno !== response.data)
      })
  }


  /**
   * @Author 천은경
   * @Date 23.06.23
   * @param category
   * 상세페이지에서 카테고리 태그 클릭시, 카테고리별 전체조회 페이지로 이동
   */
  const toCategory = (category) => {
    data.changePage(`/board`, {
      state : {
        category : category
      }
    })
  }

  const toProfile = (memberNo) => {
    data.changePage(`/profile/${memberNo}`)
  }


  return (
    <>
      <BlogCardStyleWrap style={{
        marginBottom:20,
      }}>
        <figure className={`ninjadash-blog ninjadash-blog-style-2`}
                style={{
                  marginBottom: 0,
                  boxShadow: "1px 1px 3px #ededed"
                }}>
          <div className="ninjadash-blog-thumb">
            <img className="ninjadash-blog__image" src={image} alt="plogging" />
          </div>
          <figcaption>
            <div className="ninjadash-blog-meta ninjadash-blog-meta-theme-2">
            <span className="ninjadash-blog-meta__single ninjadash-category-meta">
              {category === 'PLOGGING' ? (
                <span onClick={() => toCategory('PLOGGING')} style={{color : "#FFCB77", cursor: "pointer"}}>플로깅</span>
              ) : category === 'COMMUNITY' ? (
                <span onClick={() => toCategory('COMMUNITY')} style={{color : "#47B0D7", cursor: "pointer"}}>일상</span>
              ) : ''
              }
            </span>
              <span className="ninjadash-blog-meta__single ninjadash-date-meta">{regDate}</span>
            </div>
            <h2 className="ninjadash-blog__title">
              <div>{title}</div>
            </h2>
            <p className="ninjadash-blog__text">{content}</p>
            <div className="ninjadash-blog__bottom">
              <div className="ninjadash-blog__author">
                <div className="badge-wrapper">
                  <img className="ninjadash-blog__author-img" src={badge} alt="뱃지" />
                </div>
                <div className="writer-wrapper" onClick={() => toProfile(writerNo)}>
                  <div className="writer-name">
                    <span className="ninjadash-blog__author-name">{writerId}</span> ( 은경 )
                  </div>
                  <div className="writer-info">게시물 5개 / 플로깅 2회</div>
                </div>
              </div>
              {writerId === currentUserId ? (
                <div className="btn-by-status">
                  <Button size="extra-small" transparented type="warning" onClick={updateBoard}>수정</Button>
                  <Button size="extra-small" transparented type="danger" onClick={deleteBoard}>삭제</Button>
                </div>
                ) : (
                <div className="btn-by-status">
                  <Button>플친 신청</Button>
                </div>
              )}
            </div>
          </figcaption>
        </figure>
      </BlogCardStyleWrap>
      <div className="replyWrapper">
        <div className="replyTitle">
          <h4>댓글</h4>
        </div>
        <form className="replyInputWrapper" onSubmit={(data) => submitReply(data)}>
          <input className="replyInput" placeholder="댓글을 작성해 보세요"></input>
          <Button className="replyBtn" onClick={() => clickSubmitReply(document.getElementsByClassName('replyInput'))}>작성하기</Button>
        </form>
        <div className="replyList">
          {!!currentReplys && currentReplys.length > 0 ? currentReplys.map(reply => {
            return (
              <div className="replyContainer">
                <div className="WriterContainer">
                  <img src={badge} alt="뱃지" />
                </div>
                <div className="replyContent">
                  <div className="reply-info">
                    <span>{reply.replyerId}</span>
                    <div>{reply.regDate}</div>
                  </div>
                  <div className="content">
                    {reply.reply}
                  </div>
                </div>
                {reply.replyerId === currentUserId ? (
                  <div className="removeBtn" onClick={() => clickRemoveReply(reply.rno)}>
                    <UilMultiply size={15} />
                  </div>
                ) : ''
                }
              </div>
            )
          }) : (
            <div style={{padding: "30px 0"}}>아직 댓글이 없어요</div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(BoardDetailLayout);