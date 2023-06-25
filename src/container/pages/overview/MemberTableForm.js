import React, { useEffect, useState } from "react";

import { BorderLessHeading, TableDefaultStyle } from "../../styled";
import { Cards } from "../../../components/cards/frame/cards-frame";
import { Table } from "antd";
import { DataService } from "../../../config/dataService/dataService";
import {
  boardTableColumns,
  challengeTableColumns, mapTableColumns,
  memberTableColumns,
  ploggingTableColumns,
  pointTableColumns,
  rewardTableColumns
} from "./AdminTableField";
import { getItem } from "../../../utility/localStorageControl";

const MemberTableForm = React.memo((props) => {

  const memberNo = getItem('memberNo');
  const userAuth = getItem('authList');

  const [members, setMembers] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [ploggings, setPloggings] = useState([]);
  const [points, setPoints] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [boards, setBoards] = useState([]);
  const [maps, setMaps] = useState([]);
  let memberData = [];


  useEffect(() => {
    if(memberNo && userAuth.indexOf('ROLE_ADMIN') !== -1){
      allMember()
      allPoint()
      allBoard()
      allReward()
      allMap()
      allChallenge()
      allPlogging()
    }
  },[])

  /**
   * @Author 천은경
   * @Date 23.06.14
   * @Brief 모든 회원 정보 확인
   */
  const allMember = () => {
    DataService.get('/admin/member')
      .then(function(response) {
        setMembers(response.data.data);
      })

  }

  /**
   * @Author 천은경
   * @Date 23.06.14
   * @Brief 모든 리워드 업체 정보 확인
   */
  const allReward = () => {
    DataService.get('/admin/reward')
      .then(function(response) {
        setRewards(response.data.data);
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.14
   * @Brief 모든 플로깅 히스토리 정보 확인
   */
  const allPlogging = () => {
    DataService.get('/admin/plogging')
      .then(function(response) {
        setPloggings(response.data.data);
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.14
   * @Brief 모든 챌린지 정보 확인
   */
  const allChallenge = () => {
    DataService.get('/admin/challenge')
      .then(function(response) {
        setChallenges(response.data.data);
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.14
   * @Brief 모든 포인트히스토리 정보 확인
   */
  const allPoint = () => {
    DataService.get('/admin/point')
      .then(function(response){
        console.log(response.data.data)
        setPoints(response.data.data);
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.14
   * @Brief 모든 게시글 정보 확인
   */
  const allBoard = () => {
    DataService.get('/admin/board')
      .then(function(response) {
        setBoards(response.data.data);
      })
  }

  /**
   * @Author 천은경
   * @Date 23.06.15
   * @Brief 모든 추천경로 정보 확인
   */
  const allMap = () => {
    DataService.get('/admin/map')
      .then(function(response) {
        setMaps(response.data.data);
      })
  }


  if(members !== null){
    members.map(member => {
      memberData.push(member)
    })
  }

  let columnData = [];
  let contentData = [];
  if(props.value === 'member') {
    columnData = memberTableColumns;
    contentData = memberData;
  } else if(props.value === 'reward') {
    columnData = rewardTableColumns;
    contentData = rewards;
  } else if(props.value === 'point') {
    columnData = pointTableColumns;
    contentData = points;
  } else if(props.value === 'board') {
    columnData = boardTableColumns;
    contentData = boards;
  } else if(props.value === 'plogging') {
    columnData = ploggingTableColumns;
    contentData = ploggings;
  } else if(props.value === 'challenge') {
    columnData = challengeTableColumns;
    contentData = challenges;
  } else if(props.value === 'map') {
    columnData = mapTableColumns;
    contentData = maps;
  }





  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards
          title={props.title}
          size="large"
        >
          <TableDefaultStyle className="ninjadash-having-header-bg">
            <div className="table-responsive">
              <Table columns={columnData}
                     dataSource={contentData}
                     pagination={true} />
            </div>
          </TableDefaultStyle>
        </Cards>
      </BorderLessHeading>
    </div>
  );
});

export default MemberTableForm;