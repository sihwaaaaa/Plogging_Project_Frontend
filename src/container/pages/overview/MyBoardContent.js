import React, { useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import image from '../../../static/img/bar-dark.png'

const MyBoardContent = ({ content }) => {
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
          label: (id == '1' ? '플로깅' : '커뮤니티'),
          key: id,
          // tabKey: smallTab,
          children: (smallTab == 1 ?
            (<div className='board-plogging'>
                <ul>
                  <li>
                    <span>글번호</span>
                    <span>제목</span>
                    <span>등록일자</span>
                    <span>카테고리</span>
                  </li>
                </ul>
                <ul>
                {content.map((data) => data.category == "PLOGGING" ? (
                  <li>
                    <span>{data.bno}</span>
                    <span>{data.title}</span>
                    <span>{data.regDate}</span>
                    <span>{data.category}</span>
                  </li>
                ): false) 
              }
              </ul>
            </div>
            ) : (
              <div className='board-community'>
                <ul>
                  <li>
                    <span>글번호</span>
                    <span>제목</span>
                    <span>등록일자</span>
                    <span>카테고리</span>
                  </li>
                </ul>
              <ul>
                {content.map((data) => data.category == "COMMUNITY" ? (
                <li>
                    <span>{data.bno}</span>
                    <span>{data.title}</span>
                    <span>{data.regDate}</span>
                    <span>{data.category}</span>
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

export default MyBoardContent;