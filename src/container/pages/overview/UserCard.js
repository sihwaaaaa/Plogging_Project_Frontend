import React, { useEffect, useRef, useState } from "react";
import UilUserPlus from '@iconscout/react-unicons/icons/uil-user-plus';
import { Await, BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { UserCard } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import logo from '../../../../src/static/img/logodemo.png';
import { useDispatch } from 'react-redux';
import { getItem } from "../../../utility/localStorageControl";
import UilEdit from "@iconscout/react-unicons/icons/uil-edit";
import { Button } from "../../../components/buttons/buttons";
import { UilUserCheck, UilUserTimes } from "@iconscout/react-unicons";
import { DataService } from "../../../config/dataService/dataService";
import { alertModal } from "../../../components/modals/antd-modals";

const UserCards = (props) => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const navigate = useNavigate();


  const memberInfo = props.memberInfo;
  const challenges = props.memberInfo.challenges;
  const pointHistories = props.memberInfo.pointHistories;
  const ploggings = props.memberInfo.ploggings;
  const boards = props.memberInfo.boards;
  const memberNo = getItem('memberNo') ? getItem('memberNo') : navigate('/member/signin');
  // const memberNo = location.pathname.split("/")[2] ? getItem('memberNo') : navigate('/member/signin');

  const friendFromMe = {toMemberNo : props.memberInfo.memberNo};
  const friendToMe = {fromMemberNo : props.memberInfo.memberNo};
  const friendNo = props.memberInfo.memberNo;
  const friendObj = props.friendObj;
  const setType = props.setType;

  const getTotalPoint = () => {
    let total = 0;
    if(pointHistories) {
      pointHistories.map(p =>
        p.type !== "Donation" && p.type !== "Product"
          ? total += p.point : total)
    }
    return total;
  }

  const getCurrentPoint = () => {
    let current = 0;
    if(pointHistories) {
      pointHistories.map(p =>
        current += p.point)
    }
    return current;
  }

  const handleEditProfile = () => {
    dispatch(() => history(`/profile/${memberNo}/edit`));
  }


  // 플친 차단 취소하기
  const cancelFriend = (data) => {
    DataService.delete('/friend/cancel', {data})
      .then((response) => {
        console.log(response.data.data)
      })
  }

  // 플친 차단하기
  const blockFriend = (data) => {
    DataService.put('/friend/block', {data})
      .then((response) => {
        console.log(response.data.data)
      })
  }

  // 플친 요청하기
  const requestFriend = (data) => {
    DataService.post('friend/request', {data}, '')
      .then((response) => {
        console.log(response.data.data)
      })
  }

  // 플친 삭제하기
  const removeFriend = (data) => {
    DataService.delete('/friend/reject', {data})
      .then((response) => {
        console.log(response)
      })
  }


  // 확인 모달
  const showConfirm = (type) => {
    alertModal.confirm({
      title: type === "request" ? '플로깅 친구를 신청 하시겠습니까?'
        : type === "block" ? '차단하시겠습니까?'
          : type === "cancel" ? '해제하시겠습니까?'
            : '플로깅 친구를 끊겠습니까?',
      content: type === "block" || type === "remove" ? '상대방에게도 친구가 삭제됩니다' : '',
      onOk() {
        setType(type)
        console.log(type)
        if(type === "request") {
          requestFriend(friendFromMe)
        } else if(type === "block") {
          blockFriend(friendFromMe)
        } else if(type === "cancel") {
          cancelFriend(friendFromMe)
        } else {
          removeFriend(friendToMe)
        }
      },
      onCancel() {},
    });
  };

  const handleEditPassword = () => {
    dispatch(() => history(`/profile/${memberNo}/passwordEdit`))
  }
  const handleMemberExit = () => {
    dispatch(() => history("passwordEdit"))
  }


  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          <Card>
            <div className="card-image">
              <img src={logo} style={{width:180, height:180}} alt='뱃지 이미지'/>
            </div>
            <div className="card__content">
              <div>
                <h2 style={{fontWeight: "bold"}}>{memberInfo.nickName}
                  <span style={{paddingLeft: 5, fontSize: 16, fontWeight : "normal"}}>( {memberInfo.userId} )</span>
                </h2>
              </div>
              <div>
                {memberInfo.intro === null || memberInfo.intro === '' ? (
                  <p>아직 소개글이 없어요</p>
                ) : (
                  <p>{memberInfo.intro}</p>
                )}
              </div>
              <div>
                <div className="content-member-info">
                  <div className="content-participation">
                    <div>플로깅 참여 횟수 <span>{ploggings ? ploggings.length : 0}</span></div>
                    <div>챌린지 참여 횟수 <span>{challenges ? challenges.length : 0}</span></div>
                  </div>
                  <div className="content-point">
                    <div>현재/누적 포인트 <span>{getCurrentPoint()}</span>/<span>{getTotalPoint()}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card__actions">
              {memberInfo.memberNo === memberNo ? (
                  <div>
                    <Button size="default" type="white" onClick={handleMemberExit}>
                      <UilEdit />
                      회원 탈퇴
                    </Button>
                    <Button size="default" type="white" onClick={handleEditProfile}>
                      <UilEdit />
                      프로필 편집
                    </Button>
                    <Button size="default" type="white" onClick={handleEditPassword}>
                      <UilEdit />
                      비밀번호 재설정
                  </Button>
                  </div>
                ) : (
                  <>
                    {friendObj === null || friendObj === '' ?
                      (<Button onClick={() => showConfirm("request")} outlined size="default" type="success">
                        <UilUserPlus />
                        플친 신청
                      </Button>) : friendObj.status === "FRIEND" ? (
                        <Button onClick={() => showConfirm("remove")} size="default" type="extra-light">
                          <UilUserCheck color={"white"} />
                          플친
                        </Button>
                      ) : friendObj.status === "PENDING" ? (
                        <Button onClick={() => showConfirm("cancel")} size="default" type="extra-light">
                          <UilUserCheck color={"white"} />
                          대기중
                        </Button>
                      ) : (
                        <Button onClick={() => showConfirm("cancel")} outlined size="default" type="danger">
                          <UilUserTimes />
                          차단 해제
                        </Button>
                      )
                    }
                    {friendObj !== null && friendObj !== '' && friendObj.status !== 'BLOCK' ?
                      (
                        <Button onClick={() => showConfirm("block")} outlined size="default" type="danger">
                          <UilUserTimes />
                          차단
                        </Button>
                      ) : friendObj === null || friendObj === ''? (
                        <Button onClick={() => showConfirm("block")} outlined size="default" type="danger">
                          <UilUserTimes />
                          차단
                        </Button>
                      ) : ''
                    }
                  </>
              )}
            </div>
          </Card>
        </Cards>
      </div>
    </UserCard>
  );
}

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
