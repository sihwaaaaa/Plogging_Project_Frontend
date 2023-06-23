import React, { useEffect, useState } from "react";
import ploggingImage from '../../static/img/ploggingImage2.png';
import ploggingImage3 from '../../static/img/ploggingImage3.png';
import '../../static/css/ChallengeDetail.css';
import { AvatarWraperStyle } from "../ui-elements/ui-elements-styled";
import { Avatar } from "antd";
import {
  UilAngleRight,
  UilCalender,
  UilGrin, UilListUiAlt, UilSick,
  UilTrees
} from "@iconscout/react-unicons";
import UilUsersAlt from "@iconscout/react-unicons/icons/uil-users-alt";
import UilArrowDown from "@iconscout/react-unicons/icons/uil-arrow-down";
import { useParams } from "react-router-dom";
import ChallengeSchedule from './ChallengeSchedule';
import { DataService } from "../../config/dataService/dataService";
import { getItem } from "../../utility/localStorageControl";
import { Button } from "../../components/buttons/buttons";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";
import { useSelector } from "react-redux";


const ChallengeDetail = () => {
  let params = useParams();
  let chNo = params.id;
  let loginMemberNo = getItem('memberNo');
  console.log("loginMemberNo", loginMemberNo)
  const [state, setState] = useState({
    visible: false,
  });
  const { visible } = state;
  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });

  };
  // 챌린지단일조회
  const [challenge, setChallenge] = useState({
    chNo:'',
    memberNo:'',
    title:'',
    content:'',
    startDate:'',
    endDate:'',
    challengers:[],
    challengeMemberCnt:'',
  });

  console.log("challenge : " ,  challenge);
  // 챌린지 맴버리스트 조회

  const [chMemberList, setChMemberList] = useState({
    cmemberNo:'',
    chNo:'',
    challenger:'',
    regDate:'',
  })
  // 챌린지 가입
  const [chMember, setChMember] =useState({
    chNo:'',
    challenger:'',
    regDate:new Date(),
  })
  const [challengeScheduleList, setChallengeScheduleList] = useState([{
    scheduleNo:'',
    chNo:'',
    startDate:'',
    mapNo:'',
  }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataService.get(`/ploggingList/${chNo}`);
        setChallengeScheduleList(response.data);
        console.log("setChMemberList : " + response.data);
        console.log(response.status);
      } catch (error) {
        // 에러 처리
        console.log("fetchData error")
      }
    };
    fetchData();
  }, []);

  console.log("challengeScheduleList : " , challengeScheduleList)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataService.get("challengeMember");
        setChMemberList(response.data);
        console.log("setChMemberList : " + response.data);
        console.log(response.status);
      } catch (error) {
        // 에러 처리
        console.log("fetchData error")
      }
    };
    fetchData();
  }, []);
  console.log("chMemberList : " , chMemberList.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DataService.get(`/challenge/chDetail/${chNo}`);
        setChallenge(response.data);
        console.log(response.data);
        console.log(response.status);
      } catch (error) {
        // 에러 처리
        console.log("fetchData error")
      }
    };
    fetchData();
  }, []);

  console.log("location" + location.pathname);

  // 챌린지 맴버의 chNo , memberNo
  // 현재 로그인한 memberNo와 chNo


  const challengeJoin = (e) => {
    e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함
    const confirmed = window.confirm("우리 지구를 깨끗하게 하는 플로깅! 해당 챌린지에 참여하시겠습니까?")
    if(challenge.challengers && Array.isArray(challenge.challengers) && challenge.challengers.length > 0
      && challenge.challengers.filter(a => {return a === loginMemberNo}).length){

      window.alert("이미 가입한 챌린지입니다")
      return false;
    } else if(challenge.challengeMemberCnt === challenge.personnel){
      window.alert("인원이 마감된 챌린지 입니다")
      return false;
    }
    else{
      window.alert("챌린지 가입이 완료되었습니다")
    }
    if(confirmed) {
      fetch(`http://localhost:8080/challenge/chDetail/${chNo}`,{
        method:"POST",
        headers: {
          "Content-type":"application/json; charset=utf-8",Authorization: `Bearer ${getItem('ACCESS_TOKEN')}`
        },
        body: JSON.stringify(chMember)
      }).then((res)=>window.location.replace(""));
    }
  }


  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setState({
        visible,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [visible]);
  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  return (
    <>
      <div className="challengedetail">
        <div className="detail-top">
          <AvatarWraperStyle>
            <span className="challenge-page"><Avatar icon={< UilListUiAlt />} className="challenge-icon" /> 챌린지 상세페이지 </span>
          </AvatarWraperStyle>
        </div>
        <div className="image-title">
          <img src={ploggingImage} alt="Logo" className="challengeImage" />
          <div className="chImageTitle">
            <p1>Challenge Plogging <br/> </p1>
            <h1>아름다운 지구지키기 <br/> '플로깅'</h1>
            <p2>건강한 지구를 위해 플로깅을 <br /> 동참해주셔서 감사드립니다</p2>
          </div>
        </div>

        <div className="chHeader">
          <AvatarWraperStyle>
            <span><Avatar icon={< UilGrin />} className="chHeader-icon" />[공식 챌린지]</span>
            <span> {challenge.title} </span>
            {challenge.memberNo === loginMemberNo && <button type="submit" className="delete-bt"> 챌린지 삭제하기 </button>}
            {challenge.memberNo !== loginMemberNo && <button type="submit" className="signup-bt" onClick={challengeJoin}> 챌린지 가입하기 </button>}
          </AvatarWraperStyle>
        </div>

        <div className="chPersonnel">
          <AvatarWraperStyle>
            <span><Avatar icon={< UilUsersAlt />} className="chPersonnel-icon" /> 현재 {challenge.challengeMemberCnt}/{challenge.personnel}명
              {challenge.challengeMemberCnt === challenge.personnel && <span style={ {color:"red"} }> [ 해당 챌린지는 현재 인원마감 입니다 ]</span>}
            </span>
          </AvatarWraperStyle>
        </div>

        <div className="chPeriod">
          <AvatarWraperStyle>
            <div className="chPeriodDetail">
              <Avatar icon={< UilCalender />} className="chPeriodDetail-icon" />
              지구닦기 {challenge && challenge.startDate && <span>{challenge.startDate}</span>}
              ~ {challenge && challenge.endDate && <span>{challenge.endDate}</span>}
            </div>
          </AvatarWraperStyle>
        </div>

        <div className="chIntroduction">
          <img src={ploggingImage3} alt="Logo" className="challengeImage3" />
          <p className="Introduction">
            우리 챌린지는 ? <Avatar icon={< UilArrowDown />} className="chIntroduction-icon" />
          </p>
          <div className="IntroductionDetail">
            {challenge && challenge.content && <span>{challenge.content}</span>}
            {/*<span>" 아침운동 가야겠다고 생각만 하시죠? "</span>*/}
            {/*<br />*/}
            {/** 이런분들께 추천합니다 **/}
            {/*<br />*/}
            {/*<span>- 상쾌한 아침공기를 느껴보고 싶으신 분! <br/> - 건강하게! 아침형인간이 되고싶으신 분! <br/> - 목표를 정해서 이뤄내고 싶은 분! </span>*/}
          </div>
        </div>

        {/*{challengeScheduleList &&*/}
        {/*  challengeScheduleList.map((schList) => (*/}
          <div className="chSchedule">
          <div className="scheduleHeader">
            <AvatarWraperStyle>
              <Avatar icon={< UilTrees />} className="scheduleHeader-icon" /> 상쾌한 아침 플로깅 챌린지의 플로깅 일정
            </AvatarWraperStyle>
          </div>
          <div className="scheduleForm">
            <ul className="scheduleDay">
              <li>토요일</li>
              <li>10</li>
            </ul>
            <div className="scheduleDetail">
              <p>6월 10일(토) 오후6:00</p>
              <p>서울시 구로구</p>
            </div>
            <div className="Participation">
              <button type="submit" className="chParticipation"> + 일정참여</button>
            </div>
          </div>
          <div className="scheduleForm">
            <ul className="scheduleDay">
              <li>토요일</li>
              <li>17</li>
            </ul>
            <div className="scheduleDetail">
              <p>6월 17일(토) 오후6:00</p>
              <p>경기도 부천시</p>
            </div>
            <div className="Participation">
              <button type="submit" className="chParticipation"> + 일정참여</button>
            </div>
          </div>
        </div>
        {/*))}*/}
        <div className="scbutton">
          {challenge.memberNo === loginMemberNo && <Button onClick={showModal} key="1" size="default" className="createPlogging">
            <span> + 플로깅 일정추가 </span>
          </Button>}
          {/*<button type="submit" className="scheduleButton"> + 플로깅 일정추가 </button>*/}
        </div>

        <div className="precautions">
          <span className="precautionsHeader">
            <AvatarWraperStyle>
              {/*<Avatar icon={< UilStar />} className="precautionsHeader-icon" />*/}
              <p>  챌린지 진행시 주의사항 </p>
            </AvatarWraperStyle>
          </span>
          <div className="precautionsDetail">
            <AvatarWraperStyle>
              <p><Avatar icon={< UilSick />} className="precautionsDetail-icon" />레드카드 발급규정</p>
            </AvatarWraperStyle>
            <AvatarWraperStyle>
              <p><Avatar icon={< UilAngleRight />} className="precautionsDetail-icon" /> 챌린지원간의 불쾌한 일들을 방지하기 위하여 챌린지와 무관한 행동을 하거나 상대방에게 불쾌감을 줄 수 있는 행동을 신고받고 있습니다</p>
              <p><Avatar icon={< UilAngleRight />} className="precautionsDetail-icon" />  신고가 누적되면 정지 및 탈퇴 처리가 되실 수 있습니다 자세한 사항은 관리자에게 문의바랍니다.</p>
            </AvatarWraperStyle>
          </div>
        </div>
        <ChallengeSchedule onCancel={onCancel} visible={visible} />
      </div>
    </>
  );
};

export default ChallengeDetail;