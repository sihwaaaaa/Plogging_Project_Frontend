import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataService } from '../../../config/dataService/dataService';
import tabComponentStyle from '../../../static/css/tabComponentStyle.scss'
import ChallengeContent from './ChallengeContent';
import PloggingContent from './PloggingContent';
import PointContent from './PointContent';
import MyBoardContent from './MyBoardContent';
// import { ChallengeContent, DeclareContent, MyBoardContent, PloggingContent, PointContent } from '../profile';

const TabComponent = () => {
  // const[actvieIdx, setActiveIdx] = useState(0);

  const TabMenu = styled.ul`
    background-color: #dcdcdc;
    color: rgb(232, 234, 237);
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    margin-bottom: 7rem;
    margin-top: 10px;
    cursor: pointer;
    .submenu {
      display: flex;
      /* justify-content: space-between;
      width: 380px;
      heigth: 30px; */
      width: calc(100% /3);
      padding: 10px;
      font-size: 15px;
      transition: 0.5s;
      border-radius: 10px 10px 0px 0px;
    }

    .focused {
      background-color: rgb(255,255,255);
      color: rgb(21,20,20);
    }

    & div.desc {
      text-align: center;
    }
  `;

const Desc = styled.div`
  text-align: left;
`;
  const [currentTab, clickTab] = useState(0);
  
  const [challenge, setChallenge] = useState([]);
  const [plogging, setPlogging] = useState([]);
  const [board, setBoard] = useState([]);
  const [point, setPoint] = useState([]);

  useEffect(() => {
    DataService.get('/profile/challenge')
      .then(function (response) {
        setChallenge(response.data.data.challenges);
      })
  }, []);
  useEffect(() => {
    DataService.get('/profile/plogging')
      .then(function (response) {
        setPlogging(response.data.data.ploggings);
      })
  }, []);
  useEffect(() => {
    DataService.get('/profile/point')
      .then(function (response) {
        setPoint(response.data.data.pointHistories);
      })
  }, []);
  useEffect(() => {
    DataService.get('/profile/board')
      .then(function (response) {
        setBoard(response.data.data.boards);
      })
  }, []);

// 메뉴 객체를 리스트 형탱로 담음
const menuArr = [
  { 
    name: '챌린지', 
    content: (
      <ChallengeContent content={challenge} />
    )
  },
  { 
    name: '플로깅', 
    content: (
      <PloggingContent content={plogging} />
    ) 
  },
  { 
    name: '나의 글',
    content: (
      <MyBoardContent content={board} />
    )  
  },
  { 
    name: '포인트 내역', 
    content: (
      <PointContent content={point} />
    )
  },
  { 
    name: '신고글', 
    // content: (
    //   <DeclareContent />
    // )  
  },
];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  return (
    <>
      <div>
        <TabMenu>
          {menuArr.map((el,index) => (
              <li className={index === currentTab ? "submenu focused" : "submenu" }
              onClick={() => selectMenuHandler(index)}>{el.name}</li>
            ))}
        </TabMenu>
        <Desc>
          <p>{menuArr[currentTab].content}</p>
        </Desc>
      </div>
    </>
  );
};

export default TabComponent;