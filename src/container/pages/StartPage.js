import React, { useEffect, useState } from 'react';
import { Main } from '../styled';
import { Card, Col, Drawer, Modal, Row } from 'antd';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { useLocation } from 'react-router-dom';
import { DataService } from '../../config/dataService/dataService';
import { CourseCardWrap } from '../../components/cards/Style';
import UilMapMarker from '@iconscout/react-unicons/icons/uil-map-marker';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import UilTrees from '@iconscout/react-unicons/icons/uil-trees';
import UilLocationArrowAlt from '@iconscout/react-unicons/icons/uil-location-arrow-alt';
import '../../static/css/ploggingStartPageStyle.scss';
import { Button } from '../../components/buttons/buttons';
const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const StartPage = () => {
  const [distance, setDistance] = useState();
  const [dateTime, setDateTime] = useState();
  const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });
  const showModal = (type) => {
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

  const loc = useLocation();
  const { location, error } = useGeolocation(geolocationOptions);
  const [map, setMap] = useState({
    startX: loc.state.longitude,
    startY: loc.state.latitude,
    endX: 0.0,
    endY: 0.0,
  });
  const [plogging, setPlogging] = useState({
    type: '제자리 시작',
    ploggingTime: 0,
    distance: new Date(),
    status: false,
  });

  const dtos = { map, plogging };
  console.log(dtos);

  const ploggingEnd = () => {
    // const { location, error } = useGeolocation(geolocationOptions);
    setMap((map) => {
      map.endX = location.longitude;
      map.endY = location.latitude;
      return map;
    });
    setPlogging((plo) => {
      console.log(map);

      const next = new Tmapv2.LatLng(map.endY, map.endX);
      const pre = new Tmapv2.LatLng(map.startY, map.startX);
      plo.distance = pre.distanceTo(next) * 0.0001;
      return plo;
    });
    showModal('primary');
  };
  const createPlogging = (data) => {
    console.log(plogging);
    DataService.put('/plogging/startPage', { data }).then(function (response) {
      console.log(data);
    });
  };
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
    }
  }, [location]);

  return (
    <>
      <Row gutter={24}>
        <Col span={6} className="sidebar">
          <CourseCardWrap className="ninjadash-course-card-single">
            <Card bordered={false}>
              <div className="ninjadash-course-card-content">
                <div className="top-message">
                  <h1 className="ninjadash-course-card-title">오늘도 지구를 깨끗하게</h1>
                  <UilTrees className="tree" />
                </div>
                <div className="ninjadash-course-card-author">
                  <span className="ninjadash-course-card-author__name">
                    지구도 자신도 건강하게 만드는 당신을 응원합니다!
                  </span>
                </div>
                <div className="ninjadash-course-card-meta">
                  <ul className="ninjadash-course-card-meta__right">
                    <div className="distance">
                      <h4>
                        현재 내가 정화한 <span style={{ color: '#17C382', fontWeight: '700' }}>거리</span>
                      </h4>
                      <li className="bg-secondary" style={{ background: '#17C382' }}>
                        <UilLocationArrowAlt style={{ color: 'white', width: '23px', height: '23px' }} />
                        <span style={{ color: 'white' }}>
                          567<span style={{ fontSize: '17px' }}>Km</span>
                        </span>
                      </li>
                    </div>
                    <div className="distance">
                      <h4>
                        현재 내가 정화한 <span style={{ color: '#227C9D', fontWeight: '700' }}>시간</span>
                      </h4>
                      <li className="bg-primary" style={{ background: '#227C9D' }}>
                        <UilClock style={{ color: 'white', width: '23px', height: '23px' }} />
                        <span style={{ color: 'white' }}>
                          506<span style={{ fontSize: '15px' }}>시간</span>
                        </span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="end-wrap">
                <Button className="plogging-end" size="large" outlined type="info" onClick={() => ploggingEnd()}>
                  플로깅 끝내기
                </Button>
              </div>
            </Card>
          </CourseCardWrap>
          <Modal
            type={state.modalType}
            title={null}
            visible={state.visible}
            footer={[
              <div>
                <Button size="default" type="info" onClick={() => createPlogging(dtos)}>
                  플로깅 끝내시겠습니까?
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
        </Col>
        <Col span={18}>
          <div id="map_div"></div>
        </Col>
      </Row>
    </>
  );
};

export default StartPage;
