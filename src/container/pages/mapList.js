import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { element } from 'prop-types';

const { Tmapv2 } = window;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
  maximumAge: 1000 * 3600 * 24, // 24 hour
};
const mapList = () => {
  let map;
  let marker_s, marker_e;
  let marker;
  const resultMarkerArr = [];
  const loc = useLocation();
  const route = loc.state;
  const { location, error } = useGeolocation(geolocationOptions);
  const startX = route.startX;
  const startY = route.startY;
  const endX = route.endX;
  const endY = route.endY;
  const courseName = route.courseName;
  var resultdrawArr = [];
  var drawInfoArr = [];
  const [date, setDate] = useState(() => new Date());
  console.log(route);
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
        center: new Tmapv2.LatLng(startY, startX),
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
      marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(parseFloat(stopover.viaY), parseFloat(stopover.viaX)),
        icon: `http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_${stopover.stopoverIdx - 1}.png`,
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });
      resultMarkerArr.push(marker);
    });

    // 4. 경로탐색 API 사용요청

    const headers = {
      appKey: '18T2zPpWnZ8XkMLMGjqNL9MMe7ieWWAxa29bWldO',
    };

    //보행자로 요청시 경유지 파싱
    const passList = route.stops.map((stop) => {
      const point = JSON.stringify(stop.viaX) + ',' + JSON.stringify(stop.viaY) + '_';
      return point;
    });
    if (stopovers.length < 5) {
      let element = '';
      for (const i in passList) {
        element += passList[i];
      }
      axios
        .post(
          'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
          {
            startName: courseName,
            startX: startX,
            startY: startY,
            endName: '도착지',
            endX: endX,
            endY: endY,
            passList: element,
            resCoordType: 'EPSG3857',
            // viaPoints: viaPoints,
          },
          { headers },
        )
        .then((response) => {
          const resultData = response.data.features;
          //기존 그려진 라인 & 마커가 있다면 초기화

          drawInfoArr = [];
          for (const i in resultData) {
            //for문 [S]
            const geometry = resultData[i].geometry;
            const properties = resultData[i].properties;

            if (geometry.type == 'LineString') {
              for (var j in geometry.coordinates) {
                // 경로들의 결과값(구간)들을 포인트 객체로 변환
                const latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                // 포인트 객체를 받아 좌표값으로 변환
                const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                // 포인트객체의 정보로 좌표값 변환 객체로 저장
                const convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                // 배열에 담기
                drawInfoArr.push(convertChange);
              }
            } else {
              var markerImg = '';
              var pType = '';
              var size;

              if (properties.pointType == 'S') {
                //출발지 마커
                markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
                pType = 'S';
                size = new Tmapv2.Size(24, 38);
              } else if (properties.pointType == 'E') {
                //도착지 마커
                markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
                pType = 'E';
                size = new Tmapv2.Size(24, 38);
              } else {
                //각 포인트 마커
                markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
                pType = 'P';
                size = new Tmapv2.Size(8, 8);
              }

              // 경로들의 결과값들을 포인트 객체로 변환
              var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);

              // 포인트 객체를 받아 좌표값으로 다시 변환
              var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              var routeInfoObj = {
                markerImage: markerImg,
                lng: convertPoint._lng,
                lat: convertPoint._lat,
                pointType: pType,
              };

              // Marker 추가
              marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
                icon: routeInfoObj.markerImage,
                iconSize: size,
                map: map,
              });
            }
          } //for문 [E]
          drawLine(drawInfoArr);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //5개 < 10개--------------------------------------------------------------------------------------------------------------------------------------------------------

      console.log(passList);
      let element = '';
      let elementP = '';
      for (const i in passList) {
        if (i < 5) {
          element += passList[i];
        } else {
          elementP += passList[i];
        }
      }
      console.log(element);
      console.log(elementP);
      axios
        .post(
          'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
          {
            startName: courseName,
            startX: startX,
            startY: startY,
            endName: '도착지',
            endX: stopovers[5].viaX,
            endY: stopovers[5].viaY,
            passList: element,
            resCoordType: 'EPSG3857',
            // viaPoints: viaPoints,
          },
          { headers },
        )
        .then((response) => {
          const resultData = response.data.features;
          //기존 그려진 라인 & 마커가 있다면 초기화
          if (resultdrawArr.length > 0) {
            for (var i in resultdrawArr) {
              resultdrawArr[i].setMap(map);
            }
            resultdrawArr = [];
          }

          drawInfoArr = [];
          for (const i in resultData) {
            //for문 [S]
            const geometry = resultData[i].geometry;
            const properties = resultData[i].properties;

            if (geometry.type == 'LineString') {
              for (var j in geometry.coordinates) {
                // 경로들의 결과값(구간)들을 포인트 객체로 변환
                const latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                // 포인트 객체를 받아 좌표값으로 변환
                const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                // 포인트객체의 정보로 좌표값 변환 객체로 저장
                const convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                // 배열에 담기
                drawInfoArr.push(convertChange);
              }
            } else {
              var markerImg = '';
              var pType = '';
              var size;

              if (properties.pointType == 'S') {
                //출발지 마커
                markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
                pType = 'S';
                size = new Tmapv2.Size(24, 38);
              } else if (properties.pointType == 'E') {
                //도착지 마커
                markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
                pType = 'E';
                size = new Tmapv2.Size(24, 38);
              } else {
                //각 포인트 마커
                markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
                pType = 'P';
                size = new Tmapv2.Size(8, 8);
              }

              // 경로들의 결과값들을 포인트 객체로 변환
              var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);

              // 포인트 객체를 받아 좌표값으로 다시 변환
              var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              var routeInfoObj = {
                markerImage: markerImg,
                lng: convertPoint._lng,
                lat: convertPoint._lat,
                pointType: pType,
              };

              // Marker 추가
              marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
                icon: routeInfoObj.markerImage,
                iconSize: size,
                map: map,
              });
            }
          } //for문 [E]
          drawLine(drawInfoArr);
        })
        .catch((error) => {
          console.log(error);
        });
      //5< 다시요청
      axios
        .post(
          'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
          {
            startName: courseName,
            startX: stopovers[5].viaX,
            startY: stopovers[5].viaY,
            endName: '도착지',
            endX: endX,
            endY: endY,
            passList: elementP,
            resCoordType: 'EPSG3857',
            // viaPoints: viaPoints,
          },
          { headers },
        )
        .then((response) => {
          const resultData = response.data.features;
          //기존 그려진 라인 & 마커가 있다면 초기화
          if (resultdrawArr.length > 0) {
            for (var i in resultdrawArr) {
              resultdrawArr[i].setMap(map);
            }
            resultdrawArr = [];
          }

          drawInfoArr = [];
          for (const i in resultData) {
            //for문 [S]
            const geometry = resultData[i].geometry;
            const properties = resultData[i].properties;

            if (geometry.type == 'LineString') {
              for (var j in geometry.coordinates) {
                // 경로들의 결과값(구간)들을 포인트 객체로 변환
                const latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                // 포인트 객체를 받아 좌표값으로 변환
                const convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                // 포인트객체의 정보로 좌표값 변환 객체로 저장
                const convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                // 배열에 담기
                drawInfoArr.push(convertChange);
              }
            } else {
              var markerImg = '';
              var pType = '';
              var size;

              if (properties.pointType == 'S') {
                //출발지 마커
                markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png';
                pType = 'S';
                size = new Tmapv2.Size(24, 38);
              } else if (properties.pointType == 'E') {
                //도착지 마커
                markerImg = 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png';
                pType = 'E';
                size = new Tmapv2.Size(24, 38);
              } else {
                //각 포인트 마커
                markerImg = 'http://topopen.tmap.co.kr/imgs/point.png';
                pType = 'P';
                size = new Tmapv2.Size(8, 8);
              }

              // 경로들의 결과값들을 포인트 객체로 변환
              var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);

              // 포인트 객체를 받아 좌표값으로 다시 변환
              var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

              var routeInfoObj = {
                markerImage: markerImg,
                lng: convertPoint._lng,
                lat: convertPoint._lat,
                pointType: pType,
              };

              // Marker 추가
              marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(routeInfoObj.lat, routeInfoObj.lng),
                icon: routeInfoObj.markerImage,
                iconSize: size,
                map: map,
              });
            }
          } //for문 [E]
          drawLine(drawInfoArr);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function drawLine(arrPoint) {
      var polyline_;

      polyline_ = new Tmapv2.Polyline({
        path: arrPoint,
        strokeColor: '#DD0000',
        strokeWeight: 6,
        map: map,
      });
      resultdrawArr.push(polyline_);
    }
  }, [route, location]);
  return (
    <>
      <div id="map_wrap" className="map_wrap">
        <div id="map_div"></div>
      </div>
    </>
  );
};

export default mapList;
