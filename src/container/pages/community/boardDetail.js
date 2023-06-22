import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { DataService } from "../../../config/dataService/dataService";

const { Title } = Typography;

function BoardDetail(props) {
  const goBack = useNavigate();

  const location = useLocation();
  const keyword = getBno(location);
  const [article, SetArticle] = useState({
    bno : '',
    title: '',
    content: '',
    regDate: '',
    updateDate: '',
    category: ''
  });

  useEffect(() => {
    DataService.get(":bno", {
      params : {
        bno : parseInt(keyword)
      }
    })
      .then(res => SetArticle(res.data.article))
      .catch(error => console.log(error));
  }, []);


  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ margin: "2rem auto" }}>

          <Button onClick={()=>goBack(-1)} type="primary">목록으로 가기</Button>

      </div>
      <div style={{ textAlign: "center" }}>
        <Title>게시글</Title>
      </div>
      <div>
        <table>
          <thead>

          </thead>
          <tbody>
            {/*<colgroup>*/}
            {/*  <col width="10%" />*/}
            {/*  <col width="40%" />*/}
            {/*  <col width="10%" />*/}
            {/*  <col width="40%" />*/}
            {/*</colgroup>*/}
            <tr>
              <th>번호</th>
              <td>{article.bno}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan="3">{article.title}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td colSpan="3">{article.content}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

function  getBno(location) {
  let searchString = location.search;
  const params = new URLSearchParams(searchString);
  const keyword = params.get('bno');

  return keyword;
}

export default BoardDetail;