import React from "react";
import ploggingImage from '../../static/img/ploggingImage2.png';
import ploggingImage3 from '../../static/img/ploggingImage3.png';
import '../../static/css/ChallengeDetail.css';
import { AvatarWraperStyle } from "../ui-elements/ui-elements-styled";
import { Avatar } from "antd";
import { UilAngleLeftB, UilAngleRightB, UilCalender, UilFire, UilGrin } from "@iconscout/react-unicons";
import UilUsersAlt from "@iconscout/react-unicons/icons/uil-users-alt";
import UilArrowDown from "@iconscout/react-unicons/icons/uil-arrow-down";
// import { DingtalkOutlined, DingtalkSquareFilled } from "@ant-design/icons";

const ChallengeDetail = () => {
  return (
    <>
      <div className="challengedetail">
        <div className="detail-top">
          <AvatarWraperStyle>
            <span className="challenge-page">챌린지 상세페이지 <Avatar icon={< UilFire />} className="challenge-icon" /></span>
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
            <span> 상쾌한 아침 플로깅 챌린지 !</span>
          </AvatarWraperStyle>
        </div>

        <div className="chPersonnel">
          <AvatarWraperStyle>
            <span><Avatar icon={< UilUsersAlt />} className="chPersonnel-icon" /> 현재 5/10명 </span>
          </AvatarWraperStyle>
        </div>

        <div className="chPeriod">
          <AvatarWraperStyle>
            <div className="chPeriodDetail">
              <Avatar icon={< UilCalender />} className="chPeriodDetail-icon" /> 지구닦기 2023-6-20 ~ 2023-7-20
            </div>
          </AvatarWraperStyle>
        </div>

        <div className="chIntroduction">
          <img src={ploggingImage3} alt="Logo" className="challengeImage3" />
          <p className="Introduction">
           우리 챌린지는 ? <Avatar icon={< UilArrowDown />} className="chIntroduction-icon" />
          </p>
          <div className="IntroductionDetail">
            <span>" 아침운동 가야겠다고 생각만 하시죠? "</span>
            <br />
            * 이런분들께 추천합니다 *
            <br />
            <span>- 상쾌한 아침공기를 느껴보고 싶으신 분! <br/> - 건강하게! 아침형인간이 되고싶으신 분! <br/> - 목표를 정해서 이뤄내고 싶은 분! </span>
          </div>
        </div>

        <div className="chSchedule">
          <div className="scheduleHeader">
            상쾌한 아침 플로깅 챌린지의 플로깅 일정
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
          </div>
          <button type="submit" className="scheduleButton"> 일정추가 </button>
        </div>

        <div className="precautions">
          <span className="precautionsHeader">
            <h2>  * 챌린지 진행시 주의사항 *</h2>
          </span>
          <div className="precautionsDetail">
            <h3>레드카드 발급규정</h3>
            <p>챌린지원간의 불쾌한 일들을 방지하기 위하여 챌린지와 무관한 행동을 하거나 상대방에게 불쾌감을 줄 수 있는 행동을 신고받고 있습니다 신고가 누적되면 정지 및 탈퇴 처리가 되실 수 있습니다</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default ChallengeDetail;