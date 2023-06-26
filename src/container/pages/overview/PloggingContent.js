import React, { useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';

const PloggingContent = ({content}) => {
  const [smallTab, setSmallTab] = useState(1);
  const onChange = (key) => {
    setSmallTab(key);
  };
   return (
     <Cards headless className="bottom-content">
    <Tabs
        type="card"
        onChange={onChange}
        items={new Array(2).fill(null).map((_, i) => {
        const id = String(i + 1);
        // const idx = i + 1;
        return {
          label: (id == '1' ? '플로깅 즐겨찾기' : '플로깅 히스토리'),
          key: id,
          // tabKey: smallTab,
          children: (smallTab == 1 ?
            (<div className='challenge-currentlist'>
              {smallTab == 2 ? (
                <ul>
                  <li>
                    <span>플로깅명</span>
                    <span>시작일자</span>
                    <span>종료일자</span>
                    <span>등록일자</span>
                    <span>상태</span>
                  </li>
                </ul>
              ) : (
                  <ul></ul>
              )
              }
              <ul>
                {content.map((data) => id == "1" ? (
                  <li>
                    <div>
                      {/* 즐겨찾기 */}
                      {/* <img src={image} alt='챌린지 이미지' /> */}
                    </div>
                    {/* <span>{data.title}</span>
                    <span>{data.regDate}</span>
                    <span>{data.startDate}</span>
                    <span>{data.type}</span>
                    <span>진행 중</span> */}
                  </li>
                ) : (
                  <li>
                    {/* <span>{data.title}</span>
                    <span>{data.regDate}</span>
                    <span>{data.startDate}</span>
                    <span>{data.endDate}</span>
                    <span>이미 끝남</span> */}
                  </li>
                 )
                )}
              </ul>
            </div>
            ) : (
              <div className='challenge-endlist'>
                <ul>
                  <li>
                    <li><span>플로깅명</span></li>
                    <li><span>시작일자</span></li>
                    <li><span>시작지점</span></li>
                    <li><span>종료지점</span></li>
                    <li><span>상태</span></li>
                  </li>
                </ul>
              <ul>
                {content.map((data) => data && (
                  <li>
                    <div>
                      {/* <img src={image} alt='플로깅 이미지' /> */}
                    </div>
                    <li>
                      <span>{data.map.courseName}</span>
                    </li>
                    <li>
                      <span>{data.regDate}</span>
                    </li>
                    <li>
                      <span>x: {data.map.startX} <br />
                        y: {data.map.startY}</span>
                    </li> 
                    <li>
                      <span>x: {data.map.endX} <br />
                          y: {data.map.endY}</span>
                    </li>
                    <li>
                      <span>{data.status == 0 ? "실패" : "성공"}</span>
                    </li>
                  </li>
                  ) 
                )}
              </ul>
            </div>
            )
          ) 
        }
      })
    }
    />
  </Cards>)
};

export default PloggingContent;