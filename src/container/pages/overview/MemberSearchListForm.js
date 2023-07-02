import React, { useEffect, useRef, useState } from "react";
import badge from "../../../static/img/logodemo.png";
import "../../../static/css/MemberSearchListStyle.scss"
import { UilAngleRight, UilUserCheck } from "@iconscout/react-unicons";
import UilUserPlus from "@iconscout/react-unicons/icons/uil-user-plus";
import UilAngleDown from "@iconscout/react-unicons/icons/uil-angle-down";
import { getItem } from "../../../utility/localStorageControl";
import { useNavigate } from "react-router-dom";

const MemberSearchListForm = (props) => {

  const searchId = props.result.userId;
  const searchNo = props.result.memberNo;
  const searchName = props.result.userName;
  const searchIntro = props.result.intro;
  const searchChallenges = props.result.challenges;
  const searchStatus = props.result.friendStatus;

  const requestFriend = props.requestFriend;
  const friend = {toMemberNo : props.result.memberNo};

  const navigate = useNavigate();

  const toProfile = (member) => {
    navigate(`/profile/${member}`, {
      state : {
        memberNo : `${member}`
      }
    })
  }


  const requestClick = () => {
    requestFriend(friend)
  }

  const chInfoClick = (searchNo) => {
    let open = document.getElementById(`InfoOpenBtn${searchNo}`).style.display;
    let close = document.getElementById(`InfoCloseBtn${searchNo}`).style.display;
    if(close === 'none') {
      document.getElementById(`InfoOpenBtn${searchNo}`).style.display ='none';
      document.getElementById(`InfoCloseBtn${searchNo}`).style.display = 'block';
      document.getElementById(`chInfo-small${searchNo}`).style.display = 'flex';
    } else if (open === 'none') {
      document.getElementById(`InfoOpenBtn${searchNo}`).style.display ='block';
      document.getElementById(`InfoCloseBtn${searchNo}`).style.display = 'none';
      document.getElementById(`chInfo-small${searchNo}`).style.display = 'none';
    }
  }


  return (
    <div className="searchFormWrapper">
      <div className="memberForm">
        <div className="badgeWrapper" >
          <img onClick={() => toProfile(searchNo)} src={badge} style={{width:40, height:40, cursor:"pointer"}} alt={'뱃지'}/>
        </div>
        <div className="idWrapper">
          <div className="id">
            <span onClick={() => toProfile(searchNo)} style={{cursor:"pointer", paddingRight:7}}>{searchId}</span>
            <span onClick={() => toProfile(searchNo)} style={{cursor:"pointer"}}>({searchName})</span>
            {searchStatus === 'NOTHING' && searchNo !== getItem('memberNo') ? (
              <div onClick={requestClick} className="friendAdd" style={{background: "#FFCB77"}}>
                <UilUserPlus size={20} color="white" />
                <span>플친신청</span>
              </div>
            ) : searchStatus === 'FRIEND' ? (
              <div className="friendOn" style={{background: "#dddddd", cursor:"default"}}>
                <UilUserCheck size={20} color="white" />
                <span>플친</span>
              </div>
            ) : searchStatus === 'PENDING' ? (
              <div className="friendOn" style={{background: "#dddddd", cursor:"default"}}>
                <UilUserCheck size={20} color="white" />
                <span>대기중</span>
              </div>
            ) : ''}
          </div>
          <div className="intro">
            {searchIntro} (소개글입니다//추후 수정 필요)
          </div>
        </div>
        <div className="openChallenges" style={{cursor:"pointer"}}>
          <UilAngleRight size={30} id={`InfoOpenBtn${searchNo}`} onClick={() => chInfoClick(`${searchNo}`)} />
          <UilAngleDown size={30} id={`InfoCloseBtn${searchNo}`} onClick={() => chInfoClick(`${searchNo}`)} style={{display:"none"}}/>
        </div>
      </div>
      <div className="challengesWrapper-small" id={`chInfo-small${searchNo}`}>
        {searchChallenges.length === 0 ? (
          <span style={{fontSize:"11px", color: "#666d9299", paddingLeft:20}}>아직 참여한 챌린지가 없어요!</span>
        ) : (
          <div className="challengeTitle">
            <span>최근챌린지</span>
          </div>
        )}
        <div className="challenges">
          {!!searchChallenges && searchChallenges.map((challenge) => {
            return (
              <li key={challenge}>{challenge}</li>
            )
          })}
        </div>
      </div>
      <div className="challengesWrapper">
        {searchChallenges.length === 0 ? (
            <span style={{fontSize:"11px", color: "#666d9299", paddingLeft:20}}>아직 참여한 챌린지가 없어요!</span>
          ) : (
          <div className="challengeTitle">
            <span>최근챌린지</span>
          </div>
        )}
        <div className="challenges">
          {!!searchChallenges && searchChallenges.map((challenge) => {
            return (
              <li key={challenge}>{challenge}</li>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MemberSearchListForm);