import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { DataService } from "../../config/dataService/dataService";
import { KnowledgebaseTopWrap } from "./knowledgeBase/style";
import { Form, Input } from "antd";
import { Button } from "../../components/buttons/buttons";
import FontAwesome from "react-fontawesome";
import "../../static/css/rewardPageStyle.scss";
import PointHistory from "./pointHistory";
import { Row, Col, Card } from "antd";
import ex from "../../static/img/ex.jpg.jpg";
import { rewardRankList } from "./rewardRankList";


const Reward = () => {
  const [rewardList, setRewardList] = useState([]);

  useEffect(() => {
    DataService.get(`/reward/list`).then(function(response) {
      setRewardList(response.data);
      console.log("reward List Test : ");
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <div className="rewardpage-wrapper">
        <div className="rewardpage-info">
          <div className="container">
            <h2>포인트 적립 안내</h2>
            <div className="container-body">
          <span>
            플로깅이나 챌린지를 통해 포인트를 적립하고 친환경 랜덤박스와 기부를 할 수 있습니다
          </span>
              <span>
            산책도 하고 운동도 하고 환경도 지키고 기부도 하고! 친환경 제품도 구매 하고!
          </span>
            </div>
            <Card className="card">
              <Row gutter={16}>
                <Col span={24}>
                  <h3>플로깅, 챌린지 참여</h3>
                  <span>아이콘</span>
                </Col>
              </Row>
            </Card>
            <FontAwesome className="smileIcon" name="smile-o" />
            <Card className="card">
              <Row gutter={16}>
                <Col span={24}>
                  <h3>인증샷 작성</h3>
                  <span>아이콘</span>
                </Col>
              </Row>
            </Card>
            <FontAwesome className="smileIcon" name="smile-o" />
            <Card className="card">
              <Row gutter={16}>
                <Col span={24}>
                  <h3>포인트 획득</h3>
                  <span>아이콘</span>
                </Col>
              </Row>
            </Card>
            <FontAwesome className="smileIcon" name="smile-o" />
            <Card className="card">
              <Row gutter={16}>
                <Col span={24}>
                  <h4>친환경 랜덤박스 신청</h4>
                  <h3>포인트 기부</h3>
                  <span>아이콘</span>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
        <div className="rewardpage-rank">
          <div className="container-rank">
            <h2>랭킹</h2>
            <div className="container-body-rank">
              <span>
                회원님의 누적 포인트는 "n" 입니다. 사용하신 포인트는 누적포인트에 적용되지 않습니다
              </span>
              <span>
                회원님의 랭킹을 확인해 보세요!
              </span>
            </div>
            <div className="container-card-wrapper">
              <img src={ex} className="ex-img" />
              <div className="card-myRanking">
                <div className="total-ranking">
                  {/*<RewardRankList />*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rewardpage-product">
          <div className="container-product">
            <h2>랜덤박스</h2>
            <div className="container-body-product">
              <span>
                회원님이 적립하신 포인트로 랜덤박스를 신청하시면 친환경 제품을 랜덤으로 보내 드립니다!
              </span>
            </div>
            <div className="product-table-wrapper">
              <div className="container-product-wrapper">
                <h3>랜덤박스 구성품</h3>
              </div>
              <div className="container-productList">
                <Card className="card">
                  <Row gutter={16}>
                    <Col span={24}>
                      <img src={ex} className="ex-img" />
                      <span>제조사 제조사 명</span>
                      <span>내용</span>
                    </Col>
                  </Row>
                </Card>
                <Card className="card">
                  <Row gutter={16}>
                    <Col span={24}>
                      <img src={ex} className="ex-img" />
                      <span>제조사 제조사 명</span>
                      <span>내용</span>
                    </Col>
                  </Row>
                </Card>
                <Card className="card">
                  <Row gutter={16}>
                    <Col span={24}>
                      <img src={ex} className="ex-img" />
                      <span>제조사 제조사 명</span>
                      <span>내용</span>
                    </Col>
                  </Row>
                </Card>
                <Card className="card">
                  <Row gutter={16}>
                    <Col span={24}>
                      <img src={ex} className="ex-img" />
                      <span>제조사 제조사 명</span>
                      <span>내용</span>
                    </Col>
                  </Row>
                </Card>
                <Card className="card">
                  <Row gutter={16}>
                    <Col span={24}>
                      <img src={ex} className="ex-img" />
                      <span>제조사 제조사 명</span>
                      <span>내용</span>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
            <Button key="1" type="primary" size="default" className="productButton">
              랜덤박스 신청하기
              <p>-8000P</p>
            </Button>
          </div>
        </div>
        <div className="rewardpage-donation">
          <div className="container-donation">
            <h2>기부하기</h2>
            <div className="container-body-donation">
              <span>
                회원님들의 포인트로 기부하시면 포인트를 모아 결식아동, 저소득, 노인복지, 저소득 계층 청소년 지원 캠페인에 활용 됩니다
              </span>
              <div className="useDonation">
              <span>
                현재 회원님의 기부하신 포인트는 "%n" 입니다
              </span>
              </div>
            </div>
            <div className="container-card-wrapper">
              <img src={ex} className="ex-img" />
              <Button key="2" type="primary" size="default" className="donationButton">
                기부하기
                <p>-1000P</p>
              </Button>
            </div>
            <div className="container-donation-wrap">
              <h2>기부처</h2>
              <div className="donation-company">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reward;

{/*<PointHistory />*/
}
{/*{rewardList.map((res) => (*/
}
{/*  <div>*/
}
{/*    <span>{res.name}</span>*/
}
{/*    <span>{res.detail}</span>*/
}
{/*    <span>{res.type}</span>*/
}
{/*  </div>*/
}
{/*))}*/
}