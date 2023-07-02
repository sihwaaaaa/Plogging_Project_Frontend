import React, { useEffect, useState, useRef } from "react";
import { Avatar, Form, Input } from "antd";
import { DataService } from "../../config/dataService/dataService";
import { getItem } from '../../utility/localStorageControl';
import FriendListForm from "./overview/FriendListForm";
import "../../static/css/friendPageStyle.scss";
import FontAwesome from "react-fontawesome";
import { KnowledgebaseTopWrap } from "./knowledgeBase/style";
import { Button } from "../../components/buttons/buttons";
import { UilCommentEdit, UilUserMinus, UilUserTimes } from "@iconscout/react-unicons";
import { alertModal, Modal } from "../../components/modals/antd-modals";
import MemberSearchListForm from "./overview/MemberSearchListForm";
import { AvatarWraperStyle } from "../ui-elements/ui-elements-styled";
import { ArrowUpOutlined } from "@ant-design/icons";
import CustomPagination from "./overview/CustomPagination";
import { useNavigate } from "react-router-dom";
import badge from "../../static/img/logodemo.png";


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
   * @Brief 메시지 기능
   */
  const [roomList, setRoomList] = useState([]);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const [content, setContent] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomMember, setRoomMember] = useState([]);

  const [receiver, setReceiver] = useState('');
  const messageDTO = {content, roomNo};
  const memberDTO = { memberNo : receiver };

  useEffect(() => {
    if(receiver && receiver !== '') {
      createRoom(memberDTO)
    }
  }, [receiver])

  useEffect(() => {
    if(userId) {
      showRoomList()
    }
  },[receiver, roomNo])


  useEffect(() => {
    if(userId && content) {
      createMessage(messageDTO);
    }
  }, [content])

  const showRoomList = () => {
      DataService.get('/message/rooms')
        .then((response) => {
          setRoomList(response.data.data)
        })
  }

  const showMessageList = (room) => {
    let str;
    DataService.get(`/message/messages/${room.no}`)
      .then((response) => {
        setMessageList(response.data.data.content)
        setRoomNo(room.no)
        str = room.roomMember.map(member => member.memberId).filter(id => id !== userId)
        setRoomName(str)
      })
  }

  const showMsgListUpdate = (room) => {
    DataService.get(`/message/messages/${room}`)
      .then((response) => {
        setMessageList(response.data.data.content);
      })

  }


  const createMessage = (data) => {
    DataService.post('/message/create/message', { data }, '')
      .then((response) => {
        console.log(response)
        setMessageList(response.data.data.content)
      })
  }

  const createRoom = (data) => {
    DataService.post('/message/create/room', { data }, '')
      .then((response) => {
        setRoomNo(response.data.data.roomNo)
        showMsgListUpdate(response.data.data.roomNo)
      })
  }

  const clickRoom = (room) => {
    event.preventDefault();
    showMessageList(room);
    // document.getElementById("room" + room.no).style.background = "aliceblue";
  }

  const submitMessage = (event) => {
    event.preventDefault();
    setContent(event.target[0].value)
    event.target[0].value = '';
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
            <div className="search-container">
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
          <Modal
            type={state.modalType}
            title={null}
            visible={state.visible}
            onCancel={handleCancel}
            footer={null}
          >
            <div className="myFrinedList" style={{maxHeight:"400px", overflowY:"auto"}}>
              <div style={{
                borderBottom:"1px solid rgb(227, 230, 239)",
                padding: "5px 0",
                marginBottom: "10px",
              }}>
                <h4 style={{fontWeight:"bold", alignItems:"center"}}>내 플친 목록</h4>
              </div>
              {myFriends.map((data) => (
                <FriendListForm className={"modal-friendlist-wrapper"}
                                key={'friend' + data.friendNo}
                                friend={data}
                                roomNo={roomNo}
                                setRoomNo={setRoomNo}
                                setRoomName={setRoomName}
                                setReceiver={setReceiver}
                                setState={setState}
                                createRoom={createRoom}
                                removeFriend={removeFriend}
                                memberDTO={memberDTO}
                />
              ))}
            </div>
          </Modal>

          <div className="chatWrapper">
            <div className="chatTitle">
              <h4>메시지 보내기</h4>
              <Button className="chatPlus" type="warning" transparented
                   onClick={() => showModal('primary')}>
                나의 플친 목록
                {/*<UilCommentEdit size="30" color="#e8e8e8" />*/}
              </Button>
            </div>
            <div className="chatBox">
              <div className="chatList">
                <div className="chatListTitle">
                  <span>메시지 목록</span>
                </div>
                <div className="chat-list">
                  {roomList && roomList.length > 0 ?
                    roomList.map(room => {
                      return (
                        <div id={"room" + room.roomNo} onClick={() => clickRoom({ no : room.roomNo, name : room.roomName, roomMember : room.rmemberList})} className="chat-room" style={{cursor:"pointer", }}>
                          <div
                            className="friend-container"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              alignItems: "center",
                              padding: "7px 3px",
                              minHeight:60,
                              width: "100%",
                            }}>
                            <div className="badgeWrapper"
                                 style={{
                                   width: 40,
                                   height: 40,
                                   border: "1px solid gray",
                                   borderRadius: "50%",
                                   marginLeft: 5,
                                   cursor: "pointer"
                                 }}>
                              <img src={badge} style={{width:40, height:40}} alt={'뱃지'}/>
                            </div>
                            <div style={{marginLeft:10,
                              fontWeight:"bold",
                              maxWidth:"60%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis"
                            }}>
                              {room.rmemberList.map(member => member.memberId).filter(id => id !== userId)}
                            </div>
                            <div style={{padding:"5px 10px",
                              maxWidth:"60%",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis"}}>
                              {/*{room.messageList && room.messageList.length > 0 ? }*/}
                            </div>
                          </div>
                        </div>
                      )
                    }) : ''}
                </div>
              </div>
              <div className="nowChat">
                <div className="nowChatTitle">
                  {roomName ? (
                      <span>{roomName}</span>
                    )
                  : (<span></span>)}
                </div>
                <div className="nowChat-list-wrapper">
                {messageList && roomNo ? messageList.map(message => {
                    if(message.senderNo === memberNo) {
                      return (
                        <div className="message-container send">
                          <span>{message.content}</span>
                        </div>
                        )
                    } else {
                      return (
                        <div className="message-container receive">
                          <span>{message.content}</span>
                        </div>
                        )
                    }
                }) : (
                  <div className="addChat"
                       style={{cursor:'pointer'}}
                       onClick={() => showModal('primary')}
                  >
                    <div className="chatPlus" >
                      <UilCommentEdit size="50" />
                    </div>
                    <span>친구에게 메시지를 보내보세요</span>
                  </div>
                )}
                </div>
                <form onSubmit={(event) => submitMessage(event)} className="addChatInput">
                  <input className="addChatInput-input" type="text" />
                  <button className="addChatInput-button">보내기</button>
                </form>
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