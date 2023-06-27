import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import BlogCard from "../../../components/cards/BlogCard";
import { Main } from "../../styled";
import { DataService } from "../../../config/dataService/dataService";
import cardData from "../../../demoData/sampleCards.json";
const { BlogCardData } = cardData;

function rewardDonationList() {
  return (
    <>
      <Main>
        <Row gutter={25} className="mt-sm-10" >
              <BlogCard />
        </Row>
      </Main>
    </>
  );
}

export default rewardDonationList;
