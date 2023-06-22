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
                    <span>등록일자</span>
                    <span>시작일자</span>
                    <span>종료일자</span>
                    <span>상태</span>
                  </li>
                </ul>
              ) : (
                  <ul></ul>
              )
              }
              <ul>
                {content.map((data) => data.challenge.status == "CHALLENGEBEFORE" ? (
                  <li>
                    <div>
                      <img src={image} alt='챌린지 이미지' />
                    </div>
                    <span>{data.title}</span>
                    <span>{data.regDate}</span>
                    <span>{data.startDate}</span>
                    <span>{data.status}</span>
                    <span>진행 중</span>
                  </li>
                ) : (
                  <li>
                    <span>{data.challenge.title}</span>
                    <span>{data.challenge.regDate}</span>
                    <span>{data.challenge.startDate}</span>
                    <span>{data.challenge.endDate}</span>
                    <span>이미 끝남</span>
                  </li>
                 )
                )}
              </ul>
            </div>
            ) : (
              <div className='challenge-endlist'>
                <ul>
                  <li>
                    <span>플로깅명</span>
                    <span>등록일자</span>
                    <span>시작일자</span>
                    <span>종료일자</span>
                    <span>상태</span>
                  </li>
                </ul>
              <ul>
                {content.map((data) => data.challenge.status != "CHALLENGEBEFORE" ? (
                  <li>
                    <div>
                      <img src={image} alt='플로깅 이미지' />
                    </div>
                    <span>{data.title}</span>
                    <span>{data.regDate}</span>
                    <span>{data.startDate}</span>
                    <span>{data.status}</span>
                    <span>진행 중</span>
                  </li>
                ) : (
                  <li>
                    <span>{data.challenge.title}</span>
                    <span>{data.challenge.regDate}</span>
                    <span>{data.challenge.startDate}</span>
                    <span>{data.challenge.endDate}</span>
                    <span>이미 끝남</span>
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