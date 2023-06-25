import React, { useEffect } from 'react';
import UserCards from './overview/UserCard';
import { useState } from 'react';
import TabComponent from './overview/TabComponent';
import { DataService } from '../../config/dataService/dataService';
import { useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../utility/localStorageControl";
import "../../static/css/profilePageStyle.scss";
import { alertModal } from "../../components/modals/antd-modals";
import { Main } from "../styled";

function Profile() {

  const location = useLocation();
  const navigate = useNavigate();
  const memberNo = location.state ? location.state.memberNo : getItem('memberNo');

  const [memberInfo, setMemberInfo] = useState({})

  const [challenge, setChallenge] = useState([]);
  const [plogging, setPlogging] = useState([]);
  const [board, setBoard] = useState([]);
  const [point, setPoint] = useState([]);
  const [friendObj, setFriendObj] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if(getItem('memberNo')){
      getFrofileUser()
      getFriend()
    } else {
      selfDestroyed();
    }
  }, [memberNo, type]);

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

  const getFrofileUser = () => {
    DataService.get(`profile/${memberNo}`)
      .then(function (response) {
        console.log(response.data.data)
        setChallenge(response.data.data.challenges);
        setPlogging(response.data.data.ploggings);
        setPoint(response.data.data.pointHistories);
        setBoard(response.data.data.boards);
        setMemberInfo(response.data.data);
      })
  }

  const getFriend = () => {
    DataService.get(`/friend/get/${memberNo}`)
      .then((response) => {
        console.log(response.data.data)
        setFriendObj(response.data.data)
      })
  }


  return (
    <>
      { getItem('memberNo') ? (
        <Main className='profile-component'>
          <UserCards setType={setType} memberInfo={memberInfo} friendObj={friendObj} />
          {memberInfo.memberNo === getItem('memberNo') ?
            <TabComponent challenge={challenge} plogging={plogging} board={board} point={point}/>
            : ''
          }
        </Main>
      ) : ''
      }
    </>
  );
}

export default Profile;
