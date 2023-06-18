import React from 'react';
import Profile from '../profile';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import { useState } from 'react';
import TabComponent from './TabComponent';
const CategoryComponent = () => {

  // const [category, setCategory] = useState({
  //   key: '',
  //   label: '',
  // })
  const [isActive, setIsActive] = useState(false);

  const items = [
    {
      key: '1',
      label: `챌린지`,
    },
    {
      key: '2',
      label: `플로깅`,
    },
    {
      key: '3',
      label: `나의 글`,
    },
    {
      key: '4',
      label: `포인트 내역`,
    },
    {
      key: '5',
      label: `신고 내역`,
    },
  ];

  const handleItem = (e) => {
    console.log(e.target.key);
    // setCategory({
    //   key: e.target.value.key,
    //   label: e.target.value.label
    // });
  }
  return (
    <TabComponent />
  );
};



export default CategoryComponent;