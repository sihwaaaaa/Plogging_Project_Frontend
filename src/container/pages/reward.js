import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import FontAwesome from 'react-fontawesome';
import { useEffect, useState } from 'react';
import { DataService } from '../../config/dataService/dataService';
import RewardList from './rewardList';
import ReactDOM from 'react-dom';

function Reward() {
  const [list, setList] = useState([]);
  const [name, setName] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    DataService.get(`/reward/list`).then(function (response) {
      setList(response.data.data);
      console.log('reward List Test : ');
      console.log(response.data.data);
    });
  }, [name, detail]);

  function Reward() {
    const rewardPage = [
      {
        path: '',
        breadcrumbName: '리워드',
      },
    ];
    return (
      <>
        <PageHeader className="ninjadash-page-header-main" title="리워드" routes={rewardPage} />
        <Main>
          <Row gutter={25}>
            <Col sm={24} xs={24}>
              <Cards headless>
                {list.map((data) => (
                  <RewardList name={data} />
                ))}
                <h3>리워드 페이지</h3>
              </Cards>
            </Col>
          </Row>
        </Main>
      </>
    );
  }
}
export default Reward;
