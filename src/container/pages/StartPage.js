import React, { useEffect, useState } from 'react';
import { Main } from '../styled';
import { Button, Modal } from 'antd';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { useLocation } from 'react-router-dom';
import { DataService } from '../../config/dataService/dataService';

const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const StartPage = () => {
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
    mapNo: null,
    courseName: null,
    courseDetail: null,
    addr: null,
    distance: null,
    time: null,
    startX: loc.longitude,
    startY: loc.latitude,
    endX: 0.0,
    endY: 0.0,
  });
  const [plogging, setPlogging] = useState({
    type: '제자리 시작',
    ploggingTime: 0,
    distance: new Date(),
    status: false,
  });
  console.log(plogging);
  const ploggingEnd = () => {
    setPlogging((plo) => {
      plo.distance = 1;
      return plo;
    });
    showModal('primary');
  };
  const createPlogging = (data) => {
    console.log(plogging);

    DataService.post('/plogging/startPage', { data }).then(function (response) {});
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
      <div id="map_div"></div>
      <Button type="info" onClick={() => ploggingEnd()}>
        플로깅 끝내기
      </Button>
      <Modal
        type={state.modalType}
        title={null}
        visible={state.visible}
        footer={[
          <div>
            <Button size="default" type="info" onClick={() => createPlogging(plogging)}>
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
    </>
  );
};

export default StartPage;
