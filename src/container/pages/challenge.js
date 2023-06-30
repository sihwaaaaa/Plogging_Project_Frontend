/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import ploggingImage2 from '../../static/img/줍깅로고-removebg-preview.png';
import '../../static/css/ChallengeStyle.scss';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import { ProjectHeader } from './ChallengeStyle';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import ChallengeCreate from './ChallengeCreate';
import ChallengeOne from './ChallengeOne';
import { DataService } from '../../config/dataService/dataService';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Link } from "react-router-dom";
import { getItem } from "../../utility/localStorageControl";

function Challenge() {
  const searchData = useSelector((state) => state.headerSearchData);
  const [state, setState] = useState({
    notData: searchData,
    visible: false,
    categoryActive: 'all',
  });

  let memberNo = getItem('memberNo');
  let today = new Date()
  function formatDate(date,format){
    const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yyyy: date.getFullYear().toString(),
      // yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
  }
  let nowDate = formatDate(today,'yyyy-mm-dd');

  console.log(nowDate)
  const [challenges, setChallenges] = useState([{
    chNo:'',
    memberNo:'',
    title:'',
    content:'',
    startDate:'',
    endDate:'',
    challengers:[],
    challengeMemberCnt:'',
  }],);
  useEffect(() => {
    DataService.get('/challenge').then(function (response) {
      setChallenges(response.data.data);
      console.log("지금")
      console.log(response.data.data);
      console.log(response.status);
      // console.log(response.config.headers.Author);
    });
  }, []);

  // let start = challenges.filter(()=>c.startDate).map((data)=> data.startDate)
  let end = challenges.filter(c=> new Date(c.endDate) < new Date())
  // console.log("start : " ,start)
  console.log("end : " , end)
  // let endDateTime = challenges.filter((c)=>c.endDate).map((date) => date.endDate);
  let endDateTime = challenges.filter((c) => c.endDate && c.endDate < nowDate).map((date) => date.endDate);
  // const startDateObj = new Date(start);
  const currentTime = new Date(nowDate);
  console.log("endDateObj : " , endDateTime)
  console.log("curr : " , nowDate )
  let isExpired = endDateTime.some((endDate) => endDate < nowDate);

  console.log("isExpired : " , isExpired)


 //
 // challenges.forEach(obj=>{
 //   if(endDateTime < nowDate){
 //     console.log(`${obj.title}은 챌린지가 종료되었습니다`)
 //   }else{
 //     console.log(`${obj.title}은 챌린지가 종료되지 않았습니다`)
 //   }
 // })


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
                <h2 className="ninjadash-knowledgetop__title"> # 함께하는 플로깅 ' 챌린지 '</h2>
                <div className="ninjadash-knowledgetop__search--form">
                  <Form name="login" layout="vertical">
                    <div className="ninjadash-knowledgetop__formInner">
                        <div lassName="challengeTitle">
                        <p> # 환경을 지키고 건강을 챙기며 함께 움직이는 즐거움!</p>
                        <p> # 지구를 위한 청소운동 챌린지에 도전하세요!</p>
                          <img src={ploggingImage2} alt="Logo" className="memberIcon" />
                        </div>
                    </div>
                  </Form>
                </div>
              </div>
            </KnowledgebaseTopWrap>
          </div>
        </div>
        {/* <Modals /> */}
        {memberNo !== undefined && <ProjectHeader>
          <PageHeader
            className="ninjadash-page-header-main"
            ghost
            title="챌린지를 만들어 보시겠어요?"
            buttons={[
              <Button onClick={showModal} key="1" type="primary" size="default" className="createChallenge">
                <UilPlus /> Create Challenge!
              </Button>
            ]}
          />
        </ProjectHeader>}
        {memberNo === undefined && <ProjectHeader>
          <PageHeader
            className="ninjadash-page-header-main"
            ghost
            title="로그인후 챌린지를 만들어보세요"
          />
        </ProjectHeader>}


        <div className="challenge-slider-title">
          <h4>챌린지 리스트</h4>
        </div>
        <div className="challengeList" style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          {challenges.filter(c => c.personnel !== c.challengeMemberCnt).map((data) => (
            <ChallengeOne challenge={data} />
          ))}
        </div>
        <div className="challenge-slider-title">
          <h4>인원마감된 챌린지</h4>
        </div>
        <div className="challengeList" style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          {challenges.filter(c => c.personnel === c.challengeMemberCnt).map((data) => (
            <ChallengeOne challenge={data} />
          ))}
        </div>
        <ChallengeCreate onCancel={onCancel} visible={visible} />
      </div>
    </>
  );
}

export default Challenge;
