import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

function Challenge() {
  const challengePage = [
    {
      path: '',
      breadcrumbName: '챌린지',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="챌린지" routes={challengePage} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>챌린지 페이지</h3>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Challenge;
