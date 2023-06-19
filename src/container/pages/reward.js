import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { DataService } from "../../config/dataService/dataService";
// import "../../components/cards/Style"
import { KnowledgebaseTopWrap } from "./knowledgeBase/style";
import { Form, Input } from "antd";
import { Button } from "../../components/buttons/buttons";
import FontAwesome from "react-fontawesome";
import "../../static/css/rewardPageStyle.scss";
import PointHistory from "./pointHistory";

const Reward = () => {
  const [rewardList, setRewardList] = useState([]);

  useEffect(() => {
    DataService.get(`/reward/list`).then(function(response) {
      setRewardList(response.data);
      console.log("reward List Test : ");
      console.log(response.data);
    });
  }, []);
  return (
    <>
      <div className="rewardContainer">
        <div className="rewardHeader1">

        </div>
        <div className="rewardHeader2">
          <KnowledgebaseTopWrap>
            <div className="ninjadash-knowledgetop">
              <div className="rewardinfoText">
                <h3>함께할 플로거를</h3>
                <h3>찾아보세요!</h3>
              </div>
            </div>
          </KnowledgebaseTopWrap>
        </div>
      </div>
    </>
  );
};
export default Reward;

{/*<PointHistory />*/
}
{/*{rewardList.map((res) => (*/
}
{/*  <div>*/
}
{/*    <span>{res.name}</span>*/
}
{/*    <span>{res.detail}</span>*/
}
{/*    <span>{res.type}</span>*/
}
{/*  </div>*/
}
{/*))}*/
}