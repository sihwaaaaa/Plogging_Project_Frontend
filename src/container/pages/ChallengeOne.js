// import React, { useState } from 'react';
import ploggingImage from '../../static/img/ploggingImage.png';
import '../../static/css/ChallengeStyle.scss';

function ChallengeList(props) {
  const challengeOne = props;
  console.log(challengeOne);

  return (
    <>
      <div className="sliderWrapper">
        <div className="mapWrapper">
          <img src={ploggingImage} alt="Logo" className="ploImage" />
          <div className="mapHover">
            <div className="challengeInfo">
              <h4>{challengeOne.challenge.title}</h4>
              <span>{challengeOne.challenge.content}</span>
              <span>{challengeOne.challenge.startDate}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeList;