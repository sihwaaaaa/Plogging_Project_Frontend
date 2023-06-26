import React, { useState } from "react";
import { Card, Col, Form, Input, Row } from "antd";
import '../../static/css/indexPageStyle.scss';
import Swiper from "react-id-swiper";
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { useNavigate } from "react-router-dom";
import index_plogging1 from "../../static/img/index_plogging1.png";
import index_plogging2 from "../../static/img/index_plogging2.png";
import index_plogging3 from "../../static/img/index_plogging3.png";
import index_plogginginfo1 from "../../static/img/index-plogginginfo1.png";
import index_plogginginfo2 from "../../static/img/index-plogginginfo2.png";
import index_reward1 from "../../static/img/index_reward1.png";
import index_reward2 from "../../static/img/index_reward2.png";
import { Button } from '../../components/buttons/buttons';
import { UilSmileSquintWinkAlt } from "@iconscout/react-unicons";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";
//npm install react-id-swiper@latest swiper@latest

function Index() {

  const navigate = useNavigate();

  const toPloggingPage = () => {
    navigate('/plogging')
  }

  const toRewardPage = () => {
    navigate('/reward')
  }


  return (
    <>
      <div className="index-page-plogging">
        <div className="index-logo-title-wrapper">
          <h2>환경을 지키는 운동, <span>플로깅</span></h2>
          <div onClick={() => toPloggingPage()} className="start-plogging-btn">지금부터 시작하기</div>
        </div>
      </div>
      <div className="index-page-ploggingInfo">
        <div className="container">
          <h2>WHAT IS PLOGGING</h2>
          <span>
            플로깅은 <span style={{color: "#5f5f5f"}}>‘이삭을 줍는다’ 는 뜻인 스웨덴어 plocka upp과 영어 단어 jogging(조깅)이 합쳐져 생긴 합성어</span>로,
            국내에서는 '줍다'와 '조깅'을 결합한 '줍깅'으로 불리고 있습니다.
            <br />
            운동으로 건강을 챙기는 동시에 환경을 지키기 위한 작은 실천에 동참하자는 취지로 행하는 <span>환경보호 운동</span>입니다.
          </span>
          <div className="plogginginfo-card-wrapper">
            <div className="plogginginfo-card">
              <span>환경보호</span>
              <div className="card-box">
                <img src={index_plogginginfo1} alt="index_plogginginfo1"/>
              </div>
            </div>
            <UilPlus size={70} color="#99786c" />
            <div className="plogginginfo-card">
              <span>체력단련</span>
              <div className="card-box">
                <img src={index_plogginginfo2} alt="index_plogginginfo2"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="index-page-how-to-use">
        <div className="container">
          <h2>줍깅, 이렇게 사용하세요 <UilSmileSquintWinkAlt size={30} /></h2>
          <span>
          </span>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24} className="card-container">
                <h3>플로깅 준비</h3>
                <img src={index_plogging1} alt="플로깅준비" />
                <span>집게와 봉투를 준비하세요</span>
                <span>제로웨이스트샵에서 빌릴 수 있어요</span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24} className="card-container">
                <h3>플로깅하기</h3>
                <img src={index_plogging2} alt="플로깅인증" />
                <span>산책하며 쓰레기를 주워요</span>
                <span>다양한 추천경로가 기다리고 있답니다</span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24} className="card-container">
                <h3>챌린지 도전</h3>
                <img src={index_plogging2} alt="플로깅인증" />
                <span>혹시 함께하고 싶다면?</span>
                <span>챌린지에 도전해 더 즐겁게 플로깅해요</span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24} className="card-container">
                <h3>플로깅 인증</h3>
                <img src={index_plogging2} alt="플로깅인증" />
                <span>플로깅을 마쳤나요?</span>
                <span>커뮤니티에 인증샷을 남겨주세요</span>
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24} className="card-container">
                <h3>리워드</h3>
                <img src={index_plogging3} alt="리워드" />
                <span>포인트가 적립됐어요!</span>
                <span>원하는 리워드를 신청해보세요</span>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <div className="index-page-rewardInfo">
        <div className="container">
          <h2>HOW TO GET REWARD</h2>
          <div className="reward-information-wrapper">
            <span className="reward-information">
              <p>플로깅 후 인증글을 작성하면 포인트가 지급됩니다. 플로깅 포인트를 모아 원하는 리워드를 신청해보세요!</p>
              <span>첫번째 리워드</span> <span>랜덤박스, 친환경 제품을 집으로 배송받을 수 있어요</span>
              <br />
              <span>두번째 리워드</span> <span>기부하기, 원하는 기부단체에 포인트만큼 기부할 수 있어요</span>
            </span>
          </div>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>랜덤박스</h3>
                <img src={index_reward1} alt="index_reward1" />
              </Col>
            </Row>
          </Card>
          <Card className="card">
            <Row gutter={16}>
              <Col span={24}>
                <h3>기부하기</h3>
                <img src={index_reward2} alt="index_reward2" />
              </Col>
            </Row>
          </Card>
          <Button onClick={() => toRewardPage()} size="default" outlined type="warning">리워드 더 알아보기</Button>
        </div>
      </div>
      <div className="index-page-bottom">
        <div className="bottom-text-wrapper">
          <div className="bottom-text">
            <h4>지금부터 시작하는건 어떨까요?</h4>
            <h4>줍깅과 함께해요!</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
