import React, { useEffect, useState } from "react";
import { getItem } from "../../utility/localStorageControl";
import { DataService } from "../../config/dataService/dataService";
import { useSelector } from "react-redux";
import { Main } from '../styled';
import BoardListOne from "../../components/board/BoardListOne";
import { Link } from "react-router-dom";
import "../../static/css/boardStyle.scss";
import { Button, Typography } from "antd";
import { KnowledgebaseTopWrap } from "./knowledgeBase/style";
import { Form, Input } from "antd";
import FontAwesome from 'react-fontawesome';

const { Title } = Typography;

function Board() {
  const boardPage = [
    {
      path: '',
      breadcrumbName: '커뮤니티',
    },
  ];

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


  return (
    <>
      <Main>
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
          <div >
            <Title> 게시판 </Title>
          </div>

          <div>
            <div className="container">
              <div>
                <KnowledgebaseTopWrap>

                    <div className="ninjadash-knowledgetop__search--form">
                      <Form name="login" layout="vertical">
                        <div className="ninjadash-knowledgetop__formInner">
                          <Form.Item className="ninjadash-search-input">
                            <Input placeholder="원하는 게시글을 검색해보세요" style={{ maxWidth: "300px"} } />
                            <Button className="btn-search" htmlType="submit" size="large">
                              <FontAwesome name="search" />
                            </Button>
                            <div style={{textAlign: "right"}}>
                              <Link to="register">
                                <Button type="primary">글쓰기</Button>
                              </Link>
                            </div>
                          </Form.Item>
                        </div>
                      </Form>
                    </div>
                </KnowledgebaseTopWrap>
              </div>
            </div>

          </div>



          <div>
            <table>
              <colgroup>
                <col width="10%" />
                <col width="60%" />
                <col width="20%" />
              </colgroup>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
              </tr>
              {boardList.map((data) => (
                <tr>
                  <td>{data.bno}</td>
                  <Link to={`${data.bno}`}>
                    <td>{data.title}</td>
                  </Link>
                  <td>{data.content}</td>

                </tr>

                // <BoardListOne board={data} />
                ))}

            </table>

          </div>
          {/*{boardList && boardList.map((item) => <li key={item.bno}>{item.bno} {item.title}  {item.userId}</li>)}*/}

        </div>
      </Main>
    </>
  );
}

export default Board;
