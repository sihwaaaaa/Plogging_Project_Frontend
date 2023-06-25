import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import BlogCard from "../../../components/cards/BlogCard";
import { Main } from "../../styled";
import { DataService } from "../../../config/dataService/dataService";
import cardData from "../../../demoData/sampleCards.json";
const { BlogCardData } = cardData;

function rewardDonationList() {
  // const [Donation, setDonation] = useState([]);
  //
  // useEffect(() => {
  //   DataService.get("/reward/list/Donation")
  //     .then((response) => {
  //       setDonation(response.data);
  //       console.log("RewardDonationList : " + Donation);
  //       console.log("RewardDonationList : " + response.data);
  //     })
  //     .catch((error) => {
  //       console.log("에러 :" + error);
  //     });
  // }, []);

  return (
    <>
      <Main>
        <Row gutter={25} className="mt-sm-10">
            <Col xl={6} sm={12} xs={24}>
              <BlogCard />
            </Col>
        </Row>
      </Main>
    </>
  );
}

export default rewardDonationList;
