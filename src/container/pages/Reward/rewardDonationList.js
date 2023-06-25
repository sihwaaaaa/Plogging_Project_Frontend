import React, { useState } from "react";
import { Row, Col } from "antd";
import BlogCard from "../../../components/cards/BlogCard";
import { Main } from "../../styled";
import cardData from "../../../demoData/sampleCards.json";
// import cardData from "../../../demoData/sampleCards.json";
const { BlogCardData } = cardData;

function rewardDonationList() {
  // const [Donation, setDonation] = useState([]);

  // const BlogCardDatatest = [
  //   {
  //     "id": 1,
  //     "title": "Multiple Dashboard Design Idea",
  //     "content": "There are many variations of passages of majority have suffered alteration in some form",
  //     "img": "사랑의열매.png"
  //   },
  //   {
  //     "id": 2,
  //     "title": "How to Create a Niche Based Dashboard",
  //     "content": "There are many variations of passages of majority have suffered alteration in some form",
  //     "img": "대한적십자사.png"
  //   },
  //   {
  //     "id": 3,
  //     "title": "Tips for Design Simplicity ",
  //     "content": "There are many variations of passages of majority have suffered alteration in some form",
  //     "img": "명휘원.gif"
  //   },
  //   {
  //     "id": 4,
  //     "title": "Multiple Dashboard Design Idea",
  //     "content": "There are many variations of passages of majority have suffered alteration in some form",
  //     "img": "어린이재단.png"
  //   },
  //   {
  //     "id": 5,
  //     "title": "How to Growth Productivity ",
  //     "content": "Lorem Ipsum is simply dummy text of the printing printer took a galley of type and scrambled and typesetting industry.",
  //     "img": "통일과나눔.png"
  //   },
  //   {
  //     "id": 6,
  //     "title": "Different Between Dark & Night Mode",
  //     "content": "Lorem Ipsum is simply dummy text of the printing printer took a galley of type and scrambled and typesetting industry.",
  //     "img": "한국사회복지협의회.jpg"
  //   },
  //   {
  //     "id": 7,
  //     "title": "Tips for Design Simplicity ",
  //     "content": "Lorem Ipsum is simply dummy text of the printing printer took a galley of type and scrambled and typesetting industry.",
  //     "img": "한국장학재단.png"
  //   },
  //   {
  //     "id": 8,
  //     "title": "Multiple Dashboard Design Idea",
  //     "content": "Lorem Ipsum is simply dummy text of the printing printer took a galley of type and scrambled and typesetting industry.",
  //     "img": "사랑의열매.png"
  //   }
  // ];
  return (
    <>
      <Main>
        <Row gutter={25} className="mt-sm-10">
          {BlogCardData.slice(0, 7).map((blog) => {
            return (
              <Col key={blog.id} xl={6} sm={12} xs={24}>
                <BlogCard item={blog} />
              </Col>
            );
          })}
        </Row>
      </Main>
    </>
  );
}

export default rewardDonationList;
