import React, { Component, useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import ex from "../../../static/img/ex.jpg.jpg";
import { DataService } from "../../../config/dataService/dataService";

const rewardProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    DataService.get("/reward/list/Product")
      .then((response) => {
        setProductList(response.data);
        console.log("ProductList : " + productList)
      }).catch((error) => {
      console.log("에러 :" + error);
    });
  }, []);
  const contentStyle = {
    display: "flex",
    margin: "auto",
    textAlign: "center",
    width: "100%",
    height: "450px",
    justifyContent: "center"
  };
  const imageStyle = {
    display: "inline-block",
    width: "230px",
    margin: "25px"
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} autoplay={true} autoplaySpeed={4000} slidesToScroll={4} slidesToShow="4" effect="scrollx">
      {productList.map((response) => (
        <div key={response.id}>
          <h3 style={contentStyle}>
            <div>
              <Image src={ex} className="ex-img" style={imageStyle} />
              <p style={{fontWeight:"bold"}}>{response.name}</p>
              <p>{response.detail}</p>
            </div>
          </h3>
        </div>
      ))}
    </Carousel>
  )
}

export default rewardProductList;
