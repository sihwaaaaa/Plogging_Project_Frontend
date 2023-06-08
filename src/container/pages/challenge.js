import React, { useState } from 'react';
import { Form, Input } from 'antd';
import FontAwesome from 'react-fontawesome';
import '../../static/css/indexPageStyle.scss';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { ProjectHeader } from './ChallengeStyle';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import ChallengeCreate from './ChallengeCreate';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import ploggingImage from '../../static/img/ploggingImage.png';

function Challenge() {
  const [state, setState] = useState({
    visible: true,
    categoryActive: 'all',
  });

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };
  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  return (
    <>
      <div className="index-page-challenge">
        <div className="container">
          <div className="challenge-search">
            <KnowledgebaseTopWrap>
              <div className="ninjadash-knowledgetop">
                <h2 className="ninjadash-knowledgetop__title">모든 챌린지</h2>
                <div className="ninjadash-knowledgetop__search--form">
                  <Form name="login" layout="vertical">
                    <div className="ninjadash-knowledgetop__formInner">
                      <Form.Item className="ninjadash-search-input">
                        <Input placeholder="원하는 챌린지를 검색해보세요" />
                        <Button className="btn-search" htmlType="submit" size="large">
                          <FontAwesome name="search" />
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </KnowledgebaseTopWrap>
          </div>
        </div>
        {/* <Link to="callengeCreate">
          <Button className="create-Challenge" htmlType="submit" size="large">
            챌린지만들기!
          </Button>
        </Link> */}
        <ProjectHeader>
          <PageHeader
            className="ninjadash-page-header-main"
            ghost
            title="챌린지를 만들어 보시겠어요?"
            buttons={[
              <Button onClick={showModal} key="1" type="primary" size="default" className="createChallenge">
                <UilPlus /> Create Challenge!
              </Button>,
            ]}
          />
        </ProjectHeader>
        <div className="challenge-slider-title">
          <h4>현재 진행중인 챌린지</h4>
        </div>
        <div className="sliderWrapper">
          <div className="mapWrapper">
            {/* <GoogleMaps latitude="55.797897" longitude="-1.077641" /> */}
            <img src={ploggingImage} alt="Logo" className="ploImage" />
            <div className="mapHover">
              <div className="challengeInfo">
                <h4>한강 떡잎방범대</h4>
                <span>
                  요즘 날씨 한강 걷기 좋아요!
                  <br />
                  **매주 수요일 저녁 7시
                  <br />
                  고속터미널역 8번 출구**
                </span>
              </div>
            </div>
          </div>
          <div className="mapWrapper">
            {/* <GoogleMaps latitude="55.797897" longitude="-1.077641" /> */}
            <img src={ploggingImage} alt="Logo" className="ploImage" />
            <div className="mapHover">
              <div className="challengeInfo">
                <h4>한강 떡잎방범대</h4>
                <span>
                  요즘 날씨 한강 걷기 좋아요!
                  <br />
                  **매주 수요일 저녁 7시
                  <br />
                  고속터미널역 8번 출구**
                </span>
              </div>
            </div>
          </div>
          <div className="mapWrapper">
            {/* <GoogleMaps latitude="55.797897" longitude="-1.077641" /> */}
            <img src={ploggingImage} alt="Logo" className="ploImage" />
            <div className="mapHover">
              <div className="challengeInfo">
                <h4>한강 떡잎방범대</h4>
                <span>
                  요즘 날씨 한강 걷기 좋아요!
                  <br />
                  **매주 수요일 저녁 7시
                  <br />
                  고속터미널역 8번 출구**
                </span>
              </div>
            </div>
          </div>
          <div className="mapWrapper">
            {/* <GoogleMaps latitude="55.797897" longitude="-1.077641" /> */}
            <img src={ploggingImage} alt="Logo" className="ploImage" />
            <div className="mapHover">
              <div className="challengeInfo">
                <h4>한강 떡잎방범대</h4>
                <span>
                  요즘 날씨 한강 걷기 좋아요!
                  <br />
                  **매주 수요일 저녁 7시
                  <br />
                  고속터미널역 8번 출구**
                </span>
              </div>
            </div>
          </div>
        </div>
        <ChallengeCreate onCancel={onCancel} />
      </div>
    </>
  );
}

export default Challenge;
