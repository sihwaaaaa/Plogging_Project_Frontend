import React, { useState } from "react";
import FontAwesome from 'react-fontawesome';
import { Button, Card, Col, Form, Input, Row } from "antd";
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import '../../static/css/indexPageStyle.scss';
import { GoogleMaps } from '../../components/maps/google-maps';
import Swiper from "react-id-swiper";
import SwiperCore, { Navigation, Pagination } from 'swiper';

//npm install react-id-swiper@latest swiper@latest

function Index() {
  return (
    <>
      <div className="index-page-plogging">
        <h2>플로깅 시작 !</h2>
        <FontAwesome className="smileIcon" name="smile-o" />
      </div>
      <div className="index-page-ploggingInfo">
        <div className="container">
          <h2>WHAT IS PLOGGING</h2>
          <span>
            플로깅은 ‘이삭을 줍는다’ 는 뜻인 스웨덴어 plocka upp과 영어 단어 jogging(조깅)이 합쳐져 생긴 합성어로,
            산책을 하며 쓰레기를 줍는 환경운동입니다. 이를 국내에서는 '줍다'와 '조깅'을 결합한 '줍깅'으로 불리고
            있습니다.
          </span>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>플로깅 준비</h3>
                <span>집게와 봉투를 챙겨요</span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>플로깅 인증</h3>
                <span>집게와 봉투를 챙겨요</span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>리워드</h3>
                <span>집게와 봉투를 챙겨요</span>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <div className="index-page-challenge">
        <div className="container">
          <div className="challenge-search">
            <KnowledgebaseTopWrap>
              <div className="ninjadash-knowledgetop">
                <h2 className="ninjadash-knowledgetop__title">함께하는 플로깅, 챌린지</h2>
                <div className="ninjadash-knowledgetop__search--form">
                  <Form name="login" layout="vertical">
                    <div className="ninjadash-knowledgetop__formInner">
                      <Form.Item className="ninjadash-search-input">
                        <Input placeholder="한강 플로깅을 검색해보세요" />
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
        <div className="challenge-slider-title">
          <h4>현재 진행중인 챌린지</h4>
        </div>
        <div className="sliderWrapper">
          <div className="flexbox">
              <div className="mapWrapper">
                <GoogleMaps latitude="55.797897" longitude="-1.077641" />
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
                <GoogleMaps latitude="55.797897" longitude="-1.077641" />
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
                <GoogleMaps latitude="55.797897" longitude="-1.077641" />
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
                <GoogleMaps latitude="55.797897" longitude="-1.077641" />
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
        </div>
      </div>
      <div className="index-page-rewardInfo">
        <div className="container">
          <h2>HOW TO GET REWARD</h2>
          <span>
            플로깅 이후 blabla
          </span>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>랜덤박스</h3>
                <span></span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>기부하기</h3>
                <span></span>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Index;
