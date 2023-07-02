import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BlogCardStyleWrap } from "./Style";
import { DataService } from "../../config/dataService/dataService";
import { Col, Row } from "antd";

/**
 * @Author 이재원
 * @Date 23.06.29
 * @Brief 기부처 조회. 리액트 템플릿에 있는 기능을 활용
 */
function BlogCard({ item, theme }) {
  const [Donation, setDonation] = useState([]);
  const rewardNo = [28, 29, 30, 31, 32, 33, 34, 35];
  useEffect(() => {
    DataService.get("/reward/list/Donation")
      .then((response) => {
        const DonationFiler = response.data.filter((item) =>
          rewardNo.includes(item.rewardNo)
        );
        setDonation(DonationFiler);
        console.log("RewardDonationList : " + Donation);
        console.log("RewardDonationList : " + response.data);
      })
      .catch((error) => {
        console.log("에러 :" + error);
      });
  }, []);

  return (
    <Row gutter={24} >
      {Donation.map((response) => (
        <Col xl={6} sm={12} xs={24} key={response.rewardNo}>
          <BlogCardStyleWrap>
            <figure className={`ninjadash-blog ninjadash-blog-${theme}`} style={{height:"370px", backgroundColor:"white"}}>
              <div className="ninjadash-blog-thumb" style={{overflow:"hidden"}}>
                <img className="ninjadash-blog__image"
                     style={{
                       width: "100%",
                       objectFit: "contain",
                       minHeight: "120px"
                     }}
                     src={require(`../../static/img/pages/rewardImg/${response.rewardNo}.png`)}
                     alt="ninjadash Blog" />
              </div>
              <figcaption>
                <h2 className="ninjadash-blog__title">
                  <span>{response.name}</span>
                </h2>
                <div className="ninjadash-blog__bottom">
                  <p className="ninjadash-blog__text" >{response.detail}</p>
                </div>
              </figcaption>
            </figure>
          </BlogCardStyleWrap>
        </Col>
      ))}
    </Row>
  );
}



export default BlogCard;
