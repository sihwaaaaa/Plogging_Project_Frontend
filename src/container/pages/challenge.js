/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import '../../static/css/ChallengeStyle.scss';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { ProjectHeader } from './ChallengeStyle';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import ChallengeCreate from './ChallengeCreate';
import ChallengeOne from './ChallengeOne';
import { DataService } from '../../config/dataService/dataService';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';

function Challenge() {
  const searchData = useSelector((state) => state.headerSearchData);
  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });
  const [challenges, setchallenges] = useState([]);

  useEffect(() => {
    DataService.get('/challenge').then(function (response) {
      setchallenges(response.data.data);
      console.log(response.data.data);
      console.log(response.status);
      console.log(response.config.headers.Author);
    });
  }, []);

  const { visible } = state;
  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };
  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  return (
    <>
      <div className="index-page-challenge">
        <div className="container">
          <div className="challenge-search">
            <KnowledgebaseTopWrap>
              <div className="ninjadash-knowledgetop">
                <h2 className="ninjadash-knowledgetop__title">모든 챌린지</h2>
                <div className="ninjadash-knowledgetop__search--form">
                  <Form name="login" layout="vertical">
                    <div className="ninjadash-knowledgetop__formInner">
                      <Form.Item className="ninjadash-search-input">
                        <Input placeholder="원하는 챌린지를 검색해보세요" />
                        <Button className="btn-search" htmlType="submit" size="large">
                          <FontAwesome name="search" />
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </KnowledgebaseTopWrap>
          </div>
        </div>
        {/* <Modals /> */}
        <ProjectHeader>
          <PageHeader
            className="ninjadash-page-header-main"
            ghost
            title="챌린지를 만들어 보시겠어요?"
            buttons={[
              <Button onClick={showModal} key="1" type="primary" size="default" className="createChallenge">
                <UilPlus /> Create Challenge!
              </Button>,
            ]}
          />
        </ProjectHeader>
        <div className="challenge-slider-title">
          <h4>현재 진행중인 챌린지</h4>
        </div>
        <div className="challengeList" style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          {challenges.map((data) => (
            <ChallengeOne challenge={data} />
          ))}
        </div>
        <ChallengeCreate onCancel={onCancel} visible={visible} />
      </div>
    </>
  );
}

export default Challenge;
