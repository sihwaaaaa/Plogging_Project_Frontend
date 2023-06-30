import React from 'react';
import '../../../../src/static/css/tabComponentStyle.scss';
// import CategoryComponent from './overview/CategoryComponent';
import { useState } from 'react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import challengeImg from '../../../static/img/plologo1.jpeg';
import { Link } from 'react-router-dom';

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
            tabKey: smallTab,
            children: <div className={id == 1 ? 'challenge-currentlist' : 'challenge-endlist'} >
              {id == 2 ?
                <ul>
                  <li>
                    <span>챌린지명</span>
                    <span>등록일자</span>
                    <span>시작일자</span>
                    <span>종료일자</span>
                    <span>상태</span>
                  </li>
                </ul>
                :
                ''
              }
              <ul>
                {
                  content.map((data) => id == 1 ? 
                    <li className='current-challenge'>
                      <div>
                        <div className='challenge-img'>
                          <Link to={`/challenge/chDetail/${data.challenge.chNo}`}><img src={challengeImg} alt='챌린지 이미지' /></Link>
                        </div>
                        <div className='description'>
                          <div>
                            <span>{data.challenge.title}</span>
                            <span>진행 중</span>
                          </div>
                          <div>
                            <span>{data.challenge.regDate}</span>
                          </div> 
                        </div>
                      </div>
                    </li>
                    :
                    <li className='end-challenge'>
                      <span>{data.challenge.title}</span>
                      <span>{data.challenge.regDate}</span>
                      <span>{data.challenge.startDate}</span>
                      <span>{data.challenge.endDate}</span>
                      <span>종료</span>
                    </li>
                  )
                }
              </ul>
            </div>
          }
        }
        )}
        />
      </Cards>
   )
}
export default ChallengeContent;