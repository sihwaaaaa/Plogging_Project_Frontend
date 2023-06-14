import React, { useEffect, useState } from "react";

import { getItem } from "../../utility/localStorageControl";
import { DataService } from "../../config/dataService/dataService";


const BoardList = () => {
  const [status, setStatus] = useState('PENDING');
  const userId = getItem('userId') // 로그인 userId
  const memberNo = getItem('memberNo') // 로그인 memberNo
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    DataService.get('/board')
      .then(function(response) {
        setBoardList(response.data.data)
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
    <div>
      {boardList && boardList.map((item) => <li key={item.bno}>{item.title}</li>)}
    </div>
  );
};

export default BoardList;