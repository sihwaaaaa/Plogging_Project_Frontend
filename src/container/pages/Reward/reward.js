import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { DataService } from "../../../config/dataService/dataService";
import { Button } from "../../../components/buttons/buttons";
import FontAwesome from "react-fontawesome";
import "../../../static/css/rewardPageStyle.scss";
import { Row, Col, Card } from "antd";
import ex from "../../../static/img/ex.jpg.jpg";
import MyRankInfo from "./MyRankInfo";
import RankList from "./RankList";
import RewardProductList from "./rewardProductList";
import { getItem } from "../../../utility/localStorageControl";
import rewardDonationList from "./rewardDonationList";
import RewardDonationList from "./rewardDonationList";

const Reward = () => {
  const [rewardList, setRewardList] = useState([]);
  const [myRank, setMyRank] = useState([]);
  const [rankingList, setRankingList] = useState([]);
  const memberNo = getItem('memberNo');
  // const [memberNo, setMemberNo] = useState([])
  const [donation, setDonation] = useState({
    memberNo : getItem('memberNo'),
    type : 'Donation',
    point : '-1000',
    rewardNo : '30',
  });
  const [product, setProduct] = useState({
    memberNo : getItem('memberNo'),
    type : 'Product',
    point : '-8000',
  })

  useEffect(() => {
    DataService.get(`/reward/list/`).then(function(response) {
      setRewardList(response.data.data);
      console.log("reward List Test : ");
      console.log(response.data);
    });
  }, []);

  const donationTest = (e) => {
    console.log(e)
    setDonation({
      ...donation,
    })
  }
  const ProductTest = (e) => {
    console.log(" Product Test e : " + e)
    setProduct( {
      ...product,
    })
  }

  let obj = Object.assign(donation, donationTest, product, ProductTest)
  const createDonationTest = (e) => {
    e.preventDefault();
    console.log("e : " + e)
    console.log("test"+obj)
    console.log("e.data : "+e.data)
    fetch("http://localhost:8080/history/Donation",{
      method:"POST",
      headers: {
        "Content-type":"application/json; charset=utf-8",Authorization: `Bearer ${getItem('ACCESS_TOKEN')}`
      },
      body: JSON.stringify(obj)
    }).then(() => console.log(e));
  }



  const createProductTest = (e) => {
    e.preventDefault();
    console.log("e : " + e)
    console.log("test"+obj)
    console.log("e.data : "+e.data)
    fetch("http://localhost:8080/history/Product",{
      method:"POST",
      headers: {
        "Content-type":"application/json; charset=utf-8",Authorization: `Bearer ${getItem('ACCESS_TOKEN')}`
      },
      body: JSON.stringify(obj)
    }).then(() => console.log(e));
  }

  useEffect(() => {
    DataService.get('/history/rank/badge/' + memberNo)
      .then(function(response) {
        console.log(response.data);
        setMyRank(response.data);
      })
  },[])
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
            <div className="container-info-header" style={{padding:"0"}}>
                <MyRankInfo  myRank={myRank}/>
            </div>
            <div className="card-wrapper">
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
        </div>
        <div className="rewardpage-rank">
          <Row justify="center" align="top" >
            <Col xxl={17} xs={24} style={{marginTop:20}}  >
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
            <Button key="submit" type="primary" size="default" className="productButton" onClick={createProductTest} >
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
              <Button className="donationButton" size="default" type="primary" key="submit" onClick={createDonationTest}>
                기부하기
                <p>-1000P</p>
              </Button>
            </div>
            <div className="container-donation-wrap">
              <h2 >기부처</h2>
              <div className="donation-company">
                <RewardDonationList/>
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

// const createDonation = (data) => {
//   const cleanedData = {
//     type : data.type,
//     point : data.point,
//   };
//   DataService.post('/history/Donation', JSON.stringify(cleanedData))
//     .then((response) => {
//       setDonation(response.data);
//       console.log(response.data);
//     });
// };

// const createProduct = (data) => {
//   DataService.post("/history/Product", {data},'')
//     .then((response) => {
//       setProduct(response.data);
//       console.log("Product Test : " + response.data);
//       console.log("Product Test : " + response)
//   })
// };