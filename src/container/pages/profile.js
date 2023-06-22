import React, { useEffect } from 'react';
import { Col, Row, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import profileStyle from '../../../src/static/css/profileStyle.scss';
import UserCards from './overview/UserCard';
// import CategoryComponent from './overview/CategoryComponent';
import { useState } from 'react';
import CategoryComponent from './overview/CategoryComponent';
import TabComponent from './overview/TabComponent';
import image from '../../static/img/bar-dark.png'
import { DataService } from '../../config/dataService/dataService';

function Profile() {

  const [memberInfo, setMemberInfo] = useState({})

  const [challenge, setChallenge] = useState([]);
  const [plogging, setPlogging] = useState([]);
  const [board, setBoard] = useState([]);
  const [point, setPoint] = useState([]);

  useEffect(() => {
    DataService.get('profile')
      .then(function (response) {
        setChallenge(response.data.data.challenges);
        setPlogging(response.data.data.ploggings);
        setPoint(response.data.data.pointHistories);
        setBoard(response.data.data.boards);
        setMemberInfo(response.data.data);
      })
  }, []);

  const profilePage = [
    {
      path: '',
      breadcrumbName: '',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="" routes={profilePage} />
      <Main className='profile-component'>
        <UserCards point={point} challenge={challenge} memberInfo={memberInfo}/>
        <TabComponent challenge={challenge} plogging={plogging} board={board} point={point}/>
      </Main>
    </>
  );
}

export default Profile;
