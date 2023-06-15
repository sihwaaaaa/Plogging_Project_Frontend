import React, { useEffect, useState } from "react";
import FontAwesome from 'react-fontawesome';
import { getItem } from "../../utility/localStorageControl";
import { DataService } from "../../config/dataService/dataService";
import { useSelector } from "react-redux";
import { KnowledgebaseTopWrap } from "../../container/pages/knowledgeBase/style";
import { Form, Input } from "antd";
import { Button } from "../buttons/buttons";
import BoardListOne from "./BoardListOne";


const BoardList = () => {
  const searchData = useSelector((state) => state.headerSearchData);
  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });
  const [status, setStatus] = useState('PENDING');
  const userId = getItem('userId') // 로그인 userId
  const memberNo = getItem('memberNo') // 로그인 memberNo
  const [boardList, setBoardList] = useState([]);
  const [boardWrite, setBoardWrite] = useState();

  useEffect(() => {
    DataService.get('/board')
      .then(function(response) {
        setBoardList(response.data.data);
        console.log(response.data.data);
        console.log(response.status);
      })
  },[])
  // function getBoardList() {
  //   axios.get('http://localhost:8080/board')
  //     .then(function( response) {
  //       setBoardList(response.data);
  //   })
  //   .catch(function(error) {
  //     console.log('실패');
  //   }).then(function() {});
  //
  // }
  //
  // useEffect(() => {
  //   getBoardList();
  // }, [])

  return (
    <>
    {/*<div>*/}
    {/*  <div className="container">*/}
    {/*    <div>*/}
    {/*      <KnowledgebaseTopWrap>*/}
    {/*        <div className="ninjadash-knowledgetop">*/}
    {/*          <h2 className="ninjadash-knowledgetop__title">커뮤니티</h2>*/}
    {/*          <div className="ninjadash-knowledgetop__search--form">*/}
    {/*            <Form name="login" layout="vertical">*/}
    {/*              <div className="ninjadash-knowledgetop__formInner">*/}
    {/*                <Form.Item className="ninjadash-search-input">*/}
    {/*                  <Input placeholder="원하는 게시글을 검색해보세요" />*/}
    {/*                  <Button className="btn-search" htmlType="submit" size="large">*/}
    {/*                    <FontAwesome name="search" />*/}
    {/*                  </Button>*/}
    {/*                </Form.Item>*/}
    {/*              </div>*/}
    {/*            </Form>*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*      </KnowledgebaseTopWrap>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*</div>*/}
    <div>
      <div>
        <h1> 게시판 </h1>
      </div>
      <div>
        <button>글쓰기</button>
      </div>
      <div>
        {boardList.map((data) => (
          <BoardListOne board={data} />
        ))}
      </div>
      {/*{boardList && boardList.map((item) => <li key={item.bno}>{item.bno} {item.title}  {item.userId}</li>)}*/}

    </div>
    </>
  );
};

export default BoardList;