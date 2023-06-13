import React from 'react';
import ploggingImage from '../../static/img/ploggingImage.png';
import '../../static/css/indexPageStyle.scss';

function ChallengeList() {
  return (
    <>
      <div className="challenge-slider-title">
        <h4>현재 진행중인 챌린지</h4>
      </div>
      <div className="sliderWrapper">
        <div className="mapWrapper">
          <img src={ploggingImage} alt="Logo" className="ploImage" />
          <div className="mapHover">
            <div className="challengeInfo">
              <h4>한강 떡잎방범대</h4>
              <span>
                요즘 날씨 한강 걷기 좋아요!
                <br />
                **매주 수요일 저녁 7시
                <br />
                고속터미널역 8번 출구**
              </span>
            </div>
          </div>
        </div>
        <div className="mapWrapper">
          <img src={ploggingImage} alt="Logo" className="ploImage" />
          <div className="mapHover">
            <div className="challengeInfo">
              <h4>한강 떡잎방범대</h4>
              <span>
                요즘 날씨 한강 걷기 좋아요!
                <br />
                **매주 수요일 저녁 7시
                <br />
                고속터미널역 8번 출구**
              </span>
            </div>
          </div>
        </div>
        <div className="mapWrapper">
          <img src={ploggingImage} alt="Logo" className="ploImage" />
          <div className="mapHover">
            <div className="challengeInfo">
              <h4>한강 떡잎방범대</h4>
              <span>
                요즘 날씨 한강 걷기 좋아요!
                <br />
                **매주 수요일 저녁 7시
                <br />
                고속터미널역 8번 출구**
              </span>
            </div>
          </div>
        </div>
        <div className="mapWrapper">
          <img src={ploggingImage} alt="Logo" className="ploImage" />
          <div className="mapHover">
            <div className="challengeInfo">
              <h4>한강 떡잎방범대</h4>
              <span>
                요즘 날씨 한강 걷기 좋아요!
                <br />
                **매주 수요일 저녁 7시
                <br />
                고속터미널역 8번 출구**
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengeList;
