import React, { useEffect } from 'react';
import profileStyle from '../../../../src/static/css/tabComponentStyle.scss';
// import CategoryComponent from './overview/CategoryComponent';
import { useState } from 'react';
import image from '../../../static/img/bar-dark.png'
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';

const ChallengeContent = ({ content }) => {
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
          label: (id == '1' ? '참여 중인 챌린지' : '참여 했던 챌린지'),
          key: id,
          // tabKey: smallTab,
          children: (smallTab == 1 ?
            (<div className='challenge-currentlist'>
              {smallTab == 2 ? (
                <ul>
                  <li>
                    <span>챌린지명</span>
                    <span>등록일자</span>
                    <span>시작일자</span>
                    <span>종료일자</span>
                    <span>상태</span>
                  </li>
                </ul>
              ) : false
              }
              <ul>
                {content.map((data) => data.challenge.endDate == null ? (
                  <li>
                    <div>
                      <img src={image} alt='챌린지 이미지' />
                    </div>
                    <span>{data.challenge.title}</span>
                    <span>{data.challenge.regDate}</span>
                    <span>{data.challenge.startDate}</span>
                    <span>{data.challenge.status}</span>
                    <span>진행 중</span>
                  </li>
                ) : false
                )}
              </ul>
            </div>
            ) : (
              <div className='challenge-endlist'>
                <ul>
                  <li>
                    <span>챌린지명</span>
                    <span>등록일자</span>
                    <span>시작일자</span>
                    <span>종료일자</span>
                    <span>상태</span>
                  </li>
                </ul>
              <ul>
                {content.map((data) => data.challenge.endDate != null ? (
                <li>
                    <span>{data.challenge.title}</span>
                    <span>{data.challenge.regDate}</span>
                    <span>{data.challenge.startDate}</span>
                    <span>{data.challenge.endDate}</span>
                </li>
                ) : false
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
}
export default ChallengeContent;