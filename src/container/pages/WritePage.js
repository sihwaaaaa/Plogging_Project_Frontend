/*
* 글 작성 페이지
* 작성자 : 김성진
* 생성일 : 23.6.13
* */
import React from "react";
import Responsive from "../../components/board/Responsive";
import {PageHeader} from "../../components/page-headers/page-headers";
import {Main} from "../styled";
import { VerticalForm } from "../forms/overview/VerticalForm";
import '../../static/css/boardStyle.scss';

function WritePage() {
  const boardPage = [
    {
      path: '',
      breadcrumbName: '커뮤니티',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="커뮤니티" routes={boardPage} />
      <Main className="writePage">
        <Responsive>
          <VerticalForm />

        </Responsive>
      </Main>
    </>
  )
}

export default WritePage;