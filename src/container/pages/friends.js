import React, { useEffect, useState, useRef } from "react";
import { Avatar, Form, Input } from "antd";
import { DataService } from "../../config/dataService/dataService";
import { getItem } from '../../utility/localStorageControl';
import FriendListForm from "./overview/FriendListForm";
import "../../static/css/friendPageStyle.scss";
import FontAwesome from "react-fontawesome";
import { KnowledgebaseTopWrap } from "./knowledgeBase/style";
import { Button } from "../../components/buttons/buttons";
import { UilCommentEdit } from "@iconscout/react-unicons";
import { alertModal, Modal } from "../../components/modals/antd-modals";
import MemberSearchListForm from "./overview/MemberSearchListForm";
import { AvatarWraperStyle } from "../ui-elements/ui-elements-styled";
import { ArrowUpOutlined } from "@ant-design/icons";
import CustomPagination from "./overview/CustomPagination";
import { useNavigate } from "react-router-dom";

function Friends() {

  const [status, setStatus] = useState('PENDING');
  const [fromMe, setFromMe] = useState([]);
  const [toMe, setToMe] = useState([]);
  const [myFriends, setMyFriend] = useState([]);

  const userId = getItem('userId') // 로그인 userId
  const memberNo = getItem('memberNo') // 로그인 memberNo

  const navigate = useNavigate();

  useEffect(() => {
    if(userId) {
      myRequests()
      requestsToMe()
    } else {
      selfDestroyed()
    }
  }, [])


  const selfDestroyed = () => {
    let secondsToGo = 1.2;
    const modal = alertModal.success({
      title: '로그인 후 이용해 주세요',
      content: '',
    });

    setTimeout(() => {
      modal.destroy();
      navigate('/member/signin')
    }, secondsToGo * 1000);
  };


  // 나의 팔로잉 요청 리스트
  const myRequests = () => {
    DataService.get(`/friend/fromMe/${status}`)
      .then(function(response) {
        setFromMe(response.data.data)
      })
  }


  // 팔로워 요청 플친 리스트
  const requestsToMe = () => {
    DataService.get(`/friend/toMe/${status}`)
      .then(function(response) {
        setToMe(response.data.data)
      })

  }

  // 나의 플친 리스트
  useEffect(() => {
    if(userId) {
      DataService.get('/friend/fromMe/FRIEND')
        .then(function(response) {
          setMyFriend(response.data.data)
        })
    }
  }, [toMe, fromMe])

  // 플친 수락하기
  const acceptFriend = (data) => {
    DataService.put('/friend/accept', { data })
      .then((response) => {
        setToMe(response.data.data);
      })
  }

  // 플친 요청 거절하기 및 플친 삭제하기
  const removeFriend = (data) => {
    DataService.delete('/friend/reject', {data})
      .then((response) => {
        setToMe(response.data.data);
      })
  }

  // 플친 요청 취소하기 및 플친 차단 취소하기
  const cancelFriend = (data) => {
    DataService.delete('/friend/cancel', {data})
      .then((response) => {
        setFromMe(response.data.data);
      })
  }

  // 플친 요청하기
  const requestFriend = (data) => {
    DataService.post('friend/request', {data}, '')
      .then((response) => {
        setFromMe(response.data.data);
      })
  }


  /**
   * @Author 천은경
   * @Date 23.06.16
   * @Brief 회원 검색 기능
   */
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [searchPageable, setSearchPageable] = useState([]);

  const searchRef = useRef(null);
  const searchResultRef = useRef(null);
  const inputKeywordRef = useRef(null);

  const [scroll, setScroll] = useState(false);


  /**
   * @Author 천은경
   * @Date 23.06.17
   * @param keyword, page
   * @Brief 회원 아이디를 keyword로 페이징된 검색 기능
   */
  const searchMember = () => {
    DataService.get(`/member/search?keyword=${keyword}&page=${page}`)
      .then((response) => {
        setSearchKeyword(response.data.data.content)
        setSearchPageable(response.data.data)
      })
  }

  const searchClick = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if(elementRef !== null && !!searchRef.current.input.value) {
      setKeyword(searchRef.current.input.value);
      setPage(0);
      searchResultRef.current.style.display = 'flex';
      inputKeywordRef.current.style.display = 'none';
      searchResultRef.current.style.transition = '2s';
    }
  }

  useEffect(() => {
    if(userId) {
      searchMember()
    }
  }, [keyword, page, myFriends, fromMe, toMe])

  const inputKeyword = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if(elementRef !== null && !!searchRef.current.input.value) {
      inputKeywordRef.current.style.display = 'block';
    } else {
      inputKeywordRef.current.style.display = 'none';
    }
  }

  const closeSearchWrapper = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if(elementRef !== null) {
      searchResultRef.current.style.display = 'none';
      searchRef.current.input.value = '';
      searchRef.current.input.defaultValue = '';
      setPage(0);
    }
  }




  /**
   * @Author 천은경
   * @Date 23.06.13
   * @Brief 모달 기능
   */
  const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });
  const showModal = (type) => {
    setState({
      visible: true,
      modalType: type,
    });
  };

  const handleOk = () => {
    setState({
      visible: false,
      colorModal: false,
    });
  };

  const handleCancel = () => {
    setState({
      visible: false,
      colorModal: false,
    });
  };



  return (
    <>
      { userId ? (
        <div className="friendContainer">
          <div className="searchWrapper">
            <div className="searchText">
              <h3>함께할 플로거를</h3>
              <h3>찾아보세요!</h3>
            </div>
            <div className="searchInput">
              <KnowledgebaseTopWrap>
                <div className="ninjadash-knowledgetop">
                  <div className="ninjadash-knowledgetop__search--form">
                    <Form name="login" layout="vertical">
                      <div className="ninjadash-knowledgetop__formInner">
                        <Form.Item className="ninjadash-search-input">
                          <Input id="searchKeyword" onChange={inputKeyword} placeholder="ID 검색" ref={searchRef} />
                          <Button onClick={searchClick} className="btn-search" htmlType="submit" size="large">
                            <FontAwesome name="search" />
                          </Button>
                        </Form.Item>
                        <div className="searchKeyword" ref={inputKeywordRef}>

                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </KnowledgebaseTopWrap>
            </div>
          </div>
          <div className="searchResults" ref={searchResultRef}>
            <div className="resultBox" style={{overflowY:"auto"}}>
              {!searchKeyword.length ? (
                <div style={{textAlign:"center", padding:50}}>검색 결과가 없습니다</div>
              ) : !!searchKeyword && searchKeyword.map((result) => {
                return (
                  <MemberSearchListForm key={'search' + result.memberNo} result={result} requestFriend={requestFriend} />
                )
              })}
              <div className="paginationWrapper">
                <CustomPagination page={page} setScroll={setScroll} setPage={setPage} result={searchPageable} />
              </div>
            </div>
            <div className="searchClose" onClick={closeSearchWrapper}>
              <div>접기</div>
              <AvatarWraperStyle>
                <Avatar icon={<ArrowUpOutlined />} size={30}/>
              </AvatarWraperStyle>
            </div>
          </div>
          <div className="friendBoxWrapper">
            <div className="toMeWrapper">
              <div>
                <h4>받은 요청</h4>
              </div>
              <div className="friendBox">
                {toMe.map((data) => {
                  return (
                    <FriendListForm key={'friend' + data.friendNo} friend={data} acceptFriend={acceptFriend} removeFriend={removeFriend} />
                  );
                })}
              </div>
            </div>
            <div className="fromMeWrapper">
              <div>
                <h4>나의 요청</h4>
              </div>
              <div className="friendBox">
                {fromMe.map((data) => (
                  <FriendListForm key={'friend' + data.friendNo} friend={data} cancelFriend={cancelFriend} />
                ))}
              </div>
            </div>
          </div>
          <div className="chatWrapper">
            <div className="chatTitle">
              <h4>내 플친 목록 </h4>
              {/*<div className="chatPlus" style={{cursor:'pointer'}}*/}
              {/*     onClick={() => showModal('primary')}>*/}
              {/*  <UilCommentEdit size="30" />*/}
              {/*</div>*/}
            </div>
            {/*<Modal*/}
            {/*  type={state.modalType}*/}
            {/*  title={null}*/}
            {/*  visible={state.visible}*/}
            {/*  onCancel={handleCancel}*/}
            {/*  footer={null}*/}
            {/*  width={350}*/}
            {/*>*/}
            {/*  <div className="myFrinedList" style={{maxHeight:"400px", overflowY:"auto"}}>*/}
            {/*    <div style={{*/}
            {/*      borderBottom:"1px solid rgb(227, 230, 239)",*/}
            {/*      padding: "5px 0",*/}
            {/*      marginBottom: "10px",*/}
            {/*    }}>*/}
            {/*      <h4 style={{fontWeight:"bold"}}>내 플친 목록</h4>*/}
            {/*    </div>*/}
            {/*    {myFriends.map((data) => (*/}
            {/*      <FriendListForm key={'friend' + data.friendNo} friend={data} />*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</Modal>*/}
            <div className="chatBox">
              {/*<div className="chatList">*/}
              {/*  <div className="chatListTitle">*/}
              {/*    <span>채팅방 목록</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="nowChat">
                {/*<div className="nowChatTitle">*/}
                {/*  /!*<span></span>*!/*/}
                {/*</div>*/}
                <div className="addChat"
                     // style={{cursor:'pointer'}}
                     // onClick={() => showModal('primary')}
                >
                  {/*<div className="chatPlus" >*/}
                  {/*  <UilCommentEdit size="50" />*/}
                  {/*</div>*/}
                  {/*<span>친구에게 메시지를 보내보세요</span>*/}
                  {myFriends.map((data) => (
                    <FriendListForm key={'friend' + data.friendNo} friend={data} removeFriend={removeFriend} />
                  ))}
                </div>
                {/*<div className="addChatInput">*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      ) : ''
      }
    </>
  );
}

export default React.memo(Friends);