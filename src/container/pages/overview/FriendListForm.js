import React, { useState } from "react";

import badge from "../../../static/img/logodemo.png";
import { Button } from "../../../components/buttons/buttons";
import { getItem } from "../../../utility/localStorageControl";

const FriendListForm = (props) => {

  const userId = getItem('userId');
  const memberNo = getItem('memberNo')
  const acceptFriend = props.acceptFriend;
  const removeFriend = props.removeFriend;
  const cancelFriend = props.cancelFriend;

  const [friend, setFriend] = useState(props.friend);

  let [friendNo, setFriendNo] = useState(null);
  let [friendId, setFriendId] = useState(null);


  const confirmModal = () => {

  }

  // 받은 요청인지 보낸 요청인지에 따른 friend 동적 할당
  if(memberNo === friend.fromMemberNo) {
    friendNo = friend.toMemberNo;
    friendId = friend.toMemberId;
  } else {
    friendNo = friend.fromMemberNo;
    friendId = friend.fromMemberId;
  }

  // 받은 요청인지 보낸 요청인지 또는 플친인지에 따라 버튼 동적 배치
  const requestButton = () => {
    if(memberNo === props.friend.fromMemberNo && props.friend.status === 'PENDING') {
      return (
        <>
          <Button className="btn-transparent" size="small" transparented type="light"
            onClick={cancelClick}>
            취소
          </Button>
        </>
      )
    }
    else if (memberNo === props.friend.fromMemberNo && props.friend.status === 'FRIEND') {
      return (
        <>
          <Button>
            <span style={{color:"#FFCB77"}}>채팅하기</span>
          </Button>
        </>
      )
    }
    else {
      return (
        <>
          <Button className="btn-transparent" size="small" transparented type="success"
            onClick={acceptClick}>
            수락
          </Button>
          <Button className="btn-transparent" size="small" transparented type="light"
                  style={{marginLeft:7}} onClick={rejectClick}>
            거절
          </Button>
        </>
      )
    }
  }

  const acceptClick = () => {
    acceptFriend(friend)
  }

  const rejectClick = () => {
    removeFriend(friend)
  }

  const cancelClick = () => {
    cancelFriend(friend)
  }

  return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "7px 3px",
        height:60,
        width: "100%"
      }}>
        <div className="badgeWrapper"
             style={{
               width: 40,
               height: 40,
               border: "1px solid gray",
               borderRadius: "50%",
               marginLeft: 5
             }}>
          <img src={badge} style={{width:40, height:40}} alt={'뱃지'}/>
        </div>
        <div style={{marginLeft:10}}>
          {friendId}
        </div>
        <div style={{marginLeft:"auto"}}>
          {requestButton()}
        </div>
      </div>
  );
};

export default React.memo(FriendListForm);