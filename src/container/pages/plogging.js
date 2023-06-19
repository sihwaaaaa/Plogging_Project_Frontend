import React, { useEffect, useState } from 'react';
import UilMapMarker from '@iconscout/react-unicons/icons/uil-map-marker';
import UilLocationPinAlt from '@iconscout/react-unicons/icons/uil-location-pin-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { DataService } from '../../config/dataService/dataService';
import Col from 'antd/es/grid/col';
import { Card, Form, Input, Row, Select } from 'antd';
// import routeList from './routeList';
import { Main } from '../styled';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import { Button } from '../../components/buttons/buttons';
import FontAwesome from 'react-fontawesome';
import { CourseCardWrap } from '../../components/cards/Style';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

  return (
    <>
      <Main className="ploggingContainer">
        <Row gutter={24}>
          <Col span={6} className="sidebar">
            <div className="searchWrapper">
              <div className="searchText">
                <h3 onClick={() => navigate('startPage/', { state: mapList })}>추천경로</h3>
                <UilLocationPinAlt className="mapPin" />
              </div>
              <div className="searchInput">
                <KnowledgebaseTopWrap>
                  <div className="ninjadash-knowledgetop">
                    <div className="ninjadash-knowledgetop__search--form">
                      <Form name="login" layout="vertical">
                        <div className="ninjadash-knowledgetop__formInner">
                          <Form.Item className="ninjadash-search-input">
                            <Input placeholder="추천경로 검색 (경로명,경로설명,00구)" />
                            <Button className="btn-search" htmlType="submit" size="large">
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
            width={600}
          >
            <div className="ploggingStart">
              <div
                style={{
                  borderBottom: '1px solid rgb(227, 230, 239)',
                  padding: '5px 0',
                  marginBottom: '10px',
                }}
              >
                <h2 className="modal-title"> 플로깅 참여 방법 </h2>
              </div>
            </div>
          </Modal>
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
            width={600}
          >
            <div className="ploggingStart">
              <div
                style={{
                  borderBottom: '1px solid rgb(227, 230, 239)',
                  padding: '5px 0',
                  marginBottom: '10px',
                }}
              >
                <h2 className="modal-title"> 플로깅 참여 방법 </h2>
              </div>
            </div>
          </Modal>

          <Col span={18}>
            <div id="map_div"></div>
          </Col>
          <Button type="info" onClick={() => showModal('primary', location, 'startPage/')}>
            제자리 시작
          </Button>
          <Button type="info">목적지 검색</Button>
          <Button type="info">챌린지에서 검색</Button>
        </Row>
      </Main>
    </>
  );
};

export default plogging;
