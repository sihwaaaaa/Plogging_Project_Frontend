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
        items={new Array(4).fill(null).map((_, i) => {
        const id = String(i + 1);
        // const idx = i + 1;
          let name = '';
          switch (id) {
            case '1':
              name = '상품'
              break;
            case '2':
              name = "기부"
              break;
            case '3':
              name = "챌린지"
              break;
            case '4':
              name = "플로깅"
              default:
              break;
          }
        return {
          label: name,
          key: id,
          // tabKey: smallTab,
          children: <div className='point-history-list'>
            <ul>
              <li>
                <span>번호</span>
                <span>포인트</span>
                <span>등록일자</span>
                <span>타입</span>
              </li>
            </ul>
          <ul>
            {
                content.map((data) => id == 1 &&
                  data.type == "Product" && <li className='challenge'>
                    <span>{data.pointNo}</span>
                    <span>{data.point}p</span>
                    <span>{data.regDate}</span>
                    <span>{data.type}</span>
                  </li>
                )
                }
              {
              content.map((data) => id == 2 && data.type == "Donation" &&
                <li className='donation'>
                    <span>{data.pointNo}</span>
                    <span>{data.point}p</span>
                    <span>{data.regDate}</span>
                    <span>{data.type}</span>
                </li>
              )
              }
              {
              content.map((data) => id == 3 &&  data.type == "Challenge" &&
                <li className='challenge'>
                    <span>{data.pointNo}</span>
                    <span>{data.point}p</span>
                    <span>{data.regDate}</span>
                    <span>{data.type}</span>
                </li>
              )
              }
              {
              content.map((data) => id == 4 &&  data.type == "Plogging" &&
                <li className='plogging'>
                    <span>{data.pointNo}</span>
                    <span>{data.point}p</span>
                    <span>{data.regDate}</span>
                    <span>{data.type}</span>
                </li>
              )
            }
          </ul>
        </div>
        }
      })
    }
    />
  </Cards>)
}

export default PointContent;