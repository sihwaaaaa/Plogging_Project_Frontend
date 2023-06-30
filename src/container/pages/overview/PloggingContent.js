import React, { useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import ploggingImg from '../../../static/img/ploggingMainImg_540px.png'

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
        const min = 1 / 60 / 1000;
        // const idx = i + 1;
        return {
          label: (id == '1' ? '추천경로' : '나만의 경로'),
          key: id,
          // tabKey: smallTab,
          children: 
              <div className='plogging-history' >
                <ul>
                  <li>
                    <span>플로깅명</span>
                    <span>이동거리</span>
                    <span>소요시간</span>
                    <span>등록일자</span>
                  </li>
                </ul>
                <ul>
                  
                  {id == 1  && ( 
                    content.map((data) =>  data.type === '추천경로 시작' && 
                      <li className='history-list'>
                        <span>{data.mapDTO.courseName}</span>
                        <span>{data.distance}</span>
                        <span>{data.ploggingTime * min}</span>
                        <span>{data.regDate}</span>
                      </li>
                    )
                  )}     
                  {id == 2 && ( content.map((data) =>  data.type === '제자리 시작' &&
                      <li className='history-list'>
                        <span>제자리 걸음</span>
                        <span>{data.distance}</span>
                        <span>{data.ploggingTime * min}</span>
                        <span>{data.regDate}</span>
                      </li>
                    )
                    )
                  }
                  
                </ul>
            </div>
            }}
          ) 
        }
    />
  </Cards>)
};

export default PloggingContent;