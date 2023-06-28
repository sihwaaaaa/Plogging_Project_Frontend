// import React, { useState } from 'react';
import ploggingImage from '../../static/img/plologo1.jpeg';
import '../../static/css/ChallengeStyle.scss';
import { useEffect, useState } from "react";
import { DataService } from "../../config/dataService/dataService";
import { Link, useLocation } from "react-router-dom";


function ChallengeList(props) {

  const challengeOne = props;
  challengeOne.challenge.regDate = new Date;

  let location = useLocation();
  // console.log("location" + location.hash);

  const [challengeChno, setChallengeChno] =useState();
  const chNo = challengeOne.challenge.chNo;
  const chDetailbt = () => {
    useEffect(() => {
      DataService.get(`/challenge/chDetail/${chNo}`).then(function(response) {
        setChallengeChno(response.data.data);
        console.log(response.data.data);
        console.log(response.status);
        // console.log(response.config.headers.Author);
      });
    }, []);
  }

  // const url
  const url = `chDetail/${chNo}`;

  return (
    <>

      <div className="sliderWrapper">
        <div className="mapWrapper">
          <img src={ploggingImage} alt="Logo" className="ploImage" />
          <div className="mapHover">
            <Link to={url}>
              <div className="challengeInfo">
                <h4>{challengeOne.challenge.title}</h4>
                {/*<span>{challengeOne.challenge.content}</span>*/}
                <span>{challengeOne.challenge.startDate}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeList;
