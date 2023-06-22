import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DataService } from '../../../config/dataService/dataService';
import tabComponentStyle from '../../../static/css/tabComponentStyle.scss'
import ChallengeContent from './ChallengeContent';
import PloggingContent from './PloggingContent';
import PointContent from './PointContent';
import MyBoardContent from './MyBoardContent';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { SettingWrapper } from '../../profile/myProfile/overview/Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Skeleton, Timeline } from 'antd';
import CoverSection from '../../profile/overview/CoverSection';
import Overview from '../../profile/myProfile/overview/Overview';
import Activity from '../../profile/myProfile/overview/Activity';
// import { ChallengeContent, DeclareContent, MyBoardContent, PloggingContent, PointContent } from '../profile';

const TabComponent = ({challenge, plogging, board, point}) => {
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

// 메뉴 객체를 리스트 형탱로 담음
const menuArr = [
  { 
    name: '챌린지',
    path: "challenge",
    content: (
      <ChallengeContent content={challenge} />
    )
  },
  { 
    name: '플로깅',
    path: "plogging", 
    content: (
      <PloggingContent content={plogging} />
    ) 
  },
  { 
    name: '나의 글',
    path: "board",
    content: (
      <MyBoardContent content={board} />
    )  
  },
  { 
    name: '포인트 내역', 
    path: "point",
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
  const path = '.';
  return (
    <>
      <div>
        <TabMenu>
          {menuArr.map((el,index) => (
              <Link to={menuArr[index].path} className={index === currentTab ? "submenu focused" : "submenu" }
              onClick={() => selectMenuHandler(index)}>{el.name}</Link>
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