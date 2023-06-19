/*
* 글 작성 페이지
* 작성자 : 김성진
* 생성일 : 23.6.13
* */
import React from "react";
import {PageHeader} from "../../components/page-headers/page-headers";
import {Main} from "../styled";
import { VerticalForm } from "../forms/overview/VerticalForm";


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
      <Main>
        <Responsive>
          <VerticalForm />
        </Responsive>
      </Main>
    </>
  )
}

export default WritePage;