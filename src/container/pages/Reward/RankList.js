import React, { useEffect, useState } from "react";
import ex from "../../../static/img/ex.jpg.jpg";
import trophyIcon from "../../../static/img/pages/rewardImg/trophy.png";
import { Image, Table } from "antd";
import { TableDefaultStyle } from "../../styled";
import { DataService } from "../../../config/dataService/dataService";
import FontAwesome from "react-fontawesome";

const RankList = (props) => {

  const rewardRankColumns = [
    {
      title: "랭킹",
      dataIndex: "rank",
      key: "key"
    },
    {
      title: "유저 ID",
      dataIndex: "userId",
      key: "userId"
    },
    {
      title: "누적 포인트",
      dataIndex: "totalpoint",
      key: "point"
    },
    {
      title: "등급",
      dataIndex: "badgename",
      key: "badgeName"
    }
  ];
  const [rankingList, setRankingList] = useState([]);
  console.log("props test : " + props);
  useEffect(() => {
    DataService.get("/history/list/rank").then(function(response) {
      setRankingList(response.data);
      console.log("rankList Test : " + response.data); // [object Object]
      console.log("data.data : " + response.data.data); //undefined
      console.log(response);
    });
  }, []);

  let columnData = rewardRankColumns;
  let contentData: [];
  contentData = rankingList;

  // contentData = rankingList;
  console.log("contentData : " + [contentData]);
  console.log(rankingList);

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
          <Image src={trophyIcon} className="rank-trophy" />
          {/*<img src={ex} className="ex-img" />*/}
          <div className="card-myRanking">
            <div className="total-ranking">
                <div  className="full-width-table" >
                  <Table columns={columnData}
                         dataSource={contentData}
                         pagination={false}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};
export default RankList;