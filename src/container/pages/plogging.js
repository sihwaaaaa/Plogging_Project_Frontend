import React from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

function Plogging() {
  const ploggingPage = [
    {
      path: '',
      breadcrumbName: '플로깅하기',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="플로깅하기" routes={ploggingPage} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>플로깅 페이지</h3>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Plogging;
