import React, { useEffect, useRef, useState } from "react";
import { Main } from '../../styled';
import "../../../static/css/boardStyle.scss";
import { Button, Col, Row } from "antd";
import BoardLayout from "./boardLayout";
import { DataService } from "../../../config/dataService/dataService";
import { getItem } from "../../../utility/localStorageControl";
import { useLocation, useNavigate } from "react-router-dom";
import CustomPagination from "../overview/CustomPagination";

const Board = () => {

  const currentUserId = getItem('userId');
  const [boardList, setBoardList ] = useState([]);
  const [category, setCategory] = useState('');


  const [page, setPage] = useState('');
  const [pageable, setPageable] = useState([]);
  const [scroll, setScroll] = useState(false);

  const changePage = useNavigate();
  const location = useLocation();


  useEffect(() => {
    DataService.get(`community/boards/${category}?page=${page}`)
      .then((response) => {
        setBoardList(response.data.data.content)
        setPageable(response.data.data)
        console.log(response.data.data)
      })
  }, [category, page])

  function detailClick(bno) {
    changePage(`/board/${bno}`, {
      state : {
        bno : `${bno}`
      }
    })
  }

  useEffect(() => {
    if(location.state) {
      categoryChange(location.state.category)
    }
  }, [])

  function registerClick() {
    changePage('/board/register')
  }

  const scrollToTab = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if (elementRef.current !== null) {
      const selectBoard = elementRef.current.offsetTop - 110;
      window.scrollTo({
        top: selectBoard,
        behavior: 'smooth',
      })
    }
  }

  let allRef = useRef(null);
  let communityRef = useRef(null);
  let ploggingRef = useRef(null);

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

  return (
    <>
      <Main>

        <div className="boardTitleWrapper">
          <h2>갬성이느껴지는 커뮤니티 제목 뭐가있지</h2>
        </div>
        <div className="boardNoticeWrapper">
          <div className="noticeContainer">
            <div className="noticeTitle">
              <h4>함께하는 커뮤니티</h4>
            </div>
            <li>무분별한 중복글, 광고글은 작성하지 말아주세요</li>
            <li>작성시 사진을 함께 업로드 해주세요</li>
          </div>
        </div>
        <div className="board-register-btn-wrapper">
          <div className="board-register-btn">
            <Button onClick={registerClick} >글 작성하기</Button>
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
              <div className="board-pagination">
                <CustomPagination page={page} setScroll={setScroll} setPage={setPage} result={pageable} />
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default React.memo(Board);
