import React, { useEffect, useState } from "react";
import { getItem } from "../../../utility/localStorageControl";
import { DataService } from "../../../config/dataService/dataService";
import { Card, Col, Row } from "antd";
import ex from "../../../static/img/ex.jpg.jpg";
import FontAwesome from "react-fontawesome";
import "../../../static/css/rewardPageStyle.scss";

const MyRankInfo = (props) => {
  console.log(props);
  const memberNo = getItem('memberNo');
  const badgeName = props.myRank.badgeName;
  const point = props.myRank.point;


  return (
    <>
      <Card className="card-header">
        <Row>
          <Col span={12}>
            <p>등  급</p>
          </Col>
          <Col span={12}>
            <p>누 적 포 인 트</p>
          </Col>
          <Col span={12}>
            <img src={ex} className="ex-img" />
          </Col>
          <Col span={12}>
            <p>{badgeName}</p>
            <p>{point}</p>
          </Col>
        </Row>
      </Card>
    </>
  )
}
export default MyRankInfo;