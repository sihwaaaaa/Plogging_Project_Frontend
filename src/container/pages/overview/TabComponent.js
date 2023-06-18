import React, { useState } from 'react';
import styled from 'styled-components';
import { ChallengeContent, DeclareContent, MyBoardContent, PloggingContent, PointContent } from '../profile';

const TabComponent = () => {
  const[actvieIdx, setActiveIdx] = useState(0);

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
    content: (
        <ChallengeContent />
    )
  },
  { 
    name: '플로깅', 
    content: (
      <PloggingContent />
    ) 
  },
  { 
    name: '나의 글',
    content: (
      <MyBoardContent />
    )  
  },
  { 
    name: '포인트 내역', 
    content: (
      <PointContent />
    )  
  },
  { 
    name: '신고글', 
    content: (
      <DeclareContent />
    )  
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
          {/* <li className="submenu">{menuArr[0].name}</li>
          <li className="submenu">{menuArr[1].name}</li>
          <li className="submenu">{menuArr[2].name}</li> */}
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


//   const tabActiveHandler = (index) =>{
//     setActiveIdx(index);
//   }

//   const tabContArr=[
//     {
//         tabTitle:(
//             <li onClick={() => tabActiveHandler(0)}> 탭1 </li>
//         ),
//         tabCont:(
//             <div> 탭1 내용 </div>
//         )
//     },
//     {
//         tabTitle:(
//             <li> 탭2 </li>
//         ),
//         tabCont:(
//             <div> 탭2 내용 </div>
//         )
//     },
//     {
//         tabTitle:(
//             <li> 탭3 </li>
//         ),
//         tabCont:(
//             <div> 탭3 내용 </div>
//         )
//     },
//     {
//         tabTitle:(
//             <li> 탭4 </li>
//         ),
//         tabCont:(
//             <div> 탭4 내용 </div>
//         )
//     },
//     {
//         tabTitle:(
//             <li> 탭5 </li>
//         ),
//         tabCont:(
//             <div> 탭5 내용 </div>
//         )
//     }
//   ];
//   return (
//     <TabMenu>
//       <ul>
//         {tabContArr.map((section, index)=>{
//           return section.tabTitle
//         })}
//       </ul>
//     </TabMenu>
//   );
// };

export default TabComponent;