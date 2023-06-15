import React, { Suspense } from "react";
import BestSeller from "../dashboard/overview/demoTwo/BestSeller";
import { Cards } from "../../components/cards/frame/cards-frame";
import { Col, Row, Skeleton, Table } from "antd";
import { Main, TableDefaultStyle } from "../styled";

const bestSellerData = [];
const sellerColumns = [
  {
    title: 'Seller Name',
    dataIndex: 'sellerName',
    key: 'sellerName',
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];
const Admin = () => {
  return (
    <Main>
      <Row justify="center">
        <Col xxl={16} xs={24}>
          <Suspense fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }>
            <BestSeller />
          </Suspense>
        </Col>
        <Col xxl={16} xs={24}>
          <TableDefaultStyle className="ninjadash-having-header-bg">
            <div className="table-responsive">
              <Table columns={sellerColumns} dataSource={bestSellerData} pagination={false} />
            </div>
          </TableDefaultStyle>
        </Col>

      </Row>
    </Main>
  );
};

export default Admin;
