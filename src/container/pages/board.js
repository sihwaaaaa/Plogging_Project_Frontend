import React from 'react';
import { Col, Row } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
// import '../../static/css/boardStyle.scss';
// import BoardList from "../../components/board/BoardList";

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
      <Main className="boardPage">
        <h1>안녕하세요</h1>
        <BoardList />
      </Main>
    </>
  );
}

export default Board;
