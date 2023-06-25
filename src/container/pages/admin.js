import React, { Suspense, useEffect, useRef } from "react";
import { Avatar, Button, Col, Row } from "antd";
import { Main } from "../styled";
import MemberTableForm from "./overview/MemberTableForm";
import { AvatarWraperStyle } from "../ui-elements/ui-elements-styled";
import { ArrowUpOutlined } from "@ant-design/icons";
import "../../static/css/adminPageStyle.scss";
import { Link, useNavigate } from "react-router-dom";
import { getItem } from "../../utility/localStorageControl";
import { alertModal } from "../../components/modals/antd-modals";

const Admin = () => {

  const memberNo = getItem('memberNo');
  const userAuth = getItem('authList');

  const memberRef = useRef(null);
  const rewardRef = useRef(null);
  const pointRef = useRef(null);
  const boardRef = useRef(null);
  const ploggingRef = useRef(null);
  const mapRef = useRef(null);
  const challengeRef = useRef(null);

  const navigate = useNavigate();


  useEffect(() => {
    if(!memberNo || userAuth.indexOf('ROLE_ADMIN') === -1){
      selfDestroyed()
    }
  },[])

  const selfDestroyed = () => {
    let secondsToGo = 1.5;
    const modal = alertModal.success({
      title: '이용권한이 없습니다',
      content: '',
    });

    setTimeout(() => {
      modal.destroy();
      navigate('/')
    }, secondsToGo * 1000);
  };


  const scrollToTab = (elementRef:React.MutableRefObject<HTMLButtonElement|null>) => {
    if (elementRef.current !== null) {
      const selectTab = elementRef.current.offsetTop - 110;
      window.scrollTo({
        top: selectTab,
        behavior: 'smooth'
      })
    }
  }

  const scrollTopClick = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth'
    })
  }



  return (
    <>
      { memberNo && userAuth.indexOf('ROLE_ADMIN') !== -1 ? (
        <Main>
          <div className="scrollToTop" onClick={scrollTopClick}>
            <AvatarWraperStyle>
              <Avatar icon={<ArrowUpOutlined />} size={50}/>
            </AvatarWraperStyle>
          </div>
          <Col xxl={16} xs={24} style={{marginTop:20}}>
            <div className="selectTab">
              <div>
                <div onClick={() => scrollToTab(memberRef)}>회원 관리</div>
              </div>
              <div>
                <div onClick={() => scrollToTab(rewardRef)}>리워드 업체 관리</div>
              </div>
              <div>
                <div onClick={() => scrollToTab(pointRef)}>포인트 히스토리 관리</div>
              </div>
              <div>
                <div onClick={() => scrollToTab(boardRef)}>게시글 관리</div>
              </div>
              <div>
                <div onClick={() => scrollToTab(ploggingRef)}>플로깅 히스토리 관리</div>
              </div>
              <div>
                <div onClick={() => scrollToTab(mapRef)}>추천경로 관리</div>
              </div>
              <div>
                <div onClick={() => scrollToTab(challengeRef)}>챌린지 관리</div>
              </div>
            </div>
          </Col>
          <Row justify="center">

            <Col xxl={16} xs={24} style={{marginTop:20}} ref={memberRef}>
              <Suspense >
                <MemberTableForm title={"회원 관리"} value={'member'}/>
              </Suspense>
            </Col>
            <Col xxl={16} xs={24} style={{marginTop:20}} ref={rewardRef}>
              <Suspense >
                <MemberTableForm title={"리워드 업체 관리"} value={'reward'} />
              </Suspense>
            </Col>
            <Col xxl={16} xs={24} style={{marginTop:20}} ref={pointRef}>
              <Suspense >
                <MemberTableForm title={"포인트 히스토리 관리"} value={'point'} />
              </Suspense>
            </Col>
            <Col xxl={16} xs={24} style={{marginTop:20}} ref={boardRef}>
              <Suspense>
                <MemberTableForm title={"게시글 관리"} value={'board'} />
              </Suspense>
            </Col>
            <Col xxl={16} xs={24} style={{marginTop:20}} ref={ploggingRef}>
              <Suspense >
                <MemberTableForm title={"플로깅 히스토리 관리"} value={'plogging'} />
              </Suspense>
            </Col>
            <Col xxl={16} xs={24} style={{marginTop:20}} ref={mapRef}>
              <Suspense >
                <MemberTableForm title={"추천경로 관리"} value={'map'} />
              </Suspense>
            </Col>
            <Col xxl={16} xs={24} style={{marginTop:20}} ref={challengeRef}>
              <Suspense >
                <MemberTableForm title={"챌린지 관리"} value={'challenge'} />
              </Suspense>
            </Col>
          </Row>
        </Main>
      ) : ''
      }
    </>
  );
};

export default React.memo(Admin);
