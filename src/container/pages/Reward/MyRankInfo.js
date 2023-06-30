import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Image, Row } from "antd";
// import ex from "../../../static/img/ex.jpg.jpg";
// import FontAwesome from "react-fontawesome";
import "../../../static/css/rewardPageStyle.scss";
// import first from '../../../static/img/pages/rewardImg/badgeImg/1.png';
// import second from '../../../static/img/pages/rewardImg/badgeImg/2.png';
// import third from '../../../static/img/pages/rewardImg/badgeImg/3.png';
// import fourth from '../../../static/img/pages/rewardImg/badgeImg/4.png';
// import fifth from '../../../static/img/pages/rewardImg/badgeImg/5.png';
// import sixth from '../../../static/img/pages/rewardImg/badgeImg/6.png';

const MyRankInfo = (props) => {

  const badgeName = props.myRank.badgeName;
  const totalPoint = props.myRank.point;
  const badgeNo = props.myRank.badgeNo;
  const badgeImg = useRef();

  useEffect(() => {
    if(!!badgeNo && badgeNo !== '') {
      badgeImg.current.src = require(`../../../static/img/pages/rewardImg/badgeImg/${badgeNo}.png`);
    }
  }, [badgeNo])

  return (
    <>
      <Card className="card-header">
        <Row>
          <Col span={12} style={{height:"0"}}>
            <span style={{margin:"-9px"}}>등  급</span>
          </Col>
          <Col span={12}>
            <span style={{margin:"-9px"}}>누 적 포 인 트</span>
          </Col>
          <Col span={12}>
            <p style={{paddingTop:"30px", margin:"0",fontSize:"25px"}}>{badgeName}</p>
            <img className="ex-img" ref={badgeImg} alt={'뱃지'} />
          </Col>
          <Col span={12}>
            <p style={{fontSize:"50px", margin:"93px"}}>{totalPoint} P</p>
          </Col>
        </Row>
      </Card>
    </>
  )
}
export default MyRankInfo;