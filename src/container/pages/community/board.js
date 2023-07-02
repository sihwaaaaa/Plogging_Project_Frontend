import React, { useCallback, useEffect, useRef, useState } from "react";
import { Main } from '../../styled';
import "../../../static/css/boardStyle.scss";
import { Col, Row } from "antd";
import BoardLayout from "./boardLayout";
import { DataService } from "../../../config/dataService/dataService";
import { getItem } from "../../../utility/localStorageControl";
import { useLocation, useNavigate } from "react-router-dom";
import CustomPagination from "../overview/CustomPagination";
import { Button } from '../../../components/buttons/buttons';
import { alertModal } from "../../../components/modals/antd-modals";
import logosmall from "../../../static/img/plogginglogo.png"

const Board = () => {

  // board
  const currentUserId = getItem('userId');
  const [boardList, setBoardList ] = useState([]);
  const [category, setCategory] = useState('');

  // pagination
  const [page, setPage] = useState(0);
  const [pageable, setPageable] = useState([]);
  const [scroll, setScroll] = useState(false);

  // Navigate and location
  const changePage = useNavigate();
  const location = useLocation();

  // useRef
  let allRef = useRef(null);
  let communityRef = useRef(null);
  let ploggingRef = useRef(null);


  useEffect(() => {
    DataService.get(`community/boards/${category}?page=${page}`)
      .then((response) => {
        setBoardList(response.data.data.content)
        setPageable(response.data.data)
      })
  }, [category, page, location])



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
    if(currentUserId) {
      changePage('/board/register')
    } else {
      selfDestroyed();
    }
  }

  const selfDestroyed = () => {
    let secondsToGo = 1.2;
    const modal = alertModal.success({
      title: '로그인 후 이용해 주세요',
      content: '',
    });

    setTimeout(() => {
      modal.destroy();
      changePage('/member/signin')
    }, secondsToGo * 1000);
  };

  const scrollToTab = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if (elementRef.current !== null) {
      const selectBoard = elementRef.current.offsetTop - 110;
      window.scrollTo({
        top: selectBoard,
        behavior: 'smooth',
      })
    }
  }


  const categoryChange = (category) => {
    if(category === 'COMMUNITY') {
      setCategory('COMMUNITY')
      allRef.current.style.background = 'white'
      allRef.current.style.color = '#666D92'
      communityRef.current.style.background = '#47B0D7'
      communityRef.current.style.color = 'white'
      ploggingRef.current.style.background = 'white'
      ploggingRef.current.style.color = '#666D92'
      scrollToTab(allRef)
    }else if(category === 'PLOGGING') {
      setCategory('PLOGGING')
      allRef.current.style.background = 'white'
      allRef.current.style.color = '#666D92'
      communityRef.current.style.background = 'white'
      communityRef.current.style.color = '#666D92'
      ploggingRef.current.style.background = '#FFCB77'
      ploggingRef.current.style.color = 'white'
      scrollToTab(allRef)
    }else if(category === 'ALL'){
      setCategory('')
      allRef.current.style.background = 'rgb(150 200 189)'
      allRef.current.style.color = 'white'
      communityRef.current.style.background = 'white'
      communityRef.current.style.color = '#666D92'
      ploggingRef.current.style.background = 'white'
      ploggingRef.current.style.color = '#666D92'
      scrollToTab(allRef)
    }
  }

  return (
    <Main style={{background: "white", padding: 0}}>
      <div className="boardTitleWrapper">
        <div className="board-title-container">
          <h2>오늘의 플로깅 완료 <span>#오플완</span></h2>
          <div><Button size="default" outlined shape="circle" type="success" onClick={registerClick} >나도 인증하기</Button></div>
        </div>
      </div>
      <div className="board-under-title-wrapper">
  
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
      <div className="boardCategoryWrapper">
        <div className="categoryContainer" id="category">
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
              {boardList && boardList.length > 0 ? boardList.map(board => {
                return(
                  <Col xxl={6} xl={8} sm={12} xs={24} className="board" onClick={() => detailClick(board.bno)}>
                    <BoardLayout key={board.bno} board={board}  />
                  </Col>
                )
              }) : boardList ? (
                <div style={{width: "100%", padding: "100px 0", textAlign: "center"}}>
                  <img style={{width:100, height:"auto"}} src={logosmall} alt="로딩로고"></img>
                  <h2>로딩중...</h2>
                </div>
              ) : (
                <div style={{width: "100%", padding: "100px 0", textAlign: "center"}}>아직 글이 없어요</div>
              )}
            </Row>
            <div className="board-pagination">
              <CustomPagination page={page} setScroll={setScroll} setPage={setPage} result={pageable} />
            </div>
          </div>
        </div>
      </div>
      <div className="board-register-btn-wrapper">
          <Button size="default" outlined shape="circle" type="success" onClick={registerClick}><span>플로깅 인증하기</span></Button>
      </div>
    </Main>
  );
}

export default React.memo(Board);
