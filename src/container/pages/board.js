import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import cardData from '../../demoData/sampleCards.json';
import BlogCard from '../../components/cards/BlogCard';

const { BlogCardData } = cardData;
function Board() {
  const boardPage = [
    {
      path: '',
      breadcrumbName: '커뮤니티',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="커뮤니티" routes={boardPage} />
      <Main>
        <Row gutter={1} className="mt-sm-10">
          {BlogCardData.slice(1, 2).map((blog) => {
            return (
              <Col key={blog.id} xxl={4} xl={4} sm={4} xs={4}>
                <BlogCard item={blog} theme="style-2" />
              </Col>
            );
          })}
        </Row>
        <Row gutter={1} className="mt-sm-10">
          {BlogCardData.slice(1, 2).map((blog) => {
            return (
              <Col key={blog.id} xxl={4} xl={4} sm={4} xs={4}>
                <BlogCard item={blog} theme="style-2" />
              </Col>
            );
          })}
        </Row>
      </Main>
    </>
  );
}

export default Board;
