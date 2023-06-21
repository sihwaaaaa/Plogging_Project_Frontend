import React, { useState } from "react";
import { BlogCardStyleWrap } from "../../../components/cards/Style";
import { Link } from "react-router-dom";
import { UilComment } from "@iconscout/react-unicons";
import image from "../../../static/img/boardEx.jpg";
import badge from "../../../static/img/logodemo.png";


const BoardLayout = (data) => {
  const bno = data.board.bno;
  const category = data.board.category;
  const writerNo = data.board.memberNo;
  const writerId = data.board.userId;
  const title = data.board.title;
  const content = data.board.content;
  const regDate = data.board.regDate;
  const updateDate = data.board.updateDate;
  const plogging = data.board.ploggingNo;
  const replyCnt = data.board.replyCount;


  return (
    <BlogCardStyleWrap>
      <figure className={`ninjadash-blog ninjadash-blog-style-2`}>
        <div className="ninjadash-blog-thumb">
          <img className="ninjadash-blog__image" src={image} alt="plogging" />
        </div>
        <figcaption>
          <div className="ninjadash-blog-meta ninjadash-blog-meta-theme-2">
            <span className="ninjadash-blog-meta__single ninjadash-category-meta">
              {category === 'PLOGGING' ? (
                <span style={{color : "#FFCB77"}}>{category}</span>
              ) : category === 'COMMUNITY' ? (
                <span style={{color : "#47B0D7"}}>{category}</span>
              ) : ''
              }
            </span>
            <span className="ninjadash-blog-meta__single ninjadash-date-meta">{regDate}</span>
          </div>
          <h2 className="ninjadash-blog__title">
            <Link to="#">{title}</Link>
          </h2>
          <p className="ninjadash-blog__text">{content}</p>
          <div className="ninjadash-blog__bottom">
            <div className="ninjadash-blog__author">
              <img className="ninjadash-blog__author-img" src={badge} alt="뱃지" />
              <span className="ninjadash-blog__author-name">{writerId}</span>
            </div>
            <ul className="ninjadash-blog__meta">
              <li className="ninjadash-blog__meta--item">
                {!!replyCnt ? (
                  <span className="view">
                  <UilComment size={30} />
                  <span>{replyCnt}</span>
                </span>
                ) : ''}
              </li>
            </ul>
          </div>
        </figcaption>
      </figure>
    </BlogCardStyleWrap>
  );

};

export default BoardLayout;