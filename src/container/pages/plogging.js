import React, { useEffect, useRef, useState } from 'react';
import UilMapMarker from '@iconscout/react-unicons/icons/uil-map-marker';
import UilLocationPinAlt from '@iconscout/react-unicons/icons/uil-location-pin-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import UilCameraPlus from '@iconscout/react-unicons/icons/uil-camera-plus';
import UilInfoCircle from '@iconscout/react-unicons/icons/uil-info-circle';
import UilExclamationCircle from '@iconscout/react-unicons/icons/uil-exclamation-circle';
import UilLocationArrow from '@iconscout/react-unicons/icons/uil-location-arrow';
import useGeolocation from '../../utility/plogging/useGeolocation';
import { DataService } from '../../config/dataService/dataService';
import Col from 'antd/es/grid/col';
import { Card, Form, Input, Row, Select, Spin } from 'antd';
// import routeList from './routeList';
import { Main } from '../styled';
import { KnowledgebaseTopWrap } from './knowledgeBase/style';
import { Button } from '../../components/buttons/buttons';
import FontAwesome from 'react-fontawesome';
import { CourseCardWrap } from '../../components/cards/Style';
import { Await, Link, Route, Routes, useNavigate } from 'react-router-dom';
import '../../static/css/ploggingPageStyle.scss';
import { Modal, alertModal } from '../../components/modals/antd-modals';
import { getItem } from '../../utility/localStorageControl';
import { useInView } from 'react-intersection-observer';
import { set } from 'date-fns';

const { Tmapv2 } = window;

