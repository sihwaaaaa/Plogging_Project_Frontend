import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataService } from '../../config/dataService/dataService';
import { Button } from '../../components/buttons/buttons';

function pointHistory() {
  // const onSubmit = () => {
  //   axios
  //     .post(
  //       '/history',
  //       JSON.stringify({
  //         memberNo: '',
  //         type: '',
  //         point: '',
  //         rewardNo: '',
  //       }),
  //     )
  //     .then((res) => console.log(res));
  // };
  const createPointhistory = () => {
    DataService.post('/history/donation', {
      memberNo: '1',
      type: 'donation',
      point: '-1000',
      rewardNo: '1',
    }).then((response) => console.log(response));
  };
  return (
    <Button size="default" type="primary" key="submit" onClick={createPointhistory}>
      기부하기
    </Button>
  );
}
export default pointHistory;
