import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { DataService } from "../../config/dataService/dataService";
import { getItem } from '../../utility/localStorageControl';
import Friend from "../../components/friend/FriendListForm";
import "../../static/css/friendPageStyle.scss";
import FontAwesome from "react-fontawesome";
import { KnowledgebaseTopWrap } from "./knowledgeBase/style";
import { Button } from "../../components/buttons/buttons";
import { UilCommentEdit } from "@iconscout/react-unicons";
import { Modal } from "../../components/modals/antd-modals";




function Friends() {

  const [status, setStatus] = useState('PENDING');
  const [fromMe, setFromMe] = useState([]);
  const [toMe, setToMe] = useState([]);
  const [myFriends, setMyFriend] = useState([]);

  const userId = getItem('userId') // 로그인 userId
  const memberNo = getItem('memberNo') // 로그인 memberNo

// 나의 팔로잉 요청 리스트
  useEffect(() => {
    DataService.get(`/friend/fromMe/${status}`)
      .then(function(response) {
        setFromMe(response.data.data)
        console.log(response.data.data) // 데이터
        console.log(response.status) // 200
        console.log(response.config.headers.Authorization) // 토큰값
      })
  }, [])

  // 팔로워 요청 플친 리스트
  useEffect(() => {
    DataService.get(`/friend/toMe/${status}`)
      .then(function(response) {
        setToMe(response.data.data)
        console.log(response.data.data) // 데이터
        console.log(response.status) // 200
        console.log(response.config.headers.Authorization) // 토큰값
      })
  }, [])

  useEffect(() => {
    DataService.get('/friend/fromMe/FRIEND')
      .then(function(response) {
        setMyFriend(response.data.data)
        console.log(response.data.data)
      })
  }, [toMe, fromMe])

  const acceptFriend = (data) => {
    DataService.put('/friend/accept', { data })
      .then((response) => {
        setToMe(response.data.data);
        console.log(response.data.data)
      })
  }

  const removeFriend = (data) => {
    DataService.delete('friend/reject', {data})
      .then((response) => {
        setToMe(response.data.data);
        console.log(response.data.data)
      })
  }

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
                        <Input placeholder="ID, 이름, 참여챌린지 검색" />
                        <Button className="btn-search" htmlType="submit" size="large">
                          <FontAwesome name="search" />
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </KnowledgebaseTopWrap>
          </div>
        </div>
        <div className="friendBoxWrapper">
          <div className="toMeWrapper">
            <div>
              <h4>받은 요청</h4>
            </div>
            <div className="friendBox">
              {toMe.map((data) => (
                <Friend friend={data} acceptFriend={acceptFriend} removeFriend={removeFriend} />
              ))}
            </div>
          </div>

          <div className="fromMeWrapper">
            <div>
              <h4>나의 요청</h4>
            </div>
            <div className="friendBox">
              {fromMe.map((data) => (
                <Friend friend={data}/>
              ))}
            </div>
          </div>
        </div>
        <div className="chatWrapper">
          <div className="chatTitle">
            <h4>채팅하기 </h4>
            <div className="chatPlus" style={{cursor:'pointer'}}
                 onClick={() => showModal('primary')}>
              <UilCommentEdit size="30" />
            </div>
          </div>
          <Modal
            type={state.modalType}
            title={null}
            visible={state.visible}
            onCancel={handleCancel}
            footer={null}
            width={350}
          >
            <div className="myFrinedList" style={{maxHeight:"400px", overflowY:"auto"}}>
              <div style={{
                borderBottom:"1px solid rgb(227, 230, 239)",
                padding: "5px 0",
                marginBottom: "10px",
              }}>
                <h4 style={{fontWeight:"bold"}}>내 플친 목록</h4>
              </div>
              {myFriends.map((data) => (
                <Friend friend={data} />
              ))}
            </div>
          </Modal>
          <div className="chatBox">
            <div className="chatList">
              <div className="chatListTitle">
                <span>채팅방 목록</span>
              </div>
            </div>
            <div className="nowChat">
              <div className="nowChatTitle">
                <span></span>
              </div>
              <div className="addChat" style={{cursor:'pointer'}}
                  onClick={() => showModal('primary')} >
                <div className="chatPlus" >
                  <UilCommentEdit size="50" />
                </div>
                <span>친구에게 메시지를 보내보세요</span>
              </div>
              <div className="addChatInput">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Friends);