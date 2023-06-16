import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataService } from "../../config/dataService/dataService";
import { Button } from "../../components/buttons/buttons";
import { response } from "yarn/lib/cli";


function pointHistory() {
  const createDonation = () => {
    DataService.post("/history/donation", {
      type: "donation",
      point: -1000,
      rewardNo: 1
    }).then((response) => console.log("test", response));
  };

  const createProduct = () => {
    DataService.post("/history/product", {
      type: "product",
      point: -8000,
      rewardNo: 9
    }).then((response) => console.log(response));
  };
  return (
    <div>
      <Button size="default" type="primary" key="submit" onClick={createDonation}>
        기부하기
      </Button>
      <Button size="default" type="primary" key="submit" onClick={createProduct}>
        랜덤박스 신청
      </Button>
    </div>
  );
}

export default pointHistory;
