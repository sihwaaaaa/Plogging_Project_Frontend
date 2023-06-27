import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { DataService } from "../../../config/dataService/dataService";
import { Button } from "../../../components/buttons/buttons";
import "../../../static/css/rewardPageStyle.scss";
import { Row, Col, Card, Image } from "antd";
import MyRankInfo from "./MyRankInfo";
import RankList from "./RankList";
import RewardProductList from "./rewardProductList";
import { getItem } from "../../../utility/localStorageControl";
import BlogCard from "../../../components/cards/BlogCard";
import ploggingImg from "../../../static/img/pages/rewardImg/plogging.jpg";
import pointImg from "../../../static/img/pages/rewardImg/point.png";
import uploadImg from "../../../static/img/pages/rewardImg/Camera.jpg";
import randumBoxImg from "../../../static/img/pages/rewardImg/randumbox.png";
import donationImg from "../../../static/img/pages/rewardImg/donation.png";
import donationHeaderImg from "../../../static/img/pages/rewardImg/donation-header.jpg";
import arrowRightImg from "../../../static/img/pages/rewardImg/arrow-right.png";
import { alertModal } from "../../../components/modals/antd-modals";
import axios from "axios";
import posts from "../../profile/myProfile/overview/timeline/Posts";


const Reward = () => {
  const [rewardList, setRewardList] = useState([]);
  const [rankingList, setRankingList] = useState([]);
  const memberNo = getItem("memberNo");
  const [myRank, setMyRank] = useState([]);
  const [donationList, setDonationList] = useState([]);
  const [currentPoint, setCurrentPoint] = useState([]);


  useEffect(() => {
    DataService.get(`/reward/list/`).then(function(response) {
      setRewardList(response.data.data);
    });
  }, []);

  const createDonation = () => {
     fetch("http://localhost:8080/history/Donation", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8", Authorization: `Bearer ${getItem("ACCESS_TOKEN")}`
      },
      body: JSON.stringify({
        memberNo : memberNo,
        type: "Donation",
        point: -1000,
      }),
    }).then(() => alertModal.success({
      title: "기부가 성공적으로 처리 되었습니다",
      content: "기부를 해주셔서 감사합니다",
    }))
  };


  const createProduct = () => {
    fetch("http://localhost:8080/history/Product", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8", Authorization: `Bearer ${getItem("ACCESS_TOKEN")}`
      },
      body: JSON.stringify({
        memberNo: memberNo,
        type: "Product",
        point: -8000,
      })
    }).then(() => alertModal.success({
      title: "랜덤박스 신청이 성공적으로 처리 되었습니다",
    }))
  };

  useEffect(() => {
      DataService.get("/history/rank/badge/" + memberNo)
      .then(function(response) {
        setMyRank(response.data);
        console.log("data badge : ", response.data)
      });
  }, []);

  useEffect( () => {
    DataService.get("/history/donationPoint/" + memberNo)
      .then(function(response) {
        setCurrentPoint(response.data);
        console.log("dataCurrentPoint", response.data)
      })
  }, [])

  const showConfirm = (type) => {
    alertModal.confirm({
      title: type === "Product" ? '랜덤박스 신청을 하시겠습니까?' : '기부를 하시겠습니까?',
      content: type === "Product" ? "신청을 하시면 회원님의 8000포인트가 차감 됩니다." : '기부하시면 회원님의 1000포인트가 차감 됩니다',
      onOk() {
        console.log("ok 누름");
        type === "Product" ? createProduct() : createDonation()
      },
      onCancel() {},
    });
  };
  return (
    <>
      <div className="rewardpage-wrapper">
        <div className="rewardpage-info">
          <div className="container">
            <h2>포인트 적립 안내</h2>
            <div className="container-body-header">
              <span>
              플로깅이나 챌린지를 통해 포인트를 적립하고 친환경 랜덤박스와 기부를 할 수 있습니다
               </span>
              <span>
              산책도 하고 운동도 하고 환경도 지키고 기부도 하고! 친환경 제품도 구매도 해보세요!
              </span>
            </div>
            <div className="container-info-header" style={{ padding: "0" }}>
              <MyRankInfo myRank={myRank} />
            </div>
            <div className="card-wrapper">
              <Card className="card">
                <Row gutter={16}>
                  <Col span={24}>
                    <h3>플로깅, 챌린지 참여</h3>
                    <Image src={ploggingImg} alt={ploggingImg} />
                  </Col>
                </Row>
              </Card>
              <Image className="arrowimage" src={arrowRightImg} alt={arrowRightImg} />
              <Card className="card">
                <Row gutter={16}>
                  <Col span={24}>
                    <h3>인증샷 작성</h3>
                    <Image src={uploadImg} alt={uploadImg} />
                  </Col>
                </Row>
              </Card>
              <Image className="arrowimage" src={arrowRightImg} alt={arrowRightImg} />
              <Card className="card">
                <Row gutter={16}>
                  <Col span={24}>
                    <h3>포인트 획득</h3>
                    <Image src={pointImg} alt={pointImg} />
                  </Col>
                </Row>
              </Card>
              <Image src={arrowRightImg} alt={arrowRightImg} />
              <Card className="card">
                <Row gutter={24}>
                  <Col span={24}>
                    <h4>친환경 랜덤박스 신청</h4>
                    <h3 style={{ marginBottom: "45px" }}>포인트 기부</h3>
                    <Image src={randumBoxImg} alt={randumBoxImg} style={{ height: "99px" }} />
                    <Image src={donationImg} alt={donationImg} style={{ height: "99px" }} />
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </div>
        <div className="rewardpage-rank">
          <Row>
            <Col xxl={17} xs={24} span={12} offset={2} style={{ marginTop: 20 }}>
              <RankList />
            </Col>
          </Row>
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
              <RewardProductList />
            </div>
            <Button key="submit" type="primary" size="default" className="productButton" onClick={() => showConfirm("Product")}>
              랜덤박스 신청하기
              <p>-8000P</p>
            </Button>
          </div>
        </div>
        <div className="rewardpage-donation">
          <div className="container-donation">
            <Row justify={"left"} align={"middle"}>
            <h2>기부하기</h2>
              <Col span={24} offset={10}>
                <div className="container-body-donation">
              <span>
                회원님들의 기부하신 포인트를 모아 지원 내용을 검토해 캠페인 기부에 활용 됩니다.
              </span>
                  <div className="useDonation">
              <span>
                현재 회원님의 기부하신 포인트는 {currentPoint * -1}P 입니다
              </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={6}>
                <Image src={donationHeaderImg} alt={donationHeaderImg} />
                <Button className="donationButton" size="default" type="primary" key="submit"
                        onClick={() => showConfirm("Donation")}>
                  기부하기
                  <p>-1000P</p>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24} offset={1}>
                <div className="container-donation-wrap">
                  <h2>기부처</h2>
                  <div className="donation-company">
                    <BlogCard />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reward;
