import React, { useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';

const PointContent = ({ content }) => {
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
          label: (id == '1' ? '상품' : '기부'),
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
                {content.map((data) => data.challenge.status == "CHALLENGEBEFORE" ? (
                  <li>
                    <div>
                      <img src={image} alt='챌린지 이미지' />
                    </div>
                    <span>{data.title}</span>
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
                {content.map((data) => data.challenge.status != "CHALLENGEBEFORE" ? (
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

export default PointContent;