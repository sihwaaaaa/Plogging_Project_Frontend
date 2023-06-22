import React, { useState } from 'react';
import { getItem } from '../../../utility/localStorageControl';
import axios from 'axios';

const RewardList = () => {
  const userId = getItem('userId');
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [type, setType] = useState('');

  return (
    <div className="rewardWrapper">
      <span>{detail}</span>
      <span>{name}</span>
      <span>{type}</span>
    </div>
  );
};

export default RewardList;
