import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { element } from 'prop-types';
import { Button, Card, Col, Modal, Row } from 'antd';
import { CourseCardWrap } from '../../components/cards/Style';
import UilTrees from '@iconscout/react-unicons/icons/uil-trees';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import UilLocationArrowAlt from '@iconscout/react-unicons/icons/uil-location-arrow-alt';
import '../../static/css/mapListStylePage.scss';
import { DataService } from '../../config/dataService/dataService';
import { alertModal } from '../../components/modals/antd-modals';
import { getItem } from '../../utility/localStorageControl';
const { Tmapv2 } = window;

const mapList = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const memberNo = getItem('memberNo');
  //비로그인 유저 접근 방지
  const selfDestroyed = () => {
    let secondsToGo = 1.2;
    const modal = alertModal.success({
      title: '로그인 후 이용해 주세요',
      content: '',
    });

    setTimeout(() => {
      modal.destroy();
      navigate('/member/signin');
    }, secondsToGo * 1000);
  };
  useEffect(() => {
    if (!memberNo) {
      selfDestroyed();
    }
  }, []);
  const route = loc.state;
  const startX = route.startX;
  const startY = route.startY;
  const [firstX, setFirstX] = useState();
  const [firstY, setFirstY] = useState();
  const endX = route.endX;
  const endY = route.endY;
  const stopovers = route.stops;
  const courseName = route.courseName;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLocationLoad, setIsLocationLoad] = useState(false);
  // var resultMarkerArr = [];
  const [marker, setMarker] = useState();
  const [map, setMap] = useState();
  // let map; //맵

  let marker_s, marker_e, marker_p, marker_p2; // start/ end/ pass / 경로 경유지 마커
  const [resultMarkerArr, setResultMarkerArr] = useState([]); //마커 배열
  let drawInfoArr = []; //보여질 마커 좌표 배열
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
  //넘겨줄 데이터 선언

  const [plogging, setPlogging] = useState({
    type: '추천경로 시작',
    ploggingTime: 0,
    distance: new Date(),
    status: false,
  });

  const dtos = { route, plogging };
  //종료시 데이터 셋
  const ploggingEnd = () => {
    dateSet();
    // const { location, error } = useGeolocation(geolocationOptions);

    setPlogging((plo) => {
      const next = new Tmapv2.LatLng(latitude, longitude);
      const pre = new Tmapv2.LatLng(firstY, firstX);
      plo.distance = (pre.distanceTo(next) * 0.0001).toFixed(1);
      plo.ploggingTime = resultTimeSet;
      if (plo.ploggingTime > 9) {
        plo.status = 1;
      } else {
        plo.status = 0;
      }
      return plo;
    });
    showModal('primary');
  };
  //스프링 데이터 전송
  const createPlogging = (data) => {
    DataService.put('/plogging/startPage', { data }).then(function (response) {
      navigate('/board/register', {
        state: {
          boardDetail : {ploggingNo : response.data.data.ploggingNo}
        }});
    });
  };

  //현재위치
  const geolocationNav = () => {
    window.navigator.geolocation.getCurrentPosition(function (pos) {
      if (latitude != pos.coords.latitude) {
        setLatitude(pos.coords.latitude);
      }
      if (longitude != pos.coords.longitude) {
        setLongitude(pos.coords.longitude);
      }
      if (!isLocationLoad) {
        setIsLocationLoad(true);
      }
    });
  };
  //라인표시 함수
  function drawLine(arrPoint) {
    var polyline_;

    polyline_ = new Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: '#17C382',
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
  useEffect(() => {
    geolocationNav();
    if (isLocationLoad && !map) {
      setFirstX(longitude);
      setFirstY(latitude);
      mapInit();
    } else if (map && !marker) {
      markerInit();
    }
    // // 2. 시작, 도착 심볼찍기
    // // 시작
    marker_s = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(startY, startX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_b_s.png',
      iconSize: new window.Tmapv2.Size(32, 46),
      map: map,
    });
    setResultMarkerArr([...resultMarkerArr, marker_s]);
    // // 도착
    marker_e = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(endY, endX),
      icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_b_e.png',
      iconSize: new window.Tmapv2.Size(32, 46),
      map: map,
    });
    setResultMarkerArr([...resultMarkerArr, marker_e]);
    // // 3. 경유지 심볼 찍기

    stopovers.forEach((stopover) => {
      console.log(stopover.stopoverIdx);
      marker_p = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(parseFloat(stopover.viaY), parseFloat(stopover.viaX)),
        icon: `http://tmapapi.sktelecom.com/upload/tmap/marker/pin_g_m_${String.fromCharCode(
          stopover.stopoverIdx + 95,
        )}.png`,
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
    function parsePassList(pass) {
      let element = '';
      for (let i = 0; i < pass.length; i++) {
        element += pass[i];
      }
      return element;
    }
    if (stopovers.length < 5) {
      let element = '';
      for (const i in passList) {
        element += passList[i];
      }
    }
  }, [route, isLocationLoad, map]);
  //마커생성
  function markerInit() {
    return new Promise(function (resolve) {
      if (map && !marker) {
        console.log('마커 생성중');
        const newMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(latitude, longitude),
          icon: 'data:image/png;base64,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',
          map: map,
        });
        resolve(setMarker(() => newMarker));
        console.log('마커 생성 성공');
      } else {
        resolve(console.log('마커 생성불가'));
      }
    });
  }
  function markerUpdate(lat, lon, map) {
    console.log(marker);
    console.log(map);
    if (marker && map) {
      if (marker.getPosition().lat() == lat && marker.getPosition().lng() == lon) {
        return;
      }
      marker.setPosition(new Tmapv2.LatLng(lat, lon));

      console.log('마커위치 변경');
    } else {
      console.log('마커업데이트 불가');
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      geolocationNav();
      console.log('셋 인터벌');
    }, 10000 * 30);
    return () => {
      clearInterval(interval);
    };
  }, [marker]);
  //맵초기화
  function mapInit() {
    return new Promise(function (resolve) {
      if (!map && isLocationLoad) {
        const newMap = new Tmapv2.Map('map_div', {
          center: new Tmapv2.LatLng(latitude, longitude),
          width: '100%',
          height: '700px',
          zoom: 15,
        });
        resolve(setMap(newMap));
        console.log('맵 생성 성공 ');
      } else {
        resolve(console.log('맵 있음'));
      }
    });
  }
  useEffect(() => {
    markerUpdate(latitude, longitude, map);
  }, [longitude, latitude, marker, map]);

  return (
    <>
      <div>
        <div style={{ margin: '0', padding: '0' }} className="mapList">
          <div className="sidebar">
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
          </div>
          <div style={{ paddingRight: '0' }} className="map">
            <div id="map_wrap" className="map_wrap">
              <div id="map_div"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default mapList;
