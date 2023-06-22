import React, { useEffect, useState } from 'react';
import UilMapMarker from '@iconscout/react-unicons/icons/uil-map-marker';
import UilLocationPinAlt from '@iconscout/react-unicons/icons/uil-location-pin-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import UilCameraPlus from '@iconscout/react-unicons/icons/uil-camera-plus';
import UilInfoCircle from '@iconscout/react-unicons/icons/uil-info-circle';
import UilExclamationCircle from '@iconscout/react-unicons/icons/uil-exclamation-circle';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { DataService } from '../../config/dataService/dataService';
import Col from 'antd/es/grid/col';
import { Card, Form, Input, Row, Select, Spin } from 'antd';
// import routeList from './routeList';
import { Main } from '../styled';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import { Button } from '../../components/buttons/buttons';
import FontAwesome from 'react-fontawesome';
import { CourseCardWrap } from '../../components/cards/Style';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import '../../static/css/ploggingPageStyle.scss';
import { Modal } from '../../components/modals/antd-modals';
import axios from 'axios';

const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};
const plogging = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState('');
  const [mapList, setMapList] = useState(null);
  const [route, setRoute] = useState({});
  useEffect(() => {
    DataService.get('/plogging')
      .then(function (response) {
        setMapList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });
  const showModal = (type, param, nav) => {
    setNav(nav);
    setRoute(param);
    setState({
      visible: true,
      modalType: type,
    });
  };
  const handleCancel = () => {
    setState({
      visible: false,
      colorModal: false,
    });
  };
  const { location, error } = useGeolocation(geolocationOptions);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (location) {
      const { latitude, longitude } = location;
      const map = new Tmapv2.Map('map_div', {
        center: new Tmapv2.LatLng(latitude, longitude),
        width: '100%',
        height: '700px',
        zoom: 15,
      });
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(latitude, longitude),
        icon: 'http://tmapapi.sktelecom.com/resources/images/common/pin_car.png',
        map,
      });

      // const content = '<div>' + '    <button>' + '        시작하기';
      // '    </button>' + '</div>';
      // const infoWindow = new Tmapv2.InfoWindow({
      //   position: new Tmapv2.LatLng(latitude, longitude), //Popup 이 표출될 맵 좌표
      //   content: content, //Popup 표시될 text
      //   type: 2, //Popup의 type 설정.
      //   map: map, //Popup이 표시될 맵 객체
      //   align: Tmapv2.InfoWindowOptions.ALIGN_LEFTBOTTOM,
      // });
    }
  }, [location]);

  //검색
  const [searchResult, setSearchResult] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState('');
  const inputMapKeyword = (e) => {
    setKeyword(e.currentTarget.value);
  };

  const searchMapRoute = () => {
    if (keyword === '') {
      console.log('키워드 없음');
      DataService.get('/plogging').then(function (response) {
        setMapList(response.data);
      });
    } else {
      console.log('키워드 있음');
      DataService.get(`/plogging/search?keyword=${keyword}&page=${page}`).then((response) => {
        console.log(response);
        if (response.data.data.content.length == 0) {
          setMapList(null);
          setSearchResult('결과가 없소');
          console.log(mapList);
        }
        setMapList(response.data.data.content);
      });
    }
  };

  return (
    <div className="ploggingPage">
      <Row gutter={24} style={{ margin: '0', padding: '0' }}>
        <Col span={6} className="sidebar">
          <div className="buttons">
            <Button type="default" size="large" style={{ border: '1px solid #227c9d', color: '#227C9D' }}>
              챌린지에서 검색
            </Button>
            <Button
              type="default"
              size="large"
              style={{ border: '1px solid #17C382', color: '#17C382' }}
              onClick={() => showModal('primary', location, 'startPage/')}
            >
              제자리 시작
            </Button>
            <Button
              onClick={() => navigate('search/')}
              type="default"
              size="large"
              style={{ border: '1px solid #FFCB77', color: '#FFCB77' }}
            >
              목적지 검색
            </Button>
          </div>
          <div className="searchWrapper">
            <div className="searchInput">
              <KnowledgebaseTopWrap>
                <div className="ninjadash-knowledgetop">
                  <div className="searchText">
                    <h3 onClick={() => navigate('startPage/', { state: mapList })}>추천경로</h3>
                    <UilLocationPinAlt className="mapPin" />
                  </div>
                  <div className="ninjadash-knowledgetop__search--form">
                    <Form name="login" layout="vertical">
                      <div className="ninjadash-knowledgetop__formInner">
                        <Form.Item className="ninjadash-search-input">
                          <Input
                            value={keyword}
                            onChange={inputMapKeyword}
                            placeholder="추천경로 검색 (경로명,경로설명,00구)"
                          />
                          <Button onClick={searchMapRoute} className="btn-search" htmlType="submit" size="large">
                            <FontAwesome name="search" className="searchIcon" />
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              </KnowledgebaseTopWrap>
            </div>
          </div>
          {searchResult && (
            <Card
              className="not-result"
              style={{
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <UilExclamationCircle style={{ color: '#ffcb77' }} />
                <h1 style={{ fontSize: '20px', color: '#ffcb77' }}>검색 결과가 없습니다</h1>
              </div>
            </Card>
          )}
          {!mapList && (
            <Card
              className="not-result"
              style={{
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Spin size="large" />
                <h1 style={{ marginTop: '10px', fontSize: '20px', color: '#ffcb77' }}>로딩중..</h1>
              </div>
            </Card>
          )}
          {mapList &&
            mapList.map((maps) => (
              <div key={maps.mapNo}>
                <CourseCardWrap className="ninjadash-course-card-single">
                  <Card bordered={false}>
                    <div className="ninjadash-course-card-thumbnail">
                      <img src={''} alt="ninjaDash" />
                    </div>
                    <div
                      className="ninjadash-course-card-content"
                      onClick={() => showModal('primary', maps, 'mapList/' + maps.mapNo)}
                    >
                      <h4 className="ninjadash-course-card-title">
                        {/* <Link to={`/${mapList.mapNo}`}> */}
                        {maps.courseName}
                        {/* </Link> */}
                      </h4>
                      <div className="ninjadash-course-card-author">
                        <span className="ninjadash-course-card-author__name">{maps.courseDetail}</span>
                      </div>
                      <div className="ninjadash-course-card-meta">
                        <div className="ninjadash-course-card-meta__left">
                          <span className="ninjadash-course-card-meta__pricing">{maps.distance}Km</span>
                        </div>
                        <ul className="ninjadash-course-card-meta__right">
                          <li className="bg-secondary" style={{ background: '#17C382' }}>
                            <UilMapMarker style={{ color: 'white' }} />
                            <span style={{ color: 'white' }}>{maps.addr}</span>
                          </li>
                          <li className="bg-primary" style={{ background: '#227C9D' }}>
                            <UilClock style={{ color: 'white' }} />
                            <span style={{ color: 'white' }}>{maps.time / 60} 시간</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </CourseCardWrap>
              </div>
            ))}
        </Col>

        <Modal
          type={state.modalType}
          title={null}
          visible={state.visible}
          footer={[
            <div>
              <Button size="default" type="info" onClick={() => navigate(nav, { state: route })}>
                플로깅 시작하기
              </Button>
              <Button size="default" type="info" outlined onClick={handleCancel}>
                취소
              </Button>
            </div>,
          ]}
          onCancel={handleCancel}
          width={700}
        >
          <div className="ploggingStart">
            <div
              style={{
                borderBottom: '1px solid rgb(227, 230, 239)',
                padding: '5px 0',
                marginBottom: '10px',
              }}
            >
              <h2 className="modal-title"> 플로깅 포인트 적립 방법!</h2>
            </div>
            <div>
              <div className="auth-top">
                <h3>사진을 첨부해서 글 작성시 포인트 지급</h3>
                <UilCameraPlus style={{ color: '#227C9D', width: '25px', height: '25px', marginTop: '3px' }} />
              </div>
              <h5> 포인트 적립해서 상품도 받고 기부도하자!</h5>
              <div className="picture">
                <div style={{ display: 'flex', marginLeft: '20px', marginTop: '30px' }}>
                  <UilInfoCircle style={{ color: '#00af89', width: '20px', height: '20px', marginTop: '30px' }} />
                  <h1>사진촬영예시</h1>
                </div>
                <div className="img-wrap">
                  <div className="auth-wrap">
                    <div className="trashP"></div>
                    <h4>내가 모은 쓰레기 봉투 사진찍기</h4>
                  </div>
                  <div className="auth-wrap">
                    <div className="ploggingP"></div>
                    <h4>플로깅하는 모습찍기</h4>
                  </div>
                </div>
              </div>
              <h6>*플로깅은 최소 10분은 진행해야 포인트를 받을 수 있어요</h6>
              <h6>*도중에 플로깅을 그만두면 포인트를 받을 수 없어요</h6>
            </div>
          </div>
        </Modal>

        <Col span={18} style={{ paddingRight: '0' }}>
          <div id="map_div"></div>
        </Col>
      </Row>
    </div>
  );
};

export default plogging;
