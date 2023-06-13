import React, { useState } from "react";
import badge from "../../static/img/logodemo.png";
import { Button } from "../buttons/buttons";
import { getItem } from "../../utility/localStorageControl";

const FriendListForm = (props) => {

  const userId = getItem('userId');
  const acceptFriend = props.acceptFriend;
  const removeFriend = props.removeFriend;

  const [friend, setFriend] = useState(props.friend);

  let [friendId, setFriendId] = useState(null);
  let [friendNo, setFriendNo] = useState(null);


  const confirmModal = () => {

  }

  const requestButton = () => {
    if(userId === props.friend.fromMemberId && props.friend.status === 'PENDING') {
      return (
        <>
          <Button className="btn-transparent" size="small" transparented type="light">
            취소
          </Button>
        </>
      )
    }
    else if (userId === props.friend.fromMemberId && props.friend.status === 'FRIEND') {
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
    console.log("수락")
    console.log(friendId)
    console.log(friendNo)
    console.log(friend)
    acceptFriend(friend)
  }

  const rejectClick = () => {
    console.log("거절")
    console.log(friendId)
    console.log(friendNo)
    console.log(friend)
    removeFriend(friend)
  }

  if(userId === friend.fromMemberId) {
    friendId = friend.toMemberId;
    friendNo = friend.toMemberNo;
  } else {
    friendId = friend.fromMemberId;
    friendNo = friend.fromMemberNo;
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
          <img src={badge} style={{width:40, height:40}}/>
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