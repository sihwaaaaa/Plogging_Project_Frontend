/* eslint-disable import/named */
import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import '../../static/css/indexPageStyle.scss';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { ProjectHeader } from './ChallengeStyle';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import ChallengeCreate from './ChallengeCreate';
import ChallengeList from './ChallengeList';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';

function Challenge() {
  const searchData = useSelector((state) => state.headerSearchData);
  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });
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
        <ChallengeList />
        <ChallengeCreate onCancel={onCancel} visible={visible} />
      </div>
    </>
  );
}

export default Challenge;
