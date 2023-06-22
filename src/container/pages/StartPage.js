import React, { useEffect, useMemo, useState } from 'react';
import { Main } from '../styled';
import { Card, Col, Drawer, Modal, Row, Statistic } from 'antd';
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
import { getSeconds } from 'date-fns';

const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const StartPage = () => {
  const [mapIm, setMapIm] = useState();
  const [marker, setMarker] = useState();

  //시간
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [resultTimeSet, setResultTimeSet] = useState();
  const isoStartTime = new Date().getTime();
  const [runningTime, setRunningTime] = useState(isoStartTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTime(isoStartTime - startTime);
      setSeconds(new Date(runningTime).getSeconds());
      setMinutes(new Date(runningTime).getMinutes());
      setHours(new Date(runningTime).getHours() - 9);
      // set;
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isoStartTime]);
  const dateSet = () => {
    setResultTimeSet(Math.floor(new Date(runningTime).getTime() / 1000 / 60));
    console.log(resultTimeSet);
  };
  //모달
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
  //현재위치
  const loc = useLocation();
  const { location, error } = useGeolocation(geolocationOptions);

  //넘겨줄 데이터 선언
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
  //종료시 데이터 셋
  const ploggingEnd = () => {
    dateSet();
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
      plo.distance = (pre.distanceTo(next) * 0.0001).toFixed(1);
      plo.ploggingTime = resultTimeSet;
      return plo;
    });
    showModal('primary');
  };
  //스프링 데이터 전송
  const createPlogging = (data) => {
    console.log(plogging);
    DataService.put('/plogging/startPage', { data }).then(function (response) {
      console.log(data);
    });
  };

  //맵처리 진행중
  function createMap() {
    return new Promise(function (resolve, reject) {
      setMapIm(
        new Tmapv2.Map('map_div', {
          center: new Tmapv2.LatLng(loc.state.latitude, loc.state.longitude),
          width: '100%',
          height: '700px',
          zoom: 15,
        }),
      );
      setMarker(
        new Tmapv2.Marker({
          position: new Tmapv2.LatLng(loc.state.latitude, loc.state.longitude),
          icon: 'http://tmapapi.sktelecom.com/resources/images/common/pin_car.png',
          map: mapIm,
        }),
      );
    });
  }
  function createMarker() {
    return new Promise(function (resolve, reject) {
      if (!marker) {
        console.log('통과못');
        return;
      }
      if (error) {
        console.log(error);
      }
      if (location) {
        console.log('통과');
        const { latitude, longitude } = location;
        console.log(latitude);
        console.log(marker);
        setMarker((mar) => {
          // mar.setPosition(new Tmapv2.LatLng(longitude, latitude));
        });
        console.log(marker._marker_data.options.position._lat);
        console.log(marker.isLoaded());
      }
    });
  }

  useEffect(() => {
    async function mapload() {
      await createMap();
    }
    mapload();
  }, []);
  useEffect(() => {
    async function markerload() {
      await createMarker();
    }
    markerload();
  }, [location]);

  return (
    <>
      <div className="startPage">
        <Row gutter={24} style={{ margin: '0', padding: '0' }}>
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
                  <div className="timeZone">
                    <h3>플로깅 시작한지</h3>
                    <UilClock style={{ color: 'black', width: '23px', height: '23px', marginRight: '10px' }} />
                    <span style={{ color: '#ffcb77', fontWeight: '700', fontSize: '25px' }}>
                      {hours < 10 ? '0' + hours : 0 + hours}:{minutes < 10 ? '0' + minutes : 0 + minutes}:
                      {seconds < 10 ? '0' + seconds : 0 + seconds}
                    </span>
                  </div>
                </div>
                <div className="end-wrap">
                  <Button
                    className="end-button"
                    type="default"
                    size="large"
                    style={{ border: '1px solid #17C382', color: '#17C382' }}
                    onClick={() => ploggingEnd()}
                  >
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
                <div className="footer-buttons">
                  <Button
                    size="default"
                    type="default"
                    style={{ backgroundColor: '#ffcb77', color: 'white' }}
                    onClick={() => createPlogging(dtos)}
                  >
                    플로깅 끝내기
                  </Button>
                  <Button
                    size="default"
                    type="default"
                    style={{ border: '1px solid #ffcb77', color: '#ffcb77' }}
                    onClick={handleCancel}
                  >
                    취소
                  </Button>
                </div>,
              ]}
              onCancel={handleCancel}
              width={600}
            >
              <div className="ploggingEnd">
                <div
                  style={{
                    borderBottom: '1px solid rgb(227, 230, 239)',
                    padding: '5px 0',
                    marginBottom: '10px',
                  }}
                >
                  <h2 className="modal-title"> 플로깅 끝내기 </h2>
                </div>
                <div className="ninjadash-course-card-meta">
                  <h2>플로깅을 끝내시겠습니까?</h2>
                  <h5>*플로깅을 시작한지 10분이 넘어야 포인트를 받을 수 있습니다</h5>
                  <ul className="ninjadash-course-card-meta__right">
                    <div className="distance">
                      <h4>
                        지금까지 내가 정화한 <span style={{ color: '#17C382', fontWeight: '700' }}>거리</span>
                      </h4>
                      <li className="bg-secondary" style={{ background: '#17C382' }}>
                        <UilLocationArrowAlt style={{ color: 'white', width: '23px', height: '23px' }} />
                        <span style={{ color: 'white' }}>
                          {plogging.distance}
                          <span style={{ fontSize: '17px' }}>Km</span>
                        </span>
                      </li>
                    </div>
                    <div className="distance">
                      <h4>
                        지금까지 내가 정화한 <span style={{ color: '#227C9D', fontWeight: '700' }}>시간</span>
                      </h4>
                      <li className="bg-primary" style={{ background: '#227C9D' }}>
                        <UilClock style={{ color: 'white', width: '23px', height: '23px' }} />
                        <span style={{ color: 'white' }}>{resultTimeSet} Min</span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </Modal>
          </Col>
          <Col span={18} style={{ paddingRight: '0' }}>
            <div id="map_div"></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StartPage;