const plogging = () => {
  //무한스크롤링
  const [watch, inView] = useInView();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [nav, setNav] = useState('');
  const [mapList, setMapList] = useState([]);
  const [route, setRoute] = useState({});
  const [firstX, setFirstX] = useState({});
  const [firstY, setFirstY] = useState({});
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
  //무한스크롤 페이지
  useEffect(() => {
    if (inView && !lastPage && !setResult) {
      loadMapList();
      paging();
    }
  }, [mapList, inView]);
  const paging = () => {
    setPage((page) => page + 1);
  };
  const loadMapList = () => {
    DataService.get(`/plogging?page=${page}`)
      .then(function (response) {
        console.log(response);
        if (response.data.data.content.last) {
          setLastPage(true);
        }
        setMapList((mapList) => mapList.concat(...response.data.data.content));
      })
      .catch(function (error) {});
  };
  useEffect(() => {
    loadMapList();
  }, []);

  const [state, setState] = useState({ visible: false, modalType: 'primary', colorModal: false });
  const showModal = (type, param, nav) => {
    setNav(nav);
    setRoute(param);
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

  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLocationLoad, setIsLocationLoad] = useState(false);
  //위치값 받아오기

  const geolocationNav = () => {
    window.navigator.geolocation.watchPosition(function (pos) {
      if (latitude != pos.coords.latitude) {
        setLatitude(pos.coords.latitude);
      }
      if (longitude != pos.coords.longitude) {
        setLongitude(pos.coords.longitude);
      }
      if (!isLocationLoad) {
        setIsLocationLoad(true);
      }
      console.log('get' + pos.coords.latitude, pos.coords.longitude);
      // location.reload();
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      geolocationNav();
      console.log('셋 인터벌');
    }, 10000);
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
  function markerInit() {
    return new Promise(function (resolve) {
      console.log('markerInit marker = ' + marker);
      console.log('markerInit map = ' + map);
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
  function markerUpdate(lat, lon) {
    console.log(marker);
    if (marker && map) {
      if (marker.getPosition().lat() == lat && marker.getPosition().lng() == lon) {
        return;
      }
      marker.setPosition(new Tmapv2.LatLng(lat, lon));

      console.log('마커위치 변경');
      console.log(marker.getPosition());
    } else {
      console.log('마커업데이트 불가');
    }
  }
  useEffect(() => {
    geolocationNav();
    console.log('초기좌표로딩');
  }, []);

  useEffect(() => {
    if (!map && isLocationLoad) {
      mapInit();
    } else if (map && !marker) {
      markerInit();
    }
    console.log(map);
  }, [latitude, longitude, map]);
  // 위치감지 마커변경
  useEffect(() => {
    console.log(marker);
    console.log(latitude, longitude);
    markerUpdate(latitude, longitude);
    console.log(marker);
  }, [longitude, latitude, marker]);
  //검색

  const [searchResult, setSearchResult] = useState(false); //검색결과 있는지 여부
  const [setResult, setSetResult] = useState(false); // 검색결과인지
  const [keyword, setKeyword] = useState('');
  const inputMapKeyword = (e) => {
    setKeyword(e.currentTarget.value);
  };

  const searchMapRoute = () => {
    setMapList([]);
    if (keyword === '') {
      setPage(0);
      loadMapList();
      setSetResult(false);
    } else {
      DataService.get(`/plogging/search?keyword=${keyword}`).then((response) => {
        if (!response.data.data[0]) {
          setSearchResult(true);
        } else {
          setSearchResult(false);
          setSetResult(true);
          setMapList(response.data.data);
        }
      });
    }
  };
  function ploggingStartClick() {
    if (memberNo) {
      navigate(nav, { state: route });
    } else {
      selfDestroyed();
    }
  }

  return (
    <div>
      <div className="ploggingPage">
        <div className="sidebar">
          <div className="buttons">
            <Button
              type="default"
              size="large"
              style={{ border: '1px solid #227C9D', color: '#227C9D' }}
              onClick={() => showModal('primary', { longitude, latitude }, 'startPage/')}
            >
              내 위치에서 플로깅 시작하기
              <UilLocationArrow style={{ width: '20px', height: '20px', marginLeft: '5px' }}></UilLocationArrow>
            </Button>
          </div>
          <div className="searchWrapper">
            <div className="searchInput">
              <KnowledgebaseTopWrap>
                <div className="ninjadash-knowledgetop">
                  <div className="searchText">
                    <h3>추천경로</h3>
                    <UilLocationPinAlt className="mapPin" />
                  </div>
                  <div className="ninjadash-knowledgetop__search--form">
                    <Form name="login" layout="vertical">
                      <div className="ninjadash-knowledgetop__formInner">
                        <Form.Item className="ninjadash-search-input">
                          <Input value={keyword} onChange={inputMapKeyword} placeholder="(경로명,경로설명,00구)" />
                          <Button onClick={searchMapRoute} className="btn-search" htmlType="submit" size="large">
                            <FontAwesome name="search" className="searchIcon" />
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              </KnowledgebaseTopWrap>
            </div>
          </div>
          {searchResult && (
            <Card
              className="not-result"
              style={{
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <UilExclamationCircle style={{ color: '#ffcb77' }} />
                <h1 style={{ fontSize: '20px', color: '#ffcb77' }}>검색 결과가 없습니다</h1>
              </div>
            </Card>
          )}
          {!mapList[0] && !searchResult && (
            <Card
              className="not-result"
              style={{
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Spin size="large" />
                <h1 style={{ marginTop: '10px', fontSize: '20px', color: '#ffcb77' }}>로딩중..</h1>
              </div>
            </Card>
          )}
          {mapList &&
            mapList.map((maps) => (
              <div key={maps.mapNo} ref={maps.mapNo % 5 == 0 ? watch : null}>
                <CourseCardWrap className="ninjadash-course-card-single">
                  <Card bordered={false}>
                    <div
                      className="ninjadash-course-card-content"
                      onClick={() => showModal('primary', maps, 'mapList/' + maps.mapNo)}
                    >
                      <h4 className="ninjadash-course-card-title">
                        {/* <Link to={`/${mapList.mapNo}`}> */}
                        {maps.courseName}
                        {/* </Link> */}
                      </h4>
                      <div className="ninjadash-course-card-author">
                        <span className="ninjadash-course-card-author__name">{maps.courseDetail}</span>
                      </div>
                      <div className="ninjadash-course-card-meta">
                        <div className="ninjadash-course-card-meta__left">
                          <span className="ninjadash-course-card-meta__pricing">{maps.distance}Km</span>
                        </div>
                        <ul className="ninjadash-course-card-meta__right">
                          <li className="bg-secondary" style={{ background: '#17C382' }}>
                            <UilMapMarker style={{ color: 'white' }} />
                            <span style={{ color: 'white' }}>{maps.addr}</span>
                          </li>
                          <li className="bg-primary" style={{ background: '#227C9D' }}>
                            <UilClock style={{ color: 'white' }} />
                            <span style={{ color: 'white' }}>{maps.time} Min</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </CourseCardWrap>
              </div>
            ))}
        </div>

        <Modal
          type={state.modalType}
          title={null}
          visible={state.visible}
          footer={[
            <div>
              <Button size="default" type="info" onClick={() => ploggingStartClick()}>
                플로깅 시작하기
              </Button>
              <Button size="default" type="info" outlined onClick={handleCancel}>
                취소
              </Button>
            </div>,
          ]}
          onCancel={handleCancel}
          width={700}
        >
          <div className="ploggingStart">
            <div
              style={{
                borderBottom: '1px solid rgb(227, 230, 239)',
                padding: '5px 0',
                marginBottom: '10px',
              }}
            >
              <h2 className="modal-title"> 플로깅 포인트 적립 방법!</h2>
            </div>
            <div className="ploggingModalBody">
              <div className="auth-top">
                <h3>사진을 첨부해서 글 작성시 포인트 지급</h3>
                <UilCameraPlus style={{ color: '#227C9D', width: '25px', height: '25px', marginTop: '3px' }} />
              </div>
              <h5> 포인트 적립해서 상품도 받고 기부도하자!</h5>
              <div className="picture">
                <div style={{ display: 'flex', marginLeft: '20px', marginTop: '30px' }}>
                  <UilInfoCircle style={{ color: '#00af89', width: '20px', height: '20px', marginTop: '30px' }} />
                  <h1>사진촬영예시</h1>
                </div>
                <div className="img-wrap">
                  <div className="auth-wrap">
                    <div className="trashP"></div>
                    <h4>내가 모은 쓰레기 봉투 사진찍기</h4>
                  </div>
                  <div className="auth-wrap">
                    <div className="ploggingP"></div>
                    <h4>플로깅하는 모습찍기</h4>
                  </div>
                </div>
              </div>
              <h6>*플로깅은 최소 10분은 진행해야 포인트를 받을 수 있어요</h6>
              <h6>*도중에 플로깅을 그만두면 포인트를 받을 수 없어요</h6>
            </div>
          </div>
        </Modal>
        {!map && (
          <div style={{ paddingRight: '0' }} className="mapEmpty">
            <div className="mapEmptyBox">
              <div className="plogginglogo"></div>
              <h1>
                <span>로</span>
                <span>딩</span>
                <span>중</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </h1>
              <h6>*로딩이 오래걸리면 새로고침을 해주세요</h6>
            </div>
          </div>
        )}

        <div style={{ paddingRight: '0' }} className="map">
          <div id="map_div"></div>
        </div>
      </div>
    </div>
  );
};

export default plogging;
