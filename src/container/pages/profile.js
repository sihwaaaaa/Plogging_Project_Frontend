import React, { useEffect } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import UserCards from './overview/UserCard';
import { useState } from 'react';
import TabComponent from './overview/TabComponent';
import { DataService } from '../../config/dataService/dataService';
import { useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../utility/localStorageControl";
import { alertModal } from "../../components/modals/antd-modals";
import { Main } from '../styled';
import "../../static/css/profilePageStyle.scss";


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

  // 1 로그인 상태 무관, url로 접근 -> 메인화면 이동
  // 2 로그인 상태 o, 버튼으로 접근 -> location.state.memberNo로 값 넘기기
  // 3 로그인 상태 x, 버튼으로 접근 -> 로그인화면 이동
  // 4 그 외 전부 -> 메인화면 이동
  useEffect(() => {
    if(!location.state) {
      selfDestroyed("toMain");
    } else if(location.state && getItem('memberNo')) {
      getFrofileUser()
      getFriend()
    } else if(location.state && !getItem('memberNo')) {
      selfDestroyed("toLogin")
    } else {
      selfDestroyed("toMain");
    }
  }, [memberNo, type]);

  const selfDestroyed = (text) => {
    let secondsToGo = 1.2;
    const modal = alertModal.success({
      title: text === "toLogin" ? '로그인 후 이용해 주세요' : '잘못된 접근입니다',
      content: '',
    });
      setTimeout(() => {
        modal.destroy();
        if(text === "toLogin") {
          navigate('/member/signin')
        } else {
          navigate('/')
        }
      }, secondsToGo * 1000);
  };

  const getFrofileUser = () => {
    DataService.get(`profile/${memberNo}`)
      .then(function (response) {
        const logArr = location.pathname.split("/")[2];

        console.log(logArr);
        console.log(response.data.data)
        setChallenge(response.data.data.challenges);
        setPlogging(response.data.data.ploggings);
        setPoint(response.data.data.pointHistories);
        setBoard(response.data.data.boards);
        setMemberInfo(response.data.data);
      })
  };

  const getFriend = () => {
    DataService.get(`/friend/get/${memberNo}`)
      .then((response) => {
        console.log(response.data.data)
        setFriendObj(response.data.data)
      })
  }



  const profilePage = [
    {
      path: '',
      breadcrumbName: '',
    },
  ];   
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="" routes={profilePage} />
      {getItem('memberNo') ? (
        <Main className='profile-component'>
          <UserCards setType={setType} memberInfo={memberInfo} friendObj={friendObj} />
          {memberInfo.memberNo === getItem('memberNo') ?
            <TabComponent challenge={challenge} plogging={plogging} board={board} point={point} />
            : ''
          }
        </Main>
      ) : ''}
    </>
  );
}

export default React.memo(Profile);
