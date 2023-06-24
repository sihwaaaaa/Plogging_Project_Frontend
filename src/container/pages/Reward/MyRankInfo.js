import React, { useEffect, useState } from "react";
import { getItem } from "../../../utility/localStorageControl";
import { DataService } from "../../../config/dataService/dataService";
import { Card, Col, Row } from "antd";
import ex from "../../../static/img/ex.jpg.jpg";
import FontAwesome from "react-fontawesome";
import "../../../static/css/rewardPageStyle.scss";

const MyRankInfo = (props) => {
  const badgeName = props.myRank.badgeName;
  const point = props.myRank.point;


  return (
    <>
      <Card className="card-header">
        <Row>
          <Col span={12} style={{height:"0"}}>
            <p style={{margin:"0"}}>등  급</p>
          </Col>
          <Col span={12}>
            <p style={{margin:"0"}}>누 적 포 인 트</p>
          </Col>
          <Col span={12}>
            <p style={{paddingTop:"13px", margin:"0",fontSize:"25px"}}>{badgeName}</p>
            <img src={ex} className="ex-img" />
          </Col>
          <Col span={12}>
            <p style={{fontSize:"50px", margin:"0", marginTop:"66px"}}>{point} P</p>
          </Col>
        </Row>
      </Card>
    </>
  )
}
export default MyRankInfo;