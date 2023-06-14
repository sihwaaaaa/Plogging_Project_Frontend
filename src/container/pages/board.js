import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import cardData from '../../demoData/sampleCards.json';
import BlogCard from '../../components/cards/BlogCard';
import Button from "../../components/board/Button";

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
        <div>
          <Button>버튼</Button>
        </div>
      </Main>
    </>
  );
}

export default Board;
