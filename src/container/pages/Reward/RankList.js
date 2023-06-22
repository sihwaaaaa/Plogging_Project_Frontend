import React from "react";
import ex from "../../../static/img/ex.jpg.jpg";

const RankList = (props) => {

  const rankingNum = props.rankList.rankingNum;
  const userId = props.rankList.userId;
  const sumPoint = props.rankList.sumPoint;
  const badgeName = props.rankList.badgeName;
  console.log("props test : " + props);
  console.log("userId" + userId)
  console.log(sumPoint);
  return (
    <>
      <div className="container-rank">
        <h2>랭킹</h2>
        <div className="container-body-rank">
              <span>
                회원님의 누적 포인트는 "n" 입니다. 사용하신 포인트는 누적포인트에 적용되지 않습니다
              </span>
          <span>
                회원님의 랭킹을 확인해 보세요!
              </span>
        </div>
        <div className="container-card-wrapper">
          <img src={ex} className="ex-img" />
          <div className="card-myRanking">
            <div className="total-ranking">
              <p>{rankingNum}</p>
              <p>{userId}</p>
              <p>{sumPoint}</p>
              <p>{badgeName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};
export default RankList;