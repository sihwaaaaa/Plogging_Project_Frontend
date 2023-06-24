import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataService } from "../../../config/dataService/dataService";
import { Button } from "../../../components/buttons/buttons";
import { Row } from "antd";
import '../../../static/css/rewardPageStyle.scss'


function pointHistory() {

  return (
    <div className = "pointhistoryContainer">
      <Row gutter={24}>
      <Button size="default" type="primary" onClick={createDonation}>
        기부하기
      </Button>
      <Button size="default" type="success" onClick={createProduct}>
        랜덤박스 신청
      </Button>
      </Row>
    </div>
  );
}

export default pointHistory;
