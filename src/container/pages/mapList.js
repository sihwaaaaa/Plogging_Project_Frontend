import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { Tmapv2 } = window;

const mapList = () => {
  const location = useLocation();
  const route = location.state;
  const [result, setResult] = useState({ lon: null, lat: null });
  const [startX, setStartX] = useState(route.startX);
  const [startY, setStartY] = useState(route.startY);
  function coordConvert(lat, lon) {
    axios
      .get(
        `https://apis.openapi.sk.com/tmap/geo/coordconvert?version=1&format=json&callback=result&fromCoord=GRS80TM&lon=${lon}&lat=${lat}&appKey=18T2zPpWnZ8XkMLMGjqNL9MMe7ieWWAxa29bWldO`,
      )
      .then(function (response) {
        const resultCoordinate = response.data.coordinate;
        const lon2 = resultCoordinate.lon;
        const lat2 = resultCoordinate.lat;
        const result = { lon: lon2, lat: lat2 };
        setResult(result);
        console.log(result);
      })
      .catch(function (error) {
        console.error('code:', error.response.status);
        console.error('message:', error.response.data);
        console.error('error:', error.message);
      });
  }

  useEffect(() => {
    axios
      .get(
        `https://apis.openapi.sk.com/tmap/geo/coordconvert?version=1&format=json&callback=result&fromCoord=GRS80TM&lon=${startY}&lat=${startY}&appKey=18T2zPpWnZ8XkMLMGjqNL9MMe7ieWWAxa29bWldO`,
      )
      .then(function (response) {
        const resultCoordinate = response.data.coordinate;
        const lon2 = resultCoordinate.lon;
        const lat2 = resultCoordinate.lat;
        const result = { lon: lon2, lat: lat2 };
        console.log(result);
      })
      .catch(function (error) {
        console.error('code:', error.response.status);
        console.error('message:', error.response.data);
        console.error('error:', error.message);
      });
    console.log(result.lon);
    setStartX(result.lon);
    setStartY(result.lat);
    const map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(startX, startY),
      width: '100%',
      height: '700px',
      zoom: 15,
    });
    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(startX, startY),
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
  }, [route]);

  return (
    <div>
      <div id="map_div"></div>
    </div>
  );
};

export default mapList;
