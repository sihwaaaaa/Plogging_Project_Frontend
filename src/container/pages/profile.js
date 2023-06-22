import React, { useEffect } from 'react';
import { Col, Row, Tabs } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import profileStyle from '../../../src/static/css/profileStyle.scss';
import UserCards from './overview/UserCard';
// import CategoryComponent from './overview/CategoryComponent';
import { useState } from 'react';
import CategoryComponent from './overview/CategoryComponent';
import TabComponent from './overview/TabComponent';
import image from '../../static/img/bar-dark.png'
import { DataService } from '../../config/dataService/dataService';


// const PloggingContent = () => (
//   <Cards headless className="bottom-content">
//       <Tabs
//         type="card"
//         items={new Array(2).fill(null).map((_, i) => {
//           const id = String(i + 1);
//           return {
//             label: (id === '1' ? '플로깅 북마크' : '플로킹 히스토리'),
//             key: id,
//             children: `Content of Tab Pane ${id}`,
//           };
//         })}
//       />
//   </Cards>
// );
// const MyBoardContent = () => (
//   <Cards headless className="bottom-content">
//           <ul>
//               <li>제목</li>
//               <li>내용</li>
//               <li>작성일</li>
//               <li>조회</li>
//           </ul>
//   </Cards>
// );
// const PointContent = () => (
//   <Cards headless className="bottom-content">
//       <Tabs
//         type="card"
//         items={new Array(2).fill(null).map((_, i) => {
//           const id = String(i + 1);
//           return {
//             label: (id === '1' ? '참여 중인 챌린지' : '참여 했던 챌린지'),
//             key: id,
//             children: `Content of Tab Pane ${id}`,
//           };
//         })}
//       />
//   </Cards>
// );
// const DeclareContent = () => (
//   <Cards headless className="bottom-content">
//       <Tabs
//         type="card"
//         items={new Array(2).fill(null).map((_, i) => {
//           const id = String(i + 1);
//           return {
//             label: (id === '1' ? '참여 중인 챌린지' : '참여 했던 챌린지'),
//             key: id,
//             children: `Content of Tab Pane ${id}`,
//           };
//         })}
//       />
//   </Cards>
// );

// const TabMenu = styled.ul`
//   background-color: #dcdcdc;
//   color: rgb(232, 234, 237);
//   font-weight: bold;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   list-style: none;
//   margin-bottom: 7rem;
//   margin-top: 10px;
//   cursor: pointer;
//   .submenu {
//     display: flex;
//     /* justify-content: space-between;
//     width: 380px;
//     heigth: 30px; */
//     width: calc(100% /3);
//     padding: 10px;
//     font-size: 15px;
//     transition: 0.5s;
//     border-radius: 10px 10px 0px 0px;
//   }

//   .focused {
//     background-color: rgb(255,255,255);
//     color: rgb(21,20,20);
//   }

//   & div.desc {
//     text-align: center;
//   }
// `;


// const handleSmallTab = (e) => {
//   console.log(e.target.key);
//   setSmallTab(e.target.key);
//  }

function Profile() {

  const [memberInfo, setMemberInfo] = useState({
    userId: '',
    intro: '',
    nickName: '',
    userName: '',
    curPoint: 0,
    totalPoint: 0,
  })

  const profilePage = [
    {
      path: '',
      breadcrumbName: '',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="" routes={profilePage} />
      <Main className='profile-component'>
        <UserCards />
        <TabComponent />
      </Main>
    </>
  );
}

export default Profile;
