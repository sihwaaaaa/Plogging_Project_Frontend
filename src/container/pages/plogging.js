import React, { useEffect, useState } from 'react';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { DataService } from '../../config/dataService/dataService';
import Col from 'antd/es/grid/col';
import { Row } from 'antd';
import routeList from './routeList';
import { Main } from '../styled';

const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const plogging = () => {
  const [mapList, setMapList] = useState(null);

  function getMapList() {
    DataService.get('/plogging')
      .then(function (response) {
        setMapList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const { location, error } = useGeolocation(geolocationOptions);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (location) {
      const { latitude, longitude } = location;
      const map = new Tmapv2.Map(
        'map_div',
        {
          center: new Tmapv2.LatLng(latitude, longitude),
          width: '100%',
          height: '700px',
          zoom: 15,
        },
        [location],
      );
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
  });

  return (
    <>
      <Main style={{ padding: '0' }}>
        <Row gutter={24}>
          <Col span={6}>{mapList && mapList.map((item) => <routeList mapList={item} key={item.mapNo} />)}</Col>
          <Col span={18}>
            <div id="map_div"></div>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default plogging;
