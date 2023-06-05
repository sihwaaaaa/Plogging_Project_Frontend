import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

function Profile() {
  const profilePage = [
    {
      path: '',
      breadcrumbName: '프로필',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="프로필" routes={profilePage} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>프로필 페이지</h3>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Profile;
