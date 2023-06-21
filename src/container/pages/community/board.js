import React, { useEffect, useRef, useState } from "react";
import { Main } from '../../styled';
import "../../../static/css/boardStyle.scss";
import { Button, Col, Row } from "antd";
import BoardLayout from "./boardLayout";
import { DataService } from "../../../config/dataService/dataService";
import { Modal } from "../../../components/modals/antd-modals";
import { getItem } from "../../../utility/localStorageControl";
import BoardDetailLayout from "./BoardDetailLayout";

const Board = () => {

  const currentUserId = getItem('userId');
  const [boardList, setBoardList ] = useState([]);
  const [boardDetail, setBoardDetail] = useState([]);
  const [category, setCategory] = useState('');
  const [bno, setBno] = useState('');
  const [replyList, setReplyList] = useState([]);

  useEffect(() => {
    DataService.get(`/boards/${category}`)
      .then((response) => {
        setBoardList(response.data.data.content)
      })
  }, [category])

  const getBoardDetail = () => {
    DataService.get(`/board/${bno}`)
      .then((response) => {
        setBoardDetail(response.data)
      })
  }

  const getReplyList = () => {
    DataService.get(`/reply/${bno}`)
      .then((response) => {
        setReplyList(response.data)
      })
  }

  useEffect(() => {
    getBoardDetail()
    getReplyList()
  }, [bno])

  function detailClick(bno) {
    setBno(bno)
  }

  const scrollToTab = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if (elementRef.current !== null) {
      const selectBoard = elementRef.current.offsetTop - 110;
      window.scrollTo({
        top: selectBoard,
        behavior: 'smooth'
      })
    }
  }

  let allRef = useRef(null);
  let communityRef = useRef(null);
  let ploggingRef = useRef(null);
  let boardDetailRef = useRef(null);

  const categoryChange = (category) => {
    if(category === 'COMMUNITY') {
      setCategory('COMMUNITY')
      allRef.current.style.background = 'white'
      allRef.current.style.color = '#666D92'
      communityRef.current.style.background = '#47B0D7'
      communityRef.current.style.color = 'white'
      ploggingRef.current.style.background = 'white'
      ploggingRef.current.style.color = '#666D92'
    }else if(category === 'PLOGGING') {
      setCategory('PLOGGING')
      allRef.current.style.background = 'white'
      allRef.current.style.color = '#666D92'
      communityRef.current.style.background = 'white'
      communityRef.current.style.color = '#666D92'
      ploggingRef.current.style.background = '#FFCB77'
      ploggingRef.current.style.color = 'white'
    }else if(category === 'ALL'){
      setCategory('')
      allRef.current.style.background = '#a3a3a3'
      allRef.current.style.color = 'white'
      communityRef.current.style.background = 'white'
      communityRef.current.style.color = '#666D92'
      ploggingRef.current.style.background = 'white'
      ploggingRef.current.style.color = '#666D92'
    }
  }

  /**
   * @Author 천은경
   * @Date 23.06.13
   * @Brief 모달 기능
   */

  return (
    <>
      <Main>

        <div className="boardTitleWrapper">
          <h2>갬성이느껴지는 커뮤니티 제목 뭐가있지</h2>
        </div>
        {/*{*/}
        {/*  !!boardDetail ? (*/}
        {/*    <div className="boardDetailWrapper" ref={boardDetailRef}>*/}
        {/*      <div className="boardDetail" >*/}
        {/*        <BoardDetailLayout board={boardDetail.data} reply={replyList.data} />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ) : ''*/}
        {/*}*/}
        <div className="boardNoticeWrapper">
          <div className="noticeContainer">
            <div className="noticeTitle">
              <h4>함께하는 커뮤니티</h4>
            </div>
            <li>무분별한 중복글, 광고글은 작성하지 말아주세요</li>
            <li>작성시 사진을 함께 업로드 해주세요</li>
          </div>
        </div>
        <div className="boardCategoryWrapper">
          <div className="categoryContainer">
            <div className="btn all" ref={allRef} onClick={() => categoryChange('ALL')}>
              전체글
            </div>
            <div className="btn community" ref={communityRef} onClick={() => categoryChange('COMMUNITY')}>
              일상
            </div>
            <div className="btn plogging" ref={ploggingRef} onClick={() => categoryChange('PLOGGING')}>
              플로깅
            </div>
          </div>
          <div className="boardContainer">
            <div>
              <Row gutter={25} className="mt-sm-10">
                {boardList.map(board => {
                  return(
                    <Col xxl={6} xl={8} sm={12} xs={24} className="board" onClick={() => detailClick(board.bno)}>
                      <BoardLayout key={board.bno} board={board}  />
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default Board;
