import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

function Friend() {
  const friendPage = [
    {
      path: '',
      breadcrumbName: '플친 / 채팅',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="플친 / 채팅" routes={friendPage} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>플친 / 채팅 페이지</h3>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Friend;
