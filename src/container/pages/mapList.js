import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useGeolocation from '../../utility/plogging/useGeolocation';

const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};
const mapList = () => {
  let map;
  let marker_s, marker_e;
  const resultMarkerArr = [];
  const loc = useLocation();
  const route = loc.state;
  console.log(route);
  const { location, error } = useGeolocation(geolocationOptions);
  const startX = route.startX;
  const startY = route.startY;
  const endX = route.endX;
  const endY = route.endY;
  const passList = JSON.stringify(route.stops);

  console.log(passList);
  const [date, setDate] = useState(() => new Date());

  // useEffect(() => {
  //   const timeId = setInterval(() => tick(), 1000);
  //   console.log('setInteval');

  //   return () => {
  //     clearInterval(timeId);
  //     console.log('clearInterval');
  //   };
  // }, []);

  const tick = () => {
    setDate(new Date());
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (location) {
      // 1. 지도 띄우기
      const { latitude, longitude } = location;
      map = new Tmapv2.Map('map_div', {
        center: new Tmapv2.LatLng(latitude, longitude),
        width: '100%',
        height: '700px',
        zoom: 15,
      });
    }
    // // 2. 시작, 도착 심볼찍기
    // // 시작
    marker_s = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(startY, startX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });
    resultMarkerArr.push(marker_s);
    // // 도착
    marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(endY, endX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });
    resultMarkerArr.push(marker_e);
    // // 3. 경유지 심볼 찍기
    const stopovers = route.stops;

    stopovers.forEach((stopover) => {
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(parseFloat(stopover.viaY), parseFloat(stopover.viaX)),
        icon: `http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_${stopover.stopoverIdx - 1}.png`,
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });
      resultMarkerArr.push(marker);
    });

    // 4. 경로탐색 API 사용요청

    // const headers = {
    //   appKey: '18T2zPpWnZ8XkMLMGjqNL9MMe7ieWWAxa29bWldO',
    // };
    // axios
    //   .post(
    //     'https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json&callback=result',
    //     {
    //       startName: route.courseName,
    //       startX: startX,
    //       startY: JSON.stringify(startY),
    //       endName: route.courseName,
    //       endX: JSON.stringify(endX),
    //       endY: JSON.stringify(endY),
    //       viaPoints: passList,
    //       startTime: '202306190442',
    //       reqCoordType: 'WGS84GEO',
    //       resCoordType: 'WGS84GEO',
    //     },
    //     { headers },
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(
    //       error,
    //       'code:' + error.response.status + '\n' + 'message:' + error.response.data + '\n' + 'error:' + error,
    //     );
    //   });
  }, [route, location]);
  return (
    <div>
      <div id="map_div"></div>
    </div>
  );
};

export default mapList;
