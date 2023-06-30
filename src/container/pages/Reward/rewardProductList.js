import React, { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import { DataService } from "../../../config/dataService/dataService";
import { getItem } from "../../../utility/localStorageControl";


/**
 * @Author 이재원
 * @Date 23.06.29
 * @Brief 상품 리스트를 Carousel을 활용하여 조회
 */
function rewardProductList() {
  const [productList, setProductList] = useState([]);
  const rewardNo = getItem('rewardNo')
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
    <Carousel afterChange={onChange}
              infinite={true}
              autoplay={true}
              autoplaySpeed={4000}
              slidesToScroll={4}
              slidesToShow={4}
              effect="scrollx"
    >
      {productList.map((response) => (
        <div key={response.rewardNo}>
          <h3 style={contentStyle}>
            <div>
              <Image src={(require(`../../../static/img/pages/rewardImg/${response.rewardNo}.png`))} style={imageStyle}/>
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
