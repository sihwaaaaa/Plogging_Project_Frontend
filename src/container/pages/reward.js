import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useEffect, useState } from 'react';
import { DataService } from '../../config/dataService/dataService';
import rewardList from './rewardList';
import PointHistory from './pointHistory';

const Reward = () => {
  const [rewardList, setRewardList] = useState([]);
  const rewardColumns = [
    {
      title: '상 품 명',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '상 품 내 용',
      dataIndex: 'ProductDetail',
      key: 'ProductDetail',
    },
  ];
  const rewardPage = [
    {
      path: '',
      breadcrumbName: '리워드',
    },
  ];

  useEffect(() => {
    DataService.get(`/reward/list`).then(function (response) {
      setRewardList(response.data);
      console.log('reward List Test : ');
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="리워드" routes={rewardPage} />
      <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>리워드 페이지</h3>
              <PointHistory />
              {rewardList.map((res) => (
                <div>
                  <span>{res.name}</span>
                  <span>{res.detail}</span>
                  <span>{res.type}</span>
                </div>
              ))}
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};
export default Reward;
