import React, { useEffect } from 'react';
import { Col, Row, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import profileStyle from '../../../src/static/css/profileStyle.scss';
import UserCards from './overview/UserCard';
// import CategoryComponent from './overview/CategoryComponent';
import { useState } from 'react';
import CategoryComponent from './overview/CategoryComponent';
import TabComponent from './overview/TabComponent';
import image from '../../static/img/bar-dark.png'
import { DataService } from '../../config/dataService/dataService';
import { useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../utility/localStorageControl";
import "../../static/css/profilePageStyle.scss";
import { alertModal } from "../../components/modals/antd-modals";
import { Main } from '../styled';

function Profile() {

  const location = useLocation();
  const navigate = useNavigate();
  const memberNo = location.pathname.split("/")[2] == getItem('memberNo')
    ? getItem('memberNo') : location.pathname.split("/")[2];

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
