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
  const loc = useLocation();
  const route = loc.state;
  const startX = route.startX;
  const startY = route.startY;
  const endX = route.endX;
  const endY = route.endY;
  const stopovers = route.stops;
  const courseName = route.courseName;
  const { location, error } = useGeolocation(geolocationOptions);
  // var resultMarkerArr = [];
  let map; //맵
  let marker_s, marker_e, marker_p, marker_p2; // start/ end/ pass / 경로 경유지 마커
  const [resultMarkerArr, setResultMarkerArr] = useState([]); //마커 배열
  let drawInfoArr = []; //보여질 마커 좌표 배열

  //라인표시 함수
  function drawLine(arrPoint) {
    var polyline_;

    polyline_ = new Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: '#DD0000',
      strokeWeight: 6,
      map: map,
    });
    setResultMarkerArr([...resultMarkerArr, polyline_]);
  }

  //api 호출
  function tmapApi(resultPass, startX, startY, endX, endY) {
    const headers = {
      appKey: '18T2zPpWnZ8XkMLMGjqNL9MMe7ieWWAxa29bWldO',
    };
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
          passList: resultPass,
          resCoordType: 'EPSG3857',
          // viaPoints: viaPoints,
        },
        { headers },
      )
      .then((response) => {
        const resultData = response.data.features;
        //마커와 라인 초기화 안함
        if (resultMarkerArr.length > 0) {
          for (var i in resultMarkerArr) {
            resultMarkerArr[i].setMap(null);
          }
          setResultMarkerArr([]);
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
            marker_p2 = new Tmapv2.Marker({
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
  //api 호출
  function tmapApiNotPass(startX, startY, endX, endY) {
    const headers = {
      appKey: '18T2zPpWnZ8XkMLMGjqNL9MMe7ieWWAxa29bWldO',
    };
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
          resCoordType: 'EPSG3857',
          // viaPoints: viaPoints,
        },
        { headers },
      )
      .then((response) => {
        const resultData = response.data.features;
        //마커와 라인 초기화 안함
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
            marker_p2 = new Tmapv2.Marker({
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
    setResultMarkerArr([...resultMarkerArr, marker_s]);
    // // 도착
    marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(endY, endX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png',
      iconSize: new window.Tmapv2.Size(24, 38),
      map: map,
    });
    setResultMarkerArr([...resultMarkerArr, marker_e]);
    // // 3. 경유지 심볼 찍기

    stopovers.forEach((stopover) => {
      marker_p = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(parseFloat(stopover.viaY), parseFloat(stopover.viaX)),
        icon: `http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_${stopover.stopoverIdx - 1}.png`,
        iconSize: new window.Tmapv2.Size(24, 38),
        map: map,
      });
      setResultMarkerArr([...resultMarkerArr, marker_p]);
    });

    // 4. 경로탐색 API 사용요청

    const passList = stopovers.map((stop) => {
      const point = JSON.stringify(stop.viaX) + ',' + JSON.stringify(stop.viaY) + '_';
      return point;
    });

    // 경유지 개수별 나누기
    const passResult = [];
    const numStops = stopovers.length;

    for (let i = 0; i < numStops; i += 5) {
      const passListSlice = passList.slice(i, i + 5);
      const passResultSlice = parsePassList(passListSlice);

      if (i + 5 < numStops) {
        const nextStop = stopovers[i + 5];
        const nextX = nextStop.viaX;
        const nextY = nextStop.viaY;
        tmapApi(passResultSlice, startX, startY, nextX, nextY);
      } else {
        tmapApi(passResultSlice, startX, startY, endX, endY);
      }
    }

    if (numStops > 5) {
      const lastStopIndex = Math.min(numStops, 5);
      const lastPassList = passList.slice(lastStopIndex);
      const lastPassResult = parsePassList(lastPassList);
      const lastStop = stopovers[lastStopIndex - 1];
      const lastX = lastStop.viaX;
      const lastY = lastStop.viaY;
      tmapApiNotPass(lastX, lastY, endX, endY);
    }
    //원래코드
    // if (stopovers.length <= 5) {
    //   const passResult = parsePassList(passList);
    //   tmapApi(passResult, startX, startY, endX, endY);
    // } else if (stopovers.length <= 11) {
    //   //01234 5 678910 11 1213141516 17 1819202122 23 2425262728 29
    //   if (stopovers.length == 6) {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApiNotPass(firstX, firstY, endX, endY);
    //   }
    //   //start는 스타트 - 6번째 스탑오버가 엔드 - 다음 호출에서는 6번째가 시작 end는 엔드
    //   else {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, endX, endY);
    //   }
    // } else if (stopovers.length <= 17) {
    //   if (stopovers.length == 12) {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     const secondsX = stopovers[11].viaX;
    //     const secondsY = stopovers[11].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, secondsX, secondsY);
    //     tmapApiNotPass(secondsX, secondsY, endX, endY);
    //   }
    //   //start는 스타트 - 6번째 스탑오버가 엔드 - 다음 호출에서는 6번째가 시작 end는 엔드
    //   else {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const passResult3 = parsePassList(passList.slice(12));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     const secondsX = stopovers[11].viaX;
    //     const secondsY = stopovers[11].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, secondsX, secondsY);
    //     tmapApi(passResult3, secondsX, secondsY, endX, endY);
    //   }
    // } else if (stopovers.length <= 23) {
    //   if (stopovers.length == 18) {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const passResult3 = parsePassList(passList.slice(12));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     const secondsX = stopovers[11].viaX;
    //     const secondsY = stopovers[11].viaY;
    //     const thirdX = stopovers[17].viaX;
    //     const thirdY = stopovers[17].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, secondsX, secondsY);
    //     tmapApi(passResult3, secondsX, secondsY, thirdX, thirdY);
    //     tmapApiNotPass(thirdX, thirdY, endX, endY);
    //   } else {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const passResult3 = parsePassList(passList.slice(12, 17));
    //     const passResult4 = parsePassList(passList.slice(18));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     const secondsX = stopovers[11].viaX;
    //     const secondsY = stopovers[11].viaY;
    //     const thirdX = stopovers[17].viaX;
    //     const thirdY = stopovers[17].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, secondsX, secondsY);
    //     tmapApi(passResult3, secondsX, secondsY, thirdX, thirdY);
    //     tmapApi(passResult4, thirdX, thirdY, endX, endY);
    //   }
    // } else if (stopovers.length < 29) {
    //   if (stopovers.length == 24) {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const passResult3 = parsePassList(passList.slice(12, 17));
    //     const passResult4 = parsePassList(passList.slice(18));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     const secondsX = stopovers[11].viaX;
    //     const secondsY = stopovers[11].viaY;
    //     const thirdX = stopovers[17].viaX;
    //     const thirdY = stopovers[17].viaY;
    //     const fourthX = stopovers[23].viaX;
    //     const fourthY = stopovers[23].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, secondsX, secondsY);
    //     tmapApi(passResult3, secondsX, secondsY, thirdX, thirdY);
    //     tmapApi(passResult4, thirdX, thirdY, fourthX, fourthY);
    //     tmapApiNotPass(fourthX, fourthY, endX, endY);
    //   } else {
    //     const passResult = parsePassList(passList.slice(0, 5));
    //     const passResult2 = parsePassList(passList.slice(6, 11));
    //     const passResult3 = parsePassList(passList.slice(12, 17));
    //     const passResult4 = parsePassList(passList.slice(18, 23));
    //     const passResult5 = parsePassList(passList.slice(24));
    //     const firstX = stopovers[5].viaX;
    //     const firstY = stopovers[5].viaY;
    //     const secondsX = stopovers[11].viaX;
    //     const secondsY = stopovers[11].viaY;
    //     const thirdX = stopovers[17].viaX;
    //     const thirdY = stopovers[17].viaY;
    //     const fourthX = stopovers[23].viaX;
    //     const fourthY = stopovers[23].viaY;
    //     tmapApi(passResult, startX, startY, firstX, firstY);
    //     tmapApi(passResult2, firstX, firstY, secondsX, secondsY);
    //     tmapApi(passResult3, secondsX, secondsY, thirdX, thirdY);
    //     tmapApi(passResult4, thirdX, thirdY, fourthX, fourthY);
    //     tmapApi(passResult5, fourthX, fourthY, endX, endY);
    //   }
    // }
    //보행자로 요청시 경유지 파싱

    console.log(passList);
    function parsePassList(pass) {
      let element = '';
      for (let i = 0; i < pass.length; i++) {
        element += pass[i];
      }
      console.log('element 정보 = ' + element);
      return element;
    }
    if (stopovers.length < 5) {
      let element = '';
      for (const i in passList) {
        element += passList[i];
      }
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
