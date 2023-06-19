import React from 'react';
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

  export const ChallengeContent = () => (
    <Cards headless className="bottom-content">
        <Tabs
          type="card"
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: (id === '1' ? '참여 중인 챌린지' : '참여 했던 챌린지'),
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />
    </Cards>
  );
  export const PloggingContent = () => (
    <Cards headless className="bottom-content">
        <Tabs
          type="card"
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: (id === '1' ? '플로깅 북마크' : '플로킹 히스토리'),
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />
    </Cards>
  );
  export const MyBoardContent = () => (
    <Cards headless className="bottom-content">
            <ul>
                <li>제목</li>
                <li>내용</li>
                <li>작성일</li>
                <li>조회</li>
            </ul>
    </Cards>
  );
  export const PointContent = () => (
    <Cards headless className="bottom-content">
        <Tabs
          type="card"
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: (id === '1' ? '참여 중인 챌린지' : '참여 했던 챌린지'),
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />
    </Cards>
  );
  export const DeclareContent = () => (
    <Cards headless className="bottom-content">
        <Tabs
          type="card"
          items={new Array(2).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: (id === '1' ? '참여 중인 챌린지' : '참여 했던 챌린지'),
              key: id,
              children: `Content of Tab Pane ${id}`,
            };
          })}
        />
    </Cards>
  );
  

function Profile() {
  
    // 이 카테고리의 타입은 객체 타입

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
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <UserCards />
            <TabComponent />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Profile;
