import React from 'react';
import { Col, Row, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import profileStyle from '../../../src/static/css/profileStyle.scss';
import UserCards from './overview/UserCard';
import CategoryComponent from './overview/CategoryComponent';
import { useState } from 'react';

    const BottomContent = () => (
      <Cards headless className="bottom-content">
        <Tabs
          type="card"
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
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
            <CategoryComponent  />
            <BottomContent />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Profile;
