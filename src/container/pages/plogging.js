import React, { useEffect } from 'react';
// import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import useGeolocation from '../../utility/plogging/useGeolocation';

// import { Main } from '../styled';
// import { Cards } from '../../components/cards/frame/cards-frame';
const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};
const plogging = () => {
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
          height: '500px',
          zoom: 15,
        },
        [location],
      );
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(latitude, longitude),
        icon: 'http://tmapapi.sktelecom.com/resources/images/common/pin_car.png',
        map,
      });
      console.log(marker);
    }
  });
  const ploggingPage = [
    {
      path: '',
      breadcrumbName: '플로깅하기',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="플로깅하기" routes={ploggingPage} />
      <div id="map_div" />
      {/* <Main>
        <Row gutter={25}>
          <Col sm={24} xs={24}>
            <Cards headless>
              <h3>플로깅 페이지</h3>
            </Cards>
          </Col>
        </Row>
      </Main> */}
    </>
  );
};

export default plogging;
