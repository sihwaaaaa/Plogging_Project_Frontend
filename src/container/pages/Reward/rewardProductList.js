import React, { Component } from "react";
import { Carousel, Image } from "antd";
import ex from "../../../static/img/ex.jpg.jpg";

const rewardProductList = () => {
  const contentStyle = {
    display:'flex',
    margin: 'auto',
    textAlign: 'center',
    width: '100%',
    height: '450px',
    color: '#fff',
    background: '#364d79',
    justifyContent : 'center',
  };
  const imageStyle = {
    display: 'inline-block',
    width : '230px',
    margin: '25px',
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} autoplay={true} autoplaySpeed={4000} effect="scrollx">
      <div>
        <h3 style={contentStyle}>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
          <div>
            <Image src={ex} className="ex-img" style={imageStyle}/>
            <p>제조사 : 제품명</p>
            <p>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p>
          </div>
        </h3>
      </div>
    </Carousel>
  );
};
export default rewardProductList;
