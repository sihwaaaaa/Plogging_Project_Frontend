import React, { useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import tapComponent from '../../../static/css/tabComponentStyle.scss';

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
                    <span>포인트 번호</span>
                    <span>제목명</span>
                    <span>등록일자</span>
                  </li>
                </ul>
              ) : false
              }
              <ul>
                {content.map((data) => data.type == "Product" ? (
                  <li>
                    <span>{data.pointNo}</span>
                    <span>{data.rewardNo.name}</span>
                    <span>{data.regDate}</span>
                  </li>
                ) : false
                )}
              </ul>
            </div>
            ) : (
              <div className='challenge-endlist'>
                <ul>
                  <li>
                    <span>포인트 번호</span>
                    <span>제목명</span>
                    <span>등록일자</span>
                  </li>
                </ul>
              <ul>
                {content.map((data) => data.type != "Donation" ? (
                <li>
                    <span>{data.pointNo}</span>
                    <span>{data.rewardNo.name}</span>
                    <span>{data.regDate}</span>
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