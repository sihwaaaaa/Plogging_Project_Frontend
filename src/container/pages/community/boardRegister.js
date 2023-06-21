/*
* 글 작성 페이지
* 작성자 : 김성진
* 생성일 : 23.6.13
* */
// import React from "react";
// import Responsive from "../../components/board/Responsive";
// import {PageHeader} from "../../components/page-headers/page-headers";
// import {Main} from "../styled";
// // import { VerticalForm } from "../forms/overview/VerticalForm";
//
//
// function boardRegister() {
//   const boardPage = [
//     {
//       path: '',
//       breadcrumbName: '커뮤니티',
//     },
//   ];
//
//   return (
//     <>
//       <PageHeader className="ninjadash-page-header-main" title="커뮤니티" routes={boardPage} />
//       <Main>
//         <Responsive>
//           <h1>게시글 등록 페이지</h1>
//           {/*<VerticalForm />*/}
//         </Responsive>
//       </Main>
//     </>
//   )
// }
//
// export default boardRegister();

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BoardRegisterOrEdit from "./boardRegisterOrEdit";


const BoardRegister = () => {

  const [title, setTitle] = useState(); // 제목
  const [content, setContent] = useState(); // 내용
  const [category, setCategory] = useState(); // 카테고리
  const [IsForUpdate, setIsForUpdate]=useState(false); // 해당 글 생성인지 수정인지

  const dispatch = useDispatch();
  const onTitleChange = (event) => {
    setTitle(event.currentTarget.value);
  };
  console.log(title);

  const onContentChange = (event) => {
    setContent(event.currentTarget.value);
  };
  console.log(content);

  const onSubmitArticle = (event) => {
    event.preventDefault();
    const article = { title: title, content: content };
    console.log(article);
    dispatch(article);
  }



  return (
    <div>
      <BoardRegisterOrEdit title={title} content={content} handleTitleChange={onTitleChange} handleContentChange={onContentChange} handleSubmit={onSubmitArticle} updateRequest={IsForUpdate} />
    </div>
  );
};

export default BoardRegister;